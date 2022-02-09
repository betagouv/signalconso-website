/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import {DummyStepperProvider, fireEvent, render, ScRenderResult} from 'test/test-utils'
import {_Details} from './Details'
import {act} from 'react-dom/test-utils'
import {format} from 'date-fns'
import {DetailInputValue} from '@signal-conso/signalconso-api-sdk-js'
import {appConfig} from '../../../conf/appConfig'
import {DetailsFixture} from '../../../pages/playground'

const clickBtnSubmit = async (app: ScRenderResult) => {
  await act(async () => {
    const btnSubmit = app.container.querySelector('#btn-submit') as HTMLButtonElement
    if (btnSubmit === null) {
      throw new Error(`Button submit is not visible`)
    }
    if (btnSubmit.disabled) {
      throw new Error(`Button submit is disabled`)
    }
    fireEvent.click(btnSubmit)
  })
}

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let inputValues: undefined | DetailInputValue[]

  beforeEach(() => {
    app = render(
      <DummyStepperProvider currentStep={1} onNext={() => void 0}>
        <_Details
          inputs={[DetailsFixture.dateDetail]}
          onSubmit={x => {
            inputValues = x
          }}/>
      </DummyStepperProvider>,
    )
  })

  it('should initialize', () => {
    expect(app.container.querySelectorAll('input').length).toEqual(2)
    expect(app.container.querySelector('input[type="date"]')).not.toBeNull()
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })

  // it.only('should display errors on submit', async () => {
  //   await clickBtnSubmit(app)
  //   expect(app.container.querySelectorAll('.Mui-error').length).toEqual(1)
  // })
  it('should handle default SYSDATE', async () => {
    await clickBtnSubmit(app)
    expect(inputValues).toEqual([
      {label: DetailsFixture.dateDetail.label, value: format(new Date(), appConfig.reportDateFormat)}
    ])
  })

  it('should update stored reportDraft on submit', async () => {
    const date = new Date('2018-02-02')
    fireEvent.change(app.container.querySelector('input[type=date]')!, {target: {value: format(date, appConfig.reportDateFormat)}})
    // (app.container.querySelector('input[type=date]') as HTMLInputElement).value = Fixture.anomalyDate
    await clickBtnSubmit(app)
    expect(inputValues).toEqual([
      {label: DetailsFixture.dateDetail.label, value: date}
    ])
  })
})

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let inputValues: undefined | DetailInputValue[]

  beforeEach(() => {
    app = render(
      <DummyStepperProvider currentStep={1} onNext={() => void 0}>
        <_Details
          inputs={[DetailsFixture.radioDetail]}
          onSubmit={x => {
            inputValues = x
          }}/>
      </DummyStepperProvider>,
    )
  })

  it.only('should initialize', () => {
    expect(app.container.querySelectorAll('input[type=radio]').length).toEqual(2)
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })

  it.only('should display extra input when (à préciser) is selected', () => {
    fireEvent.click(app.getByText('CHECKBOX2 (à préciser)'))
    expect(app.container.querySelectorAll('input[type=radio]').length).toEqual(2)
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })
})
