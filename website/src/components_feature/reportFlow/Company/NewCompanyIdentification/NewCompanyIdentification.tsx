import {useToastOnQueryError} from '@/clients/apiHooks'
import {Animate} from '@/components_simple/Animate'
import {useApiClients} from '@/context/ApiClientsContext'
import {getCompanyKind, isTransmittableToPro} from '@/feature/reportUtils'
import {useI18n} from '@/i18n/I18n'
import {Report} from '@/model/Report'
import {CommonCompanyIdentification} from '@/model/Step2Model'
import {scrollToElement} from '@/utils/utils'
import Button from '@codegouvfr/react-dsfr/Button'
import {useQuery} from '@tanstack/react-query'
import {useRef, useState} from 'react'
import {PartialReport} from '../../ReportFlowContext'
import {CompanyAskConsumerPostalCode} from '../CompanyAskConsumerPostalCode'
import {CompanyAskConsumerStreet} from '../CompanyAskConsumerStreet'
import {CompanyAskForeignDetails} from '../CompanyAskForeignDetails'
import {CompanySearchResultComponent} from '../CompanySearchResultComponent'
import {CannotFindCompanyWarning} from './CannotFindCompanyWarning'
import {CompanySearchInputs, NewCompanySearchForm} from './NewCompanySearchForm'

export function NewCompanyIdentification({
  draft,
  onIdentification,
}: {
  draft: PartialReport & Pick<Report, 'step0' | 'step1'>
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
  const {m} = useI18n()
  const [searchInputs, setSearchInputs] = useState<CompanySearchInputs | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const [mode, setMode] = useState<'search' | 'cannotFind' | 'cannotFindConfirmed' | 'foreign'>('search')
  const _search = useCompanySearchSmartQuery(searchInputs)

  const showSearchResults = _search.isSuccess && _search.data !== null
  const isLoading = _search.isPending
  const emptyResults = _search.data?.length === 0
  const companyKind = getCompanyKind(draft)
  const reportTransmittableToPro = isTransmittableToPro(draft)
  return (
    <div>
      {
        <div className="mb-4">
          <h2 className="fr-h6 !mb-4">{m.canYouIdentifyCompany}</h2>
          <NewCompanySearchForm
            buttonIsLoading={isLoading}
            ref={formRef}
            onSubmit={searchForm => {
              setMode('search')
              setSearchInputs(searchForm)
            }}
          />
          {(!showSearchResults || emptyResults) && <hr className="" />}
          {showSearchResults && (
            <CompanySearchResultComponent
              companies={_search.data ?? []}
              onSubmit={(company, vendor) => {
                onIdentification(
                  vendor
                    ? {
                        kind: 'marketplaceCompanyFound',
                        company,
                        vendor,
                      }
                    : {
                        kind: 'companyFound',
                        company,
                      },
                )
              }}
              report={draft}
            />
          )}
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-col">
              <Button onClick={() => setMode('cannotFind')} priority="tertiary no outline" iconId="ri-arrow-right-line">
                {m.cantFindCompany}
              </Button>
              <Button onClick={() => setMode('foreign')} priority="tertiary no outline" iconId="ri-arrow-right-line">
                {m.companyIsForeign}
              </Button>
            </div>
          </div>
        </div>
      }
      {(mode === 'cannotFind' || mode === 'cannotFindConfirmed') && (
        <CannotFindCompanyWarning
          onCancel={() => {
            setMode('search')
            setTimeout(() => {
              const el = formRef.current
              if (el) {
                scrollToElement(el)
              }
            }, 0)
          }}
          onContinue={() => setMode('cannotFindConfirmed')}
          {...{reportTransmittableToPro}}
        />
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
              {...{reportTransmittableToPro}}
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
