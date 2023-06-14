import {ResponseConsumerReview, ResponseEvaluation} from '../../core/Events'
import {useI18n} from '../../i18n/I18n'
import {useToast} from '../../hooks/useToast'
import React, {useEffect, useMemo, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import FacebookShareButton from '../../reviews/FacebookShareButton'
import TwitterShareButton from '../../reviews/TwitterShareButton'
import ServicePublicShareButton from '../../reviews/ServicePublicShareButton'
import {Panel, PanelActions, PanelBody} from '../../components_simple/Panel/Panel'
import {useApiClients} from '../../context/ApiClientsContext'
import {useRouter} from 'next/router'
import {ScRadioGroup} from '../../components_simple/RadioGroup/RadioGroup'
import {ScRadioGroupItem} from '../../components_simple/RadioGroup/RadioGroupItem'
import {Txt} from '../../alexlibs/mui-extension/Txt/Txt'
import {ScInput} from '../../components_simple/Input/ScInput'
import {Page} from '../../components_simple/Page/Page'
import {Box} from '@mui/material'
import {useMutation, useQuery} from '@tanstack/react-query'
import {Alert} from '../../alexlibs/mui-extension/Alert/Alert'
import {Button} from '@codegouvfr/react-dsfr/Button'

interface Form {
  evaluation: ResponseEvaluation
  details?: string
}

const ConsumerReview = () => {
  const {m} = useI18n()
  const {toastError} = useToast()
  const router = useRouter()
  const reportId = router.query.reportId as string
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

  const _saveReview = useMutation(['saveReview', reportId], (review: ResponseConsumerReview) =>
    signalConsoApiClient.postReviewOnReportResponse(reportId, review),
  )

  const _reviewExists = useQuery(['reviewExists', reportId], () => signalConsoApiClient.reviewExists(reportId), {
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
    _saveReview.error && toastError(_saveReview.error)
  }, [_saveReview.error])

  useEffect(() => {
    _reviewExists.error && toastError(_reviewExists.error)
  }, [_reviewExists.error])

  useMemo(() => {
    const queryEvaluation = router.query.evaluation as ResponseEvaluation
    setEvaluation(queryEvaluation)
    reset({evaluation: queryEvaluation})
  }, [router.query])

  const watchEvaluation = watch('evaluation')

  useEffect(() => {
    if (router.query && watchEvaluation) {
      router.query.evaluation = watchEvaluation
      router.push(router)
    }
  }, [watchEvaluation, router.isReady])

  useEffect(() => {
    if (_reviewExists.isSuccess) {
      const exists = _reviewExists.data.value
      if (evaluation && !exists) {
        _saveReview.mutate({evaluation: evaluation})
      }
      setDone(exists)
    }
  }, [_reviewExists.data])

  return (
    <Page>
      {done ? (
        <>
          <Alert type="success" sx={{mb: 2}}>
            {m.thanksForSharingYourReview}
          </Alert>

          <Box sx={{mt: 3}}>
            <Box component="p">{m.youCanRateSignalConso}</Box>
            <Box sx={{display: 'flex', lineHeight: 1, mt: 3}}>
              {evaluation === ResponseEvaluation.Positive && (
                <>
                  <FacebookShareButton />
                  <TwitterShareButton />
                </>
              )}
              <ServicePublicShareButton />
            </Box>
          </Box>
        </>
      ) : (
        <form onSubmit={handleSubmit(submit)}>
          <Panel>
            <h1>{m.shareYourReview}</h1>
            <PanelBody>
              <Txt block gutterBottom color="hint" dangerouslySetInnerHTML={{__html: m.didTheCompanyAnsweredWell}} />
              <Controller
                name="evaluation"
                rules={{required: {value: true, message: m.required}}}
                control={control}
                render={({field}) => (
                  <ScRadioGroup sx={{mt: 3}} inline error={!!errors.evaluation} {...field}>
                    <ScRadioGroupItem value={ResponseEvaluation.Positive}>
                      <div className="text-5xl leading-[0]" role="img" aria-label="happy">
                        😀
                      </div>
                    </ScRadioGroupItem>
                    <ScRadioGroupItem value={ResponseEvaluation.Neutral}>
                      <div className="text-5xl leading-[0]" role="img" aria-label="neutral">
                        😐
                      </div>
                    </ScRadioGroupItem>
                    <ScRadioGroupItem value={ResponseEvaluation.Negative}>
                      <div className="text-5xl leading-[0]" role="img" aria-label="sad">
                        🙁
                      </div>
                    </ScRadioGroupItem>
                  </ScRadioGroup>
                )}
              />

              <Txt sx={{mt: 3}} block color="hint" dangerouslySetInnerHTML={{__html: m.youCanAddCommentForDGCCRF}} />
              <ScInput {...register('details')} multiline fullWidth rows={5} maxRows={12} />
            </PanelBody>
            <PanelActions>
              <Button className="mt-2" type="submit" disabled={_saveReview.isLoading}>
                {m.send}
              </Button>
            </PanelActions>
          </Panel>
        </form>
      )}
    </Page>
  )
}

export default ConsumerReview
