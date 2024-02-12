'use client'
import {CompanyByTrain} from '@/components_feature/reportFlow/Company/CompanyByTrain'
import {CompanyRecapWithProduct} from '@/components_simple/CompanyRecap/CompanyRecap'
import {BtnNext} from '@/components_simple/buttons/Buttons'
import {useI18n} from '@/i18n/I18n'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {ReportDraft2} from '@/model/ReportDraft2'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {SpecificWebsiteCompanyKinds} from '../../../anomalies/Anomaly'
import {SocialNetworkRow} from '../../../components_simple/SocialNetworkRow'
import {CompanyDraft, CompanySearchResult} from '../../../model/Company'
import {ReportDraft} from '../../../model/ReportDraft'
import {fnSwitch} from '../../../utils/FnSwitch'
import {DeepPartial} from '../../../utils/utils'
import {useReportFlowContext} from '../ReportFlowContext'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskConsumerStreet} from './CompanyAskConsumerStreet'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {CompanyAskIsFrenchOrForeign, IsAFrenchCompany} from './CompanyAskIsFrenchOrForeign'
import {CompanyByPhone} from './CompanyByPhone'
import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {CompanySearchByBarcode} from './CompanySearchByBarcode'
import {CompanySearchByIdentity} from './CompanySearchByIdentity'
import {CompanySearchByNameAndPostalCode} from './CompanySearchByNameAndPostalCode'
import {CompanySearchResultComponent} from './CompanySearchResult'
import {CompanyWebsiteCountry} from './CompanyWebsiteCountry'
import {InfluencerBySocialNetwork} from './InfluencerBySocialNetwork'
import {BarcodeSearchResult} from './lib/BarcodeSearchResult'

interface CompanyWithRequiredProps {
  draft: Pick<ReportDraft, 'companyKind'>
  onUpdateReportDraft: (_: DeepPartial<ReportDraft2>) => void
}

export const Company = ({stepNavigation}: {stepNavigation: StepNavigation}) => {
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
      {draft.influencer.otherSocialNetwork ? (
        <div className="flex">
          <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} gray className="mb-2" />
          <span className="text-gray-500 font-bold"> : {draft.influencer.otherSocialNetwork}</span>
        </div>
      ) : (
        <SocialNetworkRow socialNetwork={draft.influencer.socialNetwork} gray className="mb-2" />
      )}
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
    <div>
      <h2 className="fr-h6">{m.companyIdentifiedTitle}</h2>
      <CompanyRecapWithProduct company={draft.companyDraft} kind="companyDraft" barcodeProduct={draft.barcodeProduct} />
      <ActionButtons {...{onClear, stepNavigation}} />
    </div>
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
        {(barcodeProduct, company, skipped) =>
          skipped ? (
            commonTree()
          ) : (
            <>
              <BarcodeSearchResult
                product={barcodeProduct}
                company={company}
                onSubmit={(company, barcodeProduct) => {
                  onUpdateReportDraft({
                    companyDraft: {
                      ...company,
                    },
                    barcodeProduct,
                  })
                }}
              />
              {!company && commonTree({}, barcodeProduct, undefined)}
            </>
          )
        }
      </CompanySearchByBarcode>
    )
  }

  const commonTree = (
    phoneOrWebsite: Pick<CompanyDraft, 'phone' | 'website'> = {},
    barcodeProduct: BarcodeProduct | undefined = undefined,
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
                        barcodeProduct,
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
                        barcodeProduct,
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
                      barcodeProduct,
                    })
                  }}
                />
              ) : (
                <CompanyAskIsFrenchOrForeign>
                  {isFrench =>
                    fnSwitch(isFrench, {
                      [IsAFrenchCompany.Yes]: () => (
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
                              barcodeProduct,
                            })
                          }}
                        />
                      ),
                      [IsAFrenchCompany.No]: () => (
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
                              barcodeProduct,
                            })
                          }}
                        />
                      ),
                      [IsAFrenchCompany.Unknown]: () => (
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
                              barcodeProduct,
                            })
                          }}
                        />
                      ),
                    })
                  }
                </CompanyAskIsFrenchOrForeign>
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
          ['TRAIN']: () => (
            <CompanyByTrain
              onSubmit={(train, ter) => {
                onUpdateReportDraft({
                  train: {
                    train,
                    ter,
                  },
                })
              }}
            />
          ),
          ['PRODUCT']: () => barcodeTree(),
          ['SOCIAL']: () => (
            <InfluencerBySocialNetwork
              onSubmit={(socialNetwork, influencer, otherSocialNetwork, postalCode) => {
                const companyDraft = postalCode
                  ? {
                      address: {
                        postalCode,
                      },
                    }
                  : undefined
                onUpdateReportDraft({
                  companyDraft,
                  influencer: {
                    socialNetwork,
                    otherSocialNetwork,
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
