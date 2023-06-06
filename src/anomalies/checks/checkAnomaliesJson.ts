import {companyKinds, DetailInputType, reportTagsAllowedInYaml} from '../Anomaly'
import {AnomalyTreeWalker, ObjectSpec} from './AnomalyTreeWalker'

// /!\ This effectively duplicates the structure
// be sure to update it along with the "Anomaly" types
export function checkAnomaliesYaml(jsonArborescence: any) {
  new AnomalyTreeWalker(jsonArborescence).assertIsArrayWith(anomaly => {
    anomaly.assertIsObjectWith(anomalySpec)
  })
}

const anomalySpec: ObjectSpec = {
  category: _ => _.assertIsSlug(),
  path: _ => _.assertIsString(),
  id: _ => _.assertIsString(),
  title: _ => _.assertIsString(),
  description: _ => _.assertIsString(),
  seoTitle: _ => _.assertIsString(),
  seoDescription: _ => _.assertIsString(),
  img: _ => _.assertIsString(),
  hidden: _ => _.ifDefined()?.assertIsBoolean(),
  isHiddenDemoCategory: _ => _.ifDefined()?.assertIsBoolean(),
  subcategoriesTitle: _ => _.ifDefined()?.assertIsString(),
  // triggers the recursion
  subcategories: _ => _.assertIsArrayWith(assertIsSubcategory),
}

const baseSubcategorySpec: ObjectSpec = {
  tags: _ => _.ifDefined()?.assertIsArrayOfAllowedStrings(reportTagsAllowedInYaml),
  desc: _ => _.ifDefined()?.assertIsString(),
  reponseconsoCode: _ => _.ifDefined()?.ifNotNull()?.assertIsArrayOfString(),
  ccrfCode: _ => _.ifDefined()?.assertIsArrayOfString(),
  companyKind: _ => _.ifDefined()?.assertIsAllowedString(companyKinds),
  title: _ => _.assertIsString(),
  subcategoriesTitle: _ => _.ifDefined()?.assertIsString(),
  // triggers the recursion
  subcategories: _ => _.ifDefined()?.assertIsArrayWith(assertIsSubcategory),
  companyKindQuestion: _ => _.ifDefined()?.assertIsObjectWith(companyKindQuestionSpec),
}

const subcategoryWithInfoWallSpec: ObjectSpec = {
  blockingInfo: _ =>
    _.assertIsObjectWith({
      title: _ => _.ifDefined()?.assertIsString(),
      content: _ => _.ifDefined()?.assertIsString(),
      subTitle: _ => _.ifDefined()?.assertIsString(),
      notAFraudMessage: _ => _.ifDefined()?.assertIsBoolean(),
      questions: _ =>
        _.ifDefined()?.assertIsArrayWith(action => {
          action.assertIsObjectWith({
            question: _ => _.assertIsString(),
            desc: _ => _.ifDefined()?.assertIsString(),
            answer: _ => _.assertIsString(),
          })
        }),
    }),
  ...baseSubcategorySpec,
}

const standardSubcategorySpec: ObjectSpec = {
  fileLabel: _ => _.ifDefined()?.assertIsString(),
  detailInputs: _ =>
    _.ifDefined()?.assertIsArrayWith(detailInput => {
      assertIsDetailInput(detailInput)
    }),
  ...baseSubcategorySpec,
}

const companyKindQuestionSpec: ObjectSpec = {
  label: _ => _.assertIsString(),
  options: _ => _.assertIsArrayWith(_ => _.assertIsObjectWith(companyKindQuestionOptionSpec)),
}

const companyKindQuestionOptionSpec: ObjectSpec = {
  label: _ => _.assertIsString(),
  companyKind: _ => _.assertIsAllowedString(companyKinds),
}

function assertIsSubcategory(subcategory: AnomalyTreeWalker) {
  // There are two possibles shapes, let's check manually which one it is
  if (Object.keys(subcategory.value).includes('blockingInfo')) {
    subcategory.assertIsObjectWith(subcategoryWithInfoWallSpec)
  } else {
    subcategory.assertIsObjectWith(standardSubcategorySpec)
  }
}

function assertIsDetailInput(detailInput: AnomalyTreeWalker) {
  const baseSpec: ObjectSpec = {
    label: _ => _.assertIsString(),
    type: _ => _.assertIsAllowedString(Object.values(DetailInputType)),
    optional: _ => _.ifDefined()?.assertIsBoolean(),
  }

  function getRestOfSpec(): ObjectSpec {
    switch (detailInput.into('type').value) {
      case DetailInputType.TEXT:
      case DetailInputType.TEXTAREA:
        return {
          placeholder: _ => _.ifDefined()?.assertIsString(),
        }
      case DetailInputType.DATE:
      case DetailInputType.DATE_NOT_IN_FUTURE:
        return {
          defaultValue: _ => _.ifDefined()?.assertIsAllowedString(['SYSDATE']),
        }
      case DetailInputType.RADIO:
      case DetailInputType.CHECKBOX:
        return {
          options: _ => _.assertIsArrayOfString(),
        }
      case DetailInputType.TIMESLOT:
      default:
        return {}
    }
  }

  detailInput.assertIsObjectWith({
    ...baseSpec,
    ...getRestOfSpec(),
  })
}