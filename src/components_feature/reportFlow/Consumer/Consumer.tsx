import {Grid} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {StepNavigation} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {Panel, PanelBody} from 'components_simple/Panel'
import {RequiredFieldsLegend} from 'components_simple/RequiredFieldsLegend'
import {Row} from 'components_simple/Row'
import {ScTextInput} from 'components_simple/formInputs/ScTextInput'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ReportDraft2} from 'model/ReportDraft2'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {regexp} from 'utils/regexp'
import {ScAlert} from '../../../components_simple/ScAlert'
import {Txt} from '../../../components_simple/Txt'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {appConfig} from '../../../core/appConfig'
import {useToastError} from '../../../hooks/useToastError'
import {Gender, ReportDraft, genders} from '../../../model/ReportDraft'
import {DeepPartial} from '../../../utils/utils'
import {useReportFlowContext} from '../ReportFlowContext'
import {ConsumerAnonymousInformation} from './ConsumerAnonymousInformation'
import {ConsumerValidationDialog} from './ConsumerValidationDialog'

interface ConsumerForm {
  firstName: string
  lastName: string
  email: string
  contactAgreement?: boolean
  phone?: string
  referenceNumber?: string
  gender?: Gender
}

export const Consumer = ({stepNavigation}: {stepNavigation: StepNavigation}) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  return (
    <ConsumerInner
      draft={draft}
      onSubmit={changes => {
        _reportFlow.setReportDraft(_ => ReportDraft2.merge(_, changes))
        _reportFlow.sendReportEvent(stepNavigation.currentStep)
        stepNavigation.next()
      }}
      {...{stepNavigation}}
    />
  )
}

