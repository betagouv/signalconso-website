import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {AddressComponent} from 'components_simple/Address/Address'
import {ScButton} from 'components_simple/Button/Button'
import {Panel, PanelActions, PanelBody} from 'components_simple/Panel/Panel'
import {StepNavigation} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {StepperActionsNext} from 'components_simple/ReportFlowStepper/StepperActionsNext'
import {Row} from 'components_simple/Row/Row'
import {useI18n} from 'i18n/I18n'
import {ReportDraft2} from 'model/ReportDraft2'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {CompanySearchResult} from '../../../model/Company'
import {CompanyDraft, ReportDraft} from '../../../model/ReportDraft'
import {fnSwitch} from '../../../utils/FnSwitch'
import {DeepPartial} from '../../../utils/utils'
import {useReportFlowContext} from '../ReportFlowContext'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskConsumerStreet} from './CompanyAskConsumerStreet'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {CompanyAskIsForeign, IsForeignCompany} from './CompanyAskIsForeign'
import {CompanyByPhone} from './CompanyByPhone'
import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {CompanySearchByIdentity} from './CompanySearchByIdentity'
import {CompanySearchByNameAndPostalCode} from './CompanySearchByNameAndPostalCode'
import {CompanySearchResultComponent} from './CompanySearchResult'
import {CompanyWebsiteCountry} from './CompanyWebsiteCountry'
import {InfluencerBySocialNetwork} from './InfluencerBySocialNetwork'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow/SocialNetworkRow'

interface CompanyWithRequiredProps {
  draft: Pick<ReportDraft, 'companyKind'>
  onUpdateReportDraft: (_: DeepPartial<ReportDraft2>) => void
}

export const Company = ({stepNavigation}: {stepNavigation: StepNavigation}) => {
  const _analytic = useAnalyticContext()
  const _reportFlow = useReportFlowContext()

  const draft = _reportFlow.reportDraft
  if (draft.influencer) {
    return (
      <InfluencerFilled
        {...{stepNavigation, draft}}
        onClear={() => _reportFlow.setReportDraft(_ => ({..._, influencer: undefined}))}
      />
    )
  }
  if (draft.companyDraft) {
    return (
      <CompanyFilled
        {...{stepNavigation, draft}}
        onClear={() => _reportFlow.setReportDraft(_ => ({..._, companyDraft: undefined}))}
      />
    )
  }
  return (
    <_Company
      draft={draft}
      onUpdateReportDraft={draft => {
        _reportFlow.setReportDraft(_ => ReportDraft2.merge(_, draft))
        stepNavigation.next()
        _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCompany)
      }}
    />
  )
}

export const InfluencerFilled = ({
  draft,
  onClear,
  stepNavigation,
}: {
  draft: Partial<ReportDraft2>
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  if (!draft.influencer) {
    throw new Error(`influencer should be defined ${JSON.stringify(draft)}`)
  }

  return (
    <Panel title="Influenceur identifié">
      <PanelBody>
        <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} />
        <Row dense icon="portrait">
          <Txt color="hint">{draft.influencer.name}</Txt>
        </Row>
      </PanelBody>
      <PanelActions>
        <ScButton color="primary" variant="outlined" onClick={onClear} icon="edit">
          {m.edit}
        </ScButton>
        <StepperActionsNext onClick={stepNavigation.next} />
      </PanelActions>
    </Panel>
  )
}

