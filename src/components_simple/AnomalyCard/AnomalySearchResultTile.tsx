import {Tile} from '@codegouvfr/react-dsfr/Tile'
import {Anomaly} from '../../anomalies/Anomaly'
import {useReportFlowContext} from '../../components_feature/Report/ReportFlowContext'
import alert from '@codegouvfr/react-dsfr/src/Alert'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AnomalyIndex} from '../../anomalies/Anomalies'
import Image from 'next/image'
import {buildLinkStartReport} from '../../core/siteMap'

export const AnomalySearchResultTile = ({anomaly}: {anomaly: AnomalyIndex}) => {
  const _reportFlow = useReportFlowContext()
  const router = useRouter()
  return (
    <div className="fr-card fr-enlarge-link fr-card--horizontal- shadow-xl">
      <div className="fr-card__header">
        <p className="fr-badge fr-badge--blue-ecume m-4">{anomaly.root.title}</p>
      </div>
      <div className="fr-card__body">
        <div className="">
          <h3 className="fr-card__title">
            <p>Mon problème concerne :</p>
            <Link
              className={'fr-card__link'}
              href={buildLinkStartReport(anomaly.root)}
              onClick={() => {
                _reportFlow.resetFlow()

                _reportFlow.setReportDraft(_ => ({
                  category: anomaly.root.category,
                  subcategories: anomaly.subcategories,
                }))
              }}
            ></Link>
          </h3>
          <div className="fr-card__desc">
            {anomaly.subcategories.length > 0 && (
              <ol className="fr-breadcrumb__list">
                {anomaly.subcategories.map(s => (
                  <li key={s.id}>
                    <p className="fr-tag mb-3">{s.title}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
