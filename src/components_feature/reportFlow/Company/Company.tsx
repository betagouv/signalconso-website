'use client'
import {CompanyByStation} from '@/components_feature/reportFlow/Company/CompanyByStation'
import {CompanyByTrain} from '@/components_feature/reportFlow/Company/CompanyByTrain'
import {CompanySearchByName} from '@/components_feature/reportFlow/Company/CompanySearchByName'
import {NoSearchResult} from '@/components_feature/reportFlow/Company/lib/NoSearchResult'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {Loader} from '@/feature/Loader'
import {useBarcodeSearch} from '@/hooks/barcode'
import {ReportDraft2} from '@/model/ReportDraft2'
import {CommonCompanyIdentification, Step2Model} from '@/model/Step2Model'
import {useState} from 'react'
import {SpecificProductCompanyKind, SpecificWebsiteCompanyKind} from '../../../anomalies/Anomaly'
import {CompanySearchResult} from '../../../model/Company'
import {useReportFlowContext} from '../ReportFlowContext'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskConsumerStreet} from './CompanyAskConsumerStreet'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {CompanyAskIsFrenchOrForeign, IsAFrenchCompany} from './CompanyAskIsFrenchOrForeign'
import {CompanyByPhone} from './CompanyByPhone'
import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyChooseIdentificationMethod} from './CompanyChooseIdentificationMethod'
import {CompanyFilled} from './CompanyFilled'
import {CompanySearchByBarcode} from './CompanySearchByBarcode'
import {CompanySearchByIdentifier} from './CompanySearchByIdentifier'
import {CompanySearchByNameAndPostalCode} from './CompanySearchByNameAndPostalCode'
import {CompanySearchResultComponent} from './CompanySearchResultComponent'
import {CompanyWebsiteCountry} from './CompanyWebsiteCountry'
import {InfluencerBySocialNetwork} from './InfluencerBySocialNetwork'
import {InfluencerFilled} from './InfluencerFilled'
import {BarcodeSearchResult} from './lib/BarcodeSearchResult'

export function Company({stepNavigation}: {stepNavigation: StepNavigation}) {
  const {reportDraft, setReportDraft, sendReportEvent} = useReportFlowContext()
  const draft = reportDraft
  const {step2} = draft
  if (step2) {
    const onClear = () => setReportDraft(_ => ({..._, step2: undefined}))
    switch (step2.kind) {
      case 'influencer':
      case 'influencerOtherSocialNetwork':
        return <InfluencerFilled {...{stepNavigation, step2, onClear}} />
      default:
        return <CompanyFilled {...{stepNavigation, onClear}} draft={{step2, tags: draft.tags}} />
    }
  }
  return (
    <CompanyIdentificationDispatch
      draft={draft}
      updateReport={step2 => {
        setReportDraft(_ => ({
          ..._,
          step2,
        }))
        sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
      }}
    />
  )
}

type CommonProps = {
  draft: Partial<ReportDraft2>
  updateReport: (step2: Step2Model) => void
}

