/**
 * @jest-environment jsdom
 */
import {waitFor} from '@testing-library/dom'
import {ReportDraft2} from '@/model/ReportDraft2'
import {Fixture} from '../../../test/fixture'
import {fireEvent, render, ScRenderResult} from '../../../test/test-utils'
import {fnSwitch} from '../../../utils/FnSwitch'
import {CompanyIdentificationDispatch} from './Company'
import {IdentifyBy} from './CompanyIdentifyBy'

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let draft: Partial<ReportDraft2> = {}

  const elementShouldExists = async (querySelector: string) => {
    await waitFor(() => expect(app.container.querySelectorAll(querySelector).length).toEqual(1))
  }

  const selectIdentifyBy = (ib: IdentifyBy) => {
    const btnText = fnSwitch(ib, {
      [IdentifyBy.NAME]: app.m.identifyBy_name,
      [IdentifyBy.IDENTITY]: app.m.identifyBy_identity,
      [IdentifyBy.NONE]: app.m.identifyBy_none,
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
          updateReport={x => {
            draft = ReportDraft2.merge(draft, x)
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
          updateReport={x => ReportDraft2.merge(draft, x)}
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
            searchCompanies: (search: string, searchPostalCode: string) => Promise.resolve([]),
          },
        },
      )
    })

    it('should display radios for identification choice', async () => {
      await elementShouldExists('#CompanyIdentifyBy')
      selectIdentifyBy(IdentifyBy.NAME)
      await elementShouldExists('#CompanyByNameAndPostalCode')
    })
  })
})
