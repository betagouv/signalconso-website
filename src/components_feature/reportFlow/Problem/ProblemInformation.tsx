import {Icon} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {Fender} from 'components_simple/Fender'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {AccordionInline} from 'components_simple/AccordionInline'
import {Animate} from 'components_simple/Animate'
import {Panel, PanelBody} from 'components_simple/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {getAnalyticsForStep} from 'model/ReportStep'
import {useEffect, useState} from 'react'
import {last} from 'utils/lodashNamedExport'
import {IconBtn} from '../../../alexlibs/IconBtn'
import {Txt} from '../../../components_simple/Txt'
import {Anomaly, InfoWall, Subcategory} from '../../../anomalies/Anomaly'
import {LinkBackToHome} from '../../../components_simple/LinkBackToHome'
import {colorSuccess} from 'alexlibs/color'

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
    // ce tracking est un peu étrange, on réutilise une valeur de la step finale 'Done', mais pas une autre. Je soupçonne une erreur
    const {title} = getAnalyticsForStep('Done')
    _analytic.trackPage(`${anomaly.path}/information`, title)
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
        <Panel id="test-info" border title={<span dangerouslySetInnerHTML={{__html: information.title ?? m.informationTitle}} />}>
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
                sx={{mt: 1}}
                key={action.question}
                label={
                  <div>
                    <Txt bold block component="p" sx={{mb: 0}} dangerouslySetInnerHTML={{__html: action.question}} />
                    {action.desc && <Txt block dangerouslySetInnerHTML={{__html: action.desc}} />}
                  </div>
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
              <Fender iconSize={80} icon="check_circle_outline" iconColor={colorSuccess}>
                {m.informationRatingSaved}
              </Fender>
            </PanelBody>
          ) : (
            <PanelBody sx={{display: 'flex', justifyContent: 'center'}}>
              <IconBtn
                loading={_vote.isLoading && votedPositive === true}
                disabled={_vote.isLoading && votedPositive === false}
                size="large"
                color="primary"
                onClick={() => onVote(true)}
                sx={{mr: 4}}
              >
                <Icon style={{fontSize: 38}}>thumb_up</Icon>
              </IconBtn>
              <IconBtn
                loading={_vote.isLoading && votedPositive === false}
                disabled={_vote.isLoading && votedPositive === true}
                size="large"
                color="primary"
                onClick={() => onVote(false)}
              >
                <Icon style={{fontSize: 38}}>thumb_down</Icon>
              </IconBtn>
            </PanelBody>
          )}{' '}
        </Panel>
      </Animate>
      <LinkBackToHome isWebView={isWebView} lang={currentLang} />
    </>
  )
}
