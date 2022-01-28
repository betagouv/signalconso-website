/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'
import {Anomaly, ReportTag, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import {genInformation, genSubcategory} from '../../../test/fixture'
import {_Problem, Problem} from './Problem'
import {ThemeProvider} from '@mui/material'
import {muiTheme} from '../../../core/theme/theme'

class Fixture {
  static readonly simpleSubcategory = genSubcategory()
  static readonly contractualDisputeSubcategory: Subcategory = {...genSubcategory(), tags: [ReportTag.LitigeContractuel]}
  static readonly infoSubcategory: Subcategory = {...genSubcategory(), information: genInformation()}
  static readonly subcategories = [
    Fixture.simpleSubcategory,
    Fixture.contractualDisputeSubcategory,
    Fixture.infoSubcategory,
  ]
  static readonly anomaly: Anomaly = {
    id: '1',
    categoryId: '',
    category: '',
    path: 'myPath',
    subcategories: Fixture.subcategories,
  }
}

describe('Problem', () => {

  let container: HTMLDivElement | null
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // cleanup on exiting
    if (container) {
      unmountComponentAtNode(container)
      container.remove()
      container = null
    }
  })

  it('should display subcategories', () => {
    act(() => {
      render(
        <ThemeProvider theme={muiTheme()}>
          <_Problem
            anomaly={Fixture.anomaly}
            reportDraft={{}}
            setReportDraft={() => undefined}
            clearReportDraft={() => undefined}
          />
        </ThemeProvider>,
        container
      )
    })
    Fixture.anomaly.subcategories?.forEach(s => {
      expect(container?.textContent).toContain(s.title)
    })
  })

  it('should route to information page when receive subcategories ending with information', () => {
    act(() => {
      render(
        <ThemeProvider theme={muiTheme()}>
          <_Problem
            anomaly={Fixture.anomaly}
            reportDraft={{}}
            setReportDraft={() => undefined}
            clearReportDraft={() => undefined}
          />
        </ThemeProvider>,
        container
      )
    })
    // const routerSpy = spyOn(router, 'navigate');
    component.onChange([infoSubcategoryFixture], 0, infoSubcategoryFixture.title)
    fixture.detectChanges()
    fixture.nativeElement.querySelectorAll('.btn.btn-lg.btn-primary')[0].click()
    expect(routerSpy).toHaveBeenCalledWith([anomalyFixture.path, ReportPaths.Information])
  })
})
