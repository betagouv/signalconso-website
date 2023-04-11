import {StaticContentPage} from 'components_simple/HelpPageLayout'
import {pageDefinitions} from 'core/pageDefinition'
import Head from 'next/head'
import Image from 'next/image'
import {ReactNode} from 'react'

export const CommentCaMarche = () => {
  return (
    <>
      <Head>
        <title>{pageDefinitions.commentCaMarche.title}</title>
        <meta name="description" content={pageDefinitions.commentCaMarche.description} />
      </Head>
      <StaticContentPage>
        <h1>Comment ça marche ?</h1>
        <div className="space-y-6">
          <Card img="/image/illustrations/consumer.png" title="1. Vous avez rencontré un problème avec une entreprise&nbsp;?">
            <p>
              Vous avez rencontré un problème avec un professionnel, un commerce, en magasin ou sur internet ? En tant que
              consommateur, vous pouvez le signaler sur la plateforme SignalConso.
            </p>
            <p>
              Vous n’êtes pas sûr que ce soit un problème ? SignalConso vous guide afin de savoir si vous pouvez déposer un
              signalement. Si ce n’est pas le cas, on vous expliquera pourquoi !
            </p>
          </Card>
          <Card
            img="/image/illustrations/report.png"
            title="2. Déposez un signalement sur SignalConso ou posez une question à la répression des fraudes."
          >
            <p>
              Signalez le problème (anonymement ou non) ou posez directement votre question auprès d’un agent de la DGCCRF (la
              répression des fraudes).
            </p>
            <p>Dans tous les cas, SignalConso vous oriente et vous conseille.</p>
          </Card>
          <Card img="/image/illustrations/company.png" title="3. L’entreprise et la répression des fraudes sont informées.">
            <p>
              Si vous avez déposé un signalement, SignalConso contacte l’entreprise afin de l’en informer. L’entreprise peut alors
              vous répondre et/ou s’améliorer, vous serez informés de son action par un email de SignalConso. Si vous avez choisi
              de transmettre vos coordonnées à l’entreprise, elle pourra vous contacter directement.
            </p>
            <p>
              Si vous choisissez d’interroger la DGCCRF sur vos droits, une réponse individualisée vous sera adressée par mail par
              un agent de la DGCCRF.
            </p>
          </Card>
          <Card img="/image/illustrations/dgccrf.png" title="4. La répression des fraudes intervient si nécessaire.">
            <p>Votre signalement est enregistré dans la base de données de la DGCCRF.</p>
            <p>
              Les signalements deviennent trop nombreux pour une même entreprise ? Le problème est considéré comme grave par les
              enquêteurs ? La répression des fraudes peut décider de surveiller ou de contrôler une entreprise grâce à votre
              signalement.
            </p>
          </Card>
        </div>
      </StaticContentPage>
    </>
  )
}

const Card = ({title, img, children}: {title: string; img: string; children?: ReactNode}) => {
  return (
    <div className="flex flex-col-reverse items-center sm:flex-row">
      <div className="mr-2">
        <h2 className="fr-h4">{title}</h2>
        {children}
      </div>
      <div className="shrink-0">
        <Image src={img} alt="illustration" width={200} height={200} priority />
      </div>
    </div>
  )
}