export function CompanyIdentificationDispatch({draft, updateReport}: CommonProps) {
  switch (draft.companyKind) {
    case 'TRAIN':
      return (
        <CompanyByTrain
          onSubmit={form => {
            updateReport({kind: 'train', train: form})
          }}
        />
      )
    case 'STATION':
      return (
        <CompanyByStation onSubmit={station => updateReport({kind: 'station', station})}>
          {() => (
            <CompanyIdentificationTree
              {...{draft}}
              onIdentification={companyIdentification => {
                updateReport({
                  kind: 'basic',
                  companyIdentification,
                })
              }}
              searchResults={undefined}
            />
          )}
        </CompanyByStation>
      )
    case 'PRODUCT':
      return <BarcodeTree {...{draft, updateReport}} specificProductCompanyKinds={'PRODUCT'} />
    case 'PRODUCT_POINT_OF_SALE':
      return <BarcodeTree {...{draft, updateReport}} specificProductCompanyKinds={'PRODUCT_POINT_OF_SALE'} />
    case 'PRODUCT_OPENFF':
      return <OpenFfTree {...{draft, updateReport}} />
    case 'PRODUCT_RAPPEL_CONSO':
      return <RappelConsoTree {...{draft, updateReport}} />
    case 'SOCIAL':
      return (
        <InfluencerBySocialNetwork
          onSubmit={result => {
            if (result.kind === 'otherSocialNetwork') {
              const {socialNetwork, influencer, otherSocialNetwork, postalCode} = result
              updateReport({
                kind: 'influencerOtherSocialNetwork',
                influencerName: influencer,
                socialNetwork,
                otherSocialNetwork,
                consumerPostalCode: postalCode,
              })
            } else {
              const {socialNetwork, influencer} = result
              updateReport({
                kind: 'influencer',
                socialNetwork,
                influencerName: influencer,
              })
            }
          }}
        />
      )
    case 'PHONE':
      return (
        <CompanyByPhone>
          {phone => (
            <CompanyIdentificationTree
              {...{draft, updateReport}}
              searchResults={undefined}
              onIdentification={companyIdentification =>
                updateReport(
                  phone
                    ? {
                        kind: 'phone',
                        companyIdentification,
                        phone,
                      }
                    : {kind: 'basic', companyIdentification},
                )
              }
            />
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
      return (
        <CompanyIdentificationTree
          {...{draft}}
          searchResults={undefined}
          onIdentification={companyIdentification =>
            updateReport({
              kind: 'basic',
              companyIdentification,
            })
          }
        />
      )
  }
}

function WebsiteTree({
  specificWebsiteCompanyKind,
  draft,
  updateReport,
}: {specificWebsiteCompanyKind?: SpecificWebsiteCompanyKind} & CommonProps) {
  return (
    <CompanyByWebsite specificWebsiteCompanyKind={specificWebsiteCompanyKind}>
      {(website, companies, countries) =>
        countries && website ? (
          <CompanyWebsiteCountry
            countries={countries}
            onSubmit={country => {
              updateReport({
                kind: 'website',
                website,
                companyIdentification: {
                  kind: 'foreignWebsiteWithJustCountry',
                  countryCode: country.code,
                },
              })
            }}
          />
        ) : (
          <CompanyIdentificationTree
            {...{draft, updateReport}}
            searchResults={companies}
            onIdentification={companyIdentification =>
              updateReport(
                website
                  ? {
                      kind: 'website',
                      website,
                      companyIdentification,
                    }
                  : {kind: 'basic', companyIdentification},
              )
            }
          />
        )
      }
    </CompanyByWebsite>
  )
}

function CompanyIdentificationTree({
  searchResults = undefined,
  draft,
  onIdentification,
}: {
  draft: Partial<ReportDraft2>
  searchResults: CompanySearchResult[] | undefined
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
  const companyKind = draft.companyKind
  if (!companyKind) {
    throw new Error('The draft should have a companyKind already')
  }
  return searchResults && searchResults.length > 0 ? (
    <CompanySearchResultComponent
      companies={searchResults}
      reportDraft={draft}
      onSubmit={(company, vendor) => {
        onIdentification(
          vendor
            ? {
                kind: 'marketplaceCompanyFound',
                company,
                vendor,
              }
            : {
                kind: 'companyFound',
                company,
              },
        )
      }}
    />
  ) : (
    <CompanyChooseIdentificationMethod {...{companyKind}}>
      {method => {
        switch (method) {
          case 'byNameAndPostalCode':
            return (
              <CompanySearchByNameAndPostalCode>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    reportDraft={draft}
                    onSubmit={company => {
                      onIdentification({
                        kind: 'companyFound',
                        company,
                      })
                    }}
                  />
                )}
              </CompanySearchByNameAndPostalCode>
            )
          case 'byName':
            return (
              <CompanySearchByName>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    reportDraft={draft}
                    onSubmit={company => {
                      onIdentification({
                        kind: 'companyFound',
                        company,
                      })
                    }}
                  />
                )}
              </CompanySearchByName>
            )
          case 'byIdentifier':
            return (
              <CompanySearchByIdentifier>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    reportDraft={draft}
                    onSubmit={company => {
                      onIdentification({
                        kind: 'companyFound',
                        company,
                      })
                    }}
                  />
                )}
              </CompanySearchByIdentifier>
            )
          case 'iCannot':
            if (draft.companyKind === 'LOCATION') {
              return (
                <CompanyAskConsumerStreet
                  onChange={({postalCode, street}) => {
                    onIdentification({
                      kind: 'consumerPreciseLocation',
                      consumerPostalCode: postalCode,
                      consumerStreet: street,
                    })
                  }}
                />
              )
            }
            return (
              <CompanyAskIsFrenchOrForeign>
                {isFrench => {
                  switch (isFrench) {
                    case IsAFrenchCompany.Yes:
                      return (
                        <CompanyAskConsumerPostalCode
                          {...{companyKind}}
                          onChange={postalCode => {
                            onIdentification({
                              kind: 'consumerLocation',
                              consumerPostalCode: postalCode,
                            })
                          }}
                        />
                      )
                    case IsAFrenchCompany.No:
                      return (
                        <CompanyAskForeignDetails
                          {...{companyKind}}
                          onSubmit={({name, postalCode, country: {code}}) => {
                            onIdentification({
                              kind: 'foreignCompany',
                              companyName: name,
                              companyCountryCode: code,
                              consumerPostalCode: postalCode,
                            })
                          }}
                        />
                      )
                    case IsAFrenchCompany.Unknown:
                      return (
                        <CompanyAskConsumerPostalCode
                          {...{companyKind}}
                          onChange={postalCode => {
                            onIdentification({
                              kind: 'consumerLocation',
                              consumerPostalCode: postalCode,
                            })
                          }}
                        />
                      )
                  }
                }}
              </CompanyAskIsFrenchOrForeign>
            )
        }
      }}
    </CompanyChooseIdentificationMethod>
  )
}

