import React from 'react'
import Link from 'next/link'

export function ArticleConsommationDurable() {
  return (
    <div>
      <p>
        Vous connaissez déjà SignalConso pour signaler des problèmes comme des produits défectueux ou des prix mal affichés. Mais
        saviez-vous que vous pouvez aussi l’utiliser pour encourager une consommation plus durable ?
      </p>

      <h2 className="text-2xl">Transition écologique et consommation durable : quel rôle pour la DGCCRF ?</h2>
      <p>
        La DGCCRF joue un rôle actif dans la transition écologique. Elle s’attaque aux défis environnementaux à travers des
        initiatives telle que la promotion de l’écoconception, la lutte contre le suremballage et la réduction de l'impact
        environnemental des produits.
      </p>
      <p>
        En plus de lutter contre le greenwashing, la DGCCRF encadre des secteurs comme la rénovation énergétique et le
        reconditionnement de produits. Elle sensibilise les consommateurs et les entreprises en combinant actions pédagogiques et
        contrôles rigoureux des nouvelles réglementations, telles que l’étiquetage énergétique ou l'indice de réparabilité.
      </p>

      <h2 className="text-2xl">Pourquoi ça vous concerne et quels types de problèmes signaler sur SignalConso ?</h2>
      <p>
        Si vous êtes soucieux de l’environnement, SignalConso est un outil précieux pour vous. Vous pouvez en effet y signaler des
        entreprises qui ne respectent pas leurs promesses écologiques. Vous voyez un produit soi-disant "écolo" mais qui est
        couvert de plastique inutile ou d’emballages non recyclables ? Une marque qui trompe les consommateurs avec des publicités
        « vertes » (greenwashing) ? Des articles qui pourraient être réutilisables, mais qui sont conçus pour être jetés après
        usage ? Signalez ces pratiques directement sur la plateforme.
      </p>
      <p>
        Vos signalements peuvent aider la DGCCRF à faire respecter les lois en vigueur. Leur objectif est clair : encourager les
        entreprises à adopter des pratiques responsables et à respecter les consommateurs.
      </p>

      <h2 className="text-2xl">La matinale « Démocratie et consommation durable » : Un événement à ne pas manquer !</h2>
      <p>
        Dans le cadre de la semaine européenne du développement durable, la DGCCRF organise le 8 octobre 2024, à 10h, une matinale
        intitulée « Pouvoir d’achat, inégalités et consommation durable ».
      </p>
      <p>
        Ce sera l’occasion de discuter de la manière dont les consommateurs et les entreprises peuvent allier consommation
        responsable et préservation du pouvoir d’achat.
      </p>
      <p>
        Vous avez un rôle à jouer ! En signalant les mauvaises pratiques via SignalConso, vous contribuez à une consommation plus
        juste et respectueuse de la planète. N'attendez plus pour faire entendre votre voix et agir pour une consommation plus
        durable.
      </p>

      <p>
        Cliquez sur le lien suivant pour participer à la Matinale :{' '}
        <Link
          href="https://join.video.orange-business.com/invited.sf?id=6200004629&secret=8e537b75-34b4-441c-a62a-f10e7e11f791"
          target="_blank"
        >
          https://join.video.orange-business.com/invited.sf?id=6200004629&secret=8e537b75-34b4-441c-a62a-f10e7e11f791
        </Link>
      </p>
      <p>
        Vous pourrez poser vos questions pendant le webinaire sur le compte LinkedIn de la DGCCRF :{' '}
        <Link href="https://fr.linkedin.com/company/dgccrf" target="_blank">
          DGCCRF – Ministère de l’Économie
        </Link>
      </p>
    </div>
  )
}
