import {Fragment, ReactNode} from 'react'

export interface TreeStepperNode {
  id?: string
  if?: boolean
  done?: boolean
  render: () => ReactNode
  children?: TreeStepperNode[]
}

interface Props {
  renderDone?: ReactNode
  tree: TreeStepperNode[]
}

const findPath = (tree: TreeStepperNode[]): TreeStepperNode[] => {
  const theOne = tree.find(_ => _.if) ?? tree[tree.length - 1]
  if (theOne.done && theOne.children) return [theOne, ...findPath(theOne.children)]
  return [theOne]
}

export const TreeStepper = ({renderDone, tree}: Props) => {
  const shown = findPath(tree)
  const last = shown[shown.length - 1]
  const allDone = last.done && !last.children
  return (
    <>
      {shown.map((x, i) =>
        <Fragment key={i}>
          {x.render()}
        </Fragment>
      )}
      {allDone && renderDone}
    </>
  )
}
