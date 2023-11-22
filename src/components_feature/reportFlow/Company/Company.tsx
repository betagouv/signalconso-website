'use client'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {Txt} from '../../../components_simple/Txt'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
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
import {BtnNext} from '@/components_simple/buttons/Buttons'
import {SpecificWebsiteCompanyKinds} from '../../../anomalies/Anomaly'
import {CompanySearchByBarcode} from './CompanySearchByBarcode'
import {BarcodeSearchResult} from './BarcodeSearchResult'
import {useI18n} from '@/i18n/I18n'
import {Panel, PanelBody} from '@/components_simple/Panel'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {Row} from '@/components_simple/Row'
import {ReportDraft2} from '@/model/ReportDraft2'
import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {AddressComponent} from '@/components_simple/Address'

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
        _reportFlow.sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
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
    <div>
      <h2 className="fr-h6">{m.influencerIdentifiedTitle}</h2>
      <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} gray className="mb-2" />
      <div className="flex gap-2 pl-1">
        <i className="ri-account-box-line" />
        <span className="text-schint">{draft.influencer.name}</span>
      </div>
      <ActionButtons {...{onClear, stepNavigation}} />
    </div>
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
          {draft.companyDraft.name}
        </Txt>

        {draft.companyDraft.brand && (
          <Txt bold block sx={{mb: 2, fontStyle: 'italic'}}>
            {draft.companyDraft.brand}
          </Txt>
        )}

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
      <ActionButtons {...{onClear, stepNavigation}} />
    </Panel>
  )
}

function ActionButtons({onClear, stepNavigation}: {onClear: () => void; stepNavigation: StepNavigation}) {
  const {m} = useI18n()
  return (
    <div className="flex items-center justify-end gap-2">
      <Button iconId={'fr-icon-pencil-line'} onClick={onClear} priority="secondary">
        {m.edit}
      </Button>
      <BtnNext onClick={stepNavigation.next} />
    </div>
  )
}

export const _Company = ({draft, onUpdateReportDraft}: CompanyWithRequiredProps) => {
  const webSiteTree = (specificWebsiteCompanyKind?: SpecificWebsiteCompanyKinds) => {
    return (
      <CompanyByWebsite specificWebsiteCompanyKind={specificWebsiteCompanyKind}>
        {(website, companies, countries) =>
          countries ? (
            <CompanyWebsiteCountry
              countries={countries}
              onSubmit={country => {
                onUpdateReportDraft({
                  companyDraft: {
                    website,
                    address: {
                      country: country.code,
                    },
                  },
                })
              }}
            />
          ) : (
            commonTree({website}, undefined, companies)
          )
        }
      </CompanyByWebsite>
    )
  }

  const barcodeTree = () => {
    return (
      <CompanySearchByBarcode>
        {(product, company, skipped) =>
          skipped ? (
            commonTree()
          ) : (
            <>
              <BarcodeSearchResult
                product={product}
                company={company}
                onSubmit={(company, product) => {
                  onUpdateReportDraft({
                    companyDraft: {
                      ...company,
                    },
                    barcodeProductId: product.id,
                  })
                }}
              />
              {!company && commonTree({}, product?.id, undefined)}
            </>
          )
        }
      </CompanySearchByBarcode>
    )
  }

  const commonTree = (
    phoneOrWebsite: Pick<CompanyDraft, 'phone' | 'website'> = {},
    barcodeProductId: string | undefined = undefined,
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
                        barcodeProductId,
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
                        barcodeProductId,
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
                      barcodeProductId,
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
                          onChange={postalCode => {
                            onUpdateReportDraft({
                              companyDraft: {
                                ...phoneOrWebsite,
                                address: {
                                  postalCode: postalCode,
                                },
                              },
                              barcodeProductId,
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
                                  country: form.country.code,
                                },
                              },
                              barcodeProductId,
                            })
                          }}
                        />
                      ),
                      [IsForeignCompany.Unknown]: () => (
                        <CompanyAskConsumerPostalCode
                          companyKind={draft.companyKind!}
                          onChange={postalCode => {
                            onUpdateReportDraft({
                              companyDraft: {
                                ...phoneOrWebsite,
                                address: {
                                  postalCode,
                                },
                              },
                              barcodeProductId,
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
    <div>
      {fnSwitch(
        draft.companyKind!,
        {
          ['PRODUCT']: () => barcodeTree(),
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
          ['TRANSPORTER_WEBSITE']: () => webSiteTree('TRANSPORTER_WEBSITE'),
          ['MERCHANT_WEBSITE']: () => webSiteTree('MERCHANT_WEBSITE'),
          ['WEBSITE']: () => webSiteTree(),
        },
        () => commonTree(),
      )}
    </div>
  )
}
