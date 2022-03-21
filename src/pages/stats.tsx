import Head from 'next/head'
import {pageDefinitions} from 'core/pageDefinition'
import {Page} from 'shared/Page/Page'

import {useApiSdk} from "../core/context/ApiSdk";
import {useEffect, useState} from "react";
import {ReportStatus, SimpleStat} from "@signal-conso/signalconso-api-sdk-js";
import {I18nContextProps, useI18n} from "../core/i18n/I18n";
import {Stat} from "../feature/Stat/Stat";
import {CountByValue} from "../feature/Stat/CountByValue";


interface CountByDate {
  date: Date;
  count: number;
}


const Stats = () => {

  const {apiSdk} = useApiSdk()
  const {m} = useI18n()

  const [reportCount, setReportCount] = useState<SimpleStat | undefined>()
  const [reportCountCurve, setReportCountCurve] = useState<CountByValue[]>()

  const [acceptedReportCount, setacceptedReportCount] = useState<SimpleStat | undefined>()
  const [acceptedReportCurve, setacceptedReportCurve] = useState<CountByValue[]>()

  const [transmittedReportRate, setTransmittedReportRate] = useState<SimpleStat | undefined>()
  const [transmittedReportCurve, setTransmittedReportCurve] = useState<CountByValue[]>()

  const [respondedReportRate, setRespondedReportRate] = useState<SimpleStat | undefined>()
  const [respondedReportCurve, setRespondedReportCurve] = useState<CountByValue[]>()

  const [readReportRate, setReadReportRate] = useState<SimpleStat | undefined>()
  const [readReportCurve, setReadReportCurve] = useState<CountByValue[]>()

  const [websiteReportRate, setWebsiteReportRate] = useState<SimpleStat | undefined>()

  useEffect(() => {

    // //Promesse action
    apiSdk.stats.getReportCountCurve({status: [ReportStatus.PromesseAction]})
      .then(c => c.map(statsFormatCurveDate(m))).then(setacceptedReportCurve)
    apiSdk.stats.getReportCount({status: [ReportStatus.PromesseAction]}).then(setacceptedReportCount)

    // //Report count
    apiSdk.stats.getReportCountCurve()
      .then(c => c.map(statsFormatCurveDate(m))).then(setReportCountCurve)
    apiSdk.stats.getReportCount().then(setReportCount)

    //Transmitted report count
    apiSdk.stats.percentageCurve.getReportForwardedPercentage({})
      .then(c => c.map(statsFormatCurveDate(m))).then(setTransmittedReportCurve)
    apiSdk.stats.percentage.getReportForwardedToPro().then(setTransmittedReportRate)

    //Read report count
    apiSdk.stats.percentageCurve.getReportReadPercentage({})
      .then(c => c.map(statsFormatCurveDate(m))).then(setReadReportCurve)
    apiSdk.stats.percentage.getReportReadByPro( ).then(setReadReportRate)

    //Responded report count
    apiSdk.stats.percentageCurve.getReportRespondedPercentage({})
      .then(c => c.map(statsFormatCurveDate(m))).then(setRespondedReportCurve)
    apiSdk.stats.percentage.getReportWithResponse().then(setRespondedReportRate)

    //Website report count
    apiSdk.stats.percentage.getReportWithWebsite().then(setWebsiteReportRate)


  }, [])


  const statsFormatCurveDate =
    (m: I18nContextProps['m']) =>
      ({date, count}: CountByDate): { date: string; count: number } => ({
        date: (m.monthShort_ as any)[date.getMonth() + 1],
        count,
      })

  return (
    <Page size="small" className="blog">
      <Head>
        <title>{pageDefinitions.stats.title}</title>
        <meta name="description" content={pageDefinitions.stats.description}/>
      </Head>
      <h1>{pageDefinitions.stats.title}</h1>
      <br/>
      <br/>
      <p>Vous souhaitez plus d'informations sur nos statistiques consultez le site <a
        href="https://data.economie.gouv.fr/pages/signalconso/">data economie</a></p>


      {acceptedReportCount && acceptedReportCurve && (
        <Stat title={m.acceptedReportStat}
              name={m.acceptedReportStatName}
              count={acceptedReportCount.value} curve={acceptedReportCurve}/>)
      }
      <br/>
      <br/>
      {reportCount && reportCountCurve && (
        <Stat title={m.reportsCountStat}
              name={m.reportsCountStatName}
              count={reportCount.value} curve={reportCountCurve}/>)
      }
      <br/>
      <br/>
      {transmittedReportRate && transmittedReportCurve && (
        <Stat title={m.transmittedRateStat}
              name={m.transmittedRateStatName}
              description={m.transmittedRateDescription}
              count={transmittedReportRate.value} curve={transmittedReportCurve} percentage/>)
      }
      <br/>
      <br/>
      {readReportRate && readReportCurve && (
        <Stat title={m.readRateStat}
              name={m.readRateStatName}
              description={m.readRateDescription}
              count={readReportRate.value} curve={readReportCurve} percentage/>)
      }
      <br/>
      <br/>
      {respondedReportRate && respondedReportCurve && (
        <Stat title={m.respondedRateStat}
              name={m.respondedRateStatName}
              description={m.respondedRateDescription}
              count={respondedReportRate.value} curve={respondedReportCurve} percentage/>)
      }
      <br/>
      <br/>
      {websiteReportRate && (
        <Stat title={m.websiteReportsRateStat}
              name={m.respondedRateStatName}
              count={websiteReportRate.value} percentage/>)
      }
      <br/>
      <br/>
      <p>Nos statistiques sont mises à jour en temps réel.</p>

    </Page>
  )
}

export default Stats
