'use client'

import {getOptionsFromInput, getPlaceholderFromInput} from '@/components_feature/reportFlow/Details/DetailInputsUtils'
import {ContentPageContainer} from '@/components_simple/PageContainers'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {useEffect, useState} from 'react'
import {
  allVisibleAnomalies,
  instanceOfAnomaly,
  instanceOfSubcategoryWithInfoWall,
  instanceOfSubcategoryWithInputs,
} from '../anomalies/Anomalies'
import {Anomaly, DetailInputType, StandardSubcategory, Subcategory, SubcategoryWithInfoWall} from '../anomalies/Anomaly'
import {useI18n} from '../i18n/I18n'
import {fnSwitch} from '../utils/FnSwitch'

const Node = ({anomaly, open}: {anomaly: Anomaly | Subcategory; open?: boolean}) => {
  const title = instanceOfAnomaly(anomaly) ? anomaly.category : anomaly.title
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setIsOpen(!!open)
  }, [open])

  return (
    <div className="flex items-start mb-4">
      <div className="w-[40px] mr-[8px]">
        {anomaly.subcategories ? (
          <button
            onClick={() => setIsOpen(_ => !_)}
            className="bg-sclightpurple h-[40px] w-[40px] text-scbluefrance flex items-center ri-arrow-down-s-line justify-center"
          ></button>
        ) : (
          <i className="ri-file-line text-gray-500 mx-2" />
        )}
      </div>
      <div>
        <div className="min-h-[42px] flex flex-col justify-center">
          <p className="mb-0">
            <span dangerouslySetInnerHTML={{__html: title}} /> <span className="text-gray-500">{anomaly.id}</span>
          </p>
          {instanceOfAnomaly(anomaly) && anomaly.description && (
            <p className="text-sm text-gray-500 mb-0" dangerouslySetInnerHTML={{__html: anomaly.description}} />
          )}
          {(anomaly as Subcategory).reponseconsoCode && (
            <span key={1} className="text-sm text-gray-500">
              <b>ReponseConso codes:</b>&nbsp;
              {(anomaly as Subcategory).reponseconsoCode?.join(', ')}
            </span>
          )}
          <div>
            {(anomaly as Subcategory).tags?.map(tag => (
              <div className="mr-2 rounded-lg h-[26px] px-2 bg-gray-300 inline-flex items-center text-sm text-gray-800" key={tag}>
                {tag}
              </div>
            ))}
          </div>
          {instanceOfSubcategoryWithInfoWall(anomaly) && <NodeInfo anomaly={anomaly} />}
          {instanceOfSubcategoryWithInputs(anomaly) && <NodeInput anomaly={anomaly} />}
        </div>
        {isOpen && anomaly.subcategories && (
          <div className="my-2 relative before:h-full before:content-['_'] before:w-[1px] before:absolute before:bg-gray-500 before:left-[-28px]">
            {anomaly.subcategories.map(s => (
              <Node open={open} key={s.id} anomaly={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const NodeInput = ({anomaly}: {anomaly: StandardSubcategory}) => {
  if (anomaly.detailInputs && anomaly.detailInputs.length > 0) {
    return (
      <div className="p-2 my-2 border-gray-300 border-solid border rounded-lg">
        {anomaly.detailInputs?.map(input => (
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
      </div>
    )
  }
  return null
}

const NodeInfo = ({anomaly}: {anomaly: SubcategoryWithInfoWall}) => {
  const {m} = useI18n()
  return (
    <div className="border border-solid border-gray-300 rounded-lg my-2 p-2 ">
      <p className=" bg-gray-500 text-white italic px-2 text-center">(information bloquante)</p>
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
  )
}

const Arbo = () => {
  const [openAll, setOpenAll] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const {m, currentLang} = useI18n()
  const anomalies = allVisibleAnomalies(currentLang)
  return (
    <ContentPageContainer>
      <h1>{m.arbo.title}</h1>
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
        <Node key={a.id} anomaly={a} open={openAll} />
      ))}
    </ContentPageContainer>
  )
}

export default Arbo
