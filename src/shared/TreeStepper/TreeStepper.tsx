import {Fragment, ReactNode} from 'react'
import {useEffectFn, useMemoFn} from '../../alexlibs/react-hooks-lib'
import {last} from 'core/lodashNamedExport'
import {map} from '../../alexlibs/ts-utils'

export interface TreeStepperNode {
  id?: string
  if?: boolean
  done?: boolean
  render: () => ReactNode
  children?: TreeStepperNode[]
}

interface Props {
  onComplete?: () => void
  renderOnComplete?: ReactNode
  tree: TreeStepperNode[]
}

const findPath = (tree: TreeStepperNode[]): TreeStepperNode[] => {
  const theOne = tree.find(_ => _.if) ?? map(last(tree), _ => (_.if === false ? undefined : _))
  if (theOne === undefined) return []
  if (theOne.done && theOne.children) return [theOne, ...findPath(theOne.children)]
  return [theOne]
}

export const TreeStepper = ({onComplete, renderOnComplete, tree}: Props) => {
  const shown = findPath(tree)
  const last = shown[shown.length - 1]
  const allDone = useMemoFn(last, _ => _.done && !_.children?.find(_ => _.done !== false))

  useEffectFn(allDone, _ => _ && onComplete?.())

  return (
    <>
      {shown.map((x, i) => (
        <Fragment key={i}>{x.render()}</Fragment>
      ))}
      {allDone && renderOnComplete}
    </>
  )
}
