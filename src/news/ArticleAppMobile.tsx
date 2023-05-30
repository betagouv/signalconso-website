import Image from 'next/image'
import Link from 'next/link'

export function ArticleAppMobile() {
  return (
    <div>
      <div className="float-left mr-4">
        <Image
          width={177}
          height={193}
          src={`/image/news/mobile_app_screenshots.png`}
          alt={`Captures d'écran de l'application`}
        />
      </div>
      <p>
        Découvrez dès maintenant la nouvelle application mobile SignalConso, qui rend vos signalements en tant que consommateur
        encore plus faciles et simplifie vos démarches. Téléchargez gratuitement l'application sur l'
        <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093" target="_blank">
          App Store
        </Link>{' '}
        ou le{' '}
        <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso" target="_blank">
          Play Store
        </Link>{' '}
        et profitez des mêmes fonctionnalités que celles offertes par notre site internet.
      </p>
      <p>
        Grâce à cette application, vous pouvez signaler rapidement tout problème lié à votre consommation (livraison, prix,
        qualité, contrat, etc.) et obtenir des informations sur vos droits en seulement quelques clics.
      </p>
      <p>
        Avec plus de 320 000 utilisateurs et plus de 500 000 signalements depuis son lancement en 2020 par Bruno Le Maire,
        Ministre de l'Économie, des Finances et de la Souveraineté industrielle et numérique, SignalConso a su répondre aux
        attentes des consommateurs. Au cours des 12 derniers mois, pas moins de 195 000 signalements ont été déposés, dont 75 000
        pour des achats en ligne, 23 000 pour des achats en magasin, 18 000 pour des travaux de rénovation et 14 000 liés aux
        voyages et aux loisirs. Les sites internet représentent plus de 43 % des signalements, couvrant des problématiques telles
        que la qualité des produits, les délais de livraison, les conditions de garantie, de rétractation ou de remboursement,
        ainsi que les défauts de mentions légales, etc.
      </p>
      <p>
        SignalConso est une application facilement accessible qui répond à un véritable besoin en matière de résolution des
        litiges de consommation au quotidien. Même si tous les consommateurs ne voient pas leurs problèmes résolus, 8 sur 10
        recommandent SignalConso sur Services Publics +, la plateforme dédiée à l'amélioration des services publics.
      </p>
      <p>
        <strong>
          N'attendez plus, mettez SignalConso dans votre poche et faites valoir vos droits en tant que consommateur en toute
          simplicité !
        </strong>
      </p>
      {/* this banner is too large for mobile viewports, and unreadable if scaled down  */}
      <div className="hidden lg:block">
        <Image
          width={784}
          height={416}
          src={`/image/news/signalconso_promo_banner.jpg`}
          alt={`Bannière de présentation de SignalConso`}
        />
      </div>
    </div>
  )
}
