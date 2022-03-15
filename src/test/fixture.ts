import {Address, Company, CompanySearchResult, FileOrigin, Information, ReportDraft, ReportDraftConsumer, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
import anomalies from '@signal-conso/signalconso-api-sdk-js/lib/client/anomaly/yml/anomalies.json'
import {ReportStep, ReportStepHelper} from '../core/reportStep'
import randomstring from 'randomstring'

export const oneOf = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const oneBoolean = () => {
  return oneOf([false, true])
}

export const genSiret = () => {
  return randomstring.generate({
    length: 14,
    charset: 'numeric'
  })
}

export const genPhone = () => {
  return randomstring.generate({
    length: 10,
    charset: 'numeric'
  })
}

export const genEmail = () => {
  return randomstring.generate({
    length: 10,
    charset: 'alphabetic'
  }) + '@' + randomstring.generate({
    length: 10,
    charset: 'alphabetic'
  })
}

export const lastNames = ['Doe', 'Durand', 'Dupont']
export const firstNames = ['Alice', 'Bob', 'Charles', 'Danièle', 'Émilien', 'Fanny', 'Gérard']

export const genCompanyAccessLevel = (siret?: string) => {
  return {
    ...genCompany(),
    ...(siret ? {siret} : {}),
    level: oneOf(['admin', 'member'])
  }
}

export const genDraftReport = (lastStep: ReportStep): Partial<ReportDraft> => {
  const stepOrder: { [key in ReportStep]: (_: Partial<ReportDraft>) => Partial<ReportDraft> } = ({
    [ReportStep.Problem]: _ => ({
      ..._,
      category: oneOf(anomalies.list.filter(_ => !_.information).map(_ => _.category))
    }),
    [ReportStep.Details]: _ => ({
      ..._,
      subcategories: [genSubcategory(), genSubcategory()],
    }),
    [ReportStep.Company]: _ => ({
      ..._,
      detailInputValues: [
        {label: 'Date de constat (ou date d\'achat) :', value: '09/03/2022'},
        {label: 'Quel est le nom du produit :', value: 'oo'},
        {
          label: 'Pourquoi trouvez-vous la publicité trompeuse :',
          value: 'le produit ne remplit pas sa promesse, la photo du produit est trompeuse, les labels (bio, naturel...) sont trompeurs'
        },
        {label: 'Où avez-vous vu ces informations :', value: 'site internet, publicité (affiche, dans un magazine)'},
        {
          label: 'Description :',
          value: 'Suite à l’achat de pass à l’occasion du Passage Musique Festival pour plus de 400€ qui devait avoir lieu en 2018 je n’ai toujours pas reçu de remboursements malgré plusieurs relances.'
        },
      ],
      employeeConsumer: oneBoolean(),
      uploadedFiles: [
        {
          filename: 'Captura de pantalla 2022-03-14 a las 18.40.21.png',
          id: '8710d67d-d955-444d-b340-ee17c7b781e9',
          loading: false,
          origin: FileOrigin.Consumer,
        }
      ],
    }),
    [ReportStep.Consumer]: _ => ({
      ..._,
      companyDraft: genCompany()
    }),
    [ReportStep.Confirmation]: _ => ({
      ..._,
      consumer: genConsumer(),
      contactAgreement: oneBoolean(),
    }),
    [ReportStep.Acknowledgment]: _ => _,
  })
  return ReportStepHelper.reportStepOrdered
    .filter((_, i) => i <= ReportStepHelper.getIndexByStep(lastStep))
    .reduce((draft: Partial<ReportDraft>, step: ReportStep) => {
      return stepOrder[step](draft)
    }, {})
}

export const genConsumer = (): ReportDraftConsumer => {
  return {
    firstName: oneOf(firstNames),
    lastName: oneOf(lastNames),
    email: genEmail()
  }
}

export const genAddress = (): Address => {
  return {
    number: randomstring.generate(),
    street: randomstring.generate(),
    city: randomstring.generate(),
    postalCode: randomstring.generate({
      length: 5,
      charset: 'numeric'
    })
  }
}

export const genCompanySearchResult = () => {
  return <CompanySearchResult>{
    name: randomstring.generate(),
    address: genAddress()
  }
}

export const genCompany = () => {
  return <Company>{
    id: randomstring.generate(),
    name: randomstring.generate(),
    siret: genSiret(),
    address: genAddress()
  }
}

export const genSubcategory = (params: Partial<Subcategory> = {}) => {
  return <Subcategory>{
    title: randomstring.generate(),
    id: randomstring.generate(),
    tags: oneOf([null, [randomstring.generate()], [randomstring.generate(), randomstring.generate()]]),
    ...params
  }
}

export const genInformation = () => {
  return <Information>{
    title: randomstring.generate()
  }
}