function BarcodeTree({
  specificProductCompanyKinds,
  draft,
  updateReport,
}: {
  specificProductCompanyKinds: SpecificProductCompanyKind
  draft: Partial<ReportDraft2>
  updateReport: (step2: Step2Model) => void
}) {
  return (
    <CompanySearchByBarcode searchProductOnly={specificProductCompanyKinds === 'PRODUCT_POINT_OF_SALE'}>
      {results => {
        if (results.kind === 'dont_know_barcode') {
          return (
            <CompanyIdentificationTree
              {...{draft}}
              searchResults={undefined}
              onIdentification={companyIdentification =>
                updateReport({
                  kind: 'basic',
                  companyIdentification,
                })
              }
            />
          )
        }
        const {product, company} = results
        return (
          <>
            <BarcodeSearchResult
              specificProductCompanyKinds={specificProductCompanyKinds}
              product={product}
              company={company}
              reportDraft={draft}
              onSubmit={(company, barcodeProduct) => {
                updateReport({
                  kind: 'product',
                  barcodeProduct,
                  companyIdentification: {
                    kind: 'companyFound',
                    company,
                  },
                })
              }}
            />
            {specificProductCompanyKinds === 'PRODUCT_POINT_OF_SALE' && (
              <div className="text-xl mb-4 pt-8">Nous avons maintenant besoin de connaitre le point de vente du produit.</div>
            )}
            {!company && (
              <CompanyIdentificationTree
                {...{draft}}
                onIdentification={companyIdentification => {
                  updateReport(
                    product
                      ? {
                          kind: 'product',
                          barcodeProduct: product,
                          companyIdentification,
                        }
                      : {
                          kind: 'basic',
                          companyIdentification,
                        },
                  )
                }}
                searchResults={undefined}
              />
            )}
          </>
        )
      }}
    </CompanySearchByBarcode>
  )
}

function OpenFfTree({draft, updateReport}: CommonProps) {
  const {company, product} = draft.openFf ?? {}
  // TODO bien tester le cas OPEN FF et comprendre ce qu'il s'y passe
  if (!product) {
    // We were not able to find the product with the barcode from OpenFF
    // Let's forget about it entirely and fallback on the regular search
    return (
      <CompanyIdentificationTree
        {...{draft}}
        searchResults={undefined}
        onIdentification={companyIdentification => updateReport({kind: 'basic', companyIdentification})}
      />
    )
  }
  return (
    <>
      <BarcodeSearchResult
        specificProductCompanyKinds={'PRODUCT'}
        product={product}
        company={company}
        reportDraft={draft}
        onSubmit={(company, barcodeProduct) => {
          updateReport({
            kind: 'product',
            barcodeProduct,
            companyIdentification: {
              kind: 'companyFound',
              company,
            },
          })
        }}
      />
      {!company && (
        <CompanyIdentificationTree
          {...{draft}}
          onIdentification={companyIdentification =>
            updateReport({
              kind: 'product',
              barcodeProduct: product,
              companyIdentification,
            })
          }
          searchResults={undefined}
        />
      )}
    </>
  )
}

