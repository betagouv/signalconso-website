import {Button} from '@codegouvfr/react-dsfr/Button'
import {Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {ButtonWithLoader} from '@/components_simple/buttons/Buttons'
import {ScAlert} from '@/components_simple/ScAlert'
import {ScValidationCodeInput} from '@/components_simple/formInputs/ScValidationCodeInput'
import {useApiClients} from '@/context/ApiClientsContext'
import {useI18n} from '@/i18n/I18n'
import {ValidationRejectReason} from '@/model/ConsumerEmailValidation'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Txt} from '../../../components_simple/Txt'
import {duration} from '../../../utils/Duration'
import {iconArrowRight, timeoutPromise} from '../../../utils/utils'

interface Props {
  loading?: boolean
  open?: boolean
  consumerEmail: string
  onClose: () => void
  onValidated: () => void
}

interface ValidationForm {
  code: string
}

export const ConsumerValidationDialog = ({loading, open, consumerEmail, onClose, onValidated}: Props) => {
  const _form = useForm<ValidationForm>()
  const {signalConsoApiClient} = useApiClients()
  const {m, currentLang} = useI18n()
  const _validateEmail = useMutation({
    mutationFn: (code: string) => signalConsoApiClient.checkEmailAndValidate(consumerEmail, code),
  })
  const _checkEmail = useMutation({
    mutationFn: () => signalConsoApiClient.checkEmail(consumerEmail, currentLang),
  })
  const [disableResendButton, setDisableResendButton] = useState(false)

  const isEmailValid: boolean | undefined = _validateEmail.data?.valid
  const invalidEmailReason: ValidationRejectReason | undefined = _validateEmail.data?.reason

  const onSubmitButtonClick = _form.handleSubmit(async form => {
    if (!isEmailValid) {
      const res = await _validateEmail.mutateAsync(form.code)
      if (res.valid) {
        await timeoutPromise(500)
        onValidated()
      }
    }
  })

  return (
    <Dialog open={!!open} maxWidth="xs">
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
          }}
        />
      )}
      <DialogTitle>{m.consumerAskCodeTitle}</DialogTitle>
      <DialogContent>
        <ScAlert
          dense
          type="info"
          action={
            <>
              <ButtonWithLoader
                disabled={disableResendButton}
                loading={_checkEmail.isLoading}
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
          <p>{m.consumerEmailMayTakesTime}</p>
        </ScAlert>
        {isEmailValid === false && (
          <ScAlert dense type="error">
            <p>
              {invalidEmailReason === 'TOO_MANY_ATTEMPTS' ? m.consumerValidationCodeExpired : m.consumerValidationCodeInvalid}
            </p>
          </ScAlert>
        )}
        <Txt color="hint" block sx={{mb: 1}} dangerouslySetInnerHTML={{__html: m.consumerAskCodeDesc(consumerEmail)}} />
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} priority="tertiary">
          {m.close}
        </Button>
        {isEmailValid ? (
          <Button iconId="fr-icon-success-line" disabled={true} className="!bg-green-700 !text-white">
            {m.validated}
          </Button>
        ) : (
          <ButtonWithLoader loading={_validateEmail.isLoading} onClick={onSubmitButtonClick} iconId={iconArrowRight}>
            {m.verify}
          </ButtonWithLoader>
        )}
      </DialogActions>
    </Dialog>
  )
}
