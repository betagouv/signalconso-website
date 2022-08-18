import {CompanyKinds, DetailInputType, ReportTag} from '../Anomaly'
import {AnomalyTreeWalker, ObjectSpec} from './AnomalyTreeWalker'

// /!\ This effectively duplicates the structure
// be sure to update it along with the "Anomaly" types
export function checkAnomaliesYaml(jsonArborescence: any) {
  new AnomalyTreeWalker(jsonArborescence).assertIsObjectWith(rootSpec)
}

const rootSpec: ObjectSpec = {
  list: _ =>
    _.assertIsArrayWith(anomaly => {
      anomaly.assertIsObjectWith(anomalySpec)
    }),
}

const baseCategorySpec: ObjectSpec = {
  id: _ => _.ifDefined()?.assertIsString(),
  title: _ => _.assertIsString(),
  subcategoriesTitle: _ => _.ifDefined()?.assertIsString(),
  companyKind: _ => _.ifDefined()?.assertIsAllowedString(Object.values(CompanyKinds)),
  subcategories: _ => _.ifDefined()?.assertIsArrayWith(assertIsSubcategory),
}

const anomalySpec: ObjectSpec = {
  category: _ => _.assertIsString(),
  seoDescription: _ => _.ifDefined()?.assertIsString(),
  path: _ => _.assertIsString(),
  description: _ => _.assertIsString(),
  sprite: _ => _.assertIsString(),
  hidden: _ => _.ifDefined()?.assertIsBoolean(),
  information: _ => _.ifDefined()?.assertIsString(),
  breadcrumbTitle: _ => _.ifDefined()?.assertIsString(),
  ...baseCategorySpec,
}

const baseSubcategorySpec: ObjectSpec = {
  description: _ => _.ifDefined()?.assertIsString(),
  tags: _ => _.ifDefined()?.assertIsArrayOfAllowedStrings(Object.values(ReportTag)),
  example: _ => _.ifDefined()?.assertIsString(),
  reponseconsoCode: _ => _.ifDefined()?.ifNotNull()?.assertIsArrayOfString(),
  ccrfCode: _ => _.ifDefined()?.assertIsArrayOfString(),
  // a Subcategory is always a Category
  // this triggers the recursion
  ...baseCategorySpec,
}

const informationSubcategorySpec: ObjectSpec = {
  information: _ =>
    _.assertIsObjectWith({
      title: _ => _.ifDefined()?.assertIsString(),
      content: _ => _.ifDefined()?.assertIsString(),
      subTitle: _ => _.ifDefined()?.assertIsString(),
      outOfScope: _ => _.ifDefined()?.assertIsBoolean(),
      actions: _ =>
        _.ifDefined()?.assertIsArrayWith(action => {
          action.assertIsObjectWith({
            question: _ => _.assertIsString(),
            example: _ => _.ifDefined()?.assertIsString(),
            answer: _ => _.assertIsString(),
          })
        }),
    }),
  ...baseSubcategorySpec,
}

const inputSubcategorySpec: ObjectSpec = {
  detailTitle: _ => _.ifDefined()?.assertIsString(),
  fileLabel: _ => _.ifDefined()?.assertIsString(),
  detailInputs: _ =>
    _.ifDefined()?.assertIsArrayWith(detailInput => {
      detailInput.assertIsObjectWith({
        label: _ => _.assertIsString(),
        rank: _ => _.ifDefined()?.assertIsNumber(),
        type: _ => _.assertIsAllowedString(Object.values(DetailInputType)),
        placeholder: _ => _.ifDefined()?.assertIsString(),
        options: _ => _.ifDefined()?.assertIsArrayOfString(),
        defaultValue: _ => _.ifDefined()?.assertIsAllowedString(['SYSDATE']),
        example: _ => _.ifDefined()?.assertIsString(),
        optionnal: _ => _.ifDefined()?.assertIsBoolean(),
      })
    }),
  ...baseSubcategorySpec,
}

function assertIsSubcategory(subcategory: AnomalyTreeWalker) {
  // There are two possibles shapes, let's check manually which one it is
  if (Object.keys(subcategory.value).includes('information')) {
    subcategory.assertIsObjectWith(informationSubcategorySpec)
  } else {
    subcategory.assertIsObjectWith(inputSubcategorySpec)
  }
}
