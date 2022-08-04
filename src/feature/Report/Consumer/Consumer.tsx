import {Panel, PanelBody} from 'shared/Panel/Panel'
import {useI18n} from 'core/i18n'
import {Grid} from '@mui/material'
import React, {useState} from 'react'
import {ScInput} from 'shared/Input/ScInput'
import {FormLayout} from 'shared/FormLayout/FormLayout'
import {Controller, useForm} from 'react-hook-form'
import {regexp} from 'core/utils/regexp'
import {ScRadioGroup, ScRadioGroupItem} from 'shared/RadioGroup'
import {useReportFlowContext} from '../ReportFlowContext'
import {Alert, Txt} from '../../../alexlibs/mui-extension'
import {StepperActions} from 'shared/Stepper/StepperActions'
import {useApiSdk} from 'core/context/ApiSdk'
import {useFetcher} from '../../../alexlibs/react-hooks-lib'
import {useStepperContext} from 'shared/Stepper/Stepper'
import {ConsumerValidationDialog} from './ConsumerValidationDialog'
import {ReportDraft2} from 'core/model/ReportDraft'
import {DeepPartial} from '../../../alexlibs/ts-utils'
import {appConfig} from '../../../conf/appConfig'
import {Row} from 'shared/Row/Row'
import {useAnalyticContext} from 'core/analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'core/analytic/analytic'
import {useWindowWidth} from 'core/useWindowWidth'
import {Gender, ReportDraft} from '../../../client/report/ReportDraft'
import {ReportTag} from '../../../anomaly/Anomaly'

interface ConsumerForm {
  firstName: string
  lastName: string
  email: string
  contactAgreement?: boolean
  phone?: string
  referenceNumber?: string
  gender?: Gender
}

export const Consumer = () => {
  const _stepper = useStepperContext()
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  return (
    <_Consumer
      draft={draft}
      onSubmit={changes => {
        _reportFlow.setReportDraft(_ => ReportDraft2.merge(_, changes))
        _stepper.next()
      }}
    />
  )
}

