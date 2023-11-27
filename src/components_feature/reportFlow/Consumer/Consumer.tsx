import {useAnalyticContext} from '@/analytic/AnalyticContext'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ReportFlowStepperActions} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepperActions'
import {RequiredFieldsLegend} from '@/components_simple/RequiredFieldsLegend'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {AppLangs} from '@/i18n/localization/AppLangs'
import {ReportDraft2} from '@/model/ReportDraft2'
import {regexp} from '@/utils/regexp'
import {useMutation} from '@tanstack/react-query'
import {ReactNode, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
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
      <div>
        <h2 className="fr-h6">{m.consumerTitle}</h2>
        <div>
          {draft.employeeConsumer && (
            <ScAlert type="info" dense dangerouslySetInnerHTML={{__html: `<p>${m.consumerIsEmployee}</p>`}} />
          )}
          <RequiredFieldsLegend />
          <Controller
            defaultValue={draft.consumer?.gender}
            control={_form.control}
            render={({field}) => (
              <ScRadioButtons
                {...field}
                required
                orientation="horizontal"
                options={gendersOptions}
                title={<WithIcon icon="ri-user-smile-line">{m.genderField}</WithIcon>}
                titleSoberStyle
              />
            )}
            name={'gender'}
          />
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <ScTextInput
                label={<WithIcon icon="ri-account-box-line">{m.firstName}</WithIcon>}
                autocomplete="given-name"
                {..._form.register('firstName', {
                  required: {value: true, message: m.required},
                  pattern: {value: regexp.emojis, message: m.invalidName},
                })}
                required
                {...getErrors('firstName')}
              />
            </div>
            <div className="w-1/2">
              <ScTextInput
                label={<WithIcon icon="ri-account-box-line">{m.lastName}</WithIcon>}
                autocomplete="family-name"
                {..._form.register('lastName', {
                  required: {value: true, message: m.required},
                  pattern: {value: regexp.emojis, message: m.invalidName},
                })}
                required
                {...getErrors('lastName')}
                disableLeftBorderOnError
              />
            </div>
          </div>
          <ScTextInput
            label={<WithIcon icon="fr-icon-mail-line">{m.email}</WithIcon>}
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
          <ScTextInput
            label={<WithIcon icon="fr-icon-phone-line">{m.phoneOptional}</WithIcon>}
            autocomplete="tel"
            type="tel"
            {..._form.register('phone', {
              pattern: {
                value: currentLang === AppLangs.fr ? regexp.phone : regexp.internationalPhone,
                message: m.invalidPhone,
              },
            })}
            {...getErrors('phone')}
            required={false}
            placeholder={m.phonePlaceholder}
          />
          <ScTextInput
            label={<WithIcon icon="ri-bill-line">{m.referenceNumberOptional}</WithIcon>}
            desc={m.referenceNumberDesc}
            placeholder={m.referenceNumberPlaceholder}
            {..._form.register('referenceNumber', {
              maxLength: {value: 100, message: m.atMost100Chars},
            })}
            required={false}
            {...getErrors('referenceNumber')}
          />
          {showContactAgreement && (
            <>
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
                    title={
                      //  ri-shake-hands-line would be great here but it doesn't work right now because codegouv DSFR is not up to date with remixicon
                      <WithIcon icon="ri-user-shared-line">{m.contactAgreementLabel}</WithIcon>
                    }
                    titleSoberStyle
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
              {watchContactAgreement === false && <ConsumerAnonymousInformation />}
            </>
          )}
        </div>
      </div>
      <ConsumerValidationDialog
        open={openValidationDialog}
        consumerEmail={_form.getValues().email}
        onClose={() => setOpenValidationDialog(false)}
        onValidated={saveAndNext}
      />
      <ReportFlowStepperActions
        loadingNext={_checkEmail.isPending}
        onNext={() => {
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

function WithIcon({children, icon}: {children: ReactNode; icon: string}) {
  return (
    <>
      <span className={`${icon} mr-1`} aria-hidden="true" /> {children}
    </>
  )
}
