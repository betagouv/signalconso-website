/**
 * @jest-environment jsdom
 */
import {fireEvent, render, ScRenderResult, waitFor} from '../../../test/test-utils'
import React from 'react'
import {ReportDraft2} from '@/model/ReportDraft2'
import {ConsumerInner} from './Consumer'
import {dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'

class Fixture {
  static readonly consumer = {
    firstName: 'Mat',
    lastName: 'Fraser',
    email: 'mat.fraser@signalconso.fr',
    phone: '0987654321',
    referenceNumber: 'X8910H4LLIUK',
    gender: undefined,
  }
}

describe('Consumer', () => {
  const mock = {
    signalConsoApiClient: {
      checkEmail: () => Promise.resolve({valid: true}),
      website: {
        searchForeignCompaniesByUrl: (url: string) => Promise.resolve([]),
        searchCompaniesByUrl: (url: string) =>
          Promise.resolve({
            exactMatch: [],
            similarHosts: [],
          }),
      },
    },
  }
  let app: ScRenderResult

  const submit = () => {
    fireEvent.click(app.container.querySelector('.stepper-next-button')!)
  }

  describe('when values are pre defined', function () {
    let initial: Partial<ReportDraft2> = {
      contactAgreement: true,
      consumer: Fixture.consumer,
    }
    let submitted: Partial<ReportDraft2> | undefined = undefined

    beforeEach(() => {
      app = render(
        <ConsumerInner
          draft={initial}
          onSubmit={x => {
            submitted = x as any
          }}
          stepNavigation={dummyStepNavigation}
        />,
        mock,
      )
    })

    it('initialise if there is a draft report', async () => {
      expect(app.getByText(app.m.contactAgreementTrueTitle)).not.toBeNull()
    })

    it('initialise if there is a draft report', async () => {
      submit()
      await waitFor(() => {
        expect(submitted).toEqual(initial)
      })
    })

    it('should work when refuse contact agreement', async () => {
      fireEvent.click(app.getByText(app.m.contactAgreementFalseTitle))
      submit()
      await waitFor(() => {
        expect(submitted).toEqual({...initial, contactAgreement: false})
      })
    })
  })

  describe('when employee consumer is true', function () {
    let initial: Partial<ReportDraft2> = {
      employeeConsumer: true,
    }

    let submitted: Partial<ReportDraft2> | undefined = undefined
    beforeEach(() => {
      app = render(
        <ConsumerInner
          draft={initial}
          onSubmit={x => {
            submitted = x as any
          }}
          stepNavigation={dummyStepNavigation}
        />,
        mock,
      )
    })

    it('should show errors when trying to submit without values', async () => {
      submit()
      await waitFor(() => {
        expect(app.container.querySelectorAll('.sctextinput .fr-error-text').length).toEqual(3)
      })
    })

    it('should fill input and submit', async () => {
      fireEvent.change(app.container.querySelector('[name=firstName]')!, {target: {value: Fixture.consumer.firstName}})
      fireEvent.change(app.container.querySelector('[name=lastName]')!, {target: {value: Fixture.consumer.lastName}})
      fireEvent.change(app.container.querySelector('[name=phone]')!, {target: {value: Fixture.consumer.phone}})
      fireEvent.change(app.container.querySelector('[name=referenceNumber]')!, {
        target: {value: Fixture.consumer.referenceNumber},
      })
      fireEvent.change(app.container.querySelector('[name=email]')!, {target: {value: Fixture.consumer.email}})

      submit()
      await waitFor(() => {
        const expected: Partial<ReportDraft2> = {
          consumer: Fixture.consumer,
          contactAgreement: false,
        }
        expect(submitted).toEqual(expected)
      })
    })

    it('should not show contact agreement', async () => {
      try {
        app.getByText(app.m.contactAgreementTrueTitle)
        expect(false).toBeTruthy()
      } catch (e) {
        expect(true).toBeTruthy()
      }
    })
  })
})
