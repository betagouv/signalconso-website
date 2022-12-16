/**
 * @jest-environment jsdom
 */
import {fireEvent, render, ScRenderResult} from '../../../test/test-utils'
import React from 'react'
import {_Company} from './Company'
import {ReportDraft2} from 'model/ReportDraft2'
import {IdentifyBy} from './CompanyIdentifyBy'
import {fnSwitch} from '../../../utils/FnSwitch'
import {Fixture} from '../../../test/fixture'
import {waitFor} from '@testing-library/dom'
import {CompanyKinds} from '../../../anomalies/Anomaly'
import {CompanySearchResult, WebsiteCompanySearchResult} from '../../../model/Company'

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
        <_Company
          draft={{
            companyKind: 'WEBSITE',
          }}
          onUpdateReportDraft={x => {
            draft = ReportDraft2.merge(draft, x)
          }}
        />,
        {
          signalConsoApiClient: {
            searchForeignCompaniesByUrl: (url: string) => Promise.resolve(),
            searchCompaniesByUrl: (url: string) =>
              Promise.resolve(
                fnSwitch(
                  url,
                  {
                    'known.site': Fixture.genCompanySearchResult(),
                    'marketplace.site': Fixture.genCompanySearchResult(),
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
        <_Company
          draft={{
            companyKind: 'LOCATION',
          }}
          onUpdateReportDraft={x => ReportDraft2.merge(draft, x)}
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
