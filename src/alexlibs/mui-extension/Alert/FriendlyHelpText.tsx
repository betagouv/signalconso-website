import {ReactNode} from 'react'
import {alertInfoBackgroundColor, alertInfoTextColor} from './Alert'
import {useColors} from '@codegouvfr/react-dsfr/useColors'

export function FriendlyHelpText({children}: {children: ReactNode}) {
  const test = useColors()
  return (
    <div
      className="py-4 px-8 my-4"
      style={{
        background: test.decisions.background.contrast.info.default,
        color: test.decisions.text.default.info.default,
        lineHeight: '1.3',
      }}
    >
      {children}
    </div>
  )
}
