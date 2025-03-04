'use client'
import {useI18n} from '@/i18n/I18n'
import {useState} from 'react'
import {Animate} from '@/components_simple/Animate'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {CompanySearchByNameAndGeoArea} from '@/components_feature/reportFlow/Company/CompanySearchByNameAndGeoArea'
import {CompanySearchResultComponentWithTags} from '@/components_feature/reportFlow/Company/CompanySearchResultComponent'
import {CompanySearchByIdentifier} from '@/components_feature/reportFlow/Company/CompanySearchByIdentifier'
import {ReportTag} from 'shared/anomalies/Anomaly'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useApiClients} from '@/context/ApiClientsContext'
import {CompanySearchResult} from '@/model/Company'
import {buildReportMetadata} from '@/utils/buildReportMetadata'
import {isoToHumanReadableText} from '@/utils/utils'
import {Loader} from '@/feature/Loader'
import {CreatedReport} from '@/model/CreatedReport'
import {AcknowledgementInner} from '@/components_feature/reportFlow/Acknowledgement/Acknowledgement'
import {useToastError} from '@/hooks/useToastError'

interface ReattributeCompanyProps {
  reportId: string
  isWebView: boolean
}

export const ReattributeCompany = ({reportId, isWebView}: ReattributeCompanyProps) => {
  const {m, currentLang} = useI18n()
  const [method, setMethod] = useState<'byNameAndGeoArea' | 'byIdentifier' | undefined>()
  const {signalConsoApiClient} = useApiClients()
  const toastError = useToastError()

  const _isReportReattributable = useQuery({
    queryKey: ['isReportReattributable', reportId],
    queryFn: () => signalConsoApiClient.isReportReattributable(reportId),
    retry: false,
  })

  const [isDone, setDone] = useState<CreatedReport | undefined>()

  const _reattributeReport = useMutation({
    mutationFn: (company: CompanySearchResult) =>
      signalConsoApiClient.reattributeReport(reportId, company, buildReportMetadata({isWebView})),
    onSuccess: report => setDone(report),
    onError: error => {
      toastError(error.message)
    },
  })

  const optionByNameAndGeoArea = {
    label: m.identifyBy_name_geoarea,
    value: 'byNameAndGeoArea' as const,
  }
  const optionByIdentifier = {
    label: m.identifyBy_identity,
    description: m.identifyBy_identityDesc,
    value: 'byIdentifier' as const,
  }

  const options = [optionByNameAndGeoArea, optionByIdentifier]

  if (_isReportReattributable.isLoading) {
    return <Loader />
  } else if (_isReportReattributable.data) {
    const {companyName, daysToAnswer, tags, creationDate} = _isReportReattributable.data

    return isDone ? (
      <AcknowledgementInner createdReport={isDone} country={isDone.companyAddress.country} isWebView={isWebView} />
    ) : (
      <>
        <div>
          <h3>{m.reattribute.title}</h3>
          <p>
            {m.step_company} <strong>{companyName}</strong> {m.reattribute.companyIndicated}{' '}
            {isoToHumanReadableText(creationDate, currentLang)} {m.reattribute.badAttribution}
          </p>
          <p>
            {m.reattribute.youHave}{' '}
            <strong>
              {daysToAnswer} {m.days}
            </strong>{' '}
            {m.reattribute.toReattribute}
          </p>
        </div>
        <Animate>
          <div id="CompanyIdentifyBy">
            <ScRadioButtons
              required
              value={method}
              onChange={setMethod}
              options={options}
              title={m.reattribute.identify}
              description={<span dangerouslySetInnerHTML={{__html: m.canYouIdentifyCompanyDesc}} />}
            />
          </div>
        </Animate>
        {method && dispatch(method, tags, _reattributeReport.mutate)}
      </>
    )
  } else {
    return (
      <>
        <h1>{m.reattribute.notReattributable}</h1>
        <div className="text-center">
          <i className="ri-emotion-normal-line fr-icon--lg" />
        </div>
      </>
    )
  }
}

const dispatch = (
  method: 'byNameAndGeoArea' | 'byIdentifier',
  tags: ReportTag[],
  onIdentification: (_: CompanySearchResult) => void,
) => {
  switch (method) {
    case 'byNameAndGeoArea':
      return (
        <CompanySearchByNameAndGeoArea>
          {companies => (
            <CompanySearchResultComponentWithTags
              companies={companies ?? []}
              tags={tags}
              onSubmit={company => {
                onIdentification(company)
              }}
            />
          )}
        </CompanySearchByNameAndGeoArea>
      )
    case 'byIdentifier':
      return (
        <CompanySearchByIdentifier>
          {companies => (
            <CompanySearchResultComponentWithTags
              companies={companies ?? []}
              tags={tags}
              onSubmit={company => {
                onIdentification(company)
              }}
            />
          )}
        </CompanySearchByIdentifier>
      )
  }
}
