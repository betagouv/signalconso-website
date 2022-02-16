import {render, ScRenderResult} from '../../../test/test-utils'
import {CompanyKinds} from '@signal-conso/signalconso-api-sdk-js'
import React from 'react'
import {_Company} from './Company'
import {ReportDraft2} from '../../../core/model/ReportDraft'

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let draft: undefined | Partial<ReportDraft2>

  beforeEach(() => {
    app = render(
      <_Company
        draft={{
          companyKind: CompanyKinds.LOCATION
        }}
        onUpdateReportDraft={x => {draft = x}}/>,
    )
  })

  it('should initialize', () => {
    expect(app.container.querySelectorAll('input').length).toEqual(2)
    expect(app.container.querySelector('input[type="date"]')).not.toBeNull()
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })
})
