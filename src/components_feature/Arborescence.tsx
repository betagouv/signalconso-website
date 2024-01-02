'use client'

import {getOptionsFromInput, getPlaceholderFromInput} from '@/components_feature/reportFlow/Details/DetailInputsUtils'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {ReactNode, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {
  allVisibleAnomalies,
  instanceOfAnomaly,
  instanceOfSubcategoryWithInfoWall,
  instanceOfSubcategoryWithInputs,
} from '../anomalies/Anomalies'
import {Anomaly, DetailInputType, StandardSubcategory, Subcategory, SubcategoryWithInfoWall} from '../anomalies/Anomaly'
import {useI18n} from '../i18n/I18n'
import {fnSwitch} from '../utils/FnSwitch'

const Node = ({anomaly, openAll, displayExtra}: {anomaly: Anomaly | Subcategory; openAll?: boolean; displayExtra: boolean}) => {
  const title = instanceOfAnomaly(anomaly) ? anomaly.title : anomaly.title
  const desc = instanceOfAnomaly(anomaly) ? anomaly.description : anomaly.desc
  const reponseconsoCode = instanceOfAnomaly(anomaly) ? undefined : anomaly.reponseconsoCode
  const ccrfCode = instanceOfAnomaly(anomaly) ? undefined : anomaly.ccrfCode
  const tags = instanceOfAnomaly(anomaly) ? undefined : anomaly.tags
  const companyKind = instanceOfAnomaly(anomaly) ? undefined : anomaly.companyKind
  const companyKindQuestion = instanceOfAnomaly(anomaly) ? undefined : anomaly.companyKindQuestion
  const subcategoriesTitle = anomaly.subcategoriesTitle
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(!!openAll)
  }, [openAll])

  return (
    <div className="flex items-stretch mb-1 ">
      <div className="w-[40px] shrink-0 ">
        {anomaly.subcategories ? (
          <button
            onClick={() => setIsOpen(_ => !_)}
            className={`bg-slate-300 min-h-[40px] w-[40px] text-slate-800 flex items-center  justify-center ${
              isOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'
            }`}
          ></button>
        ) : (
          <div className={`bg-stone-300 min-h-[40px] h-full w-[40px] text-slate-800 flex items-center justify-center`}></div>
        )}
      </div>

      <div className="grow ">
        <div
          className={`min-h-[40px] flex flex-col items-start justify-center pl-1 ${
            anomaly.subcategories ? 'bg-slate-100' : 'bg-stone-200'
          }`}
        >
          <p className="mb-0">
            <span dangerouslySetInnerHTML={{__html: title}} />{' '}
            {displayExtra && (
              <>
                <span className="text-scbluefrance text-xs">(id : {anomaly.id}) </span>{' '}
              </>
            )}
            {desc && <span className="ml-2 text-sm text-gray-500 mb-0 italic" dangerouslySetInnerHTML={{__html: desc}} />}
          </p>
          <div>
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
            {displayExtra && ccrfCode && <BorderedItem text={ccrfCode} icon="ri-hashtag" itemKindText="ccrfCode :" />}
          </div>

          {instanceOfSubcategoryWithInfoWall(anomaly) && <NodeInfo anomaly={anomaly} />}
          {instanceOfSubcategoryWithInputs(anomaly) && <NodeInput anomaly={anomaly} />}
        </div>
        {isOpen && anomaly.subcategories && (
          <>
            <div className="mt-2">{subcategoriesTitle}</div>
            <div className="my-2 relative before:h-full before:content-['_'] before:w-[1px] before:absolute before:bg-gray-500 before:left-[-28px]">
              {anomaly.subcategories.map(s => (
                <Node openAll={openAll} key={s.id} anomaly={s} {...{displayExtra}} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const NodeInput = ({anomaly}: {anomaly: StandardSubcategory}) => {
  if (anomaly.detailInputs && anomaly.detailInputs.length > 0) {
    const nbDetails = anomaly.detailInputs.length
    const nbDetailsPlural = nbDetails > 1 ? 's' : ''
    return (
      <details className="mx-2">
        <summary>
          <i className="ri-survey-line text-gray-500" /> {nbDetails} détail{nbDetailsPlural} demandé{nbDetailsPlural}
        </summary>
        <ul className="pl-8 p-2">
          {anomaly.detailInputs.map(input => (
            <li
              key={input.label}
              className={`m-0 p-0 flex ${
                input.type === DetailInputType.RADIO || input.type === DetailInputType.CHECKBOX ? 'flex-col' : ''
              }`}
            >
              <div className="mb-0 mt-2 text-sm text-gray-600" dangerouslySetInnerHTML={{__html: `- ` + input.label}} />
              {fnSwitch(
                input.type,
                {
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
                },
                () => (
                  <div className="px-2 w-[200px] flex items-center justify-start text-gray-500 mx-2 bg-gray-100 text-sm border-gray-500 border-solid border">
                    {getPlaceholderFromInput(input) ?? '...'}
                  </div>
                ),
              )}
            </li>
          ))}
        </ul>
      </details>
    )
  }
  return null
}

const NodeInfo = ({anomaly}: {anomaly: SubcategoryWithInfoWall}) => {
  const {m} = useI18n()
  return (
    <details className="px-2 rounded-lg bg-gray-500 text-white">
      <summary>
        <i className="ri-prohibited-line text-gray-200" /> Information bloquante
      </summary>
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
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<ConfigForm>({defaultValues: {hideExtra: false}})
  const [openAll, setOpenAll] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const {m, currentLang} = useI18n()
  const anomalies = allVisibleAnomalies(currentLang)
  const displayExtra = !watch('hideExtra')
  return (
    <ContentPageContainer>
      <h1>{m.arbo.title}</h1>
      <form className="mb-4">
        <label>
          <input type="checkbox" {...register('hideExtra')} />
          <span className="ml-2">Masquer les petits détails (ids, tags, company kind, codes RéponseConso et codes DGCCRF)</span>
        </label>
      </form>
      <Button
        className="mb-4"
        disabled={disabled}
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
        {m.arbo.expandAll}
      </Button>

      {anomalies.map(a => (
        <Node key={a.id} anomaly={a} openAll={openAll} {...{displayExtra}} />
      ))}
    </ContentPageContainer>
  )
}

export default Arbo
