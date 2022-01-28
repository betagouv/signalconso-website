import {Information, SignalConsoPublicSdk, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {Animate} from '../../../shared/Animate/Animate'
import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {useI18n} from '../../../core/i18n'
import {Txt} from 'mui-extension'
import {IconBtn} from 'mui-extension/lib'
import {Icon} from '@mui/material'
import {useApiSdk} from '../../../core/context/ApiSdk'
import {UseFetcher, useFetcher} from '@alexandreannic/react-hooks-lib'

interface Props {
  category: string
  subcategories: Subcategory[]
  information: Information
  animate?: boolean
  autoScrollTo?: boolean
}

export const ProblemInformation = (props: Props) => {
  const {apiSdk} = useApiSdk()
  return (
    <_ProblemInformation {...props} _vote={useFetcher(apiSdk.rating.rate)}/>
  )
}
export const _ProblemInformation = ({
  category,
  subcategories,
  information,
  animate,
  autoScrollTo,
  _vote,
}: Props & {_vote: UseFetcher<SignalConsoPublicSdk['rating']['rate']>}) => {
  const {m} = useI18n()

  const vote = (positive?: boolean) => {
    _vote.fetch({}, category, subcategories, true)
  }

  return (
    <>
      <Animate animate={animate} autoScrollTo={autoScrollTo}>
        <Panel title={m.informationTitle} border>
          <PanelBody>
            {information.outOfScope && (
              <Txt block gutterBottom>{m.informationReportOutOfScope}</Txt>
            )}
            {information.title && (
              <Txt gutterBottom block dangerouslySetInnerHTML={{__html: information.title}}/>
            )}
            {information.content && (
              <Txt gutterBottom block dangerouslySetInnerHTML={{__html: information.content}}/>
            )}
          </PanelBody>
        </Panel>
      </Animate>
      <Animate animate={animate} autoScrollTo={autoScrollTo}>
        <Panel title={m.informationWasUsefull} border>
          <PanelBody sx={{display: 'flex', justifyContent: 'center'}}>
            <IconBtn size="large" color="primary" onClick={() => vote(true)} sx={{mr: 2}}>
              <Icon sx={{fontSize: 30}}>thumb_up</Icon>
            </IconBtn>
            <IconBtn size="large" color="primary" onClick={() => vote(false)}>
              <Icon sx={{fontSize: 30}}>thumb_down</Icon>
            </IconBtn>
          </PanelBody>
        </Panel>
      </Animate>
    </>
  )
}
