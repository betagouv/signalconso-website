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
import {useState} from 'react'
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
  const {companyApiClient} = useApiClients()
  const {m, currentLang} = useI18n()
  const [mode, setMode] = useState<'search' | 'cannotFind' | 'cannotFindConfirmed' | 'foreign'>('search')
  const _search = useQuery({
    queryKey: ['searchCompany', searchInputs],
    queryFn: async () => {
      if (searchInputs) {
        const {input, geoArea} = searchInputs
        // TODO ajouter la popin d'explication pour trouver le siret
        // TODO gerer la recherche par departement et voir combien de résultats ça nous donne
        // TODO ajuster le seuil de similarité
        // TODO verif la recherche par siret/siren/rcs (avec postcode ou departement)
        // TODO il faut gerer les RCS ?
        // TODO verif les openonly. L'endpoint doit gérer le cas des openOnly : ne les afficher que dans le cas d'une recherche directe sur un siret
        const postalCode = geoArea && geoArea.kind === 'postcode' ? geoArea.postalCode : undefined
        const departmentCode = geoArea && geoArea.kind === 'department' ? geoArea.dpt.code : undefined
        return companyApiClient.searchSmart(input, postalCode, departmentCode, currentLang)
              }
      return null
    },
  })
  useToastOnQueryError(_search)

  function onSearchFormSubmit(searchForm: CompanySearchInputs) {
    setMode('search')
    setSearchInputs(searchForm)
  }

  const showSearchResults = _search.isSuccess && _search.data !== null
  const isLoading = _search.isPending
  const emptyResults = _search.data?.length === 0
  const companyKind = getCompanyKind(draft)
  // TODO i18n
  return (
    <div>
      {
        <div className="mb-4">
          <h2 className="fr-h6 !mb-4">Pouvez-vous identifier l'entreprise ?</h2>
          <NewCompanySearchForm onSubmit={onSearchFormSubmit} buttonIsLoading={isLoading} />
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
                  SignalConso ne fonctionne bien que quand vous identifiez l'entreprise avec laquelle vous avez un différent
                </strong>
                . Cela nous permet de la contacter immédiatement.
              </p>
              <p>
                Si vous avez besoin d'un moteur de recherche un peu plus poussé, vous pouvez essayer{' '}
                <Link href={'https://annuaire-entreprises.data.gouv.fr/'} target="_blank">
                  L'Annuaire des Entreprises
                </Link>
                .
              </p>
              <p>
                Si vraiment vous ne pouvez pas identifier l'entreprise, vous pouvez continuer quand même votre signalement. Il
                sera communiqué aux agents de la répression des fraudes, qui feront de leur mieux pour traiter votre signalement.
                Mais les chances de succès diminuent grandement.
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
