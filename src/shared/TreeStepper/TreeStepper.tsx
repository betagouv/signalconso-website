import {Fragment, ReactNode} from 'react'

export interface TreeStepperNode {
  id: string
  if?: boolean
  isDone?: boolean
  render: () => ReactNode
  children?: TreeStepperNode[]
}

interface Props {
  renderDone?: ReactNode
  tree: TreeStepperNode[]
}

const x = (tree: TreeStepperNode[]): TreeStepperNode[] => {
  const theOne = tree.find(_ => _.if) ?? tree[tree.length - 1]
  if (theOne.isDone && theOne.children) return [theOne, ...x(theOne.children)]
  return [theOne]
}

export const TreeStepper = ({renderDone, tree}: Props) => {
  const shown = x(tree)
  const last = shown[shown.length - 1]
  const allDone = last.isDone && !last.children
  console.log('treestepper', shown)
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
