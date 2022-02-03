/**
 * @jest-environment jsdom
 */
import React from 'react'
import {Anomaly, CompanyKinds, ReportTag} from '@signal-conso/signalconso-api-sdk-js'
import {Problem} from './Problem'
import {genInformation, genSubcategory} from 'test/fixture'
import {AccessReportFlow, DummyStepperProvider, fireEvent, render, ScRenderResult} from 'test/test-utils'
import '@testing-library/jest-dom'
import {ReportDraft2} from '../ReportFlowContext'
import {fnSwitch} from '@alexandreannic/ts-utils/lib/common'

class Fixture {
  static readonly simpleSubcategory = genSubcategory()
  static readonly internetSubcategory = genSubcategory({companyKind: CompanyKinds.WEBSITE})
  static readonly reponseConsoSubcategory = genSubcategory({companyKind: CompanyKinds.WEBSITE, tags: [ReportTag.ReponseConso]})
  static readonly infoSubcategory = genSubcategory({information: genInformation()})
  static readonly subcategories = [
    Fixture.simpleSubcategory,
    Fixture.internetSubcategory,
    Fixture.reponseConsoSubcategory,
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
  it('should display subcategories', () => {
    const app = render(<Problem anomaly={Fixture.anomaly}/>)
    Fixture.anomaly.subcategories?.forEach(s => {
      expect(app.container.textContent).toContain(s.title)
    })
  })

  it('should route to information page when receive subcategories ending with information', async () => {
    const app = render(
      <Problem anomaly={Fixture.anomaly}/>,
      {
        apiSdkMock: {
          rating: {
            rate: (...args: any[]) => Promise.resolve()
          } as any
        }
      }
    )
    fireEvent.click(app.getByText(Fixture.infoSubcategory.title))
    expect(app.getByText(app.m.informationTitle)).not.toBeNull()
  })

  it('should request the user if he is an employee of the company or not when receive subcategories', () => {
    const app = render(
      <Problem anomaly={Fixture.anomaly}/>
    )
    fireEvent.click(app.getByText(Fixture.simpleSubcategory.title))
    expect(app.container.textContent).toContain(app.m.problemDoYouWorkInCompany)
    expect(app.container.textContent).toContain(app.m.problemDoYouWorkInCompanyNo)
  })

  const clickEmployeeConsumer = (app: ScRenderResult, isEmployee: 'yes' | 'no'): void => {
    const radios = [...app.container.querySelectorAll('#select-employeeconsumer [role=radio]')!]
    if (radios.length === 0) {
      throw new Error('Employee consumer form did not appear')
    }
    const btnText = fnSwitch(isEmployee, {
      yes: app.m.yes,
      no: app.m.problemDoYouWorkInCompanyNo,
    })
    fireEvent.click(radios.find(_ => _.textContent?.includes(btnText))!)
  }

  const clickCompanyKind = (app: ScRenderResult, kind: 'internet' | 'not_internet') => {
    const radios = [...app.container.querySelectorAll('#select-companyKind [role=radio]')!]
    if (radios.length === 0) {
      throw new Error('Company kind form did not appear')
    }
    const btnText = fnSwitch(kind, {
      internet: app.m.yes,
      not_internet: app.m.problemIsInternetCompanyNo,
    })
    fireEvent.click(radios.find(_ => _.textContent?.includes(btnText))!)
  }

  const clickContractualDispute = (app: ScRenderResult, value: 'contractualDispute' | 'notContractualDispute' | 'reponseConso') => {
    const radios = [...app.container.querySelectorAll('#select-contractualDispute [role=radio]')!]
    if (radios.length === 0) {
      throw new Error('Contractual dispute form did not appear')
    }
    const btnText = fnSwitch(value, {
      contractualDispute: app.m.problemContractualDisputeFormYes,
      notContractualDispute: app.m.problemContractualDisputeFormNo,
      reponseConso: app.m.problemContractualDisputeFormReponseConso,
    })
    fireEvent.click(radios.find(_ => _.textContent?.includes(btnText))!)
  }

  const clickBtnSubmit = (app: ScRenderResult) => {
    const btnSubmit = app.container.querySelector('#btn-submit') as HTMLButtonElement
    if (btnSubmit === null) {
      throw new Error(`Button submit is not visible`)
    }
    if (btnSubmit.disabled) {
      throw new Error(`Button submit is disabled`)
    }
    fireEvent.click(btnSubmit)
  }

  const expectContractualDisputeVisible = (app: ScRenderResult, visible: boolean) => {
    const div = app.container.querySelector('#panel-contractual-dispute') as HTMLDivElement
    if (visible) {
      expect(div).not.toEqual(null)
    } else {
      expect(div).toEqual(null)
    }
  }

  it('should update employeeConsumer = true', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow onReportChange={r => {
        report = r
      }}>
        <Problem anomaly={Fixture.anomaly}/>
      </AccessReportFlow>
    )
    fireEvent.click(app.getByText(Fixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'yes')
    expect(report?.employeeConsumer).toEqual(true)
    expect(report?.subcategories).toEqual([Fixture.simpleSubcategory])
  })

