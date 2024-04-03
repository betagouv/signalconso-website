'use client'

import {getOptionsFromInput, getPlaceholderFromInput} from '@/components_feature/reportFlow/Details/DetailInputsUtils'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {dateToFrenchFormat} from '@/utils/utils'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {ReactNode, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {allVisibleAnomalies, instanceOfAnomaly, instanceOfSubcategoryWithInfoWall} from '../anomalies/Anomalies'
import {
  Anomaly,
  CategoryNode,
  DetailInput,
  DetailInputType,
  StandardSubcategory,
  Subcategory,
  SubcategoryWithInfoWall,
} from '../anomalies/Anomaly'
import {useI18n} from '../i18n/I18n'
import {fnSwitch} from '../utils/FnSwitch'
import {useSearchParams} from 'next/navigation'
import {AppLang} from '@/i18n/localization/AppLangs'
import Link from 'next/link'
import {pagesDefs} from '@/core/pagesDefinitions'

const Node = ({
  anomaly,
  openAll,
  displayExtra,
  zoomPath,
}: {
  anomaly: CategoryNode
  openAll?: boolean
  displayExtra: boolean
  zoomPath: string[]
}) => {
  const title = instanceOfAnomaly(anomaly) ? anomaly.title : anomaly.title
  const desc = instanceOfAnomaly(anomaly) ? anomaly.description : anomaly.desc
  const reponseconsoCode = instanceOfAnomaly(anomaly) ? undefined : anomaly.reponseconsoCode
  const ccrfCodes = (instanceOfAnomaly(anomaly) ? undefined : anomaly.ccrfCode) ?? []
  const tags = instanceOfAnomaly(anomaly) ? undefined : anomaly.tags
  const companyKind = instanceOfAnomaly(anomaly) ? undefined : anomaly.companyKind
  const companyKindQuestion = instanceOfAnomaly(anomaly) ? undefined : anomaly.companyKindQuestion
  const subcategoriesTitle = anomaly.subcategoriesTitle
  const isLeaf = !anomaly.subcategories || anomaly.subcategories.length === 0
  const isBlocking = instanceOfSubcategoryWithInfoWall(anomaly)
  const [isOpen, setIsOpen] = useState(false)
  const isHiddenDemoCategory = instanceOfAnomaly(anomaly) && anomaly.isHiddenDemoCategory
  const isSpecialOpenFoodFactsCategory = instanceOfAnomaly(anomaly) && anomaly.isSpecialOpenFoodFactsCategory
  useEffect(() => {
    setIsOpen(!!openAll)
  }, [openAll])

  return (
    <div className="flex items-stretch mb-2 ">
      {isLeaf || (
        <div className="w-[40px] shrink-0 ">
          <button
            onClick={() => setIsOpen(_ => !_)}
            className={`bg-blue-300 min-h-[40px] w-[40px] text-slate-800 flex items-center  justify-center ${
              isOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'
            }`}
          ></button>
        </div>
      )}

      <div className="grow ">
        <div
          className={`group min-h-[40px] flex flex-col items-start justify-center ${
            isLeaf ? 'bg-gray-100 py-1 px-4  rounded-2xl border border-solid ' : 'bg-blue-100 pl-2 '
          }`}
        >
          <div className="mb-0 flex justify-between w-full gap-2 items-center">
            <div>
              <span dangerouslySetInnerHTML={{__html: title}} className="font-bold" />{' '}
              {displayExtra && (
                <>
                  <span className="text-scbluefrance text-xs">(id : {anomaly.id}) </span>{' '}
                </>
              )}
              {desc && <span className="ml-2 text-sm text-gray-500 mb-0 italic" dangerouslySetInnerHTML={{__html: desc}} />}
            </div>
            <span className="shrink-0 group-hover:visible invisible">
              <ZoomLinkToTarget targetNode={anomaly} currentZoom={zoomPath} hideIfSameAsCurrentZoom>
                lien direct <i className="ri-link" />
              </ZoomLinkToTarget>
            </span>
          </div>
          <div>
            {isHiddenDemoCategory && <BorderedItem text={'Catégorie spéciale de démo'} icon="ri-flask-line" />}
            {isSpecialOpenFoodFactsCategory && (
              <BorderedItem text={'Catégorie spéciale pour partenariat'} icon="ri-focus-3-line" />
            )}
            {displayExtra &&
              tags &&
              tags.length &&
              tags?.map(tag => <BorderedItem text={tag} icon="ri-price-tag-3-fill" key={tag} />)}
            {displayExtra && companyKind && (
              <BorderedItem text={companyKind} icon="ri-search-line" itemKindText="companyKind :" />
            )}
            {displayExtra && companyKindQuestion && (
              <BorderedItem
                text={
                  <>
                    {companyKindQuestion.label}{' '}
                    {companyKindQuestion.options.map(_ => `${_.label} => ${_.companyKind}`).join(', ')}
                  </>
                }
                icon="ri-search-line"
                itemKindText="companyKindQuestion :"
              />
            )}
            {displayExtra && reponseconsoCode && (
              <BorderedItem text={reponseconsoCode} icon="ri-customer-service-line" itemKindText="reponseconsoCode :" />
            )}
            {displayExtra &&
              ccrfCodes.map((_, idx) => {
                return <BorderedItem key={`${_}_${idx}`} text={_} icon="ri-hashtag" itemKindText="ccrfCode :" />
              })}
          </div>

          {isLeaf && (isBlocking ? <NodeInfo anomaly={anomaly} /> : <NodeInputs anomaly={anomaly} {...{displayExtra}} />)}
        </div>
        {isOpen && anomaly.subcategories && (
          <>
            {subcategoriesTitle && <div className="mt-2" dangerouslySetInnerHTML={{__html: subcategoriesTitle}} />}
            <div className="my-2 relative before:h-full before:content-['_'] before:w-[1px] before:absolute before:bg-gray-500 before:left-[-28px]">
              {anomaly.subcategories.map(s => (
                <Node openAll={openAll} key={s.id} anomaly={s} {...{displayExtra, zoomPath}} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const NodeInputs = ({anomaly, displayExtra}: {anomaly: StandardSubcategory; displayExtra: boolean}) => {
  if (anomaly.detailInputs && anomaly.detailInputs.length > 0) {
    const nbDetails = anomaly.detailInputs.length
    const nbDetailsPlural = nbDetails > 1 ? 's' : ''
    return (
      <>
        <details className="mx-2">
          <summary>
            {nbDetails} détail{nbDetailsPlural} demandé{nbDetailsPlural}
          </summary>
          <ul className="pl-8 p-2">
            {anomaly.detailInputs.map(input => (
              <InputRender input={input} key={input.label} />
            ))}
          </ul>
        </details>
        <FileLabel {...{anomaly, displayExtra}} />
      </>
    )
  }
  return (
    <>
      <div className="mx-2">Pas de détail particulier demandé</div>
      <FileLabel {...{anomaly, displayExtra}} />
    </>
  )
}

function FileLabel({anomaly, displayExtra}: {anomaly: StandardSubcategory; displayExtra: boolean}) {
  if (displayExtra && anomaly.fileLabel) {
    return (
      <div className="text-sm">
        <span className="text-slate-600">Label des pièces jointes</span> : "{anomaly.fileLabel}"
      </div>
    )
  }
}

const NodeInfo = ({anomaly}: {anomaly: SubcategoryWithInfoWall}) => {
  const {m} = useI18n()
  return (
    <details className="px-2 rounded-lg bg-slate-500 text-white">
      <summary>Information bloquante</summary>
      <div className="p-2 bg-white text-black my-2 rounded-lg">
        {anomaly.blockingInfo.title && <div dangerouslySetInnerHTML={{__html: anomaly.blockingInfo.title}} />}
        {anomaly.blockingInfo.subTitle && <div dangerouslySetInnerHTML={{__html: anomaly.blockingInfo.subTitle}} />}
        {anomaly.blockingInfo.content && (
          <span className="text-sm text-gray-500" dangerouslySetInnerHTML={{__html: anomaly.blockingInfo.content}} />
        )}
        {anomaly.blockingInfo.questions && (
          <div className="text-sm text-gray-500 ">
            <ul>
              {anomaly.blockingInfo.questions.map(action => (
                <li key={action.question}>
                  <span className="font-bold" dangerouslySetInnerHTML={{__html: action.question}} />
                  {action.desc && <div dangerouslySetInnerHTML={{__html: action.desc}} />}
                  <div dangerouslySetInnerHTML={{__html: action.answer}} />
                </li>
              ))}
            </ul>
          </div>
        )}
        {anomaly.blockingInfo.notAFraudMessage && <span className="text-sm text-gray-500">{m.arbo.notAFraudMessage}</span>}
      </div>
    </details>
  )
}

function InputRender({input}: {input: DetailInput}) {
  const vertical =
    input.type === DetailInputType.RADIO || input.type === DetailInputType.CHECKBOX || input.type === DetailInputType.TEXTAREA
  return (
    <li key={input.label} className={`m-0 p-0 flex ${vertical ? 'flex-col' : ''}`}>
      <div className="mb-0 mt-2 text-sm text-gray-600">
        <span dangerouslySetInnerHTML={{__html: `- ` + input.label}} />
        {input.optional && <span className="italic"> (optionnel)</span>}
      </div>
      {fnSwitch(input.type, {
        [DetailInputType.TEXT]: () => (
          <div className="px-2 w-[200px] flex items-center justify-start text-slate-500 mx-2 bg-slate-100 text-sm border-slate-500 border-solid border mt-1">
            {getPlaceholderFromInput(input) ?? ''}
          </div>
        ),
        [DetailInputType.TEXTAREA]: () => (
          <div className="px-2 w-[200px] h-[50px] flex items-center justify-start text-slate-500 mx-2 bg-slate-100 text-sm border-slate-500 border-solid border mt-1">
            {getPlaceholderFromInput(input) ?? ''}
          </div>
        ),
        [DetailInputType.DATE]: () => (
          <div className="px-2 w-[200px] flex items-center justify-between text-slate-500 mx-2 bg-slate-100 text-sm border-slate-500 border-solid border mt-1">
            <span>
              {input.type === DetailInputType.DATE && input.defaultValue === 'SYSDATE' ? dateToFrenchFormat(new Date()) : ''}
            </span>{' '}
            <i className="ri-calendar-line" />
          </div>
        ),
        [DetailInputType.DATE_NOT_IN_FUTURE]: () => (
          <>
            <div className="px-2 w-[200px] flex items-center gap-2 justify-between text-slate-500 mx-2 bg-slate-100 text-sm border-slate-500 border-solid border mt-1">
              <span>
                {input.type === DetailInputType.DATE_NOT_IN_FUTURE && input.defaultValue === 'SYSDATE'
                  ? dateToFrenchFormat(new Date())
                  : ''}
              </span>
              <i className="ri-calendar-line" />
            </div>
            <div className="text-sm flex items-end text-slate-600">(date dans le passé ou celle d'aujourd'hui)</div>
          </>
        ),
        [DetailInputType.TIMESLOT]: () => (
          <div className="px-2 w-[200px] flex items-center justify-end text-slate-500 mx-2 bg-slate-100 text-sm border-slate-500 border-solid border mt-1">
            <i className="ri-time-line" />
          </div>
        ),
        [DetailInputType.RADIO]: () => (
          <>
            {getOptionsFromInput(input)!.map(option => (
              <div key={option} className="flex items-center text-gray-600">
                <i className="ri-checkbox-blank-circle-line mx-2 fr-icon--sm " />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </>
        ),
        [DetailInputType.CHECKBOX]: () => (
          <>
            {getOptionsFromInput(input)!.map(option => (
              <div key={option} className="flex items-center text-gray-600">
                <i className="ri-checkbox-blank-line mx-2  fr-icon--sm" />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </>
        ),
      })}
    </li>
  )
}

function BorderedItem({text, icon, itemKindText}: {text: ReactNode; icon: string; itemKindText?: ReactNode}) {
  return (
    <span className="border border-solid px-1 rounded mr-1 italic text-sm ">
      <span className="text-xs">
        <i className={`${icon} fr-icon--sm`} /> {itemKindText}
      </span>{' '}
      {text}
    </span>
  )
}

type ConfigForm = {
  hideExtra: boolean
}

const Arbo = () => {
  const {
    register,
    watch,
    formState: {errors},
  } = useForm<ConfigForm>({defaultValues: {hideExtra: false}})
  const [openAll, setOpenAll] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const searchParams = useSearchParams()
  const zoomPath = (searchParams.get('zoom') ?? undefined)?.split('___') ?? []
  const {m, currentLang} = useI18n()
  const anomalies = allVisibleAnomalies(currentLang)
  const topNodes = applyZoom(anomalies, zoomPath)
  const displayExtra = !watch('hideExtra')

  return (
    <ContentPageContainer>
      <h1>{m.arbo.title}</h1>

      <form className="mb-4 flex flex-col gap-4">
        <label>
          <input type="checkbox" {...register('hideExtra')} />
          <span className="ml-2">
            Masquer les petits détails techniques{' '}
            <span className="text-sm text-gray-700">
              (ids, tags, companyKind, codes RéponseConso, codes DGCCRF, labels des pièces jointes)
            </span>
          </span>
        </label>
        <Button
          iconId={openAll ? 'ri-arrow-up-double-line' : 'ri-arrow-down-double-line'}
          iconPosition="right"
          className=""
          disabled={disabled}
          priority="secondary"
          onClick={() => {
            setDisabled(true)
            setTimeout(() => {
              setOpenAll(_ => !_)
            }, 1)
            setTimeout(() => {
              setDisabled(false)
            }, 100)
          }}
        >
          {openAll ? 'Tout replier' : 'Tout déplier'}
        </Button>
      </form>
      {zoomPath.length > 0 && (
        <div className="z-[1000] border-2 border-solid  p-2 bg-yellow-100 text-black mb-8">
          <div className="text-md mb-2">
            Vous visualisez actuellement un <span className="font-bold">sous-ensemble</span> de l'arborescence.{' '}
            <Link href={pagesDefs.arborescence.url} className="font-bold text-scbluefrance">
              Cliquez ici pour revenir à l'arborescence complète
            </Link>
          </div>
          <div>
            <span> Chemin actuel :</span>
            <ul className="inline-flex flex-wrap gap-2 list-none mb-0 p-0 ml-2">
              {zoomPath.map((title, idx) => (
                <li key={idx} className="">
                  {idx > 0 && '>'}{' '}
                  <span className="bg-gray-300 px-2">
                    <ZoomLink path={zoomPath.slice(0, idx + 1)} currentZoom={zoomPath}>
                      {title}
                    </ZoomLink>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {topNodes.map(a => (
        <Node key={a.id} anomaly={a} openAll={openAll} {...{displayExtra, zoomPath}} />
      ))}
    </ContentPageContainer>
  )
}

function applyZoom(currentTopNodes: CategoryNode[], zoomPath: string[]): CategoryNode[] {
  if (!zoomPath.length) {
    return currentTopNodes
  }
  const [nextZoomTitle, ...restOfZoom] = zoomPath
  const foundTopNode = currentTopNodes.find(_ => _.title === nextZoomTitle)
  if (!foundTopNode) {
    return []
  }
  if (!restOfZoom.length) {
    return [foundTopNode]
  }
  return applyZoom(foundTopNode.subcategories ?? [], restOfZoom)
}

function ZoomLinkToTarget({
  children,
  targetNode,
  currentZoom,
  hideIfSameAsCurrentZoom,
}: {
  targetNode: CategoryNode
  children: ReactNode
  currentZoom: string[]
  hideIfSameAsCurrentZoom?: boolean
}) {
  const {currentLang: lang} = useI18n()
  const path = buildTitlesPath(targetNode, lang)
  if (!path) {
    return <span>{children}</span>
  }
  return (
    <ZoomLink path={path} currentZoom={currentZoom} hideIfSameAsCurrentZoom={hideIfSameAsCurrentZoom}>
      {children}
    </ZoomLink>
  )
}

function ZoomLink({
  children,
  path,
  currentZoom,
  hideIfSameAsCurrentZoom,
}: {
  path: string[]
  children: ReactNode
  currentZoom: string[]
  hideIfSameAsCurrentZoom?: boolean
}) {
  const newPathStr = path.join('___')
  const currentZoomStr = currentZoom.join('___')
  if (newPathStr === currentZoomStr) {
    // linking to current page, no need
    if (hideIfSameAsCurrentZoom) {
      return null
    }
    return <span>{children}</span>
  }
  const url = `?zoom=${encodeURIComponent(newPathStr)}`
  return (
    <Link href={url} className="fr-raw-link hover:underline">
      {children}
    </Link>
  )
}
function buildTitlesPath(targetNode: CategoryNode, lang: AppLang) {
  const allAnomalies = allVisibleAnomalies(lang)

  function inner(currentNode: CategoryNode, pathSoFar: string[]): string[] | undefined {
    const newPath = [...pathSoFar, currentNode.title]
    if (currentNode.id === targetNode.id) {
      // that was the node to find
      return newPath
    }
    const children = currentNode.subcategories ?? []
    for (const child of children) {
      const result = inner(child, newPath)
      if (result) {
        // we found it
        return result
      }
      // all children were a dead end
    }
  }
  for (const anomaly of allAnomalies) {
    const result = inner(anomaly, [])
    if (result) {
      return result
    }
  }
}

export default Arbo
