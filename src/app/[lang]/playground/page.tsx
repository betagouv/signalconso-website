import {Metadata} from 'next'
import Playground from './Playground'

const genMetadata = () => {
  return {
    robots: {
      index: false,
    },
  }
}

export const metadata: Metadata = genMetadata()

export default Playground