  it('should update employeeConsumer = false', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow onReportChange={r => {
        report = r
      }}>
        <Problem anomaly={Fixture.anomaly}/>
      </AccessReportFlow>
    )
    fireEvent.click(app.getByText(Fixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.subcategories).toEqual([Fixture.simpleSubcategory])
  })

  it('should ask companyKind', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow onReportChange={r => {
        report = r
      }}>
        <Problem anomaly={Fixture.anomaly}/>
      </AccessReportFlow>
    )
    fireEvent.click(app.getByText(Fixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickCompanyKind(app, 'internet')
    expect(report?.companyKind).toEqual(CompanyKinds.WEBSITE)
  })

  it(`shouldn't ask companyKind when defined`, () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow onReportChange={r => {
        report = r
      }}>
        <Problem anomaly={Fixture.anomaly}/>
      </AccessReportFlow>
    )
    fireEvent.click(app.getByText(Fixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickCompanyKind(app, 'internet')).toThrow()
  })

  it('should display contractual dispute warning and go to the next step', () => {
    let report: undefined | Partial<ReportDraft2>
    let onNextCalled = false
    const app = render(
      <DummyStepperProvider currentStep={0} onNext={() => {
        onNextCalled = true
      }}>
        <AccessReportFlow onReportChange={r => {
          report = r
        }}>
          <Problem anomaly={Fixture.anomaly}/>
        </AccessReportFlow>
      </DummyStepperProvider>
    )
    fireEvent.click(app.getByText(Fixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'contractualDispute')
    expectContractualDisputeVisible(app, true)
    clickBtnSubmit(app)
    expect(onNextCalled).toEqual(true)
  })

  it('should not display contractual dispute warning', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow onReportChange={r => {
          report = r
        }}>
          <Problem anomaly={Fixture.anomaly}/>
        </AccessReportFlow>
      </DummyStepperProvider>
    )
    fireEvent.click(app.getByText(Fixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'notContractualDispute')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should not ask ReponseConso nor contractual dispute when employeeConsumer = true', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow onReportChange={r => {
          report = r
        }}>
          <Problem anomaly={Fixture.anomaly}/>
        </AccessReportFlow>
      </DummyStepperProvider>
    )
    fireEvent.click(app.getByText(Fixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'yes')
    expect(() => clickContractualDispute(app, 'reponseConso')).toThrow()
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should ask ReponseConso when tagged', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow onReportChange={r => {
          report = r
        }}>
          <Problem anomaly={Fixture.anomaly}/>
        </AccessReportFlow>
      </DummyStepperProvider>
    )
    fireEvent.click(app.getByText(Fixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'reponseConso')
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.forwardToReponseConso).toEqual(true)
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })
})
