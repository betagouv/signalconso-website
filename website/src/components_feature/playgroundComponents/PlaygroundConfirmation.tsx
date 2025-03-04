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
      consumerWish: 'reportSomething',
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
        ['1']:
          'Voilà ma description du problème. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n\n\n Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? \nQuis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Lorem.',
      },
      uploadedFiles: [
        {
          filename: 'Captura de pantalla 2022-03-14 a las 18.40.21.png',
          id: '8710d67d-d955-444d-b340-ee17c7b781e9',
          loading: false,
          origin: FileOrigin.Consumer,
        },
        {
          filename: 'something else.pdf',
          id: '8710d67d-d955-444d-b340-333333333333',
          loading: false,
          origin: FileOrigin.Consumer,
        },
      ],
    },
    step4: {
      consumer: Fixture.genConsumer(random),
      contactAgreement: random.boolean(),
    },
  }

  return <ConfirmationInner draft={report} isWebView={false} stepNavigation={dummyStepNavigation} />
}
