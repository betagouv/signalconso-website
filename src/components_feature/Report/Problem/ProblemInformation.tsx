import {Icon} from '@mui/material'
import {Fender} from 'alexlibs/mui-extension/Fender/Fender'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {AccordionInline} from 'components_simple/AccordionInline/AccordionInline'
import {Animate} from 'components_simple/Animate/Animate'
import {ScButton} from 'components_simple/Button/Button'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {useApiClients} from 'context/ApiClientsContext'
import {siteMap} from 'core/siteMap'
import {useI18n} from 'i18n/I18n'
import {getAnalyticsForStep} from 'model/ReportStep'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {last} from 'utils/lodashNamedExport'
import {IconBtn} from '../../../alexlibs/mui-extension/IconBtn/IconBtn'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {Anomaly, Information, Subcategory} from '../../../anomalies/Anomaly'
import {useFetcher} from '../../../hooks/useFetcher'
import {mapPromise} from '../../../utils/MapPromise'
import {LinkBackToHome} from '../../../components_simple/LinkBackToHome'

interface Props {
  anomaly: Anomaly
  subcategories: Subcategory[]
  information: Information
}

export const ProblemInformation = ({anomaly, subcategories, information}: Props) => {
  const _analytic = useAnalyticContext()
  const {m} = useI18n()
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
  const _vote = useFetcher(
    mapPromise({
      promise: signalConsoApiClient.rateSubcategory,
      mapThen: () => ({rated: true}),
    }),
  )
  const vote = (positive: boolean) => {
    setVotedPositive(positive)
    _vote.fetch({}, anomaly.category, subcategories, positive)
  }

  return (
    <>
      <Animate>
        <Panel id="test-info" border title={<span dangerouslySetInnerHTML={{__html: information.title ?? m.informationTitle}} />}>
          <PanelBody className="blog">
            {information.outOfScope && (
              <Txt block gutterBottom>
                {m.informationReportOutOfScope}
              </Txt>
            )}
            {information.subTitle && (
              <Txt bold size="big" gutterBottom block dangerouslySetInnerHTML={{__html: information.subTitle}} />
            )}
            {information.content && <Txt gutterBottom block dangerouslySetInnerHTML={{__html: information.content}} />}
            {information.actions?.map(action => (
              <AccordionInline
                sx={{mt: 1}}
                key={action.question}
                label={
                  <div>
                    <Txt bold block dangerouslySetInnerHTML={{__html: action.question}} />
                    {action.example && <Txt block dangerouslySetInnerHTML={{__html: action.example}} />}
                  </div>
                }
              >
                <Txt color="hint">
                  <Txt block dangerouslySetInnerHTML={{__html: action.answer}} />
                </Txt>
              </AccordionInline>
            ))}
          </PanelBody>
        </Panel>
      </Animate>
      <Animate>
        <Panel title={m.informationWasUsefull} border>
          {_vote.entity ? (
            <PanelBody>
              <Fender type="success" iconSize={80}>
                {m.informationRatingSaved}
              </Fender>
            </PanelBody>
          ) : (
            <PanelBody sx={{display: 'flex', justifyContent: 'center'}}>
              <IconBtn
                loading={_vote.loading && votedPositive === true}
                disabled={_vote.loading && votedPositive === false}
                size="large"
                color="primary"
                onClick={() => vote(true)}
                sx={{mr: 4}}
              >
                <Icon style={{fontSize: 38}}>thumb_up</Icon>
              </IconBtn>
              <IconBtn
                loading={_vote.loading && votedPositive === false}
                disabled={_vote.loading && votedPositive === true}
                size="large"
                color="primary"
                onClick={() => vote(false)}
              >
                <Icon style={{fontSize: 38}}>thumb_down</Icon>
              </IconBtn>
            </PanelBody>
          )}
        </Panel>
      </Animate>
      <LinkBackToHome />
    </>
  )
}
