import {ReactNode, useEffect, useRef} from 'react'

// Adds a div that take focus immediately
// The accessibility audit asked for this
// specifically for the content appearing after typing a website in the input
export function AutofocusedDiv({children}: {children: ReactNode}) {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    divRef.current?.focus()
  })
  return (
    <div ref={divRef} tabIndex={-1}>
      {children}
    </div>
  )
}
