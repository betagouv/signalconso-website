import {Box, BoxProps, Icon, Tooltip} from '@mui/material'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {useToastOnQueryError} from 'clients/apiHooks'
import {SignalConsoApiClient} from 'clients/SignalConsoApiClient'
import {Animate} from 'components_simple/Animate'
import {ScButton} from 'components_simple/Button'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {Panel, PanelBody} from 'components_simple/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useQuery} from '@tanstack/react-query'
import {IconBtn} from '../../../alexlibs/IconBtn'
import {Txt} from '../../../alexlibs/Txt'
import {CompanySearchResult} from '../../../model/Company'
import {Country} from '../../../model/Country'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {SpecificWebsiteCompanyKinds} from '../../../anomalies/Anomaly'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {SiretExtractorClient} from '../../../clients/SiretExtractorClient'
import {appConfig} from '../../../core/appConfig'

interface Form {
  website: string
}

interface Props extends Omit<BoxProps, 'onSubmit' | 'children'> {
  value?: string
  specificWebsiteCompanyKind?: SpecificWebsiteCompanyKinds
  children: (websiteUrl?: string, result?: CompanySearchResult[], countries?: Country[]) => ReactNode
}

const websiteRegex = /^((http|https):\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/i

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
  if (res1.similarHosts.length > 0) {
    return {
      kind: 'similarHosts',
      hosts: res1.similarHosts,
    }
  }
  const res2 = await signalConsoApiClient.searchForeignCompaniesByUrl(website)
  if (res2.length > 0) {
    return {
      kind: 'countries',
      countries: res2,
    }
  }
  try {
    const status = await siretExtractorClient.dig(website)
    return status.length === 0 ? {kind: 'nothing', status: 'down'} : {kind: 'nothing', status: 'up'}
  } catch {
    return {kind: 'nothing', status: 'unknown'}
  }
}

export const CompanyByWebsite = ({value, children, specificWebsiteCompanyKind, ...props}: Props) => {
  const {m} = useI18n()
  const {signalConsoApiClient, siretExtractorClient} = useApiClients()
  const _analytic = useAnalyticContext()
  const {
    getValues,
    setValue,
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<Form>()

  const [website, setWebsite] = useState('')
  const [isEditingWebsite, setIsEditingWebsite] = useState(true)
  const [hasConfirmedUnknown, setHasConfirmedUnknown] = useState(false)

  const searchQuery = useQuery(
    ['searchCompanyByWebsite', website],
    () => searchWebsite(signalConsoApiClient, siretExtractorClient, website),
    {
      enabled: !!website,
    },
  )
  useToastOnQueryError(searchQuery)
  const displayedResults = isEditingWebsite
    ? undefined
    : hasConfirmedUnknown
    ? // act as if there was no suggested result
      {kind: 'nothing' as const, status: 'unknown' as const}
    : searchQuery.data

  useEffect(() => {
    if (searchQuery.data?.kind === 'nothing' && searchQuery.data?.status === 'down') {
      _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchedWebsiteDown, website)
    }
  }, [searchQuery.data])

  const editWebsite = () => {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.editWebsite, website)
    setIsEditingWebsite(true)
    setHasConfirmedUnknown(false)
  }

  const clearWebsite = () => {
    setIsEditingWebsite(true)
    setHasConfirmedUnknown(false)
    reset()
  }

  function onSubmit({website}: Form) {
    _analytic.trackEvent(EventCategories.companySearch, CompanySearchEventActions.searchByUrl, website)
    setIsEditingWebsite(false)
    setWebsite(website)
  }

  const websiteToReportAlert = (websiteCompanyKind: SpecificWebsiteCompanyKinds) => {
    if (websiteCompanyKind == 'TRANSPORTER_WEBSITE') {
      return (
        <Alert
          className="fr-mt-4w"
          severity="info"
          description={m.whichWebsiteTransporterText}
          title={m.whichWebsiteTransporterTitle}
        />
      )
    } else if (websiteCompanyKind == 'MERCHANT_WEBSITE') {
      return (
        <Alert
          className="fr-mt-4w"
          severity="info"
          description={m.whichWebsiteMerchantText}
          title={m.whichWebsiteMerchantTitle}
        />
      )
    }
  }

  return (
    <>
      <Animate>
        <Panel title={m.aboutCompany} id="CompanyByWebsite">
          {specificWebsiteCompanyKind && websiteToReportAlert(specificWebsiteCompanyKind)}
          <PanelBody>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} {...props}>
              <Txt block>
                <span dangerouslySetInnerHTML={{__html: m.website}} />
                <Txt color="disabled"> *</Txt>
              </Txt>
              <ScInput
                InputProps={{
                  endAdornment: (
                    <Tooltip title={m.edit}>
                      <IconBtn size="small" color="primary" onClick={editWebsite}>
                        <Icon>edit</Icon>
                      </IconBtn>
                    </Tooltip>
                  ),
                }}
                onClear={clearWebsite}
                defaultValue={value}
                disabled={!!displayedResults}
                {...register('website', {
                  required: {value: true, message: m.required},
                  pattern: {
                    value: websiteRegex,
                    message: m.invalidUrlPattern,
                  },
                  validate: {
                    isSignalConsoUrl: value => {
                      return value.includes('signal.conso.gouv.fr') ? m.consumerCannotReportSignalConso : undefined
                    },
                  },
                })}
                fullWidth
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
                  <Button className="mt-2" type="submit" disabled={searchQuery.isFetching}>
                    {m.continue}
                  </Button>
                </div>
              )}
            </Box>
          </PanelBody>
        </Panel>
      </Animate>
      {displayedResults?.kind === 'countries' &&
        displayedResults.countries.length > 0 &&
        children(website, undefined, displayedResults.countries)}
      {displayedResults?.kind === 'companies' && children(website, displayedResults.companies)}
      {displayedResults?.kind === 'nothing' && displayedResults?.status === 'down' && <WebsiteDown />}
      {displayedResults?.kind === 'nothing' && children(website)}
    </>
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
      className="fr-mt-4w fr-mb-4w"
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
      <>
        <br />
        <Txt truncate block>
          {m.suggestion}
        </Txt>
        <>
          {hosts.map((host, key) => {
            return (
              <ScButton
                key={key}
                variant="contained"
                sx={{mt: 2, mr: 1}}
                onClick={_ => {
                  onPickDifferentHost(host)
                }}
                size={'small'}
              >
                {host}
              </ScButton>
            )
          })}
          <ScButton key={'key'} sx={{mt: 2}} variant="text" size={'small'} onClick={onConfirmUnknown}>
            {m.continueWithWebsite(website)}
          </ScButton>
        </>
      </>
    )
  }
  return null
}
