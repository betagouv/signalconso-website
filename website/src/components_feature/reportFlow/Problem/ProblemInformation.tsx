import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from '@/analytic/analytic'
import {AccordionInline} from '@/components_simple/AccordionInline'
import {Animate} from '@/components_simple/Animate'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {last} from '@/utils/lodashNamedExport'
import Button from '@codegouvfr/react-dsfr/Button'
import {useMutation} from '@tanstack/react-query'
import {useEffect, useState} from 'react'
import {Anomaly, InfoWall, Subcategory} from 'shared/anomalies/Anomaly'
import {LinkBackToHome} from '../../../components_simple/LinkBackToHome'

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
        <div id="blocking-info-wall" className="p-4 border border-gray-300 border-solid mb-4">
          <h2 className="fr-h6" dangerouslySetInnerHTML={{__html: information.title ?? m.informationTitle}} />
          <div>
            {information.reportOutOfScopeMessage && <p>{m.informationReportOutOfScope}</p>}
            {information.subTitle && <p className="font-bold mb-1" dangerouslySetInnerHTML={{__html: information.subTitle}} />}
            {information.content && <p className="mb-1" dangerouslySetInnerHTML={{__html: information.content}} />}
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
                <p className="text-gray-700" dangerouslySetInnerHTML={{__html: action.answer}} />
              </AccordionInline>
            ))}
          </div>
        </div>
      </Animate>
      <Animate>
        <div className="p-4 border border-gray-300 border-solid mb-4">
          <h2 className="fr-h6">{m.informationWasUsefull}</h2>
          {_vote.data ? (
            <div className="text-center mb-8">
              <div className="h-[110px] mt-2 leading-4 ">
                <i className="ri-checkbox-circle-fill sc-icon-xxl text-green-700" />
              </div>
              <div className="mt-2">
                <span className="text-xl text-gray-600"> {m.informationRatingSaved}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <VoteButton disabled={_vote.isPending} {...{onVote}} wasUseful={false} />
              <VoteButton disabled={_vote.isPending} {...{onVote}} wasUseful={true} />
            </div>
          )}{' '}
        </div>
      </Animate>
      <LinkBackToHome isWebView={isWebView} lang={currentLang} />
    </>
  )
}

function VoteButton({
  disabled,
  wasUseful,
  onVote,
}: {
  disabled: boolean
  wasUseful: boolean
  onVote: (wasUseful: boolean) => void
}) {
  const {m} = useI18n()

  return (
    <Button
      disabled={disabled}
      iconId={wasUseful ? 'fr-icon-thumb-up-line' : 'fr-icon-thumb-down-line'}
      onClick={() => onVote(wasUseful)}
      priority="tertiary no outline"
      size="large"
      className="!p-8 !text-2xl"
    >
      {wasUseful ? m.yes : m.no}
    </Button>
  )
}
