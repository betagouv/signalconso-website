import {useToastOnQueryError} from '@/clients/apiHooks'
import {Animate} from '@/components_simple/Animate'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {useApiClients} from '@/context/ApiClientsContext'
import {getCompanyKind} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {Report} from '@/model/Report'
import {CommonCompanyIdentification} from '@/model/Step2Model'
import Button from '@codegouvfr/react-dsfr/Button'
import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {useRef, useState} from 'react'
import {PartialReport} from '../../ReportFlowContext'
import {CompanyAskConsumerPostalCode} from '../CompanyAskConsumerPostalCode'
import {CompanyAskConsumerStreet} from '../CompanyAskConsumerStreet'
import {CompanyAskForeignDetails} from '../CompanyAskForeignDetails'
import {CompanySearchResultComponent} from '../CompanySearchResultComponent'
import {CompanySearchInputs, NewCompanySearchForm} from './NewCompanySearchForm'

export function NewCompanyIdentification({
  draft,
  onIdentification,
}: {
  draft: PartialReport & Pick<Report, 'step0' | 'step1'>
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
  const [searchInputs, setSearchInputs] = useState<CompanySearchInputs | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const [mode, setMode] = useState<'search' | 'cannotFind' | 'cannotFindConfirmed' | 'foreign'>('search')
  const _search = useCompanySearchSmartQuery(searchInputs)

  function onSearchFormSubmit(searchForm: CompanySearchInputs) {
    setMode('search')
    setSearchInputs(searchForm)
  }

  const showSearchResults = _search.isSuccess && _search.data !== null
  const isLoading = _search.isPending
  const emptyResults = _search.data?.length === 0
  const companyKind = getCompanyKind(draft)
  return (
    <div>
      {
        <div className="mb-4">
          <h2 className="fr-h6 !mb-4">Pouvez-vous identifier l'entreprise ?</h2>
          <NewCompanySearchForm onSubmit={onSearchFormSubmit} buttonIsLoading={isLoading} ref={formRef} />
          {(!showSearchResults || emptyResults) && <hr className="" />}
          {showSearchResults && (
            <CompanySearchResultComponent companies={_search.data ?? []} onSubmit={() => {}} report={draft} />
          )}
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-col">
              <Button onClick={() => setMode('cannotFind')} priority="tertiary no outline" iconId="ri-arrow-right-line">
                Je ne trouve pas / ne connais pas l'entreprise...
              </Button>
              <Button onClick={() => setMode('foreign')} priority="tertiary no outline" iconId="ri-arrow-right-line">
                L'entreprise est à l'étranger
              </Button>
            </div>
          </div>
        </div>
      }

      {(mode === 'cannotFind' || mode === 'cannotFindConfirmed') && (
        <Animate autoScrollTo>
          <div>
            <FriendlyHelpText>
              {/* TODO ajuster pour cas où on ne contacte pas */}
              <p>
                <strong>
                  SignalConso est plus efficace lorsque vous identifiez l'entreprise avec laquelle vous avez un différend
                </strong>
                . Cela nous permet de la contacter directement pour qu'elle puisse vous répondre rapidement.
              </p>
              <p>
                Si vous avez besoin d'un outil de recherche plus avancé, vous pouvez utiliser{' '}
                <Link href={'https://annuaire-entreprises.data.gouv.fr/'} target="_blank">
                  L'Annuaire des Entreprises
                </Link>
                .
              </p>
              <p>
                Si malgré vos efforts, vous ne parvenez pas à identifier l'entreprise, vous pouvez tout de même poursuivre votre
                signalement. Il sera transmis aux agents de la répression des fraudes, qui feront de leur mieux pour le traiter.
                Toutefois, les chances de succès seront significativement réduites sans l'identification précise de l'entreprise.
              </p>
              <div className="flex gap-4 justify-between">
                <Button priority="secondary" iconId="ri-arrow-left-line" onClick={() => setMode('search')}>
                  Je vais chercher un peu plus
                </Button>
                <Button
                  priority="secondary"
                  iconId="ri-arrow-right-line"
                  iconPosition="right"
                  onClick={() => setMode('cannotFindConfirmed')}
                >
                  Je ne peux vraiment pas identifier l'entreprise
                </Button>
              </div>
            </FriendlyHelpText>
          </div>
        </Animate>
      )}
      {mode === 'cannotFindConfirmed' && (
        <Animate autoScrollTo>
          <div>
            {companyKind === 'LOCATION' ? (
              <CompanyAskConsumerStreet
                onChange={({postalCode, street}) => {
                  onIdentification({
                    kind: 'consumerPreciseLocation',
                    consumerPostalCode: postalCode,
                    consumerStreet: street,
                  })
                }}
              />
            ) : (
              <CompanyAskConsumerPostalCode
                {...{companyKind}}
                onChange={postalCode => {
                  onIdentification({
                    kind: 'consumerLocation',
                    consumerPostalCode: postalCode,
                  })
                }}
              />
            )}
          </div>
        </Animate>
      )}
      {mode === 'foreign' && (
        <Animate autoScrollTo>
          <div>
            <CompanyAskForeignDetails
              {...{companyKind}}
              onSubmit={({name, postalCode, country: {code}}) => {
                onIdentification({
                  kind: 'foreignCompany',
                  companyName: name,
                  companyCountryCode: code,
                  consumerPostalCode: postalCode,
                })
              }}
            />
          </div>
        </Animate>
      )}
    </div>
  )
}

function useCompanySearchSmartQuery(searchInputs: CompanySearchInputs | undefined) {
  const {companyApiClient} = useApiClients()
  const {currentLang} = useI18n()
  const _search = useQuery({
    queryKey: ['searchCompany', searchInputs],
    queryFn: async () => {
      if (searchInputs) {
        const {input, geoArea} = searchInputs
        const postalCode = geoArea && geoArea.kind === 'postcode' ? geoArea.postalCode : undefined
        const departmentCode = geoArea && geoArea.kind === 'department' ? geoArea.dpt.code : undefined
        return companyApiClient.searchSmart(input, postalCode, departmentCode, currentLang)
      }
      return null
    },
  })
  useToastOnQueryError(_search)
  return _search
}
