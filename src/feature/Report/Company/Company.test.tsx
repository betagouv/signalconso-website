/**
 * @jest-environment jsdom
 */
import {fireEvent, render, ScRenderResult} from '../../../test/test-utils'
import {CompanyKinds} from '@signal-conso/signalconso-api-sdk-js'
import React from 'react'
import {_Company} from './Company'
import {ReportDraft2} from '../../../core/model/ReportDraft'
import {IdentifyBy} from './CompanyIdentifyBy'
import {fnSwitch} from '@alexandreannic/ts-utils/lib/common'
import {genCompanySearchResult} from '../../../test/fixture'
import {waitFor} from '@testing-library/dom'

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let draft: undefined | Partial<ReportDraft2>

  const updateDraft = (x: Partial<ReportDraft2> | ((xxxx: Partial<ReportDraft2>) => Partial<ReportDraft2>)): void => {
    if (typeof x === 'function') {
      draft = x(draft ?? {})
    } else {
      draft = x
    }
  }

  const elementShouldExists = async (querySelector: string) => {
    await waitFor(() =>
      expect(app.container.querySelectorAll(querySelector).length).toEqual(1)
    )
  }

  const selectIdentifyBy = (ib: IdentifyBy) => {
    const btnText = fnSwitch(ib, {
      [IdentifyBy.NAME]: app.m.identifyBy_name,
      [IdentifyBy.IDENTITY]: app.m.identifyBy_identity,
      [IdentifyBy.NONE]: app.m.identifyBy_none,
    })
    fireEvent.click(app.getByText(btnText))
  }

  describe('CompanyKinds.WEBSITE', () => {
    beforeEach(() => {
      app = render(
        <_Company
          draft={{
            companyKind: CompanyKinds.WEBSITE
          }}
          onUpdateReportDraft={x => updateDraft(x)}
        />,
        {
          apiSdkMock: {
            company: {
              searchCompaniesByUrl: (url: string) => Promise.resolve(fnSwitch(url, {
                'known.site': [genCompanySearchResult()],
                'marketplace.site': [genCompanySearchResult()],
              }, () => []))
            }
          }
        }
      )
    })

    it('should ask identification way when no associated company is found', async () => {
      await elementShouldExists('#CompanyByWebsite')
      fireEvent.change(app.container.querySelector('#CompanyByWebsite input')!, {target: {value: 'unknown.site'}})
      fireEvent.click(app.container.querySelector('#CompanyByWebsite button[type=submit]')!)
      await elementShouldExists('#CompanyIdentifyBy')
    })

    it.only('should ask identification way when no associated company is found', async () => {
      await elementShouldExists('#CompanyByWebsite')
      fireEvent.change(app.container.querySelector('#CompanyByWebsite input')!, {target: {value: 'known.site'}})
      fireEvent.click(app.container.querySelector('#CompanyByWebsite button[type=submit]')!)
      await elementShouldExists('#CompanySearchResult')
    })
  })


  describe('CompanyKinds.LOCATION', () => {

    beforeEach(() => {
      app = render(
        <_Company
          draft={{
            companyKind: CompanyKinds.LOCATION
          }}
          onUpdateReportDraft={x => updateDraft(x)}
        />,
      )
    })

    it('should display radios for identification choice', async () => {
      await elementShouldExists('#CompanyIdentifyBy')
      selectIdentifyBy(IdentifyBy.NAME)
      await elementShouldExists('#companyByNameAndPostalCode')
    })

    it('should display radios for identification choice', () => {
    })
  })
})


