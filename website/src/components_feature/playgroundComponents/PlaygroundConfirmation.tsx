import {StepNavigation} from '@/components_feature/reportFlow/reportFlowStepper/ReportFlowStepper'
import {Report} from '@/model/Report'
import {firstReportStep} from '@/model/ReportStep'
import {FileOrigin} from '@/model/UploadedFile'
import {Fixture, SeedableRandom} from '../../test/fixture'
import {ConfirmationInner} from '../reportFlow/Confirmation/Confirmation'

export const dummyStepNavigation: StepNavigation = {
  currentStep: firstReportStep,
  goTo: () => {},
  next: () => {},
  prev: () => {},
}

export const PlaygroundConfirmation = () => {
  const random = new SeedableRandom(1)
  const report: Report = {
    step0: {
      category: 'DemoCategory',
      lang: 'fr',
    },
    step1: {
      subcategoriesIndexes: [1, 0],
      employeeConsumer: false,
      consumerWish: 'fixContractualDispute',
    },
    step2: {
      kind: 'product',
      barcodeProduct: Fixture.genBarcodeProduct(random),
      companyIdentification: {
        kind: 'companyFound',
        company: Fixture.genCompanySearchResult(random),
      },
    },
    step3: {
      details: {
        ['0']: '09/03/2022',
        ['1']: 'Voilà ma description du problème.',
        ['2']: 'Voilà ma question',
      },
      uploadedFiles: [
        {
          filename: 'Captura de pantalla 2022-03-14 a las 18.40.21.png',
          id: '8710d67d-d955-444d-b340-ee17c7b781e9',
          loading: false,
          origin: FileOrigin.Consumer,
        },
      ],
    },
    step4: {
      consumer: Fixture.genConsumer(random),
      contactAgreement: false,
    },
  }

  return <ConfirmationInner draft={report} isWebView={false} stepNavigation={dummyStepNavigation} />
}
