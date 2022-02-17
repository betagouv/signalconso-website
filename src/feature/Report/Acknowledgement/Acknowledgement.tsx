import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {Txt} from 'mui-extension'
import {Box, Icon} from '@mui/material'
import Image from 'next/image'

export const Acknowledgement = () => {
  return (
    <>
      <img src="/image/illustrations/company.png" alt="consultation-pro-illustration" style={{
        display: 'block',
        margin: 'auto',
        height: 160,
      }}/>

      <Panel title={
        <Box sx={{display: 'flex', alignItems: 'center', color: t => t.palette.success.light}}>
          <Icon sx={{mr: 1}}>check_circle</Icon>
          Votre signalement a été envoyé.
        </Box>
      }>
        <PanelBody>
          <Txt size="big" bold sx={{mb: 1}}>Que va-t-il se passer pour l'entreprise ?</Txt>
          <p>
            L'entreprise recevra votre signalement sans connaître votre identité.
            Elle aura la possibilité de corriger directement le problème grâce à vos informations.
          </p>
          <p>
            Votre signalement est aussi transmis à la répression des fraudes
            (<abbr title="Direction Générale de la Concurrence, Consommation et Répression des Fraudes">DGCCRF</abbr>).
            Si votre problème concerne d’autres consommateurs, la répression
            des fraudes fera un contrôle de l’établissement.
          </p>
          <p>
            En cas d’erreur sur votre signalement, envoyez un email à<br/>
            <Txt link><a href="mailto:support@signal.conso.gouv.fr?subject=incident">support@signal.conso.gouv.fr</a></Txt>
          </p>
        </PanelBody>
      </Panel>
    </>
  )
}
