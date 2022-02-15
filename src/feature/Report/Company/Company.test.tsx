import {render, ScRenderResult} from '../../../test/test-utils'
import {CompanyKinds, DetailInputValue, ReportDraft} from '@signal-conso/signalconso-api-sdk-js'
import {DetailsFixtureInput} from '../../Playground/PlaygroundDetails'
import React from 'react'
import {_Company} from './Company'
import {ReportDraft2} from '../ReportFlowContext'

describe('Details: single date not in future', () => {
  let app: ScRenderResult
  let draft: undefined | Partial<ReportDraft2>

  beforeEach(() => {
    app = render(
      <_Company
        draft={{
          companyKind: CompanyKinds.LOCATION
        }}
        onUpdateReportDraft={x => x(_ => {draft = _})}/>,
    )
  })

  it('should initialize', () => {
    expect(app.container.querySelectorAll('input').length).toEqual(2)
    expect(app.container.querySelector('input[type="date"]')).not.toBeNull()
    expect(app.container.querySelector('input[type="file"]')).not.toBeNull()
  })
})