export const ConsumerInner = ({
  draft,
  onSubmit,
  stepNavigation,
}: {
  draft: Partial<ReportDraft2>
  onSubmit: (_: DeepPartial<ReportDraft2>) => void
  stepNavigation: StepNavigation
}) => {
  const {m, currentLang} = useI18n()
  const [openValidationDialog, setOpenValidationDialog] = useState<boolean>(false)
  const {signalConsoApiClient} = useApiClients()
  const _reportFlow = useReportFlowContext()
  const _checkEmail = useMutation({
    mutationFn: (email: string) => {
      return signalConsoApiClient.checkEmail(email, currentLang)
    },
  })
  const _form = useForm<ConsumerForm>({
    defaultValues: {
      firstName: draft.consumer?.firstName,
      lastName: draft.consumer?.lastName,
      email: draft.consumer?.email,
      phone: draft.consumer?.phone,
      referenceNumber: draft.consumer?.referenceNumber,
    },
  })
  const _analytic = useAnalyticContext()
  const toastError = useToastError()
  const watchContactAgreement = _form.watch('contactAgreement')

  const showContactAgreement = ReportDraft.isTransmittableToPro(draft) && draft.consumerWish !== 'fixContractualDispute'

  const getErrors = (name: keyof ConsumerForm): {error: boolean; helperText?: string} => ({
    error: !!_form.formState.errors[name],
    helperText: _form.formState.errors[name]?.message,
  })

  const saveAndNext = () => {
    const {contactAgreement, ...consumer} = _form.getValues()
    // _analytic.trackEvent(EventCategories.report, ReportEventActions.validateConsumer)
    _reportFlow.sendReportEvent(stepNavigation.currentStep)
    onSubmit({
      consumer: consumer,
      contactAgreement: (() => {
        if (!ReportDraft.isTransmittableToPro(draft)) return false
        if (draft.consumerWish === 'fixContractualDispute') return true
        return contactAgreement
      })(),
    })
  }

  const gendersOptions = genders
    .map(gender => {
      return {
        label: m.gender[gender],
        value: gender as 'Male' | 'Female' | undefined,
      }
    })
    .concat({label: m.unknownGender, value: undefined})

  return (
    <>
      <Panel title={m.consumerTitle}>
        <PanelBody>
          {draft.employeeConsumer && (
            <ScAlert type="info" dense dangerouslySetInnerHTML={{__html: `<p>${m.consumerIsEmployee}</p>`}} />
          )}
          <RequiredFieldsLegend />
          <Row icon="person">
            <Controller
              defaultValue={draft.consumer?.gender}
              control={_form.control}
              render={({field}) => (
                <ScRadioButtons
                  {...field}
                  required
                  orientation="horizontal"
                  options={gendersOptions}
                  title={m.genderOptional}
                  titleSoberStyle
                />
              )}
              name={'gender'}
            />
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <ScTextInput
                  label={m.firstName}
                  autocomplete="given-name"
                  {..._form.register('firstName', {
                    required: {value: true, message: m.required},
                    pattern: {value: regexp.emojis, message: m.invalidName},
                  })}
                  required
                  {...getErrors('firstName')}
                />
              </Grid>
              <Grid item xs={6}>
                <ScTextInput
                  label={m.lastName}
                  autocomplete="family-name"
                  {..._form.register('lastName', {
                    required: {value: true, message: m.required},
                    pattern: {value: regexp.emojis, message: m.invalidName},
                  })}
                  required
                  {...getErrors('lastName')}
                />
              </Grid>
            </Grid>
          </Row>
          <Row icon="email">
            <ScTextInput
              label={m.email}
              autocomplete="email"
              type="email"
              {..._form.register('email', {
                required: {value: true, message: m.required},
                pattern: {value: regexp.email, message: m.invalidEmail},
                validate: {
                  isDummyEmail: value => {
                    return !appConfig.dummyEmailDomain.find(_ => value.includes(_)) || m.consumerDummyEmailNotAccepted
                  },
                },
              })}
              required
              {...getErrors('email')}
            />
          </Row>
          <Row icon="phone">
            <ScTextInput
              label={m.phoneOptional}
              autocomplete="tel"
              type="tel"
              {..._form.register('phone', {
                pattern: {value: regexp.phone, message: m.invalidPhone},
              })}
              {...getErrors('phone')}
              required={false}
              placeholder={m.phonePlaceholder}
            />
          </Row>
          <Row icon="receipt">
            <ScTextInput
              label={m.referenceNumberOptional}
              desc={m.referenceNumberDesc}
              placeholder={m.referenceNumberPlaceholder}
              {..._form.register('referenceNumber', {
                maxLength: {value: 100, message: m.atMost100Chars},
              })}
              required={false}
              {...getErrors('referenceNumber')}
            />
          </Row>
          {showContactAgreement && (
            <>
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
                    <ScRadioButtons
                      {...field}
                      required
                      error={getErrors('contactAgreement').error}
                      errorMessage={getErrors('contactAgreement').helperText}
                      options={[
                        {
                          label: m.contactAgreementTrueTitle,
                          description: <Txt size="small" dangerouslySetInnerHTML={{__html: m.contactAgreementTrueDesc}} />,
                          value: true,
                        },
                        {
                          label: m.contactAgreementFalseTitle,
                          description: <Txt size="small" dangerouslySetInnerHTML={{__html: m.contactAgreementFalseDesc}} />,
                          value: false,
                        },
                      ]}
                    />
                  )}
                />
              </Row>
              {watchContactAgreement === false && (
                <Row sx={{mt: 3}}>
                  <ConsumerAnonymousInformation />
                </Row>
              )}
            </>
          )}
        </PanelBody>
      </Panel>
      <ConsumerValidationDialog
        open={openValidationDialog}
        consumerEmail={_form.getValues().email}
        onClose={() => setOpenValidationDialog(false)}
        onValidated={saveAndNext}
      />
      <ReportFlowStepperActions
        loadingNext={_checkEmail.isLoading}
        next={() => {
          _form.handleSubmit(form => {
            _checkEmail
              .mutateAsync(form.email)
              .then(res => {
                if (res.valid) saveAndNext()
                else setOpenValidationDialog(true)
              })
              .catch(() => {
                toastError()
              })
          })()
        }}
        {...{stepNavigation}}
      />
    </>
  )
}
