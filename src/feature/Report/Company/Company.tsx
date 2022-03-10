import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyDraft, CompanyKinds, CompanySearchResult, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {useReportFlowContext} from '../ReportFlowContext'
import React, {Dispatch, SetStateAction, useState} from 'react'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {useI18n} from '../../../core/i18n'
import {CompanySearchResultComponent} from './CompanySearchResult'
import {CompanyAskIsForeign, IsForeignCompany} from './CompanyAskIsForeign'
import {ScButton} from '../../../shared/Button/Button'
import {ReportDraft2} from '../../../core/model/ReportDraft'
import {useStepperContext} from '../../../shared/Stepper/Stepper'
import {fnSwitch} from '@alexandreannic/ts-utils/lib/common'
import {CompanySearchByNameAndPostalCode} from './CompanySearchByNameAndPostalCode'
import {CompanySearchByIdentity} from './CompanySearchByIdentity'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {DeepPartial} from '@alexandreannic/ts-utils'
import {CompanyByPhone} from './CompanyByPhone'

interface CompanyProps {
  animatePanel?: boolean
  autoScrollToPanel?: boolean
}

interface CompanyWithRequiredProps extends CompanyProps {
  draft: Pick<ReportDraft, 'companyKind'>
  onUpdateReportDraft: (_: DeepPartial<ReportDraft2>) => void
}

export const Company = ({animatePanel, autoScrollToPanel}: CompanyProps) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  const _stepper = useStepperContext()
  const {m} = useI18n()
  if (draft.companyDraft) {
    return (
      <>
        {JSON.stringify(draft.companyDraft)}
        <ScButton onClick={() => _reportFlow.setReportDraft(_ => ({..._, companyDraft: undefined}))}>{m.edit}</ScButton>
      </>
    )
  }
  return (
    <>
      <_Company
        animatePanel={animatePanel}
        autoScrollToPanel={autoScrollToPanel}
        draft={draft}
        onUpdateReportDraft={draft => {
          _reportFlow.setReportDraft(_ => ReportDraft2.merge(_, draft))
          _stepper.next()
        }}
      />
    </>
  )
}

export const _Company = ({
  draft,
  onUpdateReportDraft,
}: CompanyWithRequiredProps) => {
  const commonTree = (companyX: DeepPartial<CompanyDraft> = {}, result: CompanySearchResult[] | undefined = undefined) => {
    return result && result.length > 0 ? (
      <CompanySearchResultComponent companies={result} onSubmit={(company, vendor) => {
        onUpdateReportDraft({
          companyDraft: {
            ...company,
            ...companyX,
          },
          vendor,
        })
      }}/>
    ) : (
      <CompanyIdentifyBy companyKind={draft.companyKind!}>
        {identifyBy => fnSwitch(identifyBy, {
          [IdentifyBy.NAME]: () => (
            <CompanySearchByNameAndPostalCode>
              {companies => (
                <CompanySearchResultComponent companies={companies ?? []} onSubmit={company => {
                  onUpdateReportDraft({
                    companyDraft: company,
                  })
                }}/>
              )}
            </CompanySearchByNameAndPostalCode>
          ),
          [IdentifyBy.IDENTITY]: () => (
            <CompanySearchByIdentity>
              {companies => (
                <CompanySearchResultComponent companies={companies ?? []} onSubmit={company => {
                  onUpdateReportDraft({
                    companyDraft: company,
                  })
                }}/>
              )}
            </CompanySearchByIdentity>
          ),
          [IdentifyBy.NONE]: () => (
            <CompanyAskIsForeign>
              {isForeign => fnSwitch(isForeign, {
                [IsForeignCompany.Yes]: () => (
                  <CompanyAskConsumerPostalCode onChange={postalCode => {
                    onUpdateReportDraft({
                      companyDraft: {
                        ...companyX,
                        address: {
                          postalCode,
                        }
                      }
                    })
                  }}/>
                ),
                [IsForeignCompany.No]: () => (
                  <CompanyAskForeignDetails onSubmit={form => {
                    onUpdateReportDraft({
                      companyDraft: {
                        name: form.name,
                        ...companyX,
                        address: {
                          postalCode: form.postalCode,
                          country: form.country.name,
                        }
                      }
                    })
                  }}/>
                ),
                [IsForeignCompany.Unknown]: () => (
                  <CompanyAskConsumerPostalCode onChange={postalCode => {
                    onUpdateReportDraft({
                      companyDraft: {
                        ...companyX,
                        address: {
                          postalCode,
                        }
                      }
                    })
                  }}/>
                ),
              })}
            </CompanyAskIsForeign>
          ),
        })}
      </CompanyIdentifyBy>
    )
  }
  return (
    <>
      {fnSwitch(draft.companyKind!, {
          [CompanyKinds.PHONE]: () => (
            <CompanyByPhone>
              {(phone) => commonTree({phone})}
            </CompanyByPhone>
          ),
          [CompanyKinds.WEBSITE]: () => (
            <CompanyByWebsite>
              {(website, result) => commonTree({website}, result)}
            </CompanyByWebsite>
          ),
        }, () => commonTree(),
      )}

    </>
  )
}
