import React, {ReactElement, ReactNode} from 'react'

// To avoid indented tree hell
// https://stackoverflow.com/questions/51504506/too-many-react-context-providers/58924810#58924810
export const ProvidersChain = ({
  children,
  providers,
}: {
  children: React.ReactNode
  providers: ((children: ReactNode) => ReactElement<any>)[]
}) => {
  return <>{providers.reduceRight((componentTree, component) => component(componentTree), children)}</>
}
