import * as reportPathPage from '../../reusablePages/reportPathPage'

export const getStaticPaths = reportPathPage.getStaticPaths

export const getStaticProps = reportPathPage.getStaticProps

const Page = ({reportPath}: {reportPath: string}) => {
  return <reportPathPage.ReportPathPage {...{reportPath}} isWebView />
}

export default Page
