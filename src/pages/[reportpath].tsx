import {useRouter} from 'next/router'
import * as reportPathPage from '../core/reportPathPage'

export const getStaticPaths = reportPathPage.getStaticPaths

export const getStaticProps = reportPathPage.getStaticProps

const Page = ({reportPath}: {reportPath: string}) => {
  const router = useRouter()
  // legacy way to do the webview, kept temporarily
  const isWebView = router.query.app_type == 'mobile'
  return <reportPathPage.ReportPathPage {...{reportPath, isWebView}} />
}

export default Page
