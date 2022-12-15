import {Animate} from 'components_simple/Animate/Animate'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {useI18n} from 'i18n'
import {Txt} from '../../../alexlibs/mui-extension'
import {IconBtn} from '../../../alexlibs/mui-extension'
import {Icon} from '@mui/material'
import {useApiClients} from 'context/ApiClientsContext'
import {useFetcher} from '../../../hooks/useFetcher'
import {ScButton} from 'components_simple/Button/Button'
import Link from 'next/link'
import {siteMap} from 'core/siteMap'
import {mapPromise} from '../../../utils/MapPromise'
import {useEffect, useState} from 'react'
import {AccordionInline} from 'components_simple/AccordionInline/AccordionInline'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {last} from 'utils/lodashNamedExport'
import {ReportStepPathInAnalytics, ReportStepTitleInAnalytics} from '../ReportFlow'
import {Anomaly, Information, Subcategory} from '../../../anomalies/Anomaly'
import {Fender} from 'alexlibs/mui-extension/Fender/Fender'

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
    _analytic.trackPage(`${anomaly.path}/${ReportStepPathInAnalytics.Information}`, ReportStepTitleInAnalytics.Information)
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
      <Link href={siteMap.index}>
        <ScButton
          icon="home"
          variant="contained"
          sx={{
            display: 'block',
            margin: 'auto',
            mt: 3,
          }}
        >
          {m.backToHome}
        </ScButton>
      </Link>
    </>
  )
}
