'use client'

import {getOptionsFromInput, getPlaceholderFromInput} from '@/components_feature/reportFlow/Details/DetailInputsUtils'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useEffect, useState} from 'react'
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

const Node = ({anomaly, open, displayExtra}: {anomaly: Anomaly | Subcategory; open?: boolean; displayExtra: boolean}) => {
  const title = instanceOfAnomaly(anomaly) ? anomaly.category : anomaly.title
  const desc = instanceOfAnomaly(anomaly) ? anomaly.description : anomaly.desc
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(!!open)
  }, [open])

  return (
    <div className="flex items-start mb-1 ">
      <div className="w-[40px] mr-[8px] shrink-0">
        {anomaly.subcategories ? (
          <button
            onClick={() => setIsOpen(_ => !_)}
            className={`bg-sclightpurple h-[40px] w-[40px] text-scbluefrance flex items-center  justify-center ${
              isOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'
            }`}
          ></button>
        ) : (
          <i className={`ri-corner-down-right-line text-indigo-400 mx-2`} />
        )}
      </div>
      <div className="grow">
        <div className="min-h-[42px] flex flex-col justify-center">
          <p className="mb-0">
            <span dangerouslySetInnerHTML={{__html: title}} />{' '}
            {displayExtra && (
              <>
                <span className="text-scbluefrance text-xs">(id : {anomaly.id}) </span>{' '}
              </>
            )}
            {desc && <span className="ml-2 text-sm text-gray-500 mb-0 italic" dangerouslySetInnerHTML={{__html: desc}} />}
          </p>
          {(anomaly as Subcategory).reponseconsoCode && displayExtra && (
            <span key={1} className="text-sm text-gray-500">
              <b>ReponseConso code:</b>&nbsp;
              {(anomaly as Subcategory).reponseconsoCode}
            </span>
          )}
          <div>
            {displayExtra &&
              (anomaly as Subcategory).tags?.map(tag => (
                <span className="mr-2 h-[15px] px-1 bg-gray-200 text-sm " key={tag}>
                  {tag}
                </span>
              ))}
          </div>
          {instanceOfSubcategoryWithInfoWall(anomaly) && <NodeInfo anomaly={anomaly} />}
          {instanceOfSubcategoryWithInputs(anomaly) && <NodeInput anomaly={anomaly} />}
        </div>
        {isOpen && anomaly.subcategories && (
          <div className="my-2 relative before:h-full before:content-['_'] before:w-[1px] before:absolute before:bg-gray-500 before:left-[-28px]">
            {anomaly.subcategories.map(s => (
              <Node open={open} key={s.id} anomaly={s} {...{displayExtra}} />
            ))}
          </div>
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
      <details className="p-2 my-2 border-gray-300 border-solid border rounded-lg">
        <summary>
          <i className="ri-survey-line text-gray-500" /> {nbDetails} détail{nbDetailsPlural} demandé{nbDetailsPlural}
        </summary>
        {anomaly.detailInputs.map(input => (
          <div key={input.label}>
            <p className="mb-0 mt-2 text-sm text-gray-600" dangerouslySetInnerHTML={{__html: input.label}} />
            {fnSwitch(
              input.type,
              {
                [DetailInputType.RADIO]: () => (
                  <>
                    {getOptionsFromInput(input)!.map(option => (
                      <div key={option} className="flex items-center">
                        <i className="ri-checkbox-blank-circle-line mx-2" />
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </>
                ),
                [DetailInputType.CHECKBOX]: () => (
                  <>
                    {getOptionsFromInput(input)!.map(option => (
                      <div key={option} className="flex items-center">
                        <i className="ri-checkbox-blank-line mx-2" />
                        <span className="text-sm">{option}</span>
                      </div>
                    ))}
                  </>
                ),
              },
              () => (
                <div className="px-2 text-gray-500 mx-2 bg-gray-100 h-[32px] w-[200px] border-gray-500 border-solid border">
                  {getPlaceholderFromInput(input) ?? ''}
                </div>
              ),
            )}
          </div>
        ))}
      </details>
    )
  }
  return null
}

const NodeInfo = ({anomaly}: {anomaly: SubcategoryWithInfoWall}) => {
  const {m} = useI18n()
  return (
    <details className="p-2 my-2 border-gray-300 border-solid border rounded-lg bg-gray-500 text-white">
      <summary>
        <i className="ri-information-fill text-gray-200" /> Information bloquante
      </summary>
      <div className="p-2 bg-white text-black mt-2 rounded-lg">
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
          <span className="ml-2">Masquer les petits détails (ids, tags, codes RéponseConso)</span>
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
        <Node key={a.id} anomaly={a} open={openAll} {...{displayExtra}} />
      ))}
    </ContentPageContainer>
  )
}

export default Arbo
