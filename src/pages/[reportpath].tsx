import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import {apiSdk} from '../core/apiSdk'
import {useRouter} from 'next/router'
import {serialiseJsonForStupidNextJs} from '../core/helper/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const anomalies = await apiSdk.anomaly.getAnomalies()
  const paths = anomalies.map(_ => ({
    params: {reportpath: _.path},
  }))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const anomaly = await apiSdk.anomaly.getAnomalies().then(res => res
    .filter(_ => !_.hidden)
    .find(_ => _.path === params!.reportpath)
  )
  return {
    props: serialiseJsonForStupidNextJs({
      anomaly
    }),
  }
}

export default ({anomaly}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const {reportpath} = router.query
  return (
    <div>
      REPORT {anomaly?.path} -- {reportpath}
    </div>
  )
}

