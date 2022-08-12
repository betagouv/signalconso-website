/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render, ScRenderResult} from 'test/test-utils'
import {_Details, SpecifyFormUtils} from './Details'
import {format} from 'date-fns'
import {appConfig} from 'conf/appConfig'
import {DetailsFixtureInput, DetailsFixtureValue} from 'feature/Playground/PlaygroundDetails'
import {waitFor} from '@testing-library/dom'
import {mapFor} from '../../../alexlibs/ts-utils'
import {DetailInputValues2} from 'core/model/ReportDraft'
import {frenchDateFormat} from 'core/helper/utils'

const clickBtnSubmit = async (app: ScRenderResult) => {
  const btnSubmit = app.container.querySelector('#btn-submit') as HTMLButtonElement
  if (btnSubmit === null) {
    throw new Error(`Button submit is not visible`)
  }
  if (btnSubmit.disabled) {
    throw new Error(`Button submit is disabled`)
  }
  fireEvent.click(btnSubmit)
}

const hasErrors = (app: ScRenderResult, count?: number) => {
  const errorsCount = app.container.querySelectorAll('.Mui-error').length
  if (count !== undefined) {
    expect(app.container.querySelectorAll('.Mui-error').length).toEqual(errorsCount)
  } else {
    expect(app.container.querySelectorAll('.Mui-error').length).toBeGreaterThanOrEqual(1)
  }
}

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let inputValues: undefined | DetailInputValues2

  beforeEach(() => {
    app = render(
      <_Details
        inputs={[DetailsFixtureInput.date]}
        onSubmit={x => {
          inputValues = x
        }}
      />,
    )
  })

  it('should initialize', () => {
    expect(app.container.querySelectorAll('input').length).toEqual(2)
    expect(app.container.querySelector('input[type="date"]')).not.toBeNull()
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })

  it('should handle default SYSDATE', async () => {
    clickBtnSubmit(app)
    await waitFor(() =>
      expect(inputValues).toEqual({
        0: format(new Date(), frenchDateFormat),
      }),
    )
  })

  it('should update stored reportDraft on submit', async () => {
    fireEvent.change(app.container.querySelector('input[type=date]')!, {
      target: {value: '2018-02-15'},
    })
    clickBtnSubmit(app)
    await waitFor(() =>
      expect(inputValues).toEqual({
        0: '15/02/2018',
      }),
    )
  })
})

describe('Details: checkbox', () => {
  let app: ScRenderResult
  let inputValues: undefined | DetailInputValues2

  beforeEach(() => {
    inputValues = undefined
    app = render(
      <_Details
        inputs={[DetailsFixtureInput.radio]}
        onSubmit={x => {
          inputValues = x
        }}
      />,
    )
  })

  it('should initialize', () => {
    expect(app.container.querySelectorAll('input[type=radio]').length).toEqual(2)
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })

  it('should prevent submit when required but nothing is selected', async () => {
    await clickBtnSubmit(app)
    await waitFor(() => {
      hasErrors(app)
    })
  })

  it('should submit when option without (à préciser) is selected', async () => {
    fireEvent.click(app.getByText('OPTION1'))
    await clickBtnSubmit(app)
    hasErrors(app, 0)
    await waitFor(() => expect(inputValues).toEqual({0: 'OPTION1'}))
  })

  it('should display extra input when (à préciser) is selected', () => {
    fireEvent.click(app.getByText('OPTION2 (à préciser)'))
    expect(app.container.querySelectorAll('input[type=text]').length).toEqual(1)
  })

  it('should prevent submit when (à préciser) is selected but not defined', async () => {
    fireEvent.click(app.getByText('OPTION2 (à préciser)'))
    await clickBtnSubmit(app)
    hasErrors(app, 1)
  })

  it('should handle (à préciser) input value', async () => {
    fireEvent.click(app.getByText('OPTION2 (à préciser)'))
    fireEvent.change(app.container.querySelector('input[type=text]')!, {target: {value: 'blablabla'}})
    await clickBtnSubmit(app)
    hasErrors(app, 0)
    await waitFor(() => {
      expect(inputValues).toEqual({
        0: 'OPTION2 (à préciser)',
        [SpecifyFormUtils.getInputName(0)]: 'blablabla',
      })
    })
  })
})

describe('Details: textarea', () => {
  let app: ScRenderResult
  let inputValues: undefined | DetailInputValues2

  beforeEach(() => {
    inputValues = undefined
    app = render(
      <_Details
        inputs={[DetailsFixtureInput.textarea]}
        onSubmit={x => {
          inputValues = x
        }}
      />,
    )
  })

  it('should init and prevent submit when not filled', async () => {
    expect(app.container.querySelectorAll('textarea:not([aria-hidden=true])').length).toEqual(1)
    await clickBtnSubmit(app)
    hasErrors(app, 1)
    await waitFor(() => expect(inputValues).toEqual(undefined))
  })

  it('should prevent submit exceed char limit', async () => {
    const stringAboveLimit = mapFor(appConfig.maxDescriptionInputLength + 1, () => 'a').reduce((acc, _) => acc + _, '')
    fireEvent.change(app.container.querySelector('textarea:not([aria-hidden=true])')!, {target: {value: stringAboveLimit}})
    await clickBtnSubmit(app)
    hasErrors(app, 1)
    await waitFor(() => expect(inputValues).toEqual(undefined))
  })

  it('should submit and update', async () => {
    const stringAboveLimit = mapFor(appConfig.maxDescriptionInputLength - 1, () => 'a').reduce((acc, _) => acc + _, '')
    fireEvent.change(app.container.querySelector('textarea:not([aria-hidden=true])')!, {target: {value: stringAboveLimit}})
    await clickBtnSubmit(app)
    hasErrors(app, 0)
    await waitFor(() => expect(inputValues).toEqual({0: stringAboveLimit}))
  })
})

describe('Details: initialize values', () => {
  let app: ScRenderResult
  let inputValues: undefined | DetailInputValues2
  const initialValues = {
    0: '01/01/2018',
    1: DetailsFixtureValue.text,
    2: DetailsFixtureValue.radio,
    [SpecifyFormUtils.getInputName(2)]: 'blabla radio',
    3: DetailsFixtureValue.checkbox,
    [SpecifyFormUtils.getInputName(3)]: 'blabla cb',
    4: DetailsFixtureValue.textarea,
  }
  beforeEach(() => {
    inputValues = undefined
    app = render(
      <_Details
        initialValues={initialValues}
        inputs={[
          DetailsFixtureInput.date,
          DetailsFixtureInput.text,
          DetailsFixtureInput.radio,
          DetailsFixtureInput.checkbox,
          DetailsFixtureInput.textarea,
        ]}
        onSubmit={x => {
          inputValues = x
        }}
      />,
    )
  })

  it('should submit and send the initial values', async () => {
    await clickBtnSubmit(app)
    hasErrors(app, 0)
    await waitFor(() => {
      expect(inputValues).toEqual(initialValues)
    })
  })
})
