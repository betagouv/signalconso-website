/**
 * @jest-environment jsdom
 */
import {allAnomalies} from '@/anomalies/Anomalies'
import {dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {getCompanyKind} from '@/feature/reportDraftUtils'
import {ReportDraft} from '@/model/ReportDraft'
import {AccessReportFlow, fireEvent, render, ScRenderResult} from '@/test/test-utils'
import '@testing-library/jest-dom'
import {Anomaly} from '../../../anomalies/Anomaly'
import {fnSwitch} from '../../../utils/FnSwitch'
import {Problem} from './Problem'

class ProblemFixture {
  static readonly anomaly: Anomaly = allAnomalies('fr').find(a => a.category === 'DemoCategory')!
}

const initialReport: Partial<ReportDraft> = {
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

  const clickContractualDispute = (
    app: ScRenderResult,
    value: 'contractualDispute' | 'notContractualDispute' | 'reponseConso',
  ) => {
    const radios = Array.from(app.container.querySelectorAll('#select-contractualDispute fieldset label')!)
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
    let report: undefined | Partial<ReportDraft>
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
    expect(report?.employeeConsumer).toEqual(true)
  })

  it('should update employeeConsumer = false', () => {
    let report: undefined | Partial<ReportDraft>
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
    expect(report?.employeeConsumer).toEqual(false)
  })

  it('should ask companyKind', () => {
    let report: undefined | Partial<ReportDraft>
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
    let report: undefined | Partial<ReportDraft>
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

  it('should display contractual dispute warning and go to the next step', () => {
    let report: undefined | Partial<ReportDraft>
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
    clickContractualDispute(app, 'contractualDispute')
    clickBtnSubmit(app)
  })

  it('should not display contractual dispute warning', () => {
    let report: undefined | Partial<ReportDraft>
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
    clickContractualDispute(app, 'notContractualDispute')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should not ask ReponseConso when no tag', () => {
    let report: undefined | Partial<ReportDraft>
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
    expect(() => clickContractualDispute(app, 'reponseConso')).toThrow()
  })

  it('should not ask ReponseConso nor contractual dispute when employeeConsumer = true', () => {
    let report: undefined | Partial<ReportDraft>
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
    expect(() => clickContractualDispute(app, 'reponseConso')).toThrow()
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
  })

  it('should ask ReponseConso when tagged', () => {
    let report: undefined | Partial<ReportDraft>
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
    clickContractualDispute(app, 'reponseConso')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.consumerWish).toEqual('getAnswer')
  })
})
