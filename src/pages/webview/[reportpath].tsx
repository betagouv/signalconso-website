import * as reportPathPage from '../../core/reportPathPage'

export const getStaticPaths = reportPathPage.getStaticPaths

export const getStaticProps = reportPathPage.getStaticProps

const Page = ({reportPath}: {reportPath: string}) => {
  return <reportPathPage.ReportPathPage {...{reportPath}} isWebView />
}

// hack to use a different structure in _app.tsx
Page.isWebView = true

export default Page
