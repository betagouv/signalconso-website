import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {FriendlyHelpText} from '@/components_simple/FriendlyHelpText'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {BarcodeProduct} from '@/model/BarcodeProduct'
import {CompanySearchResult} from '@/model/Company'
import {ConsumerWish, ReportDraft} from '@/model/ReportDraft'
import {ReportDraft2} from '@/model/ReportDraft2'
import {useQuery} from '@tanstack/react-query'
import {useSearchParams} from 'next/navigation'
import {useEffect, useMemo} from 'react'
import {instanceOfSubcategoryWithInfoWall} from '../../../anomalies/Anomalies'
import {Anomaly, CompanyKinds, ReportTag, Subcategory} from '../../../anomalies/Anomaly'
import {AppLang} from '../../../i18n/localization/AppLangs'
import {useReportFlowContext} from '../ReportFlowContext'
import {ProblemConsumerWishInformation} from './ProblemConsumerWishInformation'
import {ProblemInformation} from './ProblemInformation'
import {ProblemSelect} from './ProblemSelect'
import {ProblemStepper, ProblemStepperStep} from './ProblemStepper'
import {computeSelectedSubcategoriesData} from './useSelectedSubcategoriesData'
import {buildCompanyName} from '@/components_simple/CompanyRecap/CompanyRecap'

interface Props {
  anomaly: Anomaly
  isWebView: boolean
  stepNavigation: StepNavigation
}

const OPENFOODFACTS_BARCODE_PARAM = 'openffgtin'

function buildTagsFromSubcategories(subcategories: Subcategory[]) {
  return computeSelectedSubcategoriesData(subcategories).tagsFromSelected
}

function adjustTagsBeforeSubmit(draft: Partial<ReportDraft2>, companyKindFromSelected: CompanyKinds | undefined): ReportTag[] {
  let res = draft.tags ?? []
  if (
    companyKindFromSelected === 'WEBSITE' ||
    draft.companyKind === 'WEBSITE' ||
    draft.companyKind === 'MERCHANT_WEBSITE' ||
    draft.companyKind === 'TRANSPORTER_WEBSITE'
  ) {
    res = [...res, 'Internet']
  }
  // This tag is used in the arborescence only to offer the choice of 'getAnswer'
  // If selected, the tag will be added back just before submitting to the API
  res = res.filter(_ => _ !== 'ReponseConso')
  return res
}

export function initiateReportDraftForAnomaly(anomaly: Anomaly, lang: AppLang): Partial<ReportDraft2> {
  return {anomaly, lang}
}

export function adjustReportDraftAfterSubcategoriesChange(
  report: Partial<ReportDraft2>,
  subcategory: Subcategory,
  subcategoryIndex: number,
) {
  const subcategoriesToKeep = (report.subcategories ?? []).slice(0, subcategoryIndex)
  const subcategories = [...subcategoriesToKeep, subcategory]
  const tags = buildTagsFromSubcategories(subcategories)
  //Recompute company kind based on current report selected subcategories
  const lastCategoryCompanyKind = subcategories
    .map(_ => _.companyKind)
    .filter(_ => _ !== undefined)
    .pop()

  const copy = {
    ...report,
    subcategories,
    tags,
    companyKind: lastCategoryCompanyKind,
    companyDraft: undefined,
    // Category has changed, user need to reconfirm consumerWish & employeeConsumer because :
    // - Some categories have "getAnswer" (that is not available for all categories so we have to clean up those properties)
    // - Some categories set default values for these properties (CompanyKind SOCIAL)
    consumerWish: undefined,
    employeeConsumer: undefined,
  }
  return copy
}

