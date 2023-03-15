import {Box, BoxProps, Icon, Tooltip} from '@mui/material'
import {CompanySearchEventActions, EventCategories} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {useToastOnQueryError} from 'clients/apiHooks'
import {SignalConsoApiClient} from 'clients/SignalConsoApiClient'
import {Animate} from 'components_simple/Animate/Animate'
import {ScButton} from 'components_simple/Button/Button'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ReactNode, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useQuery} from '@tanstack/react-query'
import {IconBtn} from '../../../alexlibs/mui-extension/IconBtn/IconBtn'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {CompanySearchResult} from '../../../model/Company'
import {Country} from '../../../model/Country'

interface Form {
  website: string
}

interface Props extends Omit<BoxProps, 'onSubmit' | 'children'> {
  value?: string
  children: (websiteUrl?: string, result?: CompanySearchResult[], countries?: Country[]) => ReactNode
}

const websiteRegex = /^((http|https):\/\/)?(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,}(:[0-9]{1,5})?(\/.*)?$/

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
    }

async function searchWebsite(signalConsoApiClient: SignalConsoApiClient, website: string): Promise<WebsiteSearchResult> {
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
  return {kind: 'nothing'}
}

export const CompanyByWebsite = ({value, children, ...props}: Props) => {
  const {m} = useI18n()
  const {signalConsoApiClient} = useApiClients()
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

  const searchQuery = useQuery(['searchCompanyByWebsite', website], () => searchWebsite(signalConsoApiClient, website), {
    enabled: !!website,
  })
  useToastOnQueryError(searchQuery)
  const displayedResults = isEditingWebsite
    ? undefined
    : hasConfirmedUnknown
    ? // act as if there was no suggested result
      {kind: 'nothing' as const}
    : searchQuery.data

  const editWebsite = () => {
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

  return (
    <>
      <Animate>
        <Panel title={m.aboutCompany} id="CompanyByWebsite">
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
                <ScButton variant="contained" color="primary" sx={{mt: 2}} type="submit" loading={searchQuery.isFetching}>
                  {m.continue}
                </ScButton>
              )}
            </Box>
          </PanelBody>
        </Panel>
      </Animate>
      {displayedResults?.kind === 'countries' &&
        displayedResults.countries.length > 0 &&
        children(website, undefined, displayedResults.countries)}
      {displayedResults?.kind === 'companies' && children(website, displayedResults.companies)}
      {displayedResults?.kind === 'nothing' && children(website)}
    </>
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
