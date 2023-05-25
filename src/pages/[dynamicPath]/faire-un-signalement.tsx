import * as categoryPathPage from '../../reusablePages/faireUnSignalementPage'

export const getStaticPaths = categoryPathPage.getStaticPaths

export const getStaticProps = categoryPathPage.getStaticProps

const Page = ({dynamicPath}: {dynamicPath: string}) => {
  return <categoryPathPage.FaireUnSignalementPage {...{dynamicPath}} />
}

export default Page
