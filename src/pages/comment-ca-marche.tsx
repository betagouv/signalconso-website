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

const Card = ({
  title,
  img,
  children
}: {
  title: string
  img: string
  children?: ReactNode
}) => {
  return (
    <Panel>
      <Head>
        <title>{pageDefinitions.commentCaMarche.title}</title>
        <meta name="description" content={pageDefinitions.commentCaMarche.description}/>
      </Head>
      <PanelBody>
        <h3>{title}</h3>
        <Box sx={{display: 'flex',}}>
          <Box sx={{mr: 2}}>{children}</Box>
          <img src={img} width="200px" height="200px"/>
        </Box>
      </PanelBody>
    </Panel>
  )
}
const CommentCAMarche = () => {
  return (
    <Page size="small" className="blog">
      <h1>Comment ça marche ?</h1>
      <Card img="image/illustrations/consumer.png" title="1. Vous avez rencontré un problème avec une entreprise ?">
        <p>
          Vous pouvez faire remonter votre problème sur le site SignalConso.
        </p>
        <p>
          Vous n’êtes pas sûr que ce soit un problème ?
          SignalConso vous guide afin de savoir si vous pouvez faire un signalement.
          Si ce n'est pas le cas, on vous explique pourquoi !
        </p>
      </Card>
      <Card img="image/illustrations/report.png" title="2. Faites un signalement avec SignalConso.">
        <p>
          Signaler le problème en choisissant une catégorie et en répondant aux questions.
        </p>
        <p>
          Suivant le problème, SignalConso vous conseille sur les démarches à faire en plus de votre signalement.
          Le site vous donne également des informations sur vos droits en tant que consommateur.
        </p>
      </Card>
      <Card img="image/illustrations/company.png" title="3. L'entreprise est prévenue et peut intervenir.">
        <p>
          SignalConso contacte l'entreprise afin de l'informer de votre signalement (qui peut être anonymisé).
        </p>
        <p>
          L'entreprise peut décider de corriger le problème. Vous serez informé par un email de SignalConso.
        </p>
        <p>
          Vous avez choisi de transmettre vos coordonnées à l'entreprise ? Elle pourra vous recontacter directement.
        </p>
      </Card>
      <Card img="image/illustrations/dgccrf.png" title="4. La répression des fraudes intervient si nécessaire.">
        <p>
          Votre signalement est enregistré dans la base de données de la répression des fraudes (DGCCRF).
          <p>
            Les signalements deviennent trop nombreux pour une même entreprise ?
            Le problème est considéré comme grave par les enquêteurs ?
            La répression des fraudes peut décider de surveiller ou de contrôler une entreprise grâce à votre signalement. </p>
        </p>
      </Card>
    </Page>
  )
}

export default CommentCAMarche
