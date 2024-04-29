'use client'

import {Alert} from '@codegouvfr/react-dsfr/Alert'
import {Button} from '@codegouvfr/react-dsfr/Button'
import {Input} from '@codegouvfr/react-dsfr/Input'
import {useMutation, useQuery} from '@tanstack/react-query'
import {LimitedWidthPageContainer} from '@/components_simple/PageContainers'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useEffect, useId, useMemo, useState} from 'react'
import {FieldError, UseFormRegisterReturn, useForm} from 'react-hook-form'
import FacebookShareButton from '../components_feature/reviews/FacebookShareButton'
import ServicePublicShareButton from '../components_feature/reviews/ServicePublicShareButton'
import TwitterShareButton from '../components_feature/reviews/TwitterShareButton'
import {useApiClients} from '../context/ApiClientsContext'
import {ResponseConsumerReview, ResponseEvaluation} from '../core/Events'
import {useToastError} from '../hooks/useToastError'
import {useI18n} from '../i18n/I18n'

interface Form {
  evaluation: ResponseEvaluation
  details?: string
}
export const ConsumerReview = ({reportId}: {reportId: string}) => {
  const {m} = useI18n()
  const toastError = useToastError()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [done, setDone] = useState(false)
  const [evaluation, setEvaluation] = useState<ResponseEvaluation | undefined>(undefined)
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: {errors, isValid},
  } = useForm<Form>()

  const {signalConsoApiClient} = useApiClients()

  const _saveReview = useMutation({
    mutationKey: ['saveReview', reportId],
    mutationFn: (review: ResponseConsumerReview) => signalConsoApiClient.postReviewOnReportResponse(reportId, review),
  })

  const _reviewExists = useQuery({
    queryKey: ['reviewExists', reportId],
    queryFn: () => signalConsoApiClient.reviewExists(reportId),
    enabled: !!reportId,
  })

  const submit = async (form: Form) => {
    _saveReview.mutate({...form})
    if (_saveReview.isSuccess) {
      setDone(true)
      setEvaluation(form.evaluation)
    }
  }

  useEffect(() => {
    _saveReview.error && toastError()
  }, [_saveReview.error])

  useEffect(() => {
    _reviewExists.error && toastError()
  }, [_reviewExists.error])

  useMemo(() => {
    const queryEvaluation = (searchParams ? searchParams.get('evaluation') : 'Positive') as ResponseEvaluation
    setEvaluation(queryEvaluation)
    reset({evaluation: queryEvaluation})
  }, [searchParams])

  const watchEvaluation = watch('evaluation')

  useEffect(() => {
    if (searchParams && watchEvaluation) {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.set('evaluation', watchEvaluation)
      router.replace(`${pathname}?${params}`)
    }
  }, [watchEvaluation])

  useEffect(() => {
    if (_reviewExists.isSuccess) {
      const exists = _reviewExists.data.value
      if (evaluation && !exists) {
        _saveReview.mutate({evaluation: evaluation})
      }
      setDone(exists)
    }
  }, [_reviewExists.data])

  const evaluationField = register('evaluation', {required: m.required})
  const detailsField = register('details')

  return (
    <LimitedWidthPageContainer>
      {done ? (
        <>
          <Alert description={m.thanksForSharingYourReview} severity="success" title={m.dulyNoted} className="mt-4 mb-8" />
          <h3>{m.youCanRateSignalConso}</h3>
          <div className="flex">
            {evaluation === ResponseEvaluation.Positive || (
              <>
                <FacebookShareButton step="Reponse" />
                <TwitterShareButton step="Reponse" />
              </>
            )}
            <ServicePublicShareButton step="Reponse" />
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <div>
            <h1>{m.shareYourReview}</h1>
            <div className="">
              <EvaluationRadio {...{evaluationField}} error={errors.evaluation} />
              <Input
                label={<span dangerouslySetInnerHTML={{__html: m.youCanAddCommentForDGCCRF}} />}
                textArea
                nativeTextAreaProps={{
                  ...detailsField,
                }}
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button className="mt-2" type="submit" disabled={_saveReview.isPending}>
                {m.send}
              </Button>
            </div>
          </div>
        </form>
      )}
    </LimitedWidthPageContainer>
  )
}

function EvaluationRadio({evaluationField, error}: {evaluationField: UseFormRegisterReturn<string>; error?: FieldError}) {
  // Rich Radio from DSFR
  const {m} = useI18n()
  const idErrorMessages = useId()
  const idLegend = useId()
  return (
    <fieldset
      className={`fr-fieldset ${error ? 'fr-fieldset--error' : ''}`}
      id="radio-rich-hint"
      aria-labelledby={`${idErrorMessages} ${idLegend}`}
      {...(error ? {role: 'group'} : null)}
    >
      <legend className="fr-fieldset__legend--regular fr-fieldset__legend" id={idLegend}>
        {m.didTheCompanyAnsweredWell}
        <span className="fr-hint-text">{m.reviewIsDefinitive}</span>
      </legend>
      <Option {...{evaluationField}} value={ResponseEvaluation.Positive} />
      <Option {...{evaluationField}} value={ResponseEvaluation.Neutral} />
      <Option {...{evaluationField}} value={ResponseEvaluation.Negative} />
      <div className="fr-messages-group" id={idErrorMessages} aria-live="assertive">
        {error && <p className="fr-message fr-message--error">{error.message ?? m.error}</p>}
      </div>
    </fieldset>
  )
}

function Option({value, evaluationField}: {value: ResponseEvaluation; evaluationField: UseFormRegisterReturn<string>}) {
  const {m} = useI18n()
  const iconFile =
    value === ResponseEvaluation.Positive
      ? 'emotion-line.svg'
      : value === ResponseEvaluation.Neutral
        ? 'emotion-normal-line.svg'
        : 'emotion-unhappy-line.svg'
  const label =
    value === ResponseEvaluation.Positive ? m.iAmHappy : value === ResponseEvaluation.Neutral ? m.iAmNeutral : m.iAmUnhappy
  const id = useId()
  return (
    <div className="fr-fieldset__element">
      <div className="fr-radio-group fr-radio-rich">
        <input type="radio" id={id} value={value} {...evaluationField} />
        <label className="fr-label" htmlFor={id}>
          {label}
        </label>
        <div className="fr-radio-rich__img">
          <img src={`/icons/${iconFile}`} alt="" />
        </div>
      </div>
    </div>
  )
}
