import {ClientReferenceHelpButton} from '@/components_feature/reportFlow/Consumer/ClientReferenceHelpButton'
import {ConsumerShareInformation} from '@/components_feature/reportFlow/Consumer/ConsumerShareInformation'
import {NextStepButton} from '@/components_feature/reportFlow/reportFlowStepper/NextStepButton'
import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {ScTextInput} from '@/components_simple/formInputs/ScTextInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {getSubcategories, hasStep0, hasStep1Full, hasStep2} from '@/feature/reportUtils'
import {isTransmittable} from '@/feature/transmissionStatus'
import {useBreakpoints} from '@/hooks/useBreakpoints'
import {useI18n} from '@/i18n/I18n'
import {AppLangs} from '@/i18n/localization/AppLangs'
import {Report} from '@/model/Report'
import {last} from '@/utils/lodashNamedExport'
import {regexp} from '@/utils/regexp'
import {useMutation} from '@tanstack/react-query'
import {ReactNode, useCallback, useEffect} from 'react'
import {Controller, useForm, UseFormReturn} from 'react-hook-form'
import {StandardSubcategory} from 'shared/anomalies/Anomaly'
import {ScAlert} from '../../../components_simple/ScAlert'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {getApiErrorId, useToastError} from '../../../hooks/useToastError'
import {PartialReport, useReportFlowContext} from '../ReportFlowContext'
import {ConsumerAnonymousInformation} from './ConsumerAnonymousInformation'
import {ConsumerValidationDialog2, consumerValidationModal} from './ConsumerValidationDialog'

interface ConsumerForm {
  firstName: string
  lastName: string
  email: string
  contactAgreement?: boolean
  phone?: string
  referenceNumber?: string
}

export const Consumer = ({stepNavigation}: {stepNavigation: StepNavigation}) => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.report
  return (
    <ConsumerInner
      draft={draft}
      saveChange={(changes, goToNextStep) => {
        _reportFlow.setReport(_ => ({
          ..._,
          step4: changes,
        }))
        if (goToNextStep) {
          _reportFlow.sendReportEvent(stepNavigation.currentStep)
          stepNavigation.next()
        }
      }}
      {...{stepNavigation}}
    />
  )
}

