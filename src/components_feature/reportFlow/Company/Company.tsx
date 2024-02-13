'use client'
import {CompanyByTrain} from '@/components_feature/reportFlow/Company/CompanyByTrain'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {ReportDraft2} from '@/model/ReportDraft2'
import {SpecificWebsiteCompanyKinds} from '../../../anomalies/Anomaly'
import {CompanyDraft, CompanySearchResult} from '../../../model/Company'
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
    <div>
      <CompanyIdentificationDispatch
        draft={draft}
        updateReport={changesToDraft => {
          setReportDraft(_ => ReportDraft2.merge(_, changesToDraft))
          sendReportEvent(stepNavigation.currentStep)
          stepNavigation.next()
        }}
      />
    </div>
  )
}

type CommonProps = {
  draft: Partial<ReportDraft2>
  // Takes a deep partial, so you can fill just some fields
  // Those fields will be merged with the current report draft
  updateReport: (changesToDraft: DeepPartial<ReportDraft2>) => void
}

export function CompanyIdentificationDispatch({draft, updateReport}: CommonProps) {
  switch (draft.companyKind) {
    case 'TRAIN':
      return (
        <CompanyByTrain
          onSubmit={(train, ter) => {
            updateReport({
              train: {
                train,
                ter,
              },
            })
          }}
        />
      )
    case 'PRODUCT':
      return <BarcodeTree {...{draft, updateReport}} />
    case 'PRODUCT_OPENFF':
      return <OpenFfTree {...{draft, updateReport}} />

    case 'SOCIAL':
      return (
        <InfluencerBySocialNetwork
          onSubmit={(socialNetwork, influencer, otherSocialNetwork, postalCode) => {
            const companyDraft = postalCode
              ? {
                  address: {
                    postalCode,
                  },
                }
              : undefined
            updateReport({
              companyDraft,
              influencer: {
                socialNetwork,
                otherSocialNetwork,
                name: influencer,
              },
            })
          }}
        />
      )
    case 'PHONE':
      return (
        <CompanyByPhone>
          {phone => (
            <CommonTree {...{draft, updateReport}} phoneOrWebsite={{phone}} barcodeProduct={undefined} result={undefined} />
          )}
        </CompanyByPhone>
      )
    case 'TRANSPORTER_WEBSITE':
      return <WebsiteTree {...{draft, updateReport}} specificWebsiteCompanyKind={'TRANSPORTER_WEBSITE'} />
    case 'MERCHANT_WEBSITE':
      return <WebsiteTree {...{draft, updateReport}} specificWebsiteCompanyKind={'MERCHANT_WEBSITE'} />
    case 'WEBSITE':
      return <WebsiteTree {...{draft, updateReport}} specificWebsiteCompanyKind={undefined} />
    default:
      return <CommonTree {...{draft, updateReport}} phoneOrWebsite={undefined} barcodeProduct={undefined} result={undefined} />
  }
}

function WebsiteTree({
  specificWebsiteCompanyKind,
  draft,
  updateReport,
}: {specificWebsiteCompanyKind?: SpecificWebsiteCompanyKinds} & CommonProps) {
  return (
    <CompanyByWebsite specificWebsiteCompanyKind={specificWebsiteCompanyKind}>
      {(website, companies, countries) =>
        countries ? (
          <CompanyWebsiteCountry
            countries={countries}
            onSubmit={country => {
              updateReport({
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
          <CommonTree {...{draft, updateReport}} phoneOrWebsite={{website}} barcodeProduct={undefined} result={companies} />
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
  updateReport,
}: {
  phoneOrWebsite: Pick<CompanyDraft, 'phone' | 'website'> | undefined
  barcodeProduct: BarcodeProduct | undefined
  result: CompanySearchResult[] | undefined
} & CommonProps) {
  return result && result.length > 0 ? (
    <CompanySearchResultComponent
      companies={result}
      onSubmit={(company, vendor) => {
        updateReport({
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
                    updateReport({
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
                    updateReport({
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
                  updateReport({
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
                          updateReport({
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
                          updateReport({
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
                          updateReport({
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

function BarcodeTree({draft, updateReport}: CommonProps) {
  return (
    <CompanySearchByBarcode>
      {results => {
        if (results.kind === 'dont_know_barcode') {
          return (
            <CommonTree {...{draft, updateReport}} phoneOrWebsite={undefined} barcodeProduct={undefined} result={undefined} />
          )
        }
        const {product, company} = results
        return (
          <>
            <BarcodeSearchResult
              product={product}
              company={company}
              onSubmit={(company, barcodeProduct) => {
                updateReport({
                  companyDraft: {
                    ...company,
                  },
                  barcodeProduct,
                })
              }}
            />
            {!company && (
              <CommonTree {...{draft, updateReport}} phoneOrWebsite={undefined} barcodeProduct={product} result={undefined} />
            )}
          </>
        )
      }}
    </CompanySearchByBarcode>
  )
}

function OpenFfTree({draft, updateReport}: CommonProps) {
  const {company, product} = draft.openFf ?? {}
  if (!product) {
    // We were not able to find the product with the barcode from OpenFF
    // Let's forget about it entirely and fallback on the regular search
    return <CommonTree {...{draft, updateReport}} phoneOrWebsite={undefined} barcodeProduct={undefined} result={undefined} />
  }
  return (
    <>
      <BarcodeSearchResult
        product={product}
        company={company}
        onSubmit={(company, barcodeProduct) => {
          updateReport({
            companyDraft: company,
            barcodeProduct,
          })
        }}
      />
      {!company && (
        <CommonTree
          {...{draft}}
          updateReport={changesToDraft => {
            updateReport({
              ...changesToDraft,
              // we also want to keep the product
              barcodeProduct: product,
            })
          }}
          phoneOrWebsite={undefined}
          barcodeProduct={undefined}
          result={undefined}
        />
      )}
    </>
  )
}
