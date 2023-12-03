import {useColors} from '@codegouvfr/react-dsfr/useColors'
import {ReactNode} from 'react'

export function FriendlyHelpText({children}: {children: ReactNode}) {
  const theme = useColors()
  return (
    <div
      className="py-4 px-8 my-4"
      style={{
        background: theme.decisions.background.contrast.info.default,
        color: theme.decisions.text.default.info.default,
        borderTop: '1px solid #0063cb',
        borderBottom: '1px solid #0063cb',
        lineHeight: '1.3',
      }}
    >
      {children}
    </div>
  )
}