export const ConsumerInner = ({
  draft,
  saveChange,
  stepNavigation,
}: {
  draft: PartialReport
  saveChange: (_: Partial<Report['step4']>, goToNextStep?: boolean) => void
  stepNavigation: StepNavigation
}) => {
  if (!hasStep0(draft) || !hasStep1Full(draft) || !hasStep2(draft)) {
    throw new Error('This draft is not ready for the Consumer step')
  }
  const {m, currentLang} = useI18n()
  const {isSmOrMore} = useBreakpoints()
  const {signalConsoApiClient} = useApiClients()
  const _reportFlow = useReportFlowContext()
  const _checkEmail = useMutation({
    mutationFn: (email: string) => {
      return signalConsoApiClient.checkEmail(email, currentLang)
    },
  })
  const consumer = draft.step4?.consumer

  const defaultConsumer = {
    firstName: consumer?.firstName ?? '',
    lastName: consumer?.lastName ?? '',
    email: consumer?.email ?? '',
    phone: consumer?.phone,
    referenceNumber: consumer?.referenceNumber,
  }

  const _form: UseFormReturn<ConsumerForm> = useForm<ConsumerForm>({
    mode: 'onChange',
    defaultValues: defaultConsumer,
  })

  const {
    watch,
    trigger,
    formState: {dirtyFields},
  } = _form

  const watchFields = watch()

  const autoSave = useCallback(async () => {
    const modifiedData: ConsumerForm = defaultConsumer

    try {
      //Email need a specific validation (email has to be validated with confirm email), so it is not saved partially
      for (const field of Object.keys(dirtyFields).filter(_ => _ !== 'email')) {
        const f = field as keyof ConsumerForm
        // Validate only the dirty field
        const isValid = await trigger(f)
        if (isValid) {
          // @ts-ignore
          modifiedData[f] = watchFields[f]
          const res = {
            consumer: {...consumer, ...modifiedData},
            contactAgreement: modifiedData.contactAgreement ?? draft.step4?.contactAgreement,
          }
          saveChange(res, false)
        }
      }
    } catch (error) {
      console.error('Validation or saving error:', error)
    }
  }, [dirtyFields, watchFields, trigger])

  useEffect(() => {
    const interval = setInterval(() => {
      autoSave()
    }, 2500)

    return () => clearInterval(interval)
  }, [autoSave])

  const toastError = useToastError()
  const watchContactAgreement = _form.watch('contactAgreement')

  const subcategories = getSubcategories(draft)
  const clientReferenceInput = last(
    subcategories.filter(
      (subcategory): subcategory is StandardSubcategory =>
        'customizedClientReferenceInput' in subcategory && subcategory.customizedClientReferenceInput !== undefined,
    ),
  )?.customizedClientReferenceInput

  const transmittable = isTransmittable(draft)
  const showContactAgreement = transmittable

  const getErrors = (name: keyof ConsumerForm): {error: boolean; helperText?: string} => ({
    error: !!_form.formState.errors[name],
    helperText: _form.formState.errors[name]?.message,
  })

  const getReportStep4 = () => {
    const {contactAgreement, ...consumer} = _form.getValues()
    return {
      consumer: consumer,
      contactAgreement: (() => {
        if (!transmittable) return false
        if (contactAgreement === undefined) {
          throw new Error('contactAgreement should be defined at this stage')
        }
        return contactAgreement
      })(),
    }
  }

  const saveAndNext = () => {
    const step4 = getReportStep4()
    // _analytic.trackEvent(EventCategories.report, ReportEventActions.validateConsumer)
    _reportFlow.sendReportEvent(stepNavigation.currentStep)
    saveChange(step4, true)
  }

  return (
    <>
      <div>
        <h2 className="fr-h6">{m.consumerTitle}</h2>
        <div>
          {draft.step1.employeeConsumer && (
            <ScAlert type="info" dangerouslySetInnerHTML={{__html: `<p>${m.consumerIsEmployee}</p>`}} />
          )}
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
            })}
            required
            {...getErrors('email')}
          />
          <ScTextInput
            label={<WithIcon icon="fr-icon-phone-line">{m.phone}</WithIcon>}
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
            desc={
              clientReferenceInput && clientReferenceInput.description ? clientReferenceInput.description : m.referenceNumberDesc
            }
            label={
              <span>
                <WithIcon icon="ri-bill-line">
                  {clientReferenceInput && clientReferenceInput.label ? clientReferenceInput.label : m.referenceNumber}
                </WithIcon>{' '}
                {!clientReferenceInput && <ClientReferenceHelpButton />}
              </span>
            }
            placeholder={
              clientReferenceInput && clientReferenceInput.placeholder
                ? clientReferenceInput.placeholder
                : m.referenceNumberPlaceholder
            }
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
                defaultValue={draft.step4?.contactAgreement}
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
                        description: <span className="text-sm" dangerouslySetInnerHTML={{__html: m.contactAgreementTrueDesc}} />,
                        value: true,
                      },
                      {
                        label: m.contactAgreementFalseTitle,
                        description: <span className="text-sm" dangerouslySetInnerHTML={{__html: m.contactAgreementFalseDesc}} />,
                        value: false,
                      },
                    ]}
                  />
                )}
              />
              {watchContactAgreement === true && <ConsumerShareInformation />}
              {watchContactAgreement === false && <ConsumerAnonymousInformation />}
            </>
          )}
        </div>
      </div>
      <ConsumerValidationDialog2 consumerEmail={_form.getValues().email} onValidated={saveAndNext} />
      <NextStepButton
        loadingNext={_checkEmail.isPending}
        onNext={() => {
          _form.handleSubmit(async form => {
            try {
              const res = await _checkEmail.mutateAsync(form.email)
              if (res.valid) saveAndNext()
              else consumerValidationModal.open()
            } catch (e) {
              const errorId = getApiErrorId(e)
              let msg: string | undefined = undefined
              switch (errorId) {
                case 'SC-0020-02':
                  msg = m.consumerDummyEmailNotAccepted
                  break
                case 'SC-0059':
                  msg = m.consumerAliasEmailNotAccepted
                  break
              }

              toastError(msg)
            }
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
