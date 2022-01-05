import React, {useMemo, useState} from 'react'
import {ScRadioGroupItem} from '../../../shared/RadioGroup/RadioGroupItem'
import {config} from '../../../conf/config'
import {ScRadioGroup} from '../../../shared/RadioGroup/RadioGroup'
import {Category, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {useCssUtils} from '../../../core/theme/useCssUtils'
import {capitalize, Slide} from '@mui/material'
import {messages} from '../../../conf/messages'
import {ScButton} from '../../../shared/Button/Button'
import {useStepperContext} from '../../../shared/Stepper/Stepper'
import {useReportFlowContext} from '../ReportFlowContext'
import {Txt} from 'mui-extension/lib'
import {useProblemUtils} from './useProblemUtils'

interface Props {
  anomaly: Category
  m: typeof messages
}




export const Problem = ({anomaly, m}: Props) => {
  const shouldDisplayReponseConso = useMemo(() => Math.random() * 100 < config.reponseConsoDisplayRate, [])

  const _reportFlow = useReportFlowContext()
  const _stepper = useStepperContext()
  const [selectedTitle, setSelectedTitle] = useState<string[]>([])
  const [employeeConsumer, setEmployeeConsumer] = useState<boolean>(false)

  const {
    selectedSubCategories,
    tagsFromSelected,
    lastSubcategories,
    isLastSubcategory,
    showEmployeeConsumer,
  } = useProblemUtils(anomaly, selectedTitle)


  const handleSubcategoriesChange = (subcategories: Subcategory[], index: number, selectedTitle: string) => {
    setSelectedTitle(_ => {
      _.length = index
      _[index] = selectedTitle
      return [..._]
    })
  }

  return (
    <>
      {/*<div>tagsFromSelectedSubcategories</div>*/}
      {/*<div>{JSON.stringify(tagsFromSelectedSubcategories)}</div>*/}
      {/*<hr/>*/}
      {/*<div>selectedTitle</div>*/}
      {/*<div>{JSON.stringify(selectedTitle)}</div>*/}
      {/*<hr/>*/}
      {/*<div>subCategoriesToDisplay</div>*/}
      {/*<textarea rows={30} cols={80}>{JSON.stringify(subCategoriesToDisplay ?? anomaly.subcategories, undefined, 2)}</textarea>*/}
      {/*<hr/>*/}
      {(selectedSubCategories).map((c, i) =>
        <Select
          key={c.id}
          title={anomaly.subcategoriesTitle}
          value={selectedTitle[i]}
          options={(c.subcategories ?? []).map((_, i) => ({
            title: _.title,
            description: _.example,
            value: _.title
          }))}
          onChange={title => handleSubcategoriesChange(c.subcategories ?? [], i, title)}
        />
      )}
      {showEmployeeConsumer && (
        <Select
          title="Travaillez-vous dans l'entreprise que vous souhaitez signaler ?"
          value={_reportFlow.reportDraft?.employeeConsumer}
          options={[{
            title: 'Je souhaite signaler mon problème personnel à l’entreprise pour qu’elle trouve une solution',
            description: 'La répression des fraudes sera informée',
            value: false
          }, {
            title: 'Je souhaite poser une question sur mes droits',
            value: true
          }]}
          onChange={setEmployeeConsumer}
        />
      )}
      <ScButton color="primary" variant="contained" onClick={_stepper.next}>{m.next}</ScButton>
    </>
  )
}

interface ProblemCatProps {
  index?: number
  anomaly: Category
  onChange: (title: string[]) => void
}

// const ProblemCat = ({anomaly, onChange, index = 0}: ProblemCatProps) => {
//   const [selected, setSelected] = useState<Subcategory | undefined>()
//   const [subSelected, setSubSelected] = useState<Subcategory | undefined>()
//   useEffect(() => {
//     console.log(selected, subSelected)
//   }, [selected, subSelected])
//   return (
//     <>
//       {fromNullable(anomaly.subcategories).map(subcategories => (
//         <Select
//           title={anomaly.subcategoriesTitle}
//           value={'' + selected}
//           options={subcategories.map((_, i) => ({
//             title: _.title,
//             description: _.example,
//             value: '' + i
//           }))}
//           onChange={i => setSelected(subcategories[+i])}
//         />
//       )).toUndefined()}
//       {selected && (selected.subcategories ? (
//         <ProblemCat index={index + 1} anomaly={selected} onChange={i => setSubSelected(selected.subcategories![+i])}/>
//       ) : (
//         <div>Done</div>
//       ))}
//     </>
//   )
// }

interface XProps<T> {
  title?: string,
  value?: T
  onChange: (_: T) => void
  options: {
    title: string
    description?: string
    value: T
  }[],
}

const Select = <T, >({
  title,
  value,
  options,
  onChange
}: XProps<T>) => {
  const css = useCssUtils()
  // const [selected, setSelected] = useState<T | undefined>(value)
  return (
    <Slide direction="up" in={true} mountOnEnter unmountOnExit>
      <div>
        <Txt block size="title" gutterBottom dangerouslySetInnerHTML={{__html: title ?? 'Pouvez-vous préciser ?'}}/>
        <ScRadioGroup value={value} onChange={_ => onChange(_)} className={css.marginBottom2}>
          {options.map(option =>
            <ScRadioGroupItem
              key={option.value + ''}
              value={option.value}
              title={capitalize(option.title)}
              description={option.description}
            />
          )}
        </ScRadioGroup>
      </div>
    </Slide>
  )
}
