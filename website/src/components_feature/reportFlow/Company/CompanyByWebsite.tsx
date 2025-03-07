import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {CompanySearchEventActions, EventCategories} from '@/analytic/analytic'
import {SignalConsoApiClient} from '@/clients/SignalConsoApiClient'
import {useToastOnQueryError} from '@/clients/apiHooks'
import {Animate} from '@/components_simple/Animate'
import {AutofocusedDiv} from '@/components_simple/AutofocusedDiv'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useQuery} from '@tanstack/react-query'
import Link from 'next/link'
import {ReactNode, useEffect, useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import {SpecificWebsiteCompanyKind} from 'shared/anomalies/Anomaly'
import {SiretExtractorClient} from '../../../clients/SiretExtractorClient'
import {CompanySearchResult} from '../../../model/Company'
import {Country} from '../../../model/Country'
import {useReportFlowContext} from '../ReportFlowContext'

interface Form {
  website: string
}

interface Props {
  specificWebsiteCompanyKind: SpecificWebsiteCompanyKind | undefined
  children: (websiteUrl?: string, result?: CompanySearchResult[], countries?: Country[]) => ReactNode
}

const websiteRegex = /^((http|https):\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?(\?.*)?$/i
const nonGouvRegexp = /^(?!.*\.gouv\.fr(?:[\/?#]|$)).*$/i

type WebsiteSearchResult =
  | {
      kind: 'companies'
      companies: CompanySearchResult[]
    }
  | {
      kind: 'similarHosts'
      hosts: string[]
    }
  | {
      kind: 'countries'
      countries: Country[]
    }
  | {
      kind: 'nothing'
      status: 'up' | 'down' | 'unknown'
    }

async function searchWebsite(
  signalConsoApiClient: SignalConsoApiClient,
  siretExtractorClient: SiretExtractorClient,
  website: string,
): Promise<WebsiteSearchResult> {
  const res1 = await signalConsoApiClient.searchCompaniesByUrl(website)
  if (res1.exactMatch.length > 0) {
    return {
      kind: 'companies',
      companies: res1.exactMatch,
    }
  }
  const res2 = await signalConsoApiClient.searchForeignCompaniesByUrl(website)
  if (res2.length > 0) {
    return {
      kind: 'countries',
      countries: res2,
    }
  }
  if (res1.similarHosts.length > 0) {
    return {
      kind: 'similarHosts',
      hosts: res1.similarHosts,
    }
  }
  try {
    const status = await siretExtractorClient.dig(website)
    return status.length === 0 ? {kind: 'nothing', status: 'down'} : {kind: 'nothing', status: 'up'}
  } catch {
    return {kind: 'nothing', status: 'unknown'}
  }
}

function SpecificAlert({websiteCompanyKind}: {websiteCompanyKind: SpecificWebsiteCompanyKind}) {
  const {m} = useI18n()
  function getTexts() {
    switch (websiteCompanyKind) {
      case 'TRANSPORTER_WEBSITE':
        return {
          title: m.whichWebsiteTransporterTitle,
          description: m.whichWebsiteTransporterText,
        }
      case 'MERCHANT_WEBSITE':
        return {
          title: m.whichWebsiteMerchantTitle,
          description: m.whichWebsiteMerchantText,
        }
      default:
        return websiteCompanyKind satisfies never
    }
  }
  const {title, description} = getTexts()
  return (
    <div className="mb-4">
      <Alert severity="info" title={title} description={description} />
    </div>
  )
}

export const CompanyByWebsite = ({children, specificWebsiteCompanyKind}: Props) => {
  const {m} = useI18n()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const {signalConsoApiClient, siretExtractorClient} = useApiClients()
  const _analytic = useAnalyticContext()
  const {
    getValues,
    setValue,
    handleSubmit,
    register,
    formState: {errors},
  } = useForm<Form>({
    defaultValues: {
      website: undefined,
    },
  })

  const [website, setWebsite] = useState('')
  const [isEditingWebsite, setIsEditingWebsite] = useState(true)
  const [hasConfirmedUnknown, setHasConfirmedUnknown] = useState(false)
  const _reportFlow = useReportFlowContext()

  const searchQuery = useQuery({
    queryKey: ['searchCompanyByWebsite', website],
    queryFn: () => searchWebsite(signalConsoApiClient, siretExtractorClient, website),
    enabled: !!website,
  })
  useToastOnQueryError(searchQuery)
  const displayedResults = isEditingWebsite
    ? undefined
    : hasConfirmedUnknown
      ? // act as if there was no suggested result
        {kind: 'nothing' as const, status: 'unknown' as const}
      : searchQuery.data

  useEffect(() => {
    if (searchQuery.data?.kind === 'nothing' && searchQuery.data?.status === 'down') {
      _analytic.trackEvent(
        EventCategories.companySearch,
        CompanySearchEventActions.searchedWebsiteDown,
        _reportFlow.report.step0?.category + '' + website,
      )
    }
  }, [searchQuery.data])

  const inputIsDisabled = !!displayedResults

  const editWebsite = () => {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.editWebsite, website)
    setIsEditingWebsite(true)
    setHasConfirmedUnknown(false)
  }

  function onSubmit({website}: Form) {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByUrl, website)
    setIsEditingWebsite(false)
    setWebsite(website.trim())
  }

  const websiteToReportAlert = (websiteCompanyKind: SpecificWebsiteCompanyKind) => (
    <SpecificAlert websiteCompanyKind={websiteCompanyKind} />
  )

  const registerWebsiteResult = register('website', {
    required: {value: true, message: m.required},
    validate: value => {
      if (!websiteRegex.test(value.trim())) {
        return m.invalidUrlPattern
      }
      return !nonGouvRegexp.test(value.trim()) ? m.consumerCannotReportSignalConso : undefined
    },
  })
  const {ref, ...restOfRegisterWebsiteResult} = registerWebsiteResult

  return (
    <>
      <Animate>
        <div id="CompanyByWebsite">
          {specificWebsiteCompanyKind && websiteToReportAlert(specificWebsiteCompanyKind)}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ScTextInput
                label={m.website}
                required
                disabled={inputIsDisabled}
                editable={
                  inputIsDisabled
                    ? {
                        onEdit: editWebsite,
                        label: m.modifyWebsite,
                      }
                    : undefined
                }
                {...restOfRegisterWebsiteResult}
                ref={e => {
                  // https://www.react-hook-form.com/faqs/#Howtosharerefusage
                  ref(e)
                  inputRef.current = e as any as HTMLInputElement
                }}
                placeholder={m.websitePlaceholder}
                error={!!errors.website}
                helperText={errors.website?.message}
              />
              <br />
              <SimilarHosts
                {...{website, displayedResults}}
                onConfirmUnknown={() => setHasConfirmedUnknown(true)}
                onPickDifferentHost={_ => {
                  setValue('website', _)
                  onSubmit(getValues())
                }}
              />
              {!displayedResults && (
                <div className="flex items-center justify-end">
                  <Button type="submit" disabled={searchQuery.isFetching}>
                    {m.continue}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </Animate>
      {displayedResults?.kind === 'countries' && displayedResults.countries.length > 0 && (
        <AutofocusedDiv>{children(website, undefined, displayedResults.countries)}</AutofocusedDiv>
      )}
      {displayedResults?.kind === 'companies' && <AutofocusedDiv>{children(website, displayedResults.companies)}</AutofocusedDiv>}
      <InformationPanel website={website} displayedResults={displayedResults} />
      {displayedResults?.kind === 'nothing' && <AutofocusedDiv>{children(website)}</AutofocusedDiv>}
    </>
  )
}

const InformationPanel = ({website, displayedResults}: {website: string; displayedResults: WebsiteSearchResult | undefined}) => {
  const hostname = website.replace(/^((http|https):\/\/)?(www\.)?/, '')
  if (displayedResults && (hostname === 'relaxsoria.com' || hostname === 'stockwan.com')) {
    return <TheseeInformation />
  } else if (displayedResults?.kind === 'nothing' && displayedResults?.status === 'down') {
    return <WebsiteDown />
  } else {
    return null
  }
}

const TheseeInformation = () => {
  const {m} = useI18n()
  return (
    <Alert
      description={
        <p>
          {m.theseeInformation}
          <Link href="https://www.service-public.fr/particuliers/vosdroits/N31138#0_0_0_0_1_2" target="_blank">
            {m.theseeInformationLink}
          </Link>
        </p>
      }
      severity="warning"
      title={m.theseeInformationTitle}
      className="mb-4"
    />
  )
}

const WebsiteDown = () => {
  const {m} = useI18n()
  return (
    <Alert
      description={
        <>
          <p>{m.websiteDoesNotExist1}</p>
          <ul>
            <li>{m.websiteDoesNotExist2}</li>
            <li>{m.websiteDoesNotExist3}</li>
          </ul>
          <p>{m.websiteDoesNotExist4}</p>
        </>
      }
      severity="warning"
      title={<></>}
      className="mb-4"
    />
  )
}

function SimilarHosts({
  website,
  displayedResults,
  onPickDifferentHost,
  onConfirmUnknown,
}: {
  displayedResults: WebsiteSearchResult | undefined
  onPickDifferentHost: (host: string) => void
  onConfirmUnknown: () => void
  website: string
}) {
  const {m} = useI18n()
  if (displayedResults?.kind === 'similarHosts') {
    const {hosts} = displayedResults
    return (
      <AutofocusedDiv>
        <br />
        <h3 className="text-base font-normal mb-2">{m.suggestion}</h3>
        <ul className="list-none flex p-0 gap-2">
          {hosts.map((host, key) => {
            return (
              <li className="p-0 m-0" key={key}>
                <Button
                  onClick={_ => {
                    onPickDifferentHost(host)
                  }}
                  priority="secondary"
                >
                  {host}
                </Button>
              </li>
            )
          })}
          <li className="p-0 m-0">
            <Button onClick={onConfirmUnknown} priority="tertiary no outline">
              {m.continueWithWebsite(website)}
            </Button>
          </li>
        </ul>
      </AutofocusedDiv>
    )
  }
  return null
}