export const CompanyFilled = ({
  draft,
  onClear,
  stepNavigation,
}: {
  draft: Partial<ReportDraft2>
  onClear: () => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  if (!draft.companyDraft) {
    throw new Error(`companyDraft should be defined ${JSON.stringify(draft)}`)
  }
  return (
    <Panel title={m.companyIdentifiedTitle}>
      <PanelBody>
        <Txt size="big" bold block>
          {draft.companyDraft.name} {draft.companyDraft.brand ?? ''}
        </Txt>

        {draft.companyDraft.siret && (
          <Txt color="hint" block sx={{mb: 2}}>
            <Txt>SIRET:&nbsp;</Txt>
            <Txt bold>{draft.companyDraft.siret}</Txt>
          </Txt>
        )}
        {draft.companyDraft.siret && (
          <Row dense icon="location_on">
            <Txt color="hint">
              <AddressComponent address={draft.companyDraft.address} />
            </Txt>
          </Row>
        )}
        {draft.companyDraft.website && (
          <Row dense icon="link">
            <Txt color="hint">{draft.companyDraft.website}</Txt>
          </Row>
        )}
        {draft.companyDraft.phone && (
          <Row dense icon="phone">
            <Txt color="hint">{draft.companyDraft.phone}</Txt>
          </Row>
        )}
      </PanelBody>
      <PanelActions>
        <ScButton color="primary" variant="outlined" onClick={onClear} icon="edit">
          {m.edit}
        </ScButton>
        <StepperActionsNext onClick={stepNavigation.next} />
      </PanelActions>
    </Panel>
  )
}

export const _Company = ({draft, onUpdateReportDraft}: CompanyWithRequiredProps) => {
  const commonTree = (
    phoneOrWebsite: Pick<CompanyDraft, 'phone' | 'website'> = {},
    result: CompanySearchResult[] | undefined = undefined,
  ) => {
    return result && result.length > 0 ? (
      <CompanySearchResultComponent
        companies={result}
        onSubmit={(company, vendor) => {
          onUpdateReportDraft({
            companyDraft: {
              ...company,
              ...phoneOrWebsite,
            },
            vendor,
          })
        }}
      />
    ) : (
      <CompanyIdentifyBy companyKind={draft.companyKind!}>
        {identifyBy =>
          fnSwitch(identifyBy, {
            [IdentifyBy.NAME]: () => (
              <CompanySearchByNameAndPostalCode>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    onSubmit={company => {
                      onUpdateReportDraft({
                        companyDraft: {
                          ...company,
                          ...phoneOrWebsite,
                        },
                      })
                    }}
                  />
                )}
              </CompanySearchByNameAndPostalCode>
            ),
            [IdentifyBy.IDENTITY]: () => (
              <CompanySearchByIdentity>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    onSubmit={company => {
                      onUpdateReportDraft({
                        companyDraft: {
                          ...company,
                          ...phoneOrWebsite,
                        },
                      })
                    }}
                  />
                )}
              </CompanySearchByIdentity>
            ),
            [IdentifyBy.NONE]: () =>
              draft.companyKind === 'LOCATION' ? (
                <CompanyAskConsumerStreet
                  onChange={form => {
                    onUpdateReportDraft({
                      companyDraft: {
                        ...phoneOrWebsite,
                        address: {
                          postalCode: form.postalCode,
                          street: form.street,
                        },
                      },
                    })
                  }}
                />
              ) : (
                <CompanyAskIsForeign>
                  {isForeign =>
                    fnSwitch(isForeign, {
                      [IsForeignCompany.Yes]: () => (
                        <CompanyAskConsumerPostalCode
                          companyKind={draft.companyKind!}
                          onChange={form => {
                            onUpdateReportDraft({
                              companyDraft: {
                                ...phoneOrWebsite,
                                address: {
                                  postalCode: form.postalCode,
                                },
                              },
                            })
                          }}
                        />
                      ),
                      [IsForeignCompany.No]: () => (
                        <CompanyAskForeignDetails
                          companyKind={draft.companyKind!}
                          onSubmit={form => {
                            onUpdateReportDraft({
                              companyDraft: {
                                name: form.name,
                                ...phoneOrWebsite,
                                address: {
                                  postalCode: form.postalCode,
                                  country: form.country.name,
                                },
                              },
                            })
                          }}
                        />
                      ),
                      [IsForeignCompany.Unknown]: () => (
                        <CompanyAskConsumerPostalCode
                          companyKind={draft.companyKind!}
                          onChange={form => {
                            onUpdateReportDraft({
                              companyDraft: {
                                ...phoneOrWebsite,
                                address: {
                                  postalCode: form.postalCode,
                                },
                              },
                            })
                          }}
                        />
                      ),
                    })
                  }
                </CompanyAskIsForeign>
              ),
          })
        }
      </CompanyIdentifyBy>
    )
  }
  return (
    <>
      {fnSwitch(
        draft.companyKind!,
        {
          ['SOCIAL']: () => (
            <InfluencerBySocialNetwork
              onSubmit={(socialNetwork, influencer) => {
                onUpdateReportDraft({
                  influencer: {
                    socialNetwork,
                    name: influencer,
                  },
                })
              }}
            />
          ),
          ['PHONE']: () => <CompanyByPhone>{phone => commonTree({phone})}</CompanyByPhone>,
          ['WEBSITE']: () => (
            <CompanyByWebsite>
              {(website, companies, countries) =>
                countries ? (
                  <CompanyWebsiteCountry
                    countries={countries}
                    onSubmit={country => {
                      onUpdateReportDraft({
                        companyDraft: {
                          website,
                          address: {
                            country,
                          },
                        },
                      })
                    }}
                  />
                ) : (
                  commonTree({website}, companies)
                )
              }
            </CompanyByWebsite>
          ),
        },
        () => commonTree(),
      )}
    </>
  )
}
