'use client'

import Link from 'next/link'

export function ArticleSignalConsoTranslated() {
  return (
    <div>
      <p>
        <b>SignalConso</b> becomes bilingual! The mobile application and the site intended to support consumers wishing to report
        a misleading commercial practice, have been translated into English for the 2023 Rugby World Cup!
      </p>
      <p>
        Ticketing, transport, restaurants, accommodation, payments, etc. In the event of a consumption problem with a
        professional, report it in a few clicks on &nbsp;
        <Link href="https://signal.conso.gouv.fr/en" target="_blank">
          https://signal.conso.gouv.fr/en
        </Link>
      </p>
      <p>
        This version of SignalConso, in English, is dedicated to you. You can also file a report there if you have a dispute
        following a purchase on a French website. If you are comfortable with French, switch to the &nbsp;
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          full website.
        </Link>
      </p>
      <p>
        More information on the &nbsp;
        <Link
          href="https://www.economie.gouv.fr/dgccrf/2023-rugby-world-cup-and-paris-2024-olympic-and-paralympic-games-consumer-questions"
          target="_blank"
        >
          French Fraud Control website.
        </Link>
      </p>
    </div>
  )
}
