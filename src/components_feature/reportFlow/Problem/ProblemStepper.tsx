import React, {ReactElement, ReactNode, useMemo} from 'react'

interface ProblemStepperProps {
  renderDone?: ReactNode
  children: Array<ReactElement<ProblemStepProps>>
}

export const ProblemStepper = ({children, renderDone}: ProblemStepperProps) => {
  const isDone = useMemo(() => {
    return children.every(_ => _.props.hidden || _.props.isDone)
  }, [children])

  const displayedChildren: ReactElement<ProblemStepProps>[] = []
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (!child.props.hidden) {
      displayedChildren.push(child)
      if (!child.props.isDone) break
    }
  }
  return (
    <>
      {displayedChildren}
      {isDone && renderDone}
    </>
  )
}

interface ProblemStepProps {
  isDone?: boolean
  hidden?: boolean
  children: ReactNode
}

export const ProblemStepperStep = ({children}: ProblemStepProps) => {
  return <>{children}</>
}
