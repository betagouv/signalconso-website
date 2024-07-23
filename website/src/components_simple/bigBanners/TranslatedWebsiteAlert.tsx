import {CallOut} from '@codegouvfr/react-dsfr/CallOut'
import {internalPageDefs} from '../../core/pagesDefinitions'

export const TranslatedWebsiteAlert = () => {
  return (
    <CallOut title={'About SignalConso in English'} iconId="ri-information-line">
      This is a limited version of SignalConso dedicated to consumer issues experienced by individuals visiting France, or
      purchasing on a French website. If you are confortable with French,{' '}
      <a href={`/fr${internalPageDefs.index.url}`} rel="noreferrer">
        switch to SignalConso in French
      </a>{' '}
      to see the full version .
    </CallOut>
  )
}
