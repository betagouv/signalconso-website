/**
 * @jest-environment jsdom
 */
import {waitFor} from '@testing-library/dom'
import '@testing-library/jest-dom'
import {fireEvent, render} from 'test/test-utils'
import {ScDatepicker} from './Datepicker'

describe('DatePicker', () => {
  it('should emit and event with a details object containing form inputs when no errors', async () => {
    let value: string | undefined
    const app = render(
      <ScDatepicker
        value={undefined}
        onChange={v => {
          value = v
        }}
      />,
    )
    await waitFor(() => {
      fireEvent.change(app.container.querySelector('input[type=date]')!, {
        target: {value: '2017-04-10'},
      })
      expect(value).toEqual('10/04/2017')
    })
  })
})
