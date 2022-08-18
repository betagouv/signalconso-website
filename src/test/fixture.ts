import {ReportStep, ReportStepHelper} from 'core/reportStep'
import randomstring from 'randomstring'
import {Report, ReportStatus} from '../client/report/Report'
import {Company, CompanySearchResult} from '../client/company/Company'
import {FileOrigin} from '../client/file/UploadedFile'
import {ReportDraft, ReportDraftConsumer} from '../client/report/ReportDraft'
import {Information, ReportTag, Subcategory} from '../anomaly/Anomaly'
import {Address} from '../model'
import {allAnomalies} from 'anomaly/Anomalies'

export class Fixture {
  private static readonly lastNames = ['Doe', 'Durand', 'Dupont']

  private static readonly firstNames = ['Alice', 'Bob', 'Charles', 'Danièle', 'Émilien', 'Fanny', 'Gérard']

  private static readonly oneOf = (array: any[]) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  private static readonly genBoolean = () => {
    return Fixture.oneOf([false, true])
  }

  private static readonly genSiret = () => {
    return randomstring.generate({
      length: 14,
      charset: 'numeric',
    })
  }

  private static readonly genPhone = () => {
    return randomstring.generate({
      length: 10,
      charset: 'numeric',
    })
  }

  static readonly genEmail = () => {
    return (
      randomstring.generate({
        length: 10,
        charset: 'alphabetic',
      }) +
      '@' +
      randomstring.generate({
        length: 10,
        charset: 'alphabetic',
      })
    )
  }

  // private static readonly genCompanyAccessLevel = (siret?: string) => {
  //   return {
  //     ...Fixture.genCompany(),
  //     ...(siret ? {siret} : {}),
  //     level: Fixture.oneOf(['admin', 'member']),
  //   }
  // }

  private static readonly genStatus = () => Fixture.oneOf(Object.values(ReportStatus))

  private static readonly genDetails = () => [
    {label: "Date de constat (ou date d'achat) :", value: '09/03/2022'},
    {label: 'Quel est le nom du produit :', value: 'oo'},
    {
      label: 'Pourquoi trouvez-vous la publicité trompeuse :',
      value:
        'le produit ne remplit pas sa promesse, la photo du produit est trompeuse, les labels (bio, naturel...) sont trompeurs',
    },
    {label: 'Où avez-vous vu ces informations :', value: 'site internet, publicité (affiche, dans un magazine)'},
    {
      label: 'Description :',
      value:
        'Suite à l’achat de pass à l’occasion du Passage Musique Festival pour plus de 400€ qui devait avoir lieu en 2018 je n’ai toujours pas reçu de remboursements malgré plusieurs relances.',
    },
  ]

  static readonly genReport = (): Report => {
    const company = Fixture.genCompany()
    const subcategories = [Fixture.genSubcategory(), Fixture.genSubcategory()]
    return {
      id: randomstring.generate(),
      category: Fixture.oneOf(allAnomalies.map(_ => _.category)),
      subcategories: [Fixture.genSubcategory(), Fixture.genSubcategory()],
      companyId: randomstring.generate(),
      companyName: randomstring.generate({capitalization: 'lowercase', charset: 'alphabetic'}),
      companyAddress: Fixture.genAddress(),
      companySiret: company.siret,
      websiteURL: randomstring.generate(),
      // phone: Fixture.genPhone(),
      tags: subcategories.filter(_ => !!_.tags).flatMap(_ => _.tags!),
      details: Fixture.genDetails(),
      firstName: randomstring.generate({capitalization: 'lowercase', charset: 'alphabetic'}),
      lastName: randomstring.generate({capitalization: 'lowercase', charset: 'alphabetic'}),
      email: Fixture.genEmail(),
      consumerPhone: Fixture.genPhone(),
      employeeConsumer: Fixture.genBoolean(),
      contactAgreement: Fixture.genBoolean(),
      creationDate: new Date(),
      status: Fixture.genStatus(),
      reponseconsoCode: [],
      ccrfCode: [],
    }
  }

  static readonly genDraftReport = (lastStep: ReportStep): Partial<ReportDraft> => {
    const stepOrder: {[key in ReportStep]: (_: Partial<ReportDraft>) => Partial<ReportDraft>} = {
      [ReportStep.Problem]: _ => ({
        ..._,
        category: Fixture.oneOf(allAnomalies.map(_ => _.category)),
      }),
      [ReportStep.Details]: _ => ({
        ..._,
        subcategories: [Fixture.genSubcategory(), Fixture.genSubcategory()],
      }),
      [ReportStep.Company]: _ => ({
        ..._,
        details: Fixture.genDetails(),
        employeeConsumer: Fixture.genBoolean(),
        uploadedFiles: [
          {
            filename: 'Captura de pantalla 2022-03-14 a las 18.40.21.png',
            id: '8710d67d-d955-444d-b340-ee17c7b781e9',
            loading: false,
            origin: FileOrigin.Consumer,
          },
        ],
      }),
      [ReportStep.Consumer]: _ => ({
        ..._,
        companyDraft: Fixture.genCompany(),
      }),
      [ReportStep.Confirmation]: _ => ({
        ..._,
        consumer: Fixture.genConsumer(),
        contactAgreement: Fixture.genBoolean(),
      }),
      [ReportStep.Acknowledgment]: _ => _,
    }
    return ReportStepHelper.reportStepOrdered
      .filter((_, i) => i <= ReportStepHelper.getIndexByStep(lastStep))
      .reduce((draft: Partial<ReportDraft>, step: ReportStep) => {
        return stepOrder[step](draft)
      }, {})
  }

  static readonly genConsumer = (): ReportDraftConsumer => {
    return {
      firstName: Fixture.oneOf(Fixture.firstNames),
      lastName: Fixture.oneOf(Fixture.lastNames),
      email: Fixture.genEmail(),
    }
  }

  static readonly genAddress = (): Address => {
    return {
      number: randomstring.generate({charset: 'numeric', length: 2}),
      street: randomstring.generate({charset: 'alphabetic', capitalization: 'lowercase'}),
      city: Fixture.oneOf(['Paris', 'Tunis', 'Nairobi', 'Pont-Aven', 'Chamonix']),
      postalCode: randomstring.generate({length: 5, charset: 'numeric'}),
    }
  }

  static readonly genCompanySearchResult = () => {
    return <CompanySearchResult>{
      name: randomstring.generate({capitalization: 'lowercase', charset: 'alphabetic', length: 8}),
      address: Fixture.genAddress(),
    }
  }

  static readonly genCompany = () => {
    return <Company>{
      id: randomstring.generate(),
      name: randomstring.generate({capitalization: 'lowercase', charset: 'alphabetic', length: 8}),
      siret: Fixture.genSiret(),
      address: Fixture.genAddress(),
    }
  }

  static readonly genSubcategory = (params: Partial<Subcategory> = {}) => {
    return <Subcategory>{
      title: randomstring.generate({capitalization: 'lowercase', charset: 'alphabetic'}),
      id: randomstring.generate(),
      tags: Fixture.oneOf([null, ...Object.keys(ReportTag)]),
      ...params,
    }
  }

  static readonly genInformation = () => {
    return <Information>{
      title: randomstring.generate(),
    }
  }
}
