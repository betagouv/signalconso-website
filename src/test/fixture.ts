import {Company, CompanySearchResult, Information, ReportDraft, ReportDraftConsumer, Subcategory} from '@signal-conso/signalconso-api-sdk-js'
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
      subcategories: [genSubcategory()],
    }),
    [ReportStep.Company]: _ => ({
      ..._,
      employeeConsumer: oneBoolean(),
      detailInputValues: [],
      uploadedFiles: [],
    }),
    [ReportStep.Consumer]: _ => ({
      ..._,
      draftCompany: genCompanySearchResult()
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

export const genCompanySearchResult = () => {
  return <CompanySearchResult>{
    name: randomstring.generate(),
    address: {
      number: randomstring.generate(),
      street: randomstring.generate(),
      city: randomstring.generate(),
      postalCode: randomstring.generate({
        length: 5,
        charset: 'numeric'
      })
    },
  }
}

export const genCompany = () => {
  return <Company>{
    id: randomstring.generate(),
    name: randomstring.generate(),
    siret: genSiret()
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
