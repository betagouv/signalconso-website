import {Tile} from '@codegouvfr/react-dsfr/Tile'
import {Anomaly} from '../anomalies/Anomaly'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'

export const AnomalyTile = ({anomaly}: {anomaly: Anomaly}) => {
  const _reportFlow = useReportFlowContext()
  const {currentLang} = useI18n()
  return (
    <Tile
      desc={anomaly.description}
      enlargeLink
      linkProps={{
        href: buildLinkStartReport(anomaly, currentLang),
        onClick: () => {
          // on veut repartir de zéro
          _reportFlow.resetFlow()
        },
        legacyBehavior: false,
      }}
      title={anomaly.title}
      imageUrl={`/image/pictos/${anomaly.img}.png`}
      imageAlt=""
    />
  )
}