export const Problem = ({anomaly, isWebView, stepNavigation}: Props) => {
  const _analytic = useAnalyticContext()
  const {m, currentLang} = useI18n()
  const {companyApiClient, signalConsoApiClient} = useApiClients()
  const searchParams = useSearchParams()
  const {reportDraft, setReportDraft, resetFlow, sendReportEvent} = useReportFlowContext()
  const hasReponseConsoSubcategories = reportDraft.subcategories
    ? buildTagsFromSubcategories(reportDraft.subcategories).includes('ReponseConso')
    : false
  const openFfBarcode = (anomaly.isSpecialOpenFoodFactsCategory && searchParams.get(OPENFOODFACTS_BARCODE_PARAM)) || undefined
  const _openFfBarcodeSearch = useQuery<{barcodeProduct: BarcodeProduct; company?: CompanySearchResult} | null>({
    queryKey: ['openFfBarcodeSearch', openFfBarcode],
    queryFn: async () => {
      if (openFfBarcode) {
        const barcodeProduct = await signalConsoApiClient.searchByBarcode(openFfBarcode)
        if (barcodeProduct) {
          if (barcodeProduct.siren) {
            const companies = await companyApiClient.searchCompaniesByIdentity(barcodeProduct.siren, false, currentLang)
            if (companies.length > 0) {
              const company = companies[0]
              return {barcodeProduct, company}
            }
          }
          // No SIREN, probably associated to a foreign company
          // Ex coca 5449000000996
          // Or we had the SIREN but didn't find the company
          return {barcodeProduct}
        }
      }
      // Barcode param not present
      // Or no product found for that barcode (probably invalid)
      return null
    },
  })

  // reset the draft when switching the root category
  useEffect(() => {
    if (anomaly.category !== reportDraft.anomaly?.category) {
      _analytic.trackEvent(EventCategories.report, ReportEventActions.validateCategory, anomaly.category)
      resetFlow()
      setReportDraft(_ => initiateReportDraftForAnomaly(anomaly, currentLang))
    }
  }, [anomaly.category])

  useEffect(() => {
    // when we come from openFf and we get the async data
    const openFfResult = _openFfBarcodeSearch.data
    if (openFfBarcode && openFfResult) {
      // Register the data into the reportFlow
      setReportDraft(_ => ({
        ..._,
        openFf: {
          barcode: openFfBarcode,
          product: openFfResult.barcodeProduct,
          company: openFfResult.company,
        },
      }))
    }
  }, [openFfBarcode, _openFfBarcodeSearch.data])

  const isTransmittable = ReportDraft.isTransmittableToProBeforePickingConsumerWish(reportDraft)
  const askConsumerWish = isTransmittable && reportDraft.companyKind !== 'SOCIAL'

  const {
    lastSubcategories,
    isLastSubcategory,
    companyKindFromSelected,
    companyKindQuestionFromSelected,
    responseconsoCodeFromSelected,
    ccrfCodeFromSelected,
    categoryOverrideFromSelected,
  } = useMemo(() => {
    return computeSelectedSubcategoriesData(reportDraft.subcategories ?? [])
  }, [reportDraft.subcategories])

  function onSubmit(next: () => void): void {
    setReportDraft(draft => {
      const {subcategories, ..._anomaly} = anomaly
      const consumerWish = askConsumerWish ? draft.consumerWish : 'companyImprovement'
      //Company kind 'SOCIAL' cannot be employee consumer report
      const employeeConsumer = draft.companyKind === 'SOCIAL' ? false : draft.employeeConsumer
      const companyKind =
        // For this category, it's always PRODUCT_OPENFF, regardless of the YAML.
        anomaly.isSpecialOpenFoodFactsCategory ? 'PRODUCT_OPENFF' : companyKindFromSelected ?? draft.companyKind ?? 'SIRET'

      const updatedDraft: Partial<ReportDraft2> = {
        ...draft,
        ccrfCode: ccrfCodeFromSelected,
        reponseconsoCode: responseconsoCodeFromSelected,
        tags: adjustTagsBeforeSubmit(draft, companyKindFromSelected),
        companyKind,
        anomaly: _anomaly,
        consumerWish,
        employeeConsumer,
        categoryOverride: categoryOverrideFromSelected,
        barcodeProduct: draft.barcodeProduct,
        companyDraft: draft.companyDraft,
        // In the openFf scenario
        // Only if we got all the data, then we build the company/product from it.
        // We can't do it earlier because it would have been erased
        // when switching between subcategories
        // If we don't have all the data, then we will build it in step 2.
        ...(draft.openFf?.product && draft.openFf.company
          ? {
              barcodeProduct: draft.openFf.product,
              companyDraft: draft.openFf.company,
            }
          : null),
      }
      return updatedDraft
    })

    sendReportEvent(stepNavigation.currentStep)
    next()
  }

  const handleSubcategoriesChange = (subcategory: Subcategory, index: number) => {
    setReportDraft(report => {
      const newReport = adjustReportDraftAfterSubcategoriesChange(report, subcategory, index)
      return newReport
    })
  }

  const tags = reportDraft.tags ?? []

  const displayMainContent = !openFfBarcode || _openFfBarcodeSearch.status === 'success'
  return (
    <>
      {openFfBarcode && _openFfBarcodeSearch.status === 'pending' && (
        <div className="min-h-[200px] flex items-center justify-center">
          <div className="sc-loader-big w-20 h-20"></div>
        </div>
      )}
      {openFfBarcode && _openFfBarcodeSearch.data === null && (
        <FriendlyHelpText>
          {/* Cas d'erreur où le barcode transmis n'est pas valide */}
          <p className="mb-2 mt-4">
            <i className="ri-information-line mr-2" />
            Vous avez rencontré un problème avec ce produit (code-barres <span className="font-bold">{openFfBarcode}</span>) ?
          </p>
          <p className="mb-2 mt-4">
            Nous n'avons pas pu identifier ce produit. Cependant, vous pouvez quand même faire un signalement sur SignalConso.
            Nous vous demanderons d'identifier manuellement l'entreprise qui est à l'origine de ce produit.
          </p>
          <p></p>
          <p className="mb-4">
            SignalConso vous permet de remonter le problème à l'entreprise. De plus, votre signalement est visible par les agents
            de la répression des fraudes, qui pourront intervenir si nécessaire.
          </p>
          <p className="text-center font-bold mb-2">Répondez-simplement aux questions, et laissez-vous guider !</p>
        </FriendlyHelpText>
      )}
      {openFfBarcode &&
        _openFfBarcodeSearch.status === 'success' &&
        _openFfBarcodeSearch.data !== null &&
        !_openFfBarcodeSearch.data.company && (
          <FriendlyHelpText>
            {/* Cas où on a le produit mais sans l'entreprise */}
            <p className="mb-2 mt-4">
              <i className="ri-information-line mr-2" />
              Vous avez rencontré un problème avec le produit{' '}
              <span className="font-bold">
                {_openFfBarcodeSearch.data.barcodeProduct.productName ?? _openFfBarcodeSearch.data.barcodeProduct.gtin}
              </span>{' '}
              ?
            </p>
            <p className="mb-4">
              SignalConso vous permet de remonter le problème à l'entreprise. De plus, votre signalement est visible par les
              agents de la répression des fraudes, qui pourront intervenir si nécessaire.
            </p>
            <p className="mb-4">
              Nous n'avons pas pu automatiquement identifier l'entreprise à l'origine de ce produit, nous demanderons donc de
              l'identifier manuellement.
            </p>
            <p className="text-center font-bold mb-2">Répondez-simplement aux questions, et laissez-vous guider !</p>
          </FriendlyHelpText>
        )}
      {openFfBarcode &&
        _openFfBarcodeSearch.status === 'success' &&
        _openFfBarcodeSearch.data !== null &&
        _openFfBarcodeSearch.data.company && (
          <FriendlyHelpText>
            {/* Cas complet */}
            <p className="mb-2 mt-4">
              <i className="ri-information-line mr-2" />
              Vous avez rencontré un problème avec le produit{' '}
              <span className="font-bold">
                {_openFfBarcodeSearch.data.barcodeProduct.productName ?? _openFfBarcodeSearch.data.barcodeProduct.gtin}
              </span>{' '}
              produit par l'entreprise{' '}
              <span className="font-bold">{buildCompanyName({company: _openFfBarcodeSearch.data.company})}</span>?
            </p>
            <p className="mb-4">
              SignalConso vous permet de remonter le problème à l'entreprise. De plus, votre signalement est visible par les
              agents de la répression des fraudes, qui pourront intervenir si nécessaire.
            </p>
            <p className="text-center font-bold mb-2">Répondez-simplement aux questions, et laissez-vous guider !</p>
          </FriendlyHelpText>
        )}
      {displayMainContent && (
        <>
          {[anomaly, ...(reportDraft.subcategories ?? [])].map(
            (category, idx) =>
              category.subcategories && (
                <ProblemSelect
                  autoScrollTo={idx !== 0}
                  key={category.id}
                  title={category.subcategoriesTitle}
                  value={reportDraft.subcategories?.[idx]?.id}
                  onChange={id => handleSubcategoriesChange(category.subcategories?.find(_ => _.id === id)!, idx)}
                  options={(category.subcategories ?? []).map((_, i) => ({
                    title: _.title,
                    description: _.desc,
                    value: _.id,
                  }))}
                />
              ),
          )}
          {isLastSubcategory &&
            reportDraft.subcategories &&
            (instanceOfSubcategoryWithInfoWall(lastSubcategories) ? (
              <ProblemInformation
                anomaly={anomaly}
                subcategories={reportDraft.subcategories}
                information={lastSubcategories.blockingInfo}
                {...{isWebView}}
              />
            ) : (
              <ProblemStepper renderDone={<ReportFlowStepperActions onNext={onSubmit} {...{stepNavigation}} />}>
                <ProblemStepperStep
                  isDone={reportDraft.employeeConsumer !== undefined}
                  hidden={reportDraft.companyKind === 'SOCIAL'}
                >
                  <ProblemSelect
                    id="select-employeeconsumer"
                    title={m.problemDoYouWorkInCompany}
                    value={reportDraft.employeeConsumer}
                    onChange={employeeConsumer => setReportDraft(_ => ({..._, employeeConsumer}))}
                    options={[
                      {
                        title: m.problemDoYouWorkInCompanyNo,
                        value: false,
                      },
                      {
                        title: m.yes,
                        value: true,
                      },
                    ]}
                  />
                </ProblemStepperStep>
                <ProblemStepperStep isDone={true} hidden={!reportDraft.employeeConsumer}>
                  <FriendlyHelpText>
                    <p className="mb-0" dangerouslySetInnerHTML={{__html: m.employeeConsumerInformation}} />
                  </FriendlyHelpText>
                </ProblemStepperStep>
                <ProblemStepperStep isDone={reportDraft.companyKind !== undefined} hidden={!!companyKindFromSelected}>
                  {companyKindQuestionFromSelected ? (
                    <ProblemSelect<CompanyKinds>
                      id="select-companyKind"
                      title={companyKindQuestionFromSelected.label}
                      value={reportDraft.companyKind}
                      onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                      options={companyKindQuestionFromSelected.options.map(option => {
                        return {
                          title: option.label,
                          value: option.companyKind,
                        }
                      })}
                    />
                  ) : (
                    <ProblemSelect<CompanyKinds>
                      id="select-companyKind"
                      title={m.problemIsInternetCompany}
                      value={reportDraft.companyKind}
                      onChange={companyKind => setReportDraft(_ => ({..._, companyKind}))}
                      options={[
                        {
                          title: m.yes,
                          value: 'WEBSITE',
                        },
                        {
                          title: m.problemIsInternetCompanyNo,
                          value: tags.indexOf('ProduitDangereux') === -1 ? 'SIRET' : 'LOCATION',
                        },
                      ]}
                    />
                  )}
                </ProblemStepperStep>

                <ProblemStepperStep isDone={reportDraft.consumerWish !== undefined} hidden={!askConsumerWish}>
                  <ProblemSelect
                    id="select-contractualDispute"
                    title={m.whatsYourIntent}
                    value={reportDraft.consumerWish}
                    options={[
                      {
                        title: m.problemContractualDisputeFormYes,
                        description: m.problemContractualDisputeFormDesc,
                        value: 'fixContractualDispute',
                      },
                      {
                        title: m.problemContractualDisputeFormNo,
                        description: m.problemContractualDisputeFormNoDesc,
                        value: 'companyImprovement',
                      },
                      ...(hasReponseConsoSubcategories
                        ? [
                            {
                              title: m.problemContractualDisputeFormReponseConso,
                              description: m.problemContractualDisputeFormReponseConsoExample,
                              value: 'getAnswer' as const,
                            },
                          ]
                        : []),
                    ]}
                    onChange={(consumerWish: ConsumerWish) => {
                      setReportDraft(report => {
                        const updated = {...report, consumerWish}
                        _analytic.trackEvent(EventCategories.report, ReportEventActions.consumerWish, updated.consumerWish)
                        return updated
                      })
                    }}
                  />
                </ProblemStepperStep>
                <ProblemStepperStep isDone={true} hidden={!(askConsumerWish && reportDraft.consumerWish)}>
                  {reportDraft.consumerWish && <ProblemConsumerWishInformation consumerWish={reportDraft.consumerWish} />}
                </ProblemStepperStep>
              </ProblemStepper>
            ))}
        </>
      )}
    </>
  )
}
