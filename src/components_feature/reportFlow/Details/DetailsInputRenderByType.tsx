import {MenuItem} from '@mui/material'
import {FieldLabel} from 'components_simple/FieldLabel'
import {ScDatepickerFr} from 'components_simple/formInputs/ScDatepickerFr'
import {ScInput} from 'components_simple/formInputs/ScInput'
import {ScSelect} from 'components_simple/formInputs/ScSelect'
import {appConfig} from 'core/appConfig'
import {useI18n} from 'i18n/I18n'
import {DetailInputValues2} from 'model/ReportDraft2'
import {Control, Controller, FieldErrors, UseFormGetValues} from 'react-hook-form'
import {dateToFrenchFormat, isDateInRange} from 'utils/utils'
import {DetailInput, DetailInputType} from '../../../anomalies/Anomaly'
import {ScCheckbox} from '../../../components_simple/formInputs/ScCheckbox'
import {ScRadioButtons} from '../../../components_simple/formInputs/ScRadioButtons'
import {mapNTimes} from '../../../utils/utils'
import {getDefaultValueFromInput, getOptionsFromInput, getPlaceholderFromInput} from './DetailInputsUtils'
import {DetailsSpecifyInput} from './DetailsSpecifyInput'
import {SpecifyFormUtils} from './Details'

export function DetailsInputRenderByType({
  control,
  inputIndex,
  input,
  errors,
  initialValues,
  getValues,
}: {
  control: Control<DetailInputValues2, any>
  inputIndex: number
  input: DetailInput
  errors: FieldErrors<DetailInputValues2>
  initialValues: DetailInputValues2 | undefined
  getValues: UseFormGetValues<DetailInputValues2>
}) {
  const {m} = useI18n()
  const name = inputIndex.toString()
  const label = <span dangerouslySetInnerHTML={{__html: input.label}} />
  const required = !input.optional
  const baseRules = {required: {value: required, message: m.required + ' *'}}
  const maxLengthRule = {maxLength: {value: appConfig.maxDescriptionInputLength, message: ''}}
  const errorMessage = errors[inputIndex]?.message
  const hasErrors = !!errors[inputIndex]
  // for most input types, the value can only be a string
  const unsafeControlForStringsOnly = control as Control<{[key: string]: string}>
  // for checkboxes it can be only string[]
  const unsafeControlForArrayStringsOnly = control as Control<{[key: string]: string[]}>
  const fieldLabelProps = {
    label,
    required,
    className: 'mb-4',
  }

  const renderDateVariant = ({max}: {max: string}) => {
    const min = '01/01/1970'
    return (
      <FieldLabel {...fieldLabelProps}>
        <Controller
          {...{name}}
          control={unsafeControlForStringsOnly}
          defaultValue={getDefaultValueFromInput(input) === 'SYSDATE' ? dateToFrenchFormat(new Date()) : undefined}
          rules={{
            ...baseRules,
            validate: d => {
              return isDateInRange(d, min, max) ? true : m.invalidDate
            },
          }}
          render={({field}) => (
            <ScDatepickerFr
              {...field}
              fullWidth
              placeholder={getPlaceholderFromInput(input)}
              min={min}
              max={max}
              helperText={errorMessage}
              error={hasErrors}
              required={required}
            />
          )}
        />
      </FieldLabel>
    )
  }

  switch (input.type) {
    case DetailInputType.DATE_NOT_IN_FUTURE:
      return renderDateVariant({
        max: dateToFrenchFormat(new Date()),
      })
    case DetailInputType.DATE:
      return renderDateVariant({
        max: '01/01/2100',
      })
    case DetailInputType.TIMESLOT:
      return (
        <FieldLabel {...fieldLabelProps}>
          <Controller
            {...{name}}
            control={control}
            rules={baseRules}
            render={({field}) => (
              <ScSelect
                {...field}
                fullWidth
                placeholder={getPlaceholderFromInput(input)}
                helperText={errorMessage}
                error={hasErrors}
                required={required}
              >
                {mapNTimes(24, i => (
                  <MenuItem key={i} value={`de ${i}h à ${i + 1}h`}>
                    {m.timeFromTo(i, i + 1)}
                  </MenuItem>
                ))}
              </ScSelect>
            )}
          />
        </FieldLabel>
      )
    case DetailInputType.RADIO:
      return (
        <Controller
          control={control}
          name={inputIndex.toString()}
          rules={baseRules}
          render={({field}) => (
            <ScRadioButtons
              {...field}
              title={label}
              titleSoberStyle
              required={required}
              errorMessage={errorMessage}
              error={hasErrors}
              options={
                getOptionsFromInput(input)?.map((option, i) => {
                  return {
                    label: <span dangerouslySetInnerHTML={{__html: option}} />,
                    value: option,
                    specify:
                      field.value === option && SpecifyFormUtils.hasSpecifyKeyword(option) ? (
                        <DetailsSpecifyInput
                          control={control}
                          error={errors[SpecifyFormUtils.getInputName(inputIndex)]}
                          defaultValue={initialValues?.[SpecifyFormUtils.getInputName(inputIndex)]}
                          name={SpecifyFormUtils.getInputName(inputIndex)}
                        />
                      ) : undefined,
                  }
                }) ?? []
              }
            />
          )}
        />
      )
    case DetailInputType.CHECKBOX:
      return (
        <Controller
          control={unsafeControlForArrayStringsOnly}
          {...{name}}
          rules={baseRules}
          render={({field}) => (
            <ScCheckbox
              {...field}
              title={label}
              titleSoberStyle
              required={required}
              options={
                getOptionsFromInput(input)?.map(option => {
                  return {
                    label: <span dangerouslySetInnerHTML={{__html: option}} />,
                    value: option,
                    specify:
                      (field.value as string[] | undefined)?.includes(option) && SpecifyFormUtils.hasSpecifyKeyword(option) ? (
                        <DetailsSpecifyInput
                          control={control}
                          error={errors[SpecifyFormUtils.getInputName(inputIndex)]}
                          defaultValue={initialValues?.[SpecifyFormUtils.getInputName(inputIndex)]}
                          name={SpecifyFormUtils.getInputName(inputIndex)}
                        />
                      ) : undefined,
                  }
                }) ?? []
              }
            />
          )}
        />
      )
    case DetailInputType.TEXT:
      return (
        <FieldLabel {...fieldLabelProps}>
          <Controller
            control={control}
            {...{name}}
            rules={{...baseRules, ...maxLengthRule}}
            render={({field}) => (
              <ScInput {...field} error={hasErrors} fullWidth placeholder={getPlaceholderFromInput(input)} required={required} />
            )}
          />
        </FieldLabel>
      )
    case DetailInputType.TEXTAREA:
      return (
        <FieldLabel {...fieldLabelProps}>
          <Controller
            control={control}
            {...{name}}
            rules={{...baseRules, ...maxLengthRule}}
            render={({field}) => (
              <ScInput
                {...field}
                helperText={
                  errors[inputIndex]?.type === 'required' ? (
                    m.required
                  ) : (
                    <span>
                      {getValues('' + inputIndex)?.length ?? 0} / {appConfig.maxDescriptionInputLength}
                      <span className="hidden">
                        {' '}
                        {m.charactersTyped}
                        {/* reco audit accessibilité d'ajouter ce texte caché */}
                      </span>
                    </span>
                  )
                }
                error={hasErrors}
                multiline
                minRows={5}
                maxRows={10}
                fullWidth
                placeholder={getPlaceholderFromInput(input)}
                required={required}
              />
            )}
          />
        </FieldLabel>
      )
  }
}
