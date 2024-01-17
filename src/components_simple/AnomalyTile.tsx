'use client'
import {Tile} from '@codegouvfr/react-dsfr/Tile'
import {Anomaly} from '../anomalies/Anomaly'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import {useI18n} from '../i18n/I18n'
import {capitalizeFirstLetter} from '@/utils/utils'

export const AnomalyTile = ({anomaly}: {anomaly: Anomaly}) => {
  const _reportFlow = useReportFlowContext()
  const {currentLang} = useI18n()
  const title = anomaly.title.replace(/ \/ /g, ', ')
  const keywords = anomaly.description
    .split(',')
    .map(_ => _.trim())
    .map(capitalizeFirstLetter)
    .filter(_ => _ !== '...' && _ !== '...)' && _ !== '…' && _ !== '…)')
  return (
    <div className="bg-white p-4 relative border-b-4 border-solid border-0 border-scbluefrance">
      <div className="flex items-center justify-start gap-2">
        <p className="text-scbluefrance text-3xl font-bold">{title}</p>
        <img src={`/image/pictos/${anomaly.img}.png`} className="h-10 w-auto" />
      </div>
      <ul className="list-none p-0 m-0 flex flex-col flex-wrap gap-2 mb-2">
        {keywords.map(kw => {
          return <li>{kw}</li>
        })}
      </ul>
      <span className="font-bXold  ">etc.</span>
      <div className="absolute bottom-2 right-2 text-scbluefrance">
        {/* <span>je démarre</span> */}
        <i className="ri-arrow-right-line fr-icon--lg" />
      </div>
    </div>
  )

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