function RappelConsoTree({draft, updateReport}: CommonProps) {
  const {data} = draft.rappelConso ?? {}
  if (!data || data.gtins.length === 0) {
    return <BarcodeTree {...{draft, updateReport}} specificProductCompanyKinds={'PRODUCT'} />
  } else if (data.gtins.length === 1) {
    return <RCOneBarcodeTree {...{draft, updateReport}} gtin={data.gtins[0]} />
  } else {
    return <RCMutlipleBarcodesTree {...{draft, updateReport}} gtins={data.gtins} />
  }
}

function RCOneBarcodeTree({draft, updateReport, gtin}: {gtin: string} & CommonProps) {
  const _search = useBarcodeSearch(gtin)
  const {product, company} = _search.data ?? {}

  if (_search.isFetching) {
    return <Loader />
  }
  return (
    <>
      <p>
        Numéro (GTIN) du code-barres du produit fourni par RappelConso : <span className="font-bold">{gtin}</span>
      </p>
      <BarcodeSearchResult
        specificProductCompanyKinds={'PRODUCT'}
        product={product}
        company={company}
        reportDraft={draft}
        onSubmit={(company, barcodeProduct) => {
          updateReport({
            kind: 'product',
            barcodeProduct,
            companyIdentification: {
              kind: 'companyFound',
              company,
            },
          })
        }}
        noResultsPanel={<RappelConsoBarcodeNotFoundInGS1 />}
      />
      {!company && (
        <CompanyIdentificationTree
          {...{draft}}
          onIdentification={companyIdentification => {
            updateReport(
              product
                ? {
                    kind: 'product',
                    barcodeProduct: product,
                    companyIdentification,
                  }
                : {
                    kind: 'basic',
                    companyIdentification,
                  },
            )
          }}
          searchResults={undefined}
        />
      )}
    </>
  )
}

function RCMutlipleBarcodesTree({draft, updateReport, gtins}: {gtins: string[]} & CommonProps) {
  const [selectedGtin, selectGtin] = useState<string | null>()
  const _search = useBarcodeSearch(selectedGtin ?? undefined)

  const optionsWithoutUnknown = gtins.map(gtin => {
    return {
      value: gtin,
      label: gtin,
    }
  })
  const options = [...optionsWithoutUnknown, {value: null, label: 'Je ne connais pas le code-barres'}]

  return (
    <>
      <p>Le produit rappelé concerne plusieurs codes-barres. Sélectionnez celui qui concerne votre lot</p>
      <ScRadioButtons
        title="Quel code-barres concerne votre produit ?"
        onChange={value => selectGtin(value)}
        value={selectedGtin}
        required={true}
        options={options}
      />
      {_search.isFetching ? (
        <Loader />
      ) : (
        <>
          {selectedGtin && (
            <BarcodeSearchResult
              specificProductCompanyKinds={'PRODUCT'}
              product={_search.data?.product}
              company={_search.data?.company}
              reportDraft={draft}
              onSubmit={(company, barcodeProduct) => {
                updateReport({
                  kind: 'product',
                  barcodeProduct,
                  companyIdentification: {
                    kind: 'companyFound',
                    company,
                  },
                })
              }}
              noResultsPanel={<RappelConsoBarcodeNotFoundInGS1 />}
            />
          )}
          {selectedGtin !== undefined && !_search.data?.company && (
            <CompanyIdentificationTree
              {...{draft}}
              onIdentification={companyIdentification => {
                const product = _search.data?.product
                updateReport(
                  product
                    ? {
                        kind: 'product',
                        barcodeProduct: product,
                        companyIdentification,
                      }
                    : {
                        kind: 'basic',
                        companyIdentification,
                      },
                )
              }}
              searchResults={undefined}
            />
          )}
        </>
      )}
    </>
  )
}

function RappelConsoBarcodeNotFoundInGS1() {
  return (
    <NoSearchResult text="Malheureusement, nous n'avons pas pu identifier automatiquement l'entreprise associée à ce code-barres." />
  )
}
