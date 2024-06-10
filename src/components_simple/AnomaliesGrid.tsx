'use client'
import {buildLinkStartReport} from '@/core/pagesDefinitions'
import Image from 'next/image'
import Link from 'next/link'
import {Anomaly} from '../anomalies/Anomaly'
import {useReportFlowContext} from '../components_feature/reportFlow/ReportFlowContext'
import {useI18n} from '../i18n/I18n'

export function AnomaliesGrid({anomalies}: {anomalies: Anomaly[]}) {
  return (
    <div className="grid xl:grid-cols-2 gap-4">
      {anomalies.map(a => {
        return <AnomalyTile anomaly={a} key={a.category} />
      })}
    </div>
  )
}

const AnomalyTile = ({anomaly}: {anomaly: Anomaly}) => {
  const _reportFlow = useReportFlowContext()
  const {m, currentLang} = useI18n()
  return (
    <Link
      href={anomaly.isExternal ? anomaly.path : buildLinkStartReport(anomaly, currentLang)}
      onClick={() => {
        // on veut repartir de zéro
        _reportFlow.resetFlow()
      }}
      target={anomaly.isExternal ? '_blank' : '_self'}
      tabIndex={0}
      className="fr-raw-link flex justify-between bg-white py-4 pl-4 pr-2 border-0 border-l-[6px] border-solid border-scpurplepop hover:!bg-gray-100"
    >
      <div className="flex gap-4">
        <div className="flex items-center justify-center">
          <Image width={60} height={60} src={`/image/pictos/${anomaly.img}.png`} alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-base mb-0 text-scbluefrance">{anomaly.title}</h3>
          <p className="mb-0">{anomaly.description}</p>
        </div>
      </div>
      {anomaly.isExternal && (
        <div className="flex flex-row">
          <Image width={20} height={20} src={'/icons/external-link.svg'} alt="" />
          <p className="text-sm italic">{m.externalLink}</p>
        </div>
      )}
    </Link>
  )
}
