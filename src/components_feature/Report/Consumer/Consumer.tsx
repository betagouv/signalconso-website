import {Grid} from '@mui/material'
import {EventCategories, ReportEventActions} from 'analytic/analytic'
import {useAnalyticContext} from 'analytic/AnalyticContext'
import {FormLayout} from 'components_simple/FormLayout/FormLayout'
import {ScInput} from 'components_simple/Input/ScInput'
import {Panel, PanelBody} from 'components_simple/Panel/Panel'
import {ScRadioGroup} from 'components_simple/RadioGroup/RadioGroup'
import {ScRadioGroupItem} from 'components_simple/RadioGroup/RadioGroupItem'
import {StepNavigation} from 'components_simple/ReportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from 'components_simple/ReportFlowStepper/ReportFlowStepperActions'
import {Row} from 'components_simple/Row/Row'
import {useApiClients} from 'context/ApiClientsContext'
import {useWindowWidth} from 'hooks/useWindowWidth'
import {useI18n} from 'i18n/I18n'
import {ReportDraft2} from 'model/ReportDraft2'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {regexp} from 'utils/regexp'
import {Alert} from '../../../alexlibs/mui-extension/Alert/Alert'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {appConfig} from '../../../core/appConfig'
import {useFetcher} from '../../../hooks/useFetcher'
import {useToast} from '../../../hooks/useToast'
import {Gender, genders, ReportDraft} from '../../../model/ReportDraft'
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
    <_Consumer
      draft={draft}
      onSubmit={changes => {
        _reportFlow.setReportDraft(_ => ReportDraft2.merge(_, changes))
        stepNavigation.next()
      }}
      {...{stepNavigation}}
    />
  )
}

export const _Consumer = ({
  draft,
  onSubmit,
  stepNavigation,
}: {
  draft: Partial<ReportDraft2>
  onSubmit: (_: DeepPartial<ReportDraft2>) => void
  stepNavigation: StepNavigation
}) => {
  const {m} = useI18n()
  const [openValidationDialog, setOpenValidationDialog] = useState<boolean>(false)
  const {signalConsoApiClient} = useApiClients()
  const _checkEmail = useFetcher(signalConsoApiClient.checkEmail)
  const _form = useForm<ConsumerForm>()
  const _analytic = useAnalyticContext()
  const {isXsOrLess} = useWindowWidth()
  const {toastError} = useToast()
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
                    {genders.map(gender => (
                      <ScRadioGroupItem key={gender} value={gender} title={m.gender[gender]} />
                    ))}
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
            </FormLayout>
          </Row>
          {!draft.tags?.includes('Bloctel') && (
            <Row icon="phone">
              <FormLayout label={m.phoneOptional}>
                <ScInput
                  type="tel"
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
              {watchContactAgreement === false && appConfig.enableBlueExplanations && (
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
        loadingNext={_checkEmail.loading}
        next={() => {
          _form.handleSubmit(form => {
            _checkEmail
              .fetch({}, form.email)
              .then(res => {
                if (res.valid) saveAndNext()
                else setOpenValidationDialog(true)
              })
              .catch(e => {
                toastError(e)
              })
          })()
        }}
        {...{stepNavigation}}
      />
    </>
  )
}
