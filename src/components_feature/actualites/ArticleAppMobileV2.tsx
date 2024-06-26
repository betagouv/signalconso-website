import appV2_1 from "@/img/actualites/app-v2-1.png";
import appV2_2 from "@/img/actualites/app-v2-2.png";
import appV2_3 from "@/img/actualites/app-v2-3.png";
import appV2_4 from "@/img/actualites/app-v2-4.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export function ArticleAppMobileV2() {
  return (
    <>
      <div className="flex gap-4 md:flex-row flex-col mb-8">
        <Image className="hidden md:block" src={appV2_1} width={195} height={423} alt=""/>
        <div>
          <h2 className="text-xl">SignalConso, la plateforme de la DGCCRF permettant d’effectuer des signalements et de
            déposer des
            réclamations sur des problèmes liés à la consommation, est accessible sur internet ainsi que sur smartphone,
            grâce à son application.</h2>
          <p>Disponible sur <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093"
                                  target="_blank">iOS</Link> et <Link
            href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso&hl=ln&pli=1"
            target="_blank">Google Play</Link>, <strong>celle-ci fait peau neuve pour proposer de toutes nouvelles
            fonctionnalités
            afin d’accompagner vos démarches toujours plus loin. On fait le point.</strong></p>
          <p>Vous avez rencontré un problème avec une entreprise ? Ayez le réflexe <Link
            href="https://signal.conso.gouv.fr/fr" target="_blank">SignalConso</Link> et signalez le litige
            afin
            de le résoudre ! La plateforme vous permet également de vous informer sur vos droits en tant que
            consommateur.
            Disponible en français et <Link href="https://signal.conso.gouv.fr/en" target="_blank">en anglais</Link>,
            elle dispose également d’une application mobile qui permet dorénavant
            d’avoir accès à des <strong>fonctionnalités innovantes et personnalisées.</strong></p>
        </div>
        <Image className="block md:hidden" src={appV2_1} width={195} height={423} alt=""/>
      </div>
      <div className="flex gap-4 md:flex-row flex-col mb-8">
        <div>
          <h2 className="text-xl">Un meilleur suivi des litiges</h2>
          <p>La DGCCRF a renforcé depuis quelques mois le dispositif de suivi des signalements, qu’ils soient faits
            depuis l’application ou depuis le site internet. Le professionnel doit ainsi lui préciser ce qu’il entend
            faire pour répondre au signalement : demande de complément d’information, remplacement du produit
            défectueux, remboursement, etc… De même, <strong>une fois le signalement traité et clos par le
              professionnel, le
              consommateur concerné est interrogé pour savoir si l’engagement du professionnel a été tenu.</strong>
          </p>
        </div>
        <Image src={appV2_2} width={238} height={423} alt=""/>
      </div>
      <div className="flex gap-4 md:flex-row flex-col mb-8">
        <Image className="hidden md:block" src={appV2_3} width={202} height={438} alt=""/>
        <div>
          <h2 className="text-xl">Vos rappels conso dans un récap quotidien</h2>
          <p><Link href="https://rappel.conso.gouv.fr/" target="_blank">RappelConso</Link>, le site d’alertes sur les
            produits dangereux, rejoint également l’application <Link href="https://signal.conso.gouv.fr/fr"
                                                                      target="_blank">SignalConso</Link>. Les
            rappels de produits sont maintenant accessibles depuis votre application, en sélectionnant l’onglet «
            Rappels » en bas à droite de votre écran. <strong>La plateforme vous offre la possibilité de recevoir sur
              votre
              smartphone une notification quotidienne regroupant les derniers rappels, selon les catégories que vous
              aurez
              sélectionnées</strong> (alimentation, sports, appareils électriques…). Vous n’avez désormais plus
            l’obligation de
            consulter le site internet pour vous informer sur les derniers produits concernés !</p>
          <p>Vous êtes parent ou vous occupez d’un enfant en bas âge ? <Link href="https://signal.conso.gouv.fr/fr"
                                                                             target="_blank">SignalConso</Link> prévoit
            même des notifications de
            rappels dédiées aux produits alimentaires infantiles. De quoi vous simplifier la vie au quotidien !</p>
        </div>
        <Image className="block md:hidden" src={appV2_3} width={202} height={438} alt=""/>
      </div>
      <div className="flex gap-4 md:flex-row flex-col mb-8">
        <div>
          <h2 className="text-xl">L’actualité conso disponible partout, tout le temps</h2>
          <p>Grâce à l’évolution de l’application, vous pouvez aujourd’hui consulter tous les conseils pratiques et les
            résultats d’enquêtes de la DGCCRF directement sur votre smartphone, sans avoir à les chercher. Les
            informations arrivent directement dans votre flux, dans l’onglet « Actualités » situé sur le bandeau, en bas
            de l’écran. Vous êtes ainsi au courant de toutes les informations concernant le domaine de la consommation
            et ce, dès leur publication.</p>
          <Image className="block md:hidden mb-8" src={appV2_4} width={239} height={425} alt=""/>
          <h2 className="text-xl">Liens vers SignalConso sur les stores 👉</h2>
          <Link href="https://apps.apple.com/fr/app/signalconso/id6447964093" target="_blank">iOS</Link>
          <br/>
          <Link href="https://play.google.com/store/apps/details?id=com.signalconso.signalconso&hl=ln&pli=1"
                target="_blank">Google Play</Link>
          <h2 className="text-xl mt-8">Liens utiles 👉</h2>
          <Link href="https://signal.conso.gouv.fr/fr/comment-ca-marche" target="_blank">Comment ça marche ?</Link>
          <br/>
          <Link href="https://aide.signal.conso.gouv.fr/fr/" target="_blank">Aide SignalConso</Link>
          <br/>
          <Link
            href="https://www.economie.gouv.fr/dgccrf/Publications/Vie-pratique/Fiches-pratiques/litiges-consommation-courante"
            target="_blank">Comment régler un litige de la consommation ?</Link>
        </div>
        <Image className="hidden md:block" src={appV2_4} width={239} height={425} alt=""/>
      </div>
    </>

  )
}