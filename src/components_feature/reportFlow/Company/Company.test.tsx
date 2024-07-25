/**
 * @jest-environment jsdom
 */
import {ReportDraft2} from '@/model/ReportDraft2'
import {waitFor} from '@testing-library/dom'
import {Fixture} from '../../../test/fixture'
import {fireEvent, render, ScRenderResult} from '../../../test/test-utils'
import {fnSwitch} from '../../../utils/FnSwitch'
import {CompanyIdentificationDispatch} from './Company'
import {IdentificationMethod} from './CompanyChooseIdentificationMethod'

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let draft: Partial<ReportDraft2> = {}

  const elementShouldExists = async (querySelector: string) => {
    await waitFor(() => expect(app.container.querySelectorAll(querySelector).length).toEqual(1))
  }

  const selectIdentifyBy = (method: IdentificationMethod) => {
    const btnText = fnSwitch(method, {
      ['byNameAndPostalCode']: app.m.identifyBy_name_postal_code,
      ['byName']: app.m.identifyBy_name,
      ['byIdentifier']: app.m.identifyBy_identity,
      ['iCannot']: app.m.identifyBy_none,
    })
    fireEvent.click(app.getByText(btnText))
  }

  describe('WEBSITE', () => {
    beforeEach(() => {
      app = render(
        <CompanyIdentificationDispatch
          draft={{
            companyKind: 'WEBSITE',
          }}
          updateReport={step2 => {
            draft = {...draft, step2}
          }}
        />,
        {
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
            companyKind: 'LOCATION',
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
      selectIdentifyBy('byNameAndPostalCode')
      await elementShouldExists('#CompanyByNameAndPostalCode')
    })
  })
})
