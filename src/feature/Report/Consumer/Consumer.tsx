import {Panel, PanelBody} from '../../../shared/Panel/Panel'
import {useI18n} from '../../../core/i18n'
import {Box, Grid, Icon} from '@mui/material'
import React, {ReactNode, useState} from 'react'
import {ScInput} from '../../../shared/Input/ScInput'
import {FormLayout} from '../../../shared/FormLayout/FormLayout'
import {Controller, useForm} from 'react-hook-form'
import {regexp} from '../../../core/utils/regexp'
import {ScRadioGroup, ScRadioGroupItem} from '../../../shared/RadioGroup'
import {useReportFlowContext} from '../ReportFlowContext'
import {Txt} from 'mui-extension'
import {StepperActions} from '../../../shared/Stepper/StepperActions'
import {useApiSdk} from '../../../core/context/ApiSdk'
import {useFetcher} from '@alexandreannic/react-hooks-lib'
import {useStepperContext} from '../../../shared/Stepper/Stepper'
import {ConsumerValidationDialog} from './ConsumerValidationDialog'

interface RowProps {
  icon?: string
  children: ReactNode
}

interface ConsumerForm {
  firstName: string
  lastName: string
  email: string
  contactAgreement: boolean
  phone?: string
}

const Row = ({icon, children}: RowProps) => {
  return (
    <Box sx={{display: 'flex', '& + &': {mt: 2}}}>
      <Icon sx={{
        mr: 2,
        mt: .5,
        minWidth: 30,
        textAlign: 'center',
        color: t => t.palette.text.disabled
      }}>{icon}</Icon>
      <Box sx={{width: '100%'}}>{children}</Box>
    </Box>
  )
}


export const Consumer = () => {
  const _reportFlow = useReportFlowContext()
  const draft = _reportFlow.reportDraft
  const {m} = useI18n()
  const [openValidationDialog, setOpenValidationDialog] = useState<boolean>(false)
  const {apiSdk} = useApiSdk()
  const _stepper = useStepperContext()
  const _checkEmail = useFetcher(apiSdk.authenticate.checkConsumerEmail)
  const _form = useForm<ConsumerForm>()


  const getErrors = (name: keyof ConsumerForm): {error: boolean, helperText?: string} => ({
    error: !!_form.formState.errors[name],
    helperText: _form.formState.errors[name]?.message,
  })

  const saveAndNext = () => {
    _reportFlow.setReportDraft(_ => ({
      ..._,
      consumer: {..._form.getValues()},
      contactAgreement: _form.getValues().contactAgreement,
    }))
    _stepper.next()
  }

  console.log('getValues', _form.getValues())

  return (
    <>
      <Panel title={m.consumerTitle}>
        <PanelBody>
          <Row icon="person">
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
                fullWidth
                defaultValue={draft.consumer?.email ?? ''}
                {...getErrors('email')}
                {..._form.register('email', {
                  required: {value: true, message: m.required},
                  pattern: {value: regexp.email, message: m.invalidEmail}
                })}
              />
            </FormLayout>
          </Row>
          <Row icon="phone">
            <FormLayout label={m.phone}>
              <ScInput
                fullWidth
                defaultValue={draft.consumer?.phone ?? ''}
                {...getErrors('phone')}
                {..._form.register('phone', {
                  pattern: {value: regexp.phone, message: m.invalidEmail}
                })}
              />
            </FormLayout>
          </Row>
          <Row icon="https">
            <Controller
              control={_form.control}
              name="contactAgreement"
              defaultValue={draft.contactAgreement}
              rules={{
                required: {value: true, message: m.required}
              }}
              render={({field}) => (
                <ScRadioGroup
                  {...field}
                  {...getErrors('contactAgreement')}
                >
                  <ScRadioGroupItem
                    value={true}
                    title={m.contactAgreementTrueTitle}
                    description={<Txt size="small" dangerouslySetInnerHTML={{__html: m.contactAgreementTrueDesc}}/>}
                  />
                  <ScRadioGroupItem
                    value={false}
                    title={m.contactAgreementFalseTitle}
                    description={<Txt size="small" dangerouslySetInnerHTML={{__html: m.contactAgreementFalseDesc}}/>}
                  />
                </ScRadioGroup>
              )}
            />
          </Row>
        </PanelBody>
      </Panel>
      <ConsumerValidationDialog
        open={openValidationDialog}
        consumerEmail={_form.getValues().email}
        onClose={() => setOpenValidationDialog(false)}
        onValidated={saveAndNext}
      />
      <StepperActions
        loadingNext={_checkEmail.loading}
        next={() => {
          _form.handleSubmit(form => {
            _checkEmail.fetch({}, form.email).then(res => {
              if (res.valid) saveAndNext()
              else setOpenValidationDialog(true)
            })
          })()
        }}/>
    </>
  )
}
