'use client'

import {startReactDsfr} from '@codegouvfr/react-dsfr/next-appdir'
import Link from 'next/link'

// ------------------------
// Weird file directly copy/pasted from react-dsfr install doc
// https://react-dsfr.codegouv.studio/
// Trust it and do not edit
// ------------------------

declare module '@codegouvfr/react-dsfr/next-appdir' {
  interface RegisterLink {
    Link: typeof Link
  }
}

startReactDsfr({
  defaultColorScheme: 'light',
  Link,
})

export default function StartDsfr() {
  //Yes, leave null here.
  return null
}
