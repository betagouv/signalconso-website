import {LoadingButton} from '@mui/lab'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, LinearProgress} from '@mui/material'
import {useApiSdk} from 'core/context/ApiSdk'
import {useI18n} from 'core/i18n'
import {ValidationRejectReason} from 'model'
import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {ScButton} from 'shared/Button/Button'
import {Alert, Txt} from '../../../alexlibs/mui-extension'
import {useFetcher} from '../../../alexlibs/react-hooks-lib'
import {delay, duration, fnSwitch} from '../../../alexlibs/ts-utils'
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
  const {apiSdk} = useApiSdk()
  const {m} = useI18n()
  const _validateEmail = useFetcher(apiSdk.consumerEmail.checkAndValidate)
  const _checkEmail = useFetcher(apiSdk.consumerEmail.check)
  const [disableResendButton, setDisableResendButton] = useState(false)

  const isEmailValid: boolean | undefined = _validateEmail.entity?.valid
  const invalidEmailReason: ValidationRejectReason | undefined = _validateEmail.entity?.reason

  const onSubmitButtonClick = _form.handleSubmit(async form => {
    if (!isEmailValid) {
      const res = await _validateEmail.fetch({clean: false}, consumerEmail, form.code)
      if (res.valid) {
        await delay(500)
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
                _checkEmail.fetch({}, consumerEmail)
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
          render={({field}) => <InputValidationCode {...field} error={!!_form.formState.errors.code || isEmailValid === false} />}
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
          loadingPosition="start"
          startIcon={isEmailValid ? <Icon>check_circle</Icon> : undefined}
          variant="contained"
        >
          {isEmailValid ? m.validated : m.verify}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