export const _Consumer = ({
  draft,
  onSubmit,
}: {
  draft: Partial<ReportDraft2>
  onSubmit: (_: DeepPartial<ReportDraft2>) => void
}) => {
  const {m} = useI18n()
  const [openValidationDialog, setOpenValidationDialog] = useState<boolean>(false)
  const {apiSdk} = useApiSdk()
  const _checkEmail = useFetcher(apiSdk.consumerEmail.check)
  const _form = useForm<ConsumerForm>()
  const _analytic = useAnalyticContext()
  const {isXsOrLess} = useWindowWidth()

  const showContactAgreement = ReportDraft.isTransmittableToPro(draft) && draft.contractualDispute !== true

  const getErrors = (name: keyof ConsumerForm): {error: boolean; helperText?: string} => ({
    error: !!_form.formState.errors[name],
    helperText: _form.formState.errors[name]?.message,
  })

  const saveAndNext = () => {
    const {contactAgreement, ...consumer} = _form.getValues()
    _analytic.trackEvent(EventCategories.report, ReportEventActions.validateConsumer)
    onSubmit({
      consumer: consumer,
      contactAgreement: (() => {
        if (!ReportDraft.isTransmittableToPro(draft)) return false
        if (draft.contractualDispute) return true
        return contactAgreement
      })(),
    })
  }
  return (
    <>
      <Panel title={m.consumerTitle}>
        <PanelBody>
          {draft.employeeConsumer && (
            <Alert className="blog" type="info" dense dangerouslySetInnerHTML={{__html: m.consumerIsEmployee}} sx={{mb: 3}} />
          )}
          <Row icon="person">
            <FormLayout label={m.genderOptional}>
              <Controller
                defaultValue={draft.consumer?.gender}
                control={_form.control}
                render={({field}) => (
                  <ScRadioGroup {...field} inline={!isXsOrLess} dense sx={{mt: 1, mb: 2}}>
                    <ScRadioGroupItem value={Gender.Male} title={m.gender[Gender.Male]} />
                    <ScRadioGroupItem value={Gender.Female} title={m.gender[Gender.Female]} />
                    <ScRadioGroupItem value={undefined} title={m.unknownGender} />
                  </ScRadioGroup>
                )}
                name={'gender'}
              />
            </FormLayout>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FormLayout label={m.firstName} required>
                  <ScInput
                    fullWidth
                    defaultValue={draft.consumer?.firstName ?? ''}
                    {..._form.register('firstName', {required: {value: true, message: m.required}})}
                    {...getErrors('firstName')}
                  />
                </FormLayout>
              </Grid>
              <Grid item xs={6}>
                <FormLayout label={m.lastName} required>
                  <ScInput
                    fullWidth
                    defaultValue={draft.consumer?.lastName ?? ''}
                    {..._form.register('lastName', {required: {value: true, message: m.required}})}
                    {...getErrors('lastName')}
                  />
                </FormLayout>
              </Grid>
            </Grid>
          </Row>
          <Row icon="email">
            <FormLayout label={m.email} required>
              <ScInput
                fullWidth
                defaultValue={draft.consumer?.email ?? ''}
                {...getErrors('email')}
                {..._form.register('email', {
                  required: {value: true, message: m.required},
                  pattern: {value: regexp.email, message: m.invalidEmail},
                  validate: {
                    isDummyEmail: value => {
                      return !appConfig.dummyEmailDomain.find(_ => value.includes(_)) || m.consumerDummyEmailNotAccepted
                    },
                  },
                })}
              />
            </FormLayout>
          </Row>
          {!draft.tags?.includes(ReportTag.Bloctel) && (
            <Row icon="phone">
              <FormLayout label={m.phoneOptional}>
                <ScInput
                  placeholder={m.phonePlaceholder}
                  fullWidth
                  defaultValue={draft.consumer?.phone ?? ''}
                  {...getErrors('phone')}
                  {..._form.register('phone', {
                    pattern: {value: regexp.phone, message: m.invalidPhone},
                  })}
                />
              </FormLayout>
            </Row>
          )}
          <Row icon="receipt">
            <FormLayout label={m.referenceNumberOptional}>
              <Txt color="hint">{m.referenceNumberDesc}</Txt>
              <ScInput
                placeholder={m.referenceNumberPlaceholder}
                fullWidth
                defaultValue={draft.consumer?.referenceNumber ?? ''}
                {...getErrors('referenceNumber')}
                {..._form.register('referenceNumber', {
                  maxLength: {value: 100, message: m.atMost100Chars},
                })}
              />
            </FormLayout>
          </Row>
          {showContactAgreement && (
            <Row icon="https" sx={{mt: 3}}>
              <Controller
                control={_form.control}
                name="contactAgreement"
                defaultValue={draft.contactAgreement}
                rules={{
                  validate: {
                    isChecked: value => {
                      return value !== undefined || m.required
                    },
                  },
                }}
                render={({field}) => (
                  <ScRadioGroup {...field} {...getErrors('contactAgreement')}>
                    <ScRadioGroupItem
                      value={true}
                      title={m.contactAgreementTrueTitle}
                      description={<Txt size="small" dangerouslySetInnerHTML={{__html: m.contactAgreementTrueDesc}} />}
                    />
                    <ScRadioGroupItem
                      value={false}
                      title={m.contactAgreementFalseTitle}
                      description={<Txt size="small" dangerouslySetInnerHTML={{__html: m.contactAgreementFalseDesc}} />}
                    />
                  </ScRadioGroup>
                )}
              />
            </Row>
          )}
        </PanelBody>
      </Panel>
      <ConsumerValidationDialog
        open={openValidationDialog}
        consumerEmail={_form.getValues().email}
        onClose={() => setOpenValidationDialog(false)}
        onValidated={saveAndNext}
      />
      <StepperActions
        loadingNext={_checkEmail.loading}
        next={() => {
          _form.handleSubmit(form => {
            _checkEmail.fetch({}, form.email).then(res => {
              if (res.valid) saveAndNext()
              else setOpenValidationDialog(true)
            })
          })()
        }}
      />
    </>
  )
}
