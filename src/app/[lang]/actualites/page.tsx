import {Metadata} from 'next'
import NewsHome from './NewsHome'
import {AppLangs} from '../../../i18n/localization/AppLangs'
import {notFound} from 'next/navigation'

export function generateMetadata(): Metadata {
  return {
    title: 'Actualités - SignalConso',
    description: 'Actualités et nouveautés du site SignalConso et de la répression des fraudes',
  }
}

const Page = ({params}: any) => {
  return params.lang == AppLangs.fr ? <NewsHome /> : notFound()
}

export default Page
