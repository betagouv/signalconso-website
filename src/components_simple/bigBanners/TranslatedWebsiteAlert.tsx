'use client'
import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import {internalPageDefs} from '../../core/pagesDefinitions'
import {useEffect, useId, useState} from 'react'
import {useI18n} from '../../i18n/I18n'
import {LocalStorageEntity} from '../../utils/localStorageApi'

const localStorageHidden = new LocalStorageEntity('translated-limited-website-alert-hidden')

export const TranslatedWebsiteAlert = () => {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const displayAlert = localStorageHidden.load()
    if (displayAlert !== true) {
      setHidden(false)
    }
  }, [])
  function onClose() {
    localStorageHidden.save(true)
    setHidden(true)
  }

  if (hidden) {
    return null
  }

  return (
    <CallOut
      title={'Information'}
      buttonProps={{
        children: 'Close / Fermer',
        onClick: () => onClose(),
      }}
      iconId="ri-information-line"
    >
      <span>
        <div className="m-4">
          Have you encountered a consumption problem during your stay in France? This version of SignalConso is made for you. You
          can also file a report if you have a dispute following a purchase on a French website. If you're comfortable with
          French,{' '}
          <a href={`/fr${internalPageDefs.index.url}`} rel="noreferrer">
            switch to this version
          </a>
          .
          <br />
          <br />
          Tickets, flights, hotels, restaurants, transport, payments…{' '}
          <a
            href="https://www.economie.gouv.fr/dgccrf/2023-rugby-world-cup-and-paris-2024-olympic-and-paralympic-games-consumer-questions"
            rel="noreferrer"
            target="_blank"
          >
            Find all the answers to your questions
          </a>{' '}
          about traveling to France and participating as a spectator in the Rugby World Cup 2023 and the Paris 2024 Olympic and
          Paralympic Games.
        </div>
        <hr style={{borderTop: '1px solid #ccc'}} />
        <div className="m-4">
          Vous avez rencontré un problème de consommation lors de votre séjour en France ? Cette version de SignalConso, en
          anglais, vous est dédiée. Vous pouvez également y déposer un signalement si vous avez un litige suite à un achat sur un
          site internet français. Si vous êtes à l'aise avec le français,{' '}
          <a href={`/fr${internalPageDefs.index.url}`} rel="noreferrer">
            basculez sur cette version
          </a>
          .
          <br />
          <br />
          Billets, avion, hôtels, restaurants, transports, paiements…{' '}
          <a
            href="https://www.economie.gouv.fr/dgccrf/faq-coupe-du-monde-de-rugby-2023-et-jo-2024"
            rel="noreferrer"
            target="_blank"
          >
            Retrouvez toutes les réponses à vos questions
          </a>{' '}
          sur votre voyage en France et votre participation en tant que spectateur à la Coupe du monde de rugby 2023 et aux Jeux
          olympiques et paralympiques de Paris 2024.
        </div>
      </span>
    </CallOut>
  )
}
