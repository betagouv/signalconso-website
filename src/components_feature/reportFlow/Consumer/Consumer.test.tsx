/**
 * @jest-environment jsdom
 */
import {dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {ReportDraft} from '@/model/ReportDraft'
import {ReportDraft2} from '@/model/ReportDraft2'
import {Step2Model} from '@/model/Step2Model'
import {fireEvent, render, ScRenderResult, waitFor} from '../../../test/test-utils'
import {ConsumerInner} from './Consumer'

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

const step2: Step2Model = {
  kind: 'basic',
  companyIdentification: {
    kind: 'consumerLocation',
    consumerPostalCode: '75001',
  },
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
      step0: {
        lang: 'fr',
        category: 'DemoCategory',
      },
      subcategoriesIndexes: [0],
      step2,
      step4: {
        contactAgreement: true,
        consumer: Fixture.consumer,
      },
    }
    let submitted: ReportDraft['step4'] | undefined = undefined

    beforeEach(() => {
      app = render(
        <ConsumerInner
          draft={initial}
          onSubmit={x => {
            submitted = x
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
        const expected: ReportDraft['step4'] = {
          consumer: Fixture.consumer,
          contactAgreement: true,
        }
        expect(submitted).toEqual(expected)
      })
    })

    it('should work when refuse contact agreement', async () => {
      fireEvent.click(app.getByText(app.m.contactAgreementFalseTitle))
      submit()
      await waitFor(() => {
        const expected: ReportDraft['step4'] = {
          consumer: Fixture.consumer,
          contactAgreement: false,
        }
        expect(submitted).toEqual(expected)
      })
    })
  })

  describe('when employee consumer is true', function () {
    let initial: Partial<ReportDraft2> = {
      step0: {
        lang: 'fr',
        category: 'DemoCategory',
      },
      employeeConsumer: true,
      subcategoriesIndexes: [0],
      step2,
    }

    let submitted: ReportDraft['step4'] | undefined = undefined
    beforeEach(() => {
      app = render(
        <ConsumerInner
          draft={initial}
          onSubmit={x => {
            submitted = x
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
        const expected: ReportDraft['step4'] = {
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
