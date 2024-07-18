'use client'
import {CompanyByStation} from '@/components_feature/reportFlow/Company/CompanyByStation'
import {CompanyByTrain} from '@/components_feature/reportFlow/Company/CompanyByTrain'
import {CompanySearchByName} from '@/components_feature/reportFlow/Company/CompanySearchByName'
import {NoSearchResult} from '@/components_feature/reportFlow/Company/lib/NoSearchResult'
import {ScRadioButtons} from '@/components_simple/formInputs/ScRadioButtons'
import {Loader} from '@/feature/Loader'
import {useBarcodeSearch} from '@/hooks/barcode'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {ReportDraft2} from '@/model/ReportDraft2'
import {useState} from 'react'
import {SpecificProductCompanyKind, SpecificWebsiteCompanyKind} from '../../../anomalies/Anomaly'
import {CompanySearchResult} from '../../../model/Company'
import {DeepPartial} from '../../../utils/utils'
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
    <CompanyIdentificationDispatch
      draft={draft}
      updateReport={changesToDraft => {
        setReportDraft(_ => ReportDraft2.merge(_, changesToDraft))
        sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
      }}
    />
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
          onSubmit={form => {
            updateReport({train: form})
          }}
        />
      )
    case 'STATION':
      return (
        <CompanyByStation onSubmit={station => updateReport({station})}>
          {() => <CommonTree {...{draft, updateReport}} result={undefined} />}
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
                companyDraft: {
                  address: {
                    postalCode: postalCode,
                  },
                },
                influencer: {
                  socialNetwork,
                  otherSocialNetwork,
                  name: influencer,
                },
              })
            } else {
              const {socialNetwork, influencer} = result
              updateReport({
                influencer: {
                  socialNetwork,
                  name: influencer,
                },
              })
            }
          }}
        />
      )
    case 'PHONE':
      return (
        <CompanyByPhone>
          {phone => <CommonTree {...{draft, updateReport}} alreadyProvidedFields={{phone}} result={undefined} />}
        </CompanyByPhone>
      )
    case 'TRANSPORTER_WEBSITE':
      return <WebsiteTree {...{draft, updateReport}} specificWebsiteCompanyKind={'TRANSPORTER_WEBSITE'} />
    case 'MERCHANT_WEBSITE':
      return <WebsiteTree {...{draft, updateReport}} specificWebsiteCompanyKind={'MERCHANT_WEBSITE'} />
    case 'WEBSITE':
      return <WebsiteTree {...{draft, updateReport}} specificWebsiteCompanyKind={undefined} />
    default:
      return <CommonTree {...{draft, updateReport}} result={undefined} />
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
          <CommonTree {...{draft, updateReport}} alreadyProvidedFields={{website}} result={companies} />
        )
      }
    </CompanyByWebsite>
  )
}

function CommonTree({
  alreadyProvidedFields = {},
  result = undefined,
  draft,
  updateReport,
}: {
  alreadyProvidedFields?: {
    phone?: string
    website?: string
    barcodeProduct?: BarcodeProduct
  }
  result: CompanySearchResult[] | undefined
} & CommonProps) {
  const companyKind = draft.companyKind
  if (!companyKind) {
    throw new Error('The draft should have a companyKind already')
  }
  function updateReportWithAllFields(changes: DeepPartial<ReportDraft2>) {
    const {phone, website, barcodeProduct} = alreadyProvidedFields
    updateReport({
      ...changes,
      ...(barcodeProduct ? {barcodeProduct} : {}),
      companyDraft: {
        ...(phone ? {phone} : {}),
        ...(website ? {website} : {}),
        ...changes.companyDraft,
      },
    })
  }

  return result && result.length > 0 ? (
    <CompanySearchResultComponent
      companies={result}
      reportDraft={draft}
      onSubmit={(company, vendor) => {
        updateReportWithAllFields({
          companyDraft: company,
          vendor,
        })
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
                      updateReportWithAllFields({
                        companyDraft: company,
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
                      updateReportWithAllFields({
                        companyDraft: company,
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
                      updateReportWithAllFields({
                        companyDraft: company,
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
                    updateReportWithAllFields({
                      companyDraft: {
                        address: {
                          postalCode,
                          street,
                        },
                      },
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
                            updateReportWithAllFields({
                              companyDraft: {
                                address: {
                                  postalCode: postalCode,
                                },
                              },
                            })
                          }}
                        />
                      )
                    case IsAFrenchCompany.No:
                      return (
                        <CompanyAskForeignDetails
                          {...{companyKind}}
                          onSubmit={({name, postalCode, country: {code}}) => {
                            updateReportWithAllFields({
                              companyDraft: {
                                name: name,
                                address: {
                                  postalCode: postalCode,
                                  country: code,
                                },
                              },
                            })
                          }}
                        />
                      )
                    case IsAFrenchCompany.Unknown:
                      return (
                        <CompanyAskConsumerPostalCode
                          {...{companyKind}}
                          onChange={postalCode => {
                            updateReportWithAllFields({
                              companyDraft: {
                                address: {
                                  postalCode,
                                },
                              },
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
}: {specificProductCompanyKinds: SpecificProductCompanyKind} & CommonProps) {
  return (
    <CompanySearchByBarcode searchProductOnly={specificProductCompanyKinds === 'PRODUCT_POINT_OF_SALE'}>
      {results => {
        if (results.kind === 'dont_know_barcode') {
          return <CommonTree {...{draft, updateReport}} result={undefined} />
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
                  companyDraft: {
                    ...company,
                  },
                  barcodeProduct,
                })
              }}
            />
            {specificProductCompanyKinds === 'PRODUCT_POINT_OF_SALE' && (
              <div className="text-xl mb-4 pt-8">Nous avons maintenant besoin de connaitre le point de vente du produit.</div>
            )}
            {!company && (
              <CommonTree {...{draft, updateReport}} alreadyProvidedFields={{barcodeProduct: product}} result={undefined} />
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
    return <CommonTree {...{draft, updateReport}} result={undefined} />
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
            companyDraft: company,
            barcodeProduct,
          })
        }}
      />
      {!company && <CommonTree {...{draft, updateReport}} alreadyProvidedFields={{barcodeProduct: product}} result={undefined} />}
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
  } else {
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
              companyDraft: company,
              barcodeProduct,
            })
          }}
          noResultsPanel={<RappelConsoBarcodeNotFoundInGS1 />}
        />
        {!company && (
          <CommonTree {...{draft, updateReport}} alreadyProvidedFields={{barcodeProduct: product}} result={undefined} />
        )}
      </>
    )
  }
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
                  companyDraft: company,
                  barcodeProduct,
                })
              }}
              noResultsPanel={<RappelConsoBarcodeNotFoundInGS1 />}
            />
          )}
          {selectedGtin !== undefined && !_search.data?.company && (
            <CommonTree
              {...{draft, updateReport}}
              alreadyProvidedFields={{barcodeProduct: _search.data?.product}}
              result={undefined}
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
