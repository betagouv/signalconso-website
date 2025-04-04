/**
 * @jest-environment jsdom
 */
import {allAnomalies} from '@/anomalies/Anomalies'
import {dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {getCompanyKind} from '@/feature/reportUtils'
import {ConsumerWish} from '@/model/Report'
import {AccessReportFlow, fireEvent, render, ScRenderResult} from '@/test/test-utils'
import '@testing-library/jest-dom'
import {Anomaly} from 'shared/anomalies/Anomaly'
import {fnSwitch} from '../../../utils/FnSwitch'
import {PartialReport} from '../ReportFlowContext'
import {Problem} from './Problem'

class ProblemFixture {
  static readonly anomaly: Anomaly = allAnomalies('fr').find(a => a.category === 'DemoCategory')!
}

const initialReport: PartialReport = {
  step0: {
    category: 'DemoCategory',
    lang: 'fr',
  },
}
const renderOptions = {initialReport}
const props = {isWebView: false, stepNavigation: dummyStepNavigation}

describe('Problem', () => {
  it('should display subcategories', () => {
    const app = render(<Problem {...props} anomaly={ProblemFixture.anomaly} />, renderOptions)
    ProblemFixture.anomaly.subcategories?.forEach(s => {
      expect(app.container.textContent).toContain(s.title)
    })
  })

  it('should route to information page when receive subcategories ending with information', async () => {
    const app = render(<Problem {...props} anomaly={ProblemFixture.anomaly} />, {
      ...renderOptions,
      signalConsoApiClient: {
        rateSubcategory: (...args: any[]) => Promise.resolve(),
        searchForeignCompaniesByUrl: (url: string) => Promise.resolve([]),
        searchCompaniesByUrl: (url: string) =>
          Promise.resolve({
            exactMatch: [],
            similarHosts: [],
          }),
      },
    })
    fireEvent.click(app.getByText(`Sous category pour tester les "blockingInfo"`))
    fireEvent.click(app.getByText(`Sous cat avec blockingInfo complet`))
    expect(app.container.querySelector('#blocking-info-wall')).not.toBeNull()
  })

  it('should request the user if he is an employee of the company or not when receive subcategories', () => {
    const app = render(<Problem {...props} anomaly={ProblemFixture.anomaly} />, renderOptions)
    fireEvent.click(app.getByText(`(title) Première sous category du fichier demo.yaml, absolument minimale`))
    expect(app.container.textContent).toContain(app.m.problemDoYouWorkInCompany)
    expect(app.container.textContent).toContain(app.m.problemDoYouWorkInCompanyNo)
  })

  it('should preselect subcategories passed in props', () => {
    const app = act(() => render(<Problem {...props} anomaly={ProblemFixture.anomaly} path={[0]} />, renderOptions))
    expect(app.container.textContent).toContain(app.m.problemDoYouWorkInCompany)
    expect(app.container.textContent).toContain(app.m.problemDoYouWorkInCompanyNo)
  })

  const clickEmployeeConsumer = (app: ScRenderResult, isEmployee: 'yes' | 'no'): void => {
    const radios = Array.from(app.container.querySelectorAll('#select-employeeconsumer fieldset label')!)
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
    const radios = Array.from(app.container.querySelectorAll('#select-companyKind fieldset label')!)
    if (radios.length === 0) {
      throw new Error('Company kind form did not appear')
    }
    const btnText = fnSwitch(kind, {
      internet: app.m.yes,
      not_internet: app.m.problemIsInternetCompanyNo,
    })
    fireEvent.click(radios.find(_ => _.textContent?.includes(btnText))!)
  }

  const clickContractualDispute = (app: ScRenderResult, value: ConsumerWish) => {
    const radios = Array.from(app.container.querySelectorAll('#select-contractualDispute fieldset label')!)
    if (radios.length === 0) {
      throw new Error('Contractual dispute form did not appear')
    }
    const btnText = fnSwitch(value, {
      reportSomething: app.m.reportAProblem,
      getAnswer: app.m.askQuestionToReponseConso,
    })
    fireEvent.click(radios.find(_ => _.textContent?.includes(btnText))!)
  }

  const clickBtnSubmit = (app: ScRenderResult) => {
    const btnSubmit = app.container.querySelector('.stepper-next-button') as HTMLButtonElement
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
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`(title) Première sous category du fichier demo.yaml, absolument minimale`))
    clickEmployeeConsumer(app, 'yes')
    expect(report?.step1?.employeeConsumer).toEqual(true)
  })

  it('should update employeeConsumer = false', () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`(title) Première sous category du fichier demo.yaml, absolument minimale`))
    clickEmployeeConsumer(app, 'no')
    expect(report?.step1?.employeeConsumer).toEqual(false)
  })

  it('should ask companyKind', () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`(title) Première sous category du fichier demo.yaml, absolument minimale`))
    clickEmployeeConsumer(app, 'no')
    clickCompanyKind(app, 'internet')
    expect(getCompanyKind(report as any)).toEqual('WEBSITE')
  })

  it(`shouldn't ask companyKind when defined`, () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`Sous category pour tester les companyKind`))
    fireEvent.click(app.getByText(`Sous cat avec companyKind WEBSITE`))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickCompanyKind(app, 'internet')).toThrow()
  })

  it('should not ask reponseconso choice and should go to the next step', () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`Sous category pour tester les companyKind`))
    fireEvent.click(app.getByText(`Sous cat avec companyKind WEBSITE`))
    clickEmployeeConsumer(app, 'no')
    clickBtnSubmit(app)
  })

  it('should not ask ReponseConso when no tag', () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`(title) Première sous category du fichier demo.yaml, absolument minimale`))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickContractualDispute(app, 'getAnswer')).toThrow()
  })

  it('should not ask ReponseConso nor contractual dispute when employeeConsumer = true', () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`Sous category pour tester divers tags`))
    fireEvent.click(app.getByText(`Sous cat avec tag ReponseConso`))
    clickEmployeeConsumer(app, 'yes')
    clickCompanyKind(app, 'internet')
    expect(() => clickContractualDispute(app, 'getAnswer')).toThrow()
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should ask ReponseConso when tagged', () => {
    let report: undefined | PartialReport
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
      renderOptions,
    )
    fireEvent.click(app.getByText(`Sous category pour tester divers tags`))
    fireEvent.click(app.getByText(`Sous cat avec tag ReponseConso`))
    clickEmployeeConsumer(app, 'no')
    clickCompanyKind(app, 'internet')
    clickContractualDispute(app, 'getAnswer')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
    expect(report?.step1?.employeeConsumer).toEqual(false)
    expect(report?.step1?.consumerWish).toEqual('getAnswer')
  })
})
