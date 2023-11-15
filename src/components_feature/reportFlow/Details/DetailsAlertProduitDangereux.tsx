import React from 'react'
import {Alert} from '@codegouvfr/react-dsfr/Alert'
import Link from 'next/link'
import {useI18n} from '@/i18n/I18n'

const liensNumerosUrgence = 'https://www.service-public.fr/particuliers/vosdroits/F33954'

export const DetailsAlertProduitDangereux = () => {
  const {m} = useI18n()
  return (
    <Alert
      title={m.detailsAlertProduitDangereux.title}
      severity="warning"
      description={
        <>
          {m.detailsAlertProduitDangereux.text}{' '}
          <Link href={liensNumerosUrgence} target="_blank">
            {m.detailsAlertProduitDangereux.linkText}
          </Link>
        </>
      }
      className="mb-8"
    />
  )
}
