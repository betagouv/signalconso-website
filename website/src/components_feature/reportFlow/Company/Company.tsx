'use client'
import {CompanyByStation} from '@/components_feature/reportFlow/Company/CompanyByStation'
import {CompanyByTrain} from '@/components_feature/reportFlow/Company/CompanyByTrain'
import {CompanySearchByName} from '@/components_feature/reportFlow/Company/CompanySearchByName'
import {NoSearchResult} from '@/components_feature/reportFlow/Company/lib/NoSearchResult'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {appConfig} from '@/core/appConfig'
import {Loader} from '@/feature/Loader'
import {getCompanyKind, hasStep0, hasStep1Full, hasStep2, isTransmittableToPro} from '@/feature/reportUtils'
import {useBarcodeSearch} from '@/hooks/barcode'
import {Report} from '@/model/Report'
import {CommonCompanyIdentification, Step2Model} from '@/model/Step2Model'
import {useState} from 'react'
import {SpecificProductCompanyKind, SpecificWebsiteCompanyKind} from 'shared/anomalies/Anomaly'
import {CompanySearchResult} from '../../../model/Company'
import {PartialReport, useReportFlowContext} from '../ReportFlowContext'
import {StepNavigation} from '../reportFlowStepper/ReportFlowStepper'
import {CompanyAskConsumerPostalCode} from './CompanyAskConsumerPostalCode'
import {CompanyAskForeignDetails} from './CompanyAskForeignDetails'
import {CompanyByPhone} from './CompanyByPhone'
import {CompanyByWebsite} from './CompanyByWebsite'
import {CompanyChooseIdentificationMethod} from './CompanyChooseIdentificationMethod'
import {CompanyFilled} from './CompanyFilled'
import {CompanySearchByBarcode} from './CompanySearchByBarcode'
import {CompanySearchByIdentifier} from './CompanySearchByIdentifier'
import {CompanySearchByNameAndGeoArea} from './CompanySearchByNameAndGeoArea'
import {CompanySearchResultComponent} from './CompanySearchResultComponent'
import {CompanySmartIdentification} from './CompanySmartIdentification/CompanySmartIdentification'
import {CompanyWebsiteCountry} from './CompanyWebsiteCountry'
import {InfluencerBySocialNetwork} from './InfluencerBySocialNetwork'
import {InfluencerFilled} from './InfluencerFilled'
import {BarcodeSearchResult} from './lib/BarcodeSearchResult'

export function Company({stepNavigation}: {stepNavigation: StepNavigation}) {
  const {report, setReport, sendStep2ValidationEvent} = useReportFlowContext()
  const draft = report
  if (!hasStep0(draft) || !hasStep1Full(draft)) {
    throw new Error(`The draft is not ready to display Company step`)
  }
  if (hasStep2(draft)) {
    const {step2} = draft
    const onClear = () => setReport(_ => ({..._, step2: undefined}))
    switch (step2.kind) {
      case 'influencer':
      case 'influencerOtherSocialNetwork':
        return <InfluencerFilled {...{stepNavigation, step2, onClear}} />
      default:
        return <CompanyFilled {...{stepNavigation, onClear}} draft={draft} />
    }
  }
  return (
    <CompanyIdentificationDispatch
      draft={draft}
      updateReport={step2 => {
        setReport(_ => ({
          ..._,
          step2,
        }))
        sendStep2ValidationEvent(step2)
        stepNavigation.next()
      }}
    />
  )
}

type CommonProps = {
  draft: Pick<Report, 'step0' | 'step1'>
  updateReport: (step2: Step2Model) => void
}

export function CompanyIdentificationDispatch({draft, updateReport}: CommonProps) {
  switch (getCompanyKind(draft)) {
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
  draft: PartialReport & Pick<Report, 'step0' | 'step1'>
  searchResults: CompanySearchResult[] | undefined
  onIdentification: (_: CommonCompanyIdentification) => void
}) {
  const companyKind = getCompanyKind(draft)
  const reportTransmittableToPro = isTransmittableToPro(draft)
  return searchResults && searchResults.length > 0 ? (
    <CompanySearchResultComponent
      companies={searchResults}
      report={draft}
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
  ) : appConfig.useNewCompanySearch ? (
    <CompanySmartIdentification {...{draft, onIdentification}} />
  ) : (
    <CompanyChooseIdentificationMethod {...{companyKind}}>
      {method => {
        switch (method) {
          case 'byNameAndGeoArea':
            return (
              <CompanySearchByNameAndGeoArea>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    report={draft}
                    onSubmit={company => {
                      onIdentification({
                        kind: 'companyFound',
                        company,
                      })
                    }}
                  />
                )}
              </CompanySearchByNameAndGeoArea>
            )
          case 'byName':
            return (
              <CompanySearchByName>
                {companies => (
                  <CompanySearchResultComponent
                    companies={companies ?? []}
                    report={draft}
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
                    report={draft}
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
          case 'itIsForeign':
            return (
              <CompanyAskForeignDetails
                {...{companyKind, reportTransmittableToPro}}
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
  draft: PartialReport & Pick<Report, 'step1' | 'step0'>
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
              report={draft}
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
  const {company, product} = draft.step1.openFf ?? {}
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
        report={draft}
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
  const {data} = draft.step1.rappelConso ?? {}
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
        report={draft}
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
              report={draft}
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
