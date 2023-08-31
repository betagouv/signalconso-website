'use client'

import Link from 'next/link'

export function ArticleSignalConsoTraduit() {
  return (
    <div>
      <p>
        <b>SignalConso</b> devient bilingue ! L’application mobile et le site destinés à accompagner les consommateurs souhaitant
        signaler une pratique commerciale trompeuse, ont été traduits en anglais en vue de la coupe du monde de rugby 2023 !
      </p>
      <p>
        Billetterie, transports, restaurants, hébergements, paiements, … En cas de problème de consommation avec un professionnel,
        signalez-le en quelques clics ici :&nbsp;
        <Link href="https://signal.conso.gouv.fr/en" target="_blank">
          https://signal.conso.gouv.fr/en
        </Link>
      </p>
      <p>
        Cette version de SignalConso, en anglais, vous est dédiée. Vous pouvez également y déposer un signalement si vous avez un
        litige suite à un achat sur un site internet français. Si vous êtes à l'aise avec le français, basculez sur&nbsp;
        <Link href="https://signal.conso.gouv.fr/fr" target="_blank">
          la version compléte du site.
        </Link>
      </p>
      <p>
        Plus d’informations sur le&nbsp;
        <Link href="https://www.economie.gouv.fr/dgccrf/faq-coupe-du-monde-de-rugby-2023-et-jo-2024" target="_blank">
          site de la répression des fraudes (DGCCRF)
        </Link>
      </p>
    </div>
  )
}
