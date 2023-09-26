import {Icon, IconButton} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {AccordionInline} from 'components_simple/AccordionInline'
import {Animate} from 'components_simple/Animate'
import {Fender} from 'components_simple/Fender'
import {Panel, PanelBody} from 'components_simple/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {otherColorSet} from 'core/theme'
import {useI18n} from 'i18n/I18n'
import {useEffect, useState} from 'react'
import {last} from 'utils/lodashNamedExport'
import {Anomaly, InfoWall, Subcategory} from '../../../anomalies/Anomaly'
import {LinkBackToHome} from '../../../components_simple/LinkBackToHome'
import {Txt} from '../../../components_simple/Txt'

interface Props {
  anomaly: Anomaly
  subcategories: Subcategory[]
  information: InfoWall
  isWebView: boolean
}

export const ProblemInformation = ({anomaly, subcategories, information, isWebView}: Props) => {
  const _analytic = useAnalyticContext()
  const {m, currentLang} = useI18n()
  const {signalConsoApiClient} = useApiClients()
  const [votedPositive, setVotedPositive] = useState<boolean | undefined>()
  useEffect(() => {
    _analytic.trackEvent(
      EventCategories.report,
      ReportEventActions.outOfBounds,
      subcategories && subcategories.length > 0 ? last(subcategories)?.title : anomaly.category,
    )
  }, [anomaly, subcategories])

  const _vote = useMutation({
    mutationFn: (positive: boolean) => {
      return signalConsoApiClient.rateSubcategory(anomaly.category, subcategories, positive)
    },
  })

  const onVote = (positive: boolean) => {
    setVotedPositive(positive)
    _vote.mutate(positive)
  }

  return (
    <>
      <Animate>
        <Panel
          id="blocking-info-wall"
          border
          title={<span dangerouslySetInnerHTML={{__html: information.title ?? m.informationTitle}} />}
        >
          <PanelBody>
            {information.notAFraudMessage && (
              <Txt block className="mb-2">
                {m.informationReportOutOfScope}
              </Txt>
            )}
            {information.subTitle && (
              <Txt bold size="big" className="mb-1" block dangerouslySetInnerHTML={{__html: information.subTitle}} />
            )}
            {information.content && <Txt block className="mb-1" dangerouslySetInnerHTML={{__html: information.content}} />}
            {information.questions?.map(action => (
              <AccordionInline
                className="mt-2"
                key={action.question}
                label={
                  <span className="inline-flex flex-col items-start">
                    <span className="font-bold" dangerouslySetInnerHTML={{__html: action.question}} />
                    {action.desc && <span dangerouslySetInnerHTML={{__html: action.desc}} />}
                  </span>
                }
              >
                <Txt color="hint" component="p" dangerouslySetInnerHTML={{__html: action.answer}} />
              </AccordionInline>
            ))}
          </PanelBody>
        </Panel>
      </Animate>
      <Animate>
        <Panel title={m.informationWasUsefull} border>
          {_vote.data ? (
            <PanelBody>
              <Fender iconSize={80} icon="check_circle_outline" iconColor={otherColorSet.success}>
                {m.informationRatingSaved}
              </Fender>
            </PanelBody>
          ) : (
            <PanelBody sx={{display: 'flex', justifyContent: 'center'}}>
              <IconButton disabled={_vote.isLoading} size="large" color="primary" onClick={() => onVote(true)} sx={{mr: 4}}>
                <Icon style={{fontSize: 38}}>thumb_up</Icon>
              </IconButton>
              <IconButton disabled={_vote.isLoading} size="large" color="primary" onClick={() => onVote(false)}>
                <Icon style={{fontSize: 38}}>thumb_down</Icon>
              </IconButton>
            </PanelBody>
          )}{' '}
        </Panel>
      </Animate>
      <LinkBackToHome isWebView={isWebView} lang={currentLang} />
    </>
  )
}
