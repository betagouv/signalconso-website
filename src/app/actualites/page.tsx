import {Metadata} from 'next'
import {Props} from '../[dynamicPath]/faire-un-signalement/page'
import NewsHome from './NewsHome'

export function generateMetadata(): Metadata {
  return {
    title: 'Actualités - SignalConso',
    description: 'Actualités et nouveautés du site SignalConso et de la répression des fraudes',
  }
}

const Page = () => {
  return <NewsHome />
}

export default Page
