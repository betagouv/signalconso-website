/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import {dummyStepNavigation} from '@/components_feature/playgroundComponents/PlaygroundConfirmation'
import {ReportDraft2} from '@/model/ReportDraft2'
import {AccessReportFlow, fireEvent, render, ScRenderResult} from '@/test/test-utils'
import {Anomaly} from '../../../anomalies/Anomaly'
import {Fixture} from '../../../test/fixture'
import {fnSwitch} from '../../../utils/FnSwitch'
import {Problem} from './Problem'

class ProblemFixture {
  static readonly simpleSubcategory = Fixture.genSubcategory()
  static readonly internetSubcategory = Fixture.genSubcategory({companyKind: 'WEBSITE'})
  static readonly reponseConsoSubcategory = Fixture.genSubcategory({
    companyKind: 'WEBSITE',
    tags: ['ReponseConso'],
  })
  static readonly infoSubcategory = Fixture.genSubcategory({blockingInfo: Fixture.genInformation()})
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
    seoTitle: '',
    seoDescription: 'my seo description',
    path: 'myPath',
    img: 'category-restaurant',
    description: 'my description',
    subcategories: ProblemFixture.subcategories,
  }
}

const props = {isWebView: false, stepNavigation: dummyStepNavigation}

describe('Problem', () => {
  it('should display subcategories', () => {
    const app = render(<Problem {...props} anomaly={ProblemFixture.anomaly} />)
    ProblemFixture.anomaly.subcategories?.forEach(s => {
      expect(app.container.textContent).toContain(s.title)
    })
  })

  it('should route to information page when receive subcategories ending with information', async () => {
    const app = render(<Problem {...props} anomaly={ProblemFixture.anomaly} />, {
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
    fireEvent.click(app.getByText(ProblemFixture.infoSubcategory.title))
    expect(app.container.querySelector('#blocking-info-wall')).not.toBeNull()
  })

  it('should request the user if he is an employee of the company or not when receive subcategories', () => {
    const app = render(<Problem {...props} anomaly={ProblemFixture.anomaly} />)
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
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
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
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
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
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
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickCompanyKind(app, 'internet')
    expect(report?.companyKind).toEqual('WEBSITE')
  })

  it(`shouldn't ask companyKind when defined`, () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickCompanyKind(app, 'internet')).toThrow()
  })

  it('should display contractual dispute warning and go to the next step', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.internetSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'contractualDispute')
    clickBtnSubmit(app)
  })

  it('should not display contractual dispute warning', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
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
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.simpleSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    expect(() => clickContractualDispute(app, 'reponseConso')).toThrow()
  })

  it('should not ask ReponseConso nor contractual dispute when employeeConsumer = true', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
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
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'reponseConso')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.consumerWish).toEqual('getAnswer')
    expect(report?.tags?.includes('ReponseConso')).toEqual(false)
  })

  it('should ask add ReponseConso tag when related option is not selected', () => {
    let report: undefined | Partial<ReportDraft2>
    const app = render(
      <AccessReportFlow
        onReportChange={r => {
          report = r
        }}
      >
        <Problem {...props} anomaly={ProblemFixture.anomaly} />
      </AccessReportFlow>,
    )
    fireEvent.click(app.getByText(ProblemFixture.reponseConsoSubcategory.title))
    clickEmployeeConsumer(app, 'no')
    clickContractualDispute(app, 'notContractualDispute')
    expectContractualDisputeVisible(app, false)
    clickBtnSubmit(app)
    expect(report?.employeeConsumer).toEqual(false)
    expect(report?.consumerWish).not.toEqual('getAnswer')
    expect((report?.tags ?? []).includes('ReponseConso')).toEqual(false)
  })
})
