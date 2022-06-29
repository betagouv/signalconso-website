import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Icon, LinearProgress} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useI18n} from 'core/i18n'
import {ScButton} from 'shared/Button/Button'
import {useFetcher} from '../../../alexlibs/react-hooks-lib'
import {useApiSdk} from 'core/context/ApiSdk'
import {Alert, Txt} from '../../../alexlibs/mui-extension'
import {delay, duration, fnSwitch} from '../../../alexlibs/ts-utils'
import {LoadingButton} from '@mui/lab'
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

  const switchValidity = <T,>({valid, invalid, unknown}: {valid?: T; invalid?: T; unknown?: T}): T | undefined => {
    const isEmailValid = _validateEmail.entity?.valid
    if (isEmailValid) {
      return valid
    }
    if (isEmailValid === false) {
      return invalid
    }
    return unknown
  }

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
        {_validateEmail.entity?.valid === false && (
          <Alert dense type="error" sx={{mb: 2}}>
            {fnSwitch(
              _validateEmail.entity.reason!,
              {
                ['TOO_MANY_ATTEMPTS']: m.consumerValidationCodeExpired,
                ['INVALID_CODE']: m.consumerValidationCodeInvalid,
              },
              () => m.consumerValidationCodeExpired,
            )}
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
            <InputValidationCode {...field} error={!!_form.formState.errors.code || _validateEmail.entity?.valid === false} />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          {m.close}
        </Button>
        {(() => {
          const startIcon = switchValidity({valid: <Icon>check_circle</Icon>})
          return (
            <LoadingButton
              color={switchValidity({valid: 'success', invalid: 'primary', unknown: 'primary'})}
              onClick={_form.handleSubmit(form => {
                if (_validateEmail.entity?.valid) return
                _validateEmail.fetch({clean: false}, consumerEmail, form.code).then(res => {
                  if (res.valid) delay(500)(res).then(onValidated)
                })
              })}
              loading={_validateEmail.loading}
              loadingPosition={startIcon ? 'start' : undefined}
              startIcon={startIcon}
              variant="contained"
            >
              {switchValidity({valid: m.validated, invalid: m.verify, unknown: m.verify})}
            </LoadingButton>
          )
        })()}
      </DialogActions>
    </Dialog>
  )
}
