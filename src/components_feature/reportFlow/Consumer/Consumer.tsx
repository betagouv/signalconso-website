import {Grid} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {FieldLayout} from 'components_simple/FieldLayout'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {Panel, PanelBody} from 'components_simple/Panel'
import {StepNavigation} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {Row} from 'components_simple/Row'
import {useApiClients} from 'context/ApiClientsContext'
import {useBreakpoints} from 'hooks/useBreakpoints'
import {useI18n} from 'i18n/I18n'
import {ReportDraft2} from 'model/ReportDraft2'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {regexp} from 'utils/regexp'
import {ScAlert} from '../../../components_simple/ScAlert'
import {Txt} from '../../../components_simple/Txt'
import {appConfig} from '../../../core/appConfig'
import {useToastError} from '../../../hooks/useToastError'
import {Gender, ReportDraft, genders} from '../../../model/ReportDraft'
import {DeepPartial} from '../../../utils/utils'
import {useReportFlowContext} from '../ReportFlowContext'
import {ConsumerAnonymousInformation} from './ConsumerAnonymousInformation'
import {ConsumerValidationDialog} from './ConsumerValidationDialog'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'

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
  const _checkEmail = useMutation({
    mutationFn: (email: string) => {
      return signalConsoApiClient.checkEmail(email, currentLang)
    },
  })
  const _form = useForm<ConsumerForm>()
  const _analytic = useAnalyticContext()
  const {isSmOrMore} = useBreakpoints()
  const toastError = useToastError()
  const watchContactAgreement = _form.watch('contactAgreement')

  const showContactAgreement = ReportDraft.isTransmittableToPro(draft) && draft.consumerWish !== 'fixContractualDispute'

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
          <Row icon="person">
            <FieldLayout label={m.genderOptional}>
              <Controller
                defaultValue={draft.consumer?.gender}
                control={_form.control}
                render={({field}) => <ScRadioButtons {...field} orientation="horizontal" options={gendersOptions} />}
                name={'gender'}
              />
            </FieldLayout>
            <Grid container columnSpacing={2}>
              <Grid item xs={6}>
                <FieldLayout label={m.firstName} required>
                  <ScInput
                    autoComplete="given-name"
                    fullWidth
                    defaultValue={draft.consumer?.firstName ?? ''}
                    {..._form.register('firstName', {
                      required: {value: true, message: m.required},
                      pattern: {value: regexp.emojis, message: m.invalidName},
                    })}
                    {...getErrors('firstName')}
                  />
                </FieldLayout>
              </Grid>
              <Grid item xs={6}>
                <FieldLayout label={m.lastName} required>
                  <ScInput
                    autoComplete="family-name"
                    fullWidth
                    defaultValue={draft.consumer?.lastName ?? ''}
                    {..._form.register('lastName', {
                      required: {value: true, message: m.required},
                      pattern: {value: regexp.emojis, message: m.invalidName},
                    })}
                    {...getErrors('lastName')}
                  />
                </FieldLayout>
              </Grid>
            </Grid>
          </Row>
          <Row icon="email">
            <FieldLayout label={m.email} required>
              <ScInput
                autoComplete="email"
                type="email"
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
            </FieldLayout>
          </Row>
          <Row icon="phone">
            <FieldLayout label={m.phoneOptional}>
              <ScInput
                autoComplete="tel"
                type="tel"
                placeholder={m.phonePlaceholder}
                fullWidth
                defaultValue={draft.consumer?.phone ?? ''}
                {...getErrors('phone')}
                {..._form.register('phone', {
                  pattern: {value: regexp.phone, message: m.invalidPhone},
                })}
              />
            </FieldLayout>
          </Row>
          <Row icon="receipt">
            <FieldLayout label={m.referenceNumberOptional} desc={m.referenceNumberDesc}>
              <ScInput
                placeholder={m.referenceNumberPlaceholder}
                fullWidth
                defaultValue={draft.consumer?.referenceNumber ?? ''}
                {...getErrors('referenceNumber')}
                {..._form.register('referenceNumber', {
                  maxLength: {value: 100, message: m.atMost100Chars},
                })}
              />
            </FieldLayout>
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
