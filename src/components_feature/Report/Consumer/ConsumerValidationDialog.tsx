import {LoadingButton} from '@mui/lab'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, LinearProgress} from '@mui/material'
import {useApiClients} from 'context/ApiClientsContext'
import {useI18n} from 'i18n/I18n'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ScButton} from 'components_simple/Button/Button'
import {Txt} from '../../../alexlibs/mui-extension/Txt/Txt'
import {useFetcher} from '../../../hooks/useFetcher'
import {duration} from '../../../utils/Duration'
import {timeoutPromise} from '../../../utils/utils'
import {InputValidationCode} from './InputValidationCode'
import {ValidationRejectReason} from 'model/ConsumerEmailValidation'
import {Alert} from 'alexlibs/mui-extension/Alert/Alert'

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
  const _validateEmail = useFetcher(signalConsoApiClient.checkEmailAndValidate)
  const _checkEmail = useFetcher(signalConsoApiClient.checkEmail)
  const [disableResendButton, setDisableResendButton] = useState(false)

  const isEmailValid: boolean | undefined = _validateEmail.entity?.valid
  const invalidEmailReason: ValidationRejectReason | undefined = _validateEmail.entity?.reason

  const onSubmitButtonClick = _form.handleSubmit(async form => {
    if (!isEmailValid) {
      const res = await _validateEmail.fetch({clean: false}, consumerEmail, form.code)
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
        <Alert
          dense
          type="info"
          sx={{mb: 2}}
          action={
            <ScButton
              disabled={disableResendButton}
              loading={_checkEmail.loading}
              size="small"
              icon="refresh"
              onClick={() => {
                setDisableResendButton(true)
                setTimeout(() => setDisableResendButton(false), duration(15, 'second'))
                _checkEmail.fetch({}, consumerEmail, currentLang)
              }}
            >
              {m.consumerResentEmail}
            </ScButton>
          }
        >
          {m.consumerEmailMayTakesTime}
        </Alert>
        {isEmailValid === false && (
          <Alert dense type="error" sx={{mb: 2}}>
            {invalidEmailReason === 'TOO_MANY_ATTEMPTS' ? m.consumerValidationCodeExpired : m.consumerValidationCodeInvalid}
          </Alert>
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
          loading={_validateEmail.loading}
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
