import Link from 'next/link'
import Image from 'next/image'

export function ArticleAccessibilite() {
  return (
    <div>
      <h2>Faciliter la gestion des litiges entre les entreprises et les consommateurs</h2>
      <p>
        <b>SignalConso</b>, la plateforme incontournable{' '}
        <Link href="https://signal.conso.gouv.fr" target="_blank">
          pour aider les consommateurs
        </Link>
        , a récemment subi une mise à jour esthétique. Cependant, l'objectif principal de ces changements ne réside pas seulement
        dans l'aspect visuel, mais vise avant tout à améliorer l'accessibilité du site conformément aux normes du Référentiel
        Général d'Accessibilité pour les Administrations (RGAA). Dans cet article, nous explorerons les améliorations apportées à{' '}
        <b>SignalConso</b>, mettant l'accent sur l'accessibilité accrue et l'expérience utilisateur améliorée.
      </p>
      <h2>Contrastes de textes améliorés pour une meilleure lisibilité</h2>
      <p>
        L'une des premières modifications importantes concerne les contrastes de textes. En choisissant des couleurs optimisées
        pour les polices et les arrière-plans,
        <b>SignalConso</b> assure une meilleure lisibilité pour tous les utilisateurs, y compris ceux souffrant de déficiences
        visuelles. Ces ajustements de couleurs garantissent que le texte est clairement visible, sans aucune gêne liée à la
        lecture.
      </p>
      <h2>Navigation par tabulations pour une accessibilité renforcée</h2>
      <p>
        Une avancée significative a été réalisée en rendant <b>SignalConso</b> accessible aux personnes ayant des troubles de la
        mobilité ou qui préfèrent naviguer au clavier. Désormais, les utilisateurs peuvent accéder à toutes les fonctionnalités du
        site en utilisant simplement la navigation par tabulations. Cette fonctionnalité renforcée permet aux personnes dépendant
        de technologies d'assistance de bénéficier d'une expérience de navigation plus fluide et inclusive.
      </p>
      <p>
        De plus, <b>SignalConso</b> reprend le Système de Design de l'État (SDE). SDE est un projet essentiel qui fait partie
        intégrante de la marque de l'État. Son objectif est d'offrir une cohérence graphique et une expérience utilisateur
        améliorée à travers l'ensemble des sites web gouvernementaux. En fournissant des composants réutilisables, respectant des
        normes strictes et une gouvernance bien définie, le SDE permet la création de sites Internet accessibles, ergonomiques et
        conformes aux standards de l'administration.
      </p>
      <h2>Valoriser l’accessibilité pour faciliter le parcours utilisateur dans leur signalement de consommation</h2>
      <p>
        Avec ces améliorations esthétiques et fonctionnelles, `SignalConso` s'est engagé dans une démarche résolue d'accessibilité
        et d'expérience utilisateur améliorée. Ces changements reflètent une prise de conscience essentielle en matière
        d'inclusion et d'accessibilité dans le monde numérique d'aujourd'hui. En plaçant les besoins des utilisateurs au cœur de
        ses préoccupations, <b>SignalConso</b> démontre son engagement à fournir des services équitables et accessibles à tous les
        consommateurs, quelles que soient leurs capacités. Grâce à ces efforts, <b>SignalConso</b> consolide sa position de leader
        en matière d'informations et d'<b>assistance aux consommateurs</b>, tout en offrant une expérience utilisateur exemplaire.
      </p>
      <p>Nous avons encore des travaux sur l’accessibilité à réaliser.</p>
      <div className="relative w-[336px] h-[224px] lg:w-[672px] lg:h-[448px] xl:w-[1008px] xl:h-[672px] mx-auto">
        <Image fill src={`/image/actualites/accessibilite.jpg`} alt="" />
      </div>
    </div>
  )
}
