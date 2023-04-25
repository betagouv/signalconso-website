import * as categoryPathPage from '../../reusablePages/faireUnSignalementPage'

export const getStaticPaths = categoryPathPage.getStaticPaths

export const getStaticProps = categoryPathPage.getStaticProps

const Page = ({categoryPath}: {categoryPath: string}) => {
  return <categoryPathPage.FaireUnSignalementPage {...{categoryPath}} isWebView />
}

export default Page
