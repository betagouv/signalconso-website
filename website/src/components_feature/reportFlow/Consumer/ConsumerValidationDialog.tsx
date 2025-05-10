import {ScAlert} from '@/components_simple/ScAlert'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScValidationCodeInput} from '@/components_simple/formInputs/ScValidationCodeInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {ValidationRejectReason} from '@/model/ConsumerEmailValidation'
import {PortalToBody} from '@/utils/PortalToBody'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import {useMutation} from '@tanstack/react-query'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {duration} from '../../../utils/Duration'
import {iconArrowRight, timeoutPromise} from '../../../utils/utils'
import {ScCheckbox} from "@/components_simple/formInputs/ScCheckbox";
import {Checkbox} from "@codegouvfr/react-dsfr/Checkbox";

export const consumerValidationModal = createModal({
  id: 'consumer-validation-modal',
  isOpenedByDefault: false,
})

export function ConsumerValidationDialog2({consumerEmail, onValidated}: {
  consumerEmail: string;
  onValidated: () => void
}) {
  const _form = useForm<ValidationForm>()
  const {signalConsoApiClient} = useApiClients()
  const {m, currentLang} = useI18n()
  const _validateEmail = useMutation({
    mutationFn: (form: ValidationForm) => signalConsoApiClient.checkEmailAndValidate(consumerEmail, form.code, form.consentToDataUse),
  })
  const _checkEmail = useMutation({
    mutationFn: () => signalConsoApiClient.checkEmail(consumerEmail, currentLang),
  })
  const [disableResendButton, setDisableResendButton] = useState(false)

  const isEmailValid: boolean | undefined = _validateEmail.data?.valid
  const invalidEmailReason: ValidationRejectReason | undefined = _validateEmail.data?.reason

  const onSubmitButtonClick = _form.handleSubmit(async form => {
    if (!isEmailValid) {
      const res = await _validateEmail.mutateAsync(form)
      if (res.valid) {
        await timeoutPromise(500)
        onValidated()
      }
    }
  })

  return (
    <>
      <PortalToBody>
        <consumerValidationModal.Component
          title={m.consumerAskCodeTitle}
          buttons={
            isEmailValid
              ? {
                children: m.validated,
                iconId: 'fr-icon-success-line',
                disabled: true,
                className: '!bg-green-700 !text-white',
                doClosesModal: false,
              }
              : {children: m.verify, iconId: iconArrowRight, onClick: onSubmitButtonClick, doClosesModal: false}
          }
        >
          <div>
            <ScAlert
              type="info"
              action={
                <>
                  <ButtonWithLoader
                    disabled={disableResendButton}
                    loading={_checkEmail.isPending}
                    iconId="ri-refresh-line"
                    priority="tertiary no outline"
                    onClick={() => {
                      setDisableResendButton(true)
                      setTimeout(() => setDisableResendButton(false), duration(15, 'second'))
                      _checkEmail.mutate()
                    }}
                  >
                    {m.consumerResentEmail}
                  </ButtonWithLoader>
                </>
              }
            >
              <p className="mb-0">{m.consumerEmailMayTakesTime}</p>
            </ScAlert>
            {isEmailValid === false && (
              <ScAlert type="error">
                <p className="mb-0">
                  {invalidEmailReason === 'TOO_MANY_ATTEMPTS' ? m.consumerValidationCodeExpired : m.consumerValidationCodeInvalid}
                </p>
              </ScAlert>
            )}
          </div>

          <p className="mb-2" dangerouslySetInnerHTML={{__html: m.consumerAskCodeDesc(consumerEmail)}}/>
          <Controller
            name="code"
            rules={{
              required: {value: true, message: m.required},
            }}
            control={_form.control}
            render={({field}) => (
              <>
                <div className="flex justify-center mt-4">
                  <ScValidationCodeInput
                    {...field}
                    error={!!_form.formState.errors.code || isEmailValid === false}
                    helperText={_form.formState.errors['code']?.message}
                    required
                  />
                </div>
              </>
            )}
          />

          <div className="mt-4">
            <Controller
              name="consentToDataUse"
              control={_form.control}
              render={({field}) => (
                <ScCheckbox
                  checked={field.value}
                  label={"Je donne mon accord pour être recontacté(e) dans le cadre d’enquêtes ultérieures.\n" +
                    "Mes données ne seront utilisées qu’à des fins d’analyse et resteront strictement confidentielles."}
                  required
                  {...field}                />
              )}
            />
          </div>

        </consumerValidationModal.Component>
      </PortalToBody>
    </>
  )
}

interface ValidationForm {
  code: string,
  consentToDataUse: boolean
}
