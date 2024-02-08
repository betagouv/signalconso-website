'use client'
import {CompanyByTrain} from '@/components_feature/reportFlow/Company/CompanyByTrain'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {ReportDraft2} from '@/model/ReportDraft2'
import {SpecificWebsiteCompanyKinds} from '../../../anomalies/Anomaly'
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
import {CompanyFilled} from './CompanyFilled'
import {CompanyIdentifyBy, IdentifyBy} from './CompanyIdentifyBy'
import {CompanySearchByBarcode} from './CompanySearchByBarcode'
import {CompanySearchByIdentity} from './CompanySearchByIdentity'
import {CompanySearchByNameAndPostalCode} from './CompanySearchByNameAndPostalCode'
import {CompanySearchResultComponent} from './CompanySearchResult'
import {CompanyWebsiteCountry} from './CompanyWebsiteCountry'
import {InfluencerBySocialNetwork} from './InfluencerBySocialNetwork'
import {InfluencerFilled} from './InfluencerFilled'
import {BarcodeSearchResult} from './lib/BarcodeSearchResult'

export function Company({stepNavigation}: {stepNavigation: StepNavigation}) {
  const {reportDraft, setReportDraft, sendReportEvent} = useReportFlowContext()

  const draft = reportDraft
  if (draft.influencer) {
    return <InfluencerFilled {...{stepNavigation, draft}} onClear={() => setReportDraft(_ => ({..._, influencer: undefined}))} />
  }

  if (draft.companyDraft) {
    return <CompanyFilled {...{stepNavigation, draft}} onClear={() => setReportDraft(_ => ({..._, companyDraft: undefined}))} />
  }
  return (
    <CompanyIdentification
      draft={draft}
      onUpdateReportDraft={draft => {
        setReportDraft(_ => ReportDraft2.merge(_, draft))
        sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
      }}
    />
  )
}

function WebsiteTree({
  specificWebsiteCompanyKind,
  draft,
  onUpdateReportDraft,
}: {specificWebsiteCompanyKind?: SpecificWebsiteCompanyKinds} & BasicProps) {
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
          <CommonTree
            {...{draft, onUpdateReportDraft}}
            phoneOrWebsite={{website}}
            barcodeProduct={undefined}
            result={companies}
          />
        )
      }
    </CompanyByWebsite>
  )
}

function CommonTree({
  phoneOrWebsite = {},
  barcodeProduct = undefined,
  result = undefined,
  draft,
  onUpdateReportDraft,
}: {
  phoneOrWebsite: Pick<CompanyDraft, 'phone' | 'website'> | undefined
  barcodeProduct: BarcodeProduct | undefined
  result: CompanySearchResult[] | undefined
} & BasicProps) {
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

type BasicProps = {
  draft: Pick<ReportDraft, 'companyKind'>
  onUpdateReportDraft: (_: DeepPartial<ReportDraft2>) => void
}

export function CompanyIdentification({
  draft,
  onUpdateReportDraft,
}: {
  draft: Pick<ReportDraft, 'companyKind'>
  onUpdateReportDraft: (_: DeepPartial<ReportDraft2>) => void
}) {
  const barcodeTree = () => {
    return (
      <CompanySearchByBarcode>
        {(barcodeProduct, company, skipped) =>
          skipped ? (
            <CommonTree
              {...{draft, onUpdateReportDraft}}
              phoneOrWebsite={undefined}
              barcodeProduct={undefined}
              result={undefined}
            />
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
              {!company && (
                <CommonTree
                  {...{draft, onUpdateReportDraft}}
                  phoneOrWebsite={undefined}
                  barcodeProduct={barcodeProduct}
                  result={undefined}
                />
              )}
            </>
          )
        }
      </CompanySearchByBarcode>
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
              onSubmit={(socialNetwork, influencer, otherSocialNetwork) => {
                onUpdateReportDraft({
                  influencer: {
                    socialNetwork,
                    otherSocialNetwork,
                    name: influencer,
                  },
                })
              }}
            />
          ),
          ['PHONE']: () => (
            <CompanyByPhone>
              {phone => (
                <CommonTree
                  {...{draft, onUpdateReportDraft}}
                  phoneOrWebsite={{phone}}
                  barcodeProduct={undefined}
                  result={undefined}
                />
              )}
            </CompanyByPhone>
          ),
          ['TRANSPORTER_WEBSITE']: () => (
            <WebsiteTree {...{draft, onUpdateReportDraft}} specificWebsiteCompanyKind={'TRANSPORTER_WEBSITE'} />
          ),
          ['MERCHANT_WEBSITE']: () => (
            <WebsiteTree {...{draft, onUpdateReportDraft}} specificWebsiteCompanyKind={'MERCHANT_WEBSITE'} />
          ),
          ['WEBSITE']: () => <WebsiteTree {...{draft, onUpdateReportDraft}} specificWebsiteCompanyKind={undefined} />,
        },
        () => (
          <CommonTree
            {...{draft, onUpdateReportDraft}}
            phoneOrWebsite={undefined}
            barcodeProduct={undefined}
            result={undefined}
          />
        ),
      )}
    </div>
  )
}
