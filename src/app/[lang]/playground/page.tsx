import {Metadata} from 'next'
import Playground from './PlaygroundPage'

const genMetadata = () => {
  return {
    robots: {
      index: false,
    },
  }
}

export const metadata: Metadata = genMetadata()

export default Playground
