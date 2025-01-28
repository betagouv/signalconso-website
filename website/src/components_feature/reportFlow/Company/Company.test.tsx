/**
 * @jest-environment jsdom
 */
import {Report} from '@/model/Report'
import {waitFor} from '@testing-library/dom'
import {Fixture} from '../../../test/fixture'
import {fireEvent, render, ScRenderResult} from '../../../test/test-utils'
import {fnSwitch} from '../../../utils/FnSwitch'
import {PartialReport} from '../ReportFlowContext'
import {CompanyIdentificationDispatch} from './Company'
import {IdentificationMethod} from './CompanyChooseIdentificationMethod'

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let draft: PartialReport = {}

  const elementShouldExists = async (querySelector: string) => {
    await waitFor(() => expect(app.container.querySelectorAll(querySelector).length).toEqual(1))
  }

  const selectIdentifyBy = (method: IdentificationMethod) => {
    const btnText = fnSwitch(method, {
      ['byNameAndGeoArea']: app.m.identifyBy_name_geoarea,
      ['byName']: app.m.identifyBy_name,
      ['byIdentifier']: app.m.identifyBy_identity,
      ['iCannot']: app.m.identifyBy_none,
    })
    fireEvent.click(app.getByText(btnText))
  }

  describe('WEBSITE', () => {
    beforeEach(() => {
      const initialReport: Pick<Report, 'step0' | 'step1'> = {
        step0: {
          category: 'DemoCategory',
          lang: 'fr' as const,
        },
        step1: {
          subcategoriesIndexes: [5, 1],
          employeeConsumer: false,
          consumerWish: 'companyImprovement',
        },
      }
      app = render(
        <CompanyIdentificationDispatch
          draft={initialReport}
          updateReport={step2 => {
            draft = {...draft, step2}
          }}
        />,
        {
          // initialReport,
          signalConsoApiClient: {
            searchForeignCompaniesByUrl: (url: string) => Promise.resolve([]),
            searchCompaniesByUrl: (url: string) =>
              Promise.resolve(
                fnSwitch(
                  url,
                  {
                    'known.site': Fixture.genWebsiteCompanySearchResult(),
                    'marketplace.site': Fixture.genWebsiteCompanySearchResult(),
                  },
                  () => ({
                    exactMatch: [],
                    similarHosts: [],
                  }),
                ),
              ),
          },
        },
      )
    })

    it('should ask identification way when no associated company is found', async () => {
      await elementShouldExists('#CompanyByWebsite')
      fireEvent.change(app.container.querySelector('#CompanyByWebsite input')!, {target: {value: 'unknown.site'}})
      fireEvent.click(app.container.querySelector('#CompanyByWebsite button[type=submit]')!)
      await elementShouldExists('#CompanyIdentifyBy')
    })

    it('should display result when company is found', async () => {
      await elementShouldExists('#CompanyByWebsite')
      fireEvent.change(app.container.querySelector('#CompanyByWebsite input')!, {target: {value: 'known.site'}})
      fireEvent.click(app.container.querySelector('#CompanyByWebsite button[type=submit]')!)
      await elementShouldExists('#CompanySearchResult')
    })
  })

  describe('LOCATION', () => {
    beforeEach(() => {
      app = render(
        <CompanyIdentificationDispatch
          draft={{
            step0: {
              category: 'DemoCategory',
              lang: 'fr',
            },
            step1: {
              subcategoriesIndexes: [5, 5], // this has LOCATION
              employeeConsumer: false,
              consumerWish: 'companyImprovement',
            },
          }}
          updateReport={step2 => {
            draft = {...draft, step2}
          }}
        />,
        {
          signalConsoApiClient: {
            searchForeignCompaniesByUrl: (url: string) => Promise.resolve([]),
            searchCompaniesByUrl: (url: string) =>
              Promise.resolve({
                exactMatch: [],
                similarHosts: [],
              }),
          },
          companyApiClient: {
            searchCompaniesByNameAndPostalCode: (search: string, searchPostalCode: string, lang: string) => Promise.resolve([]),
            searchHeadOfficesByName: (search: string, lang: string) => Promise.resolve([]),
          },
        },
      )
    })

    it('should display radios for identification choice', async () => {
      await elementShouldExists('#CompanyIdentifyBy')
      selectIdentifyBy('byNameAndGeoArea')
      await elementShouldExists('#CompanyByNameAndGeoArea')
    })
  })
})
