/**
 * @jest-environment jsdom
 */
import React from 'react'
import {Problem} from './Problem'
import {AccessReportFlow, DummyStepperProvider, fireEvent, render, ScRenderResult} from 'test/test-utils'
import '@testing-library/jest-dom'
import {fnSwitch} from '../../../alexlibs/ts-utils'
import {ReportDraft2} from 'core/model/ReportDraft'
import {Fixture} from '../../../test/fixture'
import {Anomaly, CompanyKinds, ReportTag} from '../../../anomaly/Anomaly'

class ProblemFixture {
  static readonly simpleSubcategory = Fixture.genSubcategory()
  static readonly internetSubcategory = Fixture.genSubcategory({companyKind: CompanyKinds.WEBSITE})
  static readonly reponseConsoSubcategory = Fixture.genSubcategory({
    companyKind: CompanyKinds.WEBSITE,
    tags: [ReportTag.ReponseConso],
  })
  static readonly infoSubcategory = Fixture.genSubcategory({information: Fixture.genInformation()})
  static readonly subcategories = [
    ProblemFixture.simpleSubcategory,
    ProblemFixture.internetSubcategory,
    ProblemFixture.reponseConsoSubcategory,
    ProblemFixture.infoSubcategory,
  ]
  static readonly anomaly: Anomaly = {
    id: '1',
    category: '',
    title: '',
    path: 'myPath',
    sprite: 'category-restaurant',
    description: 'my description',
    subcategories: ProblemFixture.subcategories,
  }
}

describe('Problem', () => {
  it('should display subcategories', () => {
    const app = render(<Problem anomaly={ProblemFixture.anomaly} />)
    ProblemFixture.anomaly.subcategories?.forEach(s => {
      expect(app.container.textContent).toContain(s.title)
    })
  })

  it('should route to information page when receive subcategories ending with information', async () => {
    const app = render(<Problem anomaly={ProblemFixture.anomaly} />, {
      apiSdkMock: {
        rating: {
          rate: (...args: any[]) => Promise.resolve(),
        } as any,
      },
    })
    fireEvent.click(app.getByText(ProblemFixture.infoSubcategory.title))
    expect(app.container.querySelector('#test-info')).not.toBeNull()
  })

  it('should request the user if he is an employee of the company or not when receive subcategories', () => {
    const app = render(<Problem anomaly={ProblemFixture.anomaly} />)
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
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

  const clickContractualDispute = (
    app: ScRenderResult,
    value: 'contractualDispute' | 'notContractualDispute' | 'reponseConso',
  ) => {
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
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'yes')
    expect(report?.employeeConsumer).toEqual(true)
    expect(report?.subcategories).toEqual([ProblemFixture.simpleSubcategory])
  })

  it('should update employeeConsumer = false', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.subcategories).toEqual([ProblemFixture.simpleSubcategory])
  })

  it('should ask companyKind', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickCompanyKind(app, 'internet')
    expect(report?.companyKind).toEqual(CompanyKinds.WEBSITE)
  })

  it(`shouldn't ask companyKind when defined`, () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickCompanyKind(app, 'internet')).toThrow()
  })

  it('should display contractual dispute warning and go to the next step', () => {
    let report: undefined | Partial<ReportDraft2>
    let onNextCalled = false
    const app = render(
      <DummyStepperProvider
        currentStep={0}
        onNext={() => {
          onNextCalled = true
        }}
      >
        <AccessReportFlow
          onReportChange={r => {
            report = r
          }}
        >
          <Problem anomaly={ProblemFixture.anomaly} />
        </AccessReportFlow>
      </DummyStepperProvider>,
    )
    fireEvent.click(app.getByText(ProblemFixture.internetSubcategory.title))
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
        <AccessReportFlow
          onReportChange={r => {
            report = r
          }}
        >
          <Problem anomaly={ProblemFixture.anomaly} />
        </AccessReportFlow>
      </DummyStepperProvider>,
    )
    fireEvent.click(app.getByText(ProblemFixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'notContractualDispute')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should not ask ReponseConso when no tag', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow
          onReportChange={r => {
            report = r
          }}
        >
          <Problem anomaly={ProblemFixture.anomaly} />
        </AccessReportFlow>
      </DummyStepperProvider>,
    )
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickContractualDispute(app, 'reponseConso')).toThrow()
  })

  it('should not ask ReponseConso nor contractual dispute when employeeConsumer = true', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow
          onReportChange={r => {
            report = r
          }}
        >
          <Problem anomaly={ProblemFixture.anomaly} />
        </AccessReportFlow>
      </DummyStepperProvider>,
    )
    fireEvent.click(app.getByText(ProblemFixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'yes')
    expect(() => clickContractualDispute(app, 'reponseConso')).toThrow()
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should ask ReponseConso when tagged', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow
          onReportChange={r => {
            report = r
          }}
        >
          <Problem anomaly={ProblemFixture.anomaly} />
        </AccessReportFlow>
      </DummyStepperProvider>,
    )
    fireEvent.click(app.getByText(ProblemFixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'reponseConso')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.forwardToReponseConso).toEqual(true)
    expect(report?.tags?.includes(ReportTag.ReponseConso)).toEqual(true)
  })

  it('should ask add ReponseConso tag when related option is not selected', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <DummyStepperProvider currentStep={0}>
        <AccessReportFlow
          onReportChange={r => {
            report = r
          }}
        >
          <Problem anomaly={ProblemFixture.anomaly} />
        </AccessReportFlow>
      </DummyStepperProvider>,
    )
    fireEvent.click(app.getByText(ProblemFixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'notContractualDispute')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.forwardToReponseConso).not.toEqual(true)
    expect((report?.tags ?? []).includes(ReportTag.ReponseConso)).toEqual(false)
  })
})
