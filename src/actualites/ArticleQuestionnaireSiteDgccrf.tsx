'use client'
import Image from 'next/image'
import Link from 'next/link'
import {useI18n} from '../i18n/I18n'
import {ReactNode} from 'react'

export function ArticleQuestionnaireSiteDgccrf() {
  const {m} = useI18n()
  return (
    <div>
      <p className="">
        La DGCCRF travaille à améliorer{' '}
        <Link href={'https://www.economie.gouv.fr/dgccrf'} target="_blank">
          son site internet
        </Link>{' '}
        pour mieux répondre aux besoins des consommateurs et des professionnels. Pour nous aider à vous satisfaire au maximum,
        nous vous invitons à remplir un petit <LinkQuestionnaire>questionnaire en ligne</LinkQuestionnaire> (ça prend seulement 3
        minutes, promis !).
      </p>
      <p>
        Nous vous remercions d'avance pour le temps que vous y consacrerez et pour vos commentaires. Ne vous inquiétez pas, toutes
        les données collectées resteront confidentielles et seront traitées de manière anonyme.
      </p>
      <div className="relative w-[304px] h-[205px] md:w-[507px] md:h-[342px] mx-auto">
        <LinkQuestionnaire className="fr-raw-link no_external_link_icon">
          <Image fill src={`/image/actualites/donnez-avis-site-internet.png`} alt={'Donnez votre avis sur le site internet'} />
        </LinkQuestionnaire>
      </div>
    </div>
  )
}

function LinkQuestionnaire({children, className = ''}: {children: ReactNode; className?: string}) {
  return (
    <Link
      href={'https://cvip.sphinxonline.net/surveyserver/s/sircom-bec/Evolution_site_dgccrf/questionnaire.htm'}
      target="_blank"
      {...{className}}
    >
      {children}
    </Link>
  )
}
