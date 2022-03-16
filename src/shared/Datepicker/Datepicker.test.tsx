/**
 * @jest-environment jsdom
 */
import React from 'react'
import '@testing-library/jest-dom'
import {fireEvent, render} from 'test/test-utils'
import {format} from 'date-fns'
import {ScDatepicker} from './Datepicker'
import {appConfig} from '../../conf/appConfig'

describe('DatePicker', () => {

  it('should emit and event with a details object which contains form inputs when no errors', async () => {
    const newDate = new Date('2018-02-02')
    let value: Date | undefined
    const app = render(
      <ScDatepicker value={value} onChange={(date: Date) => {
        value = date
      }}/>,
    )
    fireEvent.change(app.container.querySelector('input[type=date]')!, {target: {value: format(newDate, appConfig.apiDateFormat)}})
    expect(value!.toString()).toEqual(newDate.toString())
  })
})
