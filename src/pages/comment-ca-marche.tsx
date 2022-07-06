import {ReactNode} from 'react'
import {Panel, PanelBody} from 'shared/Panel/Panel'
import {Page} from 'shared/Page/Page'
import {Box} from '@mui/material'
import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
// import Image from 'next/image'
// import consumerImg from '../../public/image/illustrations/consumer.png'
// import reportImg from '../../public/image/illustrations/report.png'
// import companyImg from '../../public/image/illustrations/company.png'
// import dgccrfImg from '../../public/image/illustrations/dgccrf.png'

const Card = ({title, img, children}: {title: string; img: string; children?: ReactNode}) => {
  return (
    <Panel>
      <Head>
        <title>{pageDefinitions.commentCaMarche.title}</title>
        <meta name="description" content={pageDefinitions.commentCaMarche.description} />
      </Head>
      <PanelBody>
        <h3>{title}</h3>
        <Box sx={{display: 'flex'}}>
          <Box sx={{mr: 2}}>{children}</Box>
          <img src={img} width="200px" height="200px" />
        </Box>
      </PanelBody>
    </Panel>
  )
}
const CommentCaMarche = () => {
  return (
    <Page size="small" className="blog">
      <h1>Comment ça marche ?</h1>
      <Card img="image/illustrations/consumer.png" title="1. Vous avez rencontré un problème avec une entreprise ?">
        <p>
          Vous avez rencontré un problème avec un professionnel, un commerce, en magasin ou sur internet ? En tant que
          consommateur, vous pouvez le signaler sur la plateforme SignalConso.
        </p>
        <p>
          Vous n’êtes pas sûr que ce soit un problème? SignalConso vous guide afin de savoir si vous pouvez déposer un
          signalement. Si ce n’est pas le cas, on vous expliquera pourquoi !
        </p>
      </Card>
      <Card
        img="image/illustrations/report.png"
        title="2. Déposez un signalement sur SignalConso ou posez une question à la répression des fraudes."
      >
        <p>
          Signalez le problème (anonymement ou non) en choisissant la bonne catégorie sur la page d’accueil du site et en vous
          laissant guider par les questions ;
        </p>
        <p>Ou</p>
        <p>Posez directement votre question auprès d’un agent de la DGCCRF.</p>
        <p>Dans tous les cas, SignalConso vous oriente et vous conseille.</p>
      </Card>
      <Card img="image/illustrations/company.png" title="3. L’entreprise et la répression des fraudes sont informées.">
        <p>
          Si vous avez déposé un signalement, SignalConso contacte l’entreprise afin de l’en informer. L’entreprise peut alors
          vous répondre et/ou s’améliorer, vous serez informés de son action par un email de SignalConso. Si vous avez choisi de
          transmettre vos coordonnées à l’entreprise, elle pourra vous contacter directement.
        </p>
        <p>
          Si vous avez posé une question à un agent de la DGCCRF, vous serez directement contactés par un agent pour une prise en
          charge.
        </p>
      </Card>
      <Card img="image/illustrations/dgccrf.png" title="4. La répression des fraudes intervient si nécessaire.">
        <p>Votre signalement est enregistré dans la base de données de la répression des fraudes (DGCCRF).</p>
        <p>
          Les signalements deviennent trop nombreux pour une même entreprise ? Le problème est considéré comme grave par les
          enquêteurs ? La répression des fraudes peut décider de surveiller ou de contrôler une entreprise grâce à votre
          signalement.
        </p>
      </Card>
    </Page>
  )
}

export default CommentCaMarche
