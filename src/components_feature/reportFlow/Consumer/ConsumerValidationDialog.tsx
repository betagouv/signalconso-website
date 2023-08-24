import {LoadingButton} from '@mui/lab'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, LinearProgress} from '@mui/material'
import {useMutation} from '@tanstack/react-query'
import {ScAlert} from 'components_simple/ScAlert'
import {ScButton} from 'components_simple/Button'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {ValidationRejectReason} from 'model/ConsumerEmailValidation'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {Txt} from '../../../components_simple/Txt'
import {duration} from '../../../utils/Duration'
import {timeoutPromise} from '../../../utils/utils'
import {InputValidationCode} from './InputValidationCode'

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
            <ScButton
              disabled={disableResendButton}
              loading={_checkEmail.isLoading}
              size="small"
              icon="refresh"
              onClick={() => {
                setDisableResendButton(true)
                setTimeout(() => setDisableResendButton(false), duration(15, 'second'))
                _checkEmail.mutate()
              }}
            >
              {m.consumerResentEmail}
            </ScButton>
          }
        >
          {m.consumerEmailMayTakesTime}
        </ScAlert>
        {isEmailValid === false && (
          <ScAlert dense type="error">
            {invalidEmailReason === 'TOO_MANY_ATTEMPTS' ? m.consumerValidationCodeExpired : m.consumerValidationCodeInvalid}
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
            <InputValidationCode
              {...field}
              error={!!_form.formState.errors.code || isEmailValid === false}
              helperText={_form.formState.errors['code']?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {m.close}
        </Button>
        <LoadingButton
          color={isEmailValid ? 'success' : 'primary'}
          onClick={onSubmitButtonClick}
          loading={_validateEmail.isLoading}
          {...(isEmailValid
            ? {
                startIcon: <Icon>check_circle</Icon>,
                loadingPosition: 'start',
              }
            : null)}
          variant="contained"
        >
          {isEmailValid ? m.validated : m.verify}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
