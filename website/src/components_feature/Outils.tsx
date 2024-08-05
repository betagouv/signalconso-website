'use client'

import {ContentPageContainer} from '@/components_simple/PageContainers'
import {pagesDefs} from '@/core/pagesDefinitions'
import Link from 'next/link'

export default function Outils() {
  return (
    <ContentPageContainer>
      <h1 className="text-center">Outils à usage interne</h1>
      <div className="flex flex-col gap-2 items-center">
        <Link href={pagesDefs.playground.url}>Le playground</Link>
        <Link href={pagesDefs.arborescence.url}>L'arborescence</Link>
        <Link href={pagesDefs.arboLinksExtract.url}>Liste des liens de l'arborescence</Link>
      </div>
    </ContentPageContainer>
  )
}
