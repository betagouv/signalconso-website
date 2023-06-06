import {Contact, getMetadata} from 'reusablePages/contact'

import {Metadata} from 'next'

export const metadata: Metadata = getMetadata()

export default () => <Contact isWebView />
