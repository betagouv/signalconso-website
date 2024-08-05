import {ReactNode, useState} from 'react'

interface Props {
  label: ReactNode
  children: ReactNode
  className?: string
}

export const AccordionInline = ({label, children, className = ''}: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div {...{className}}>
      <button
        className="flex items-center hover:underline text-base text-scbluefrance"
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          setOpen(_ => !_)
        }}
        aria-expanded={open}
      >
        {label}
        <i className={`${open ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} fr-icon--sm`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}
