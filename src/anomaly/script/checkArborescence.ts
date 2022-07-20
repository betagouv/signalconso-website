const {CompanyKinds, DetailInputType, ReportTag} = require('../Anomaly')
const {AnomalyTreeWalker} = require('./AnomalyTreeWalker')

// /!\ This effectively duplicates the structure, be sure to update it along with the "Anomaly" types
// /!\ This does NOT check for unexpected fields.
// Thus if you write an optional field with a typo, it will ignore it silently...
export function checkArborescence(jsonArborescence) {
  const root = new AnomalyTreeWalker(jsonArborescence)
  root.assertIsObject()
  const list = root.into('list')
  list.assertIsArrayWith(anomaly => {
    anomaly.assertIsObject()
    anomaly.into('category').assertIsString()
    anomaly.into('categoryId').assertIsString()
    anomaly.intoMaybe('seoDescription')?.assertIsString()
    anomaly.into('path').assertIsString()
    anomaly.intoMaybe('description')?.assertIsString()
    anomaly.intoMaybe('sprite')?.assertIsString()
    anomaly.intoMaybe('cssClass')?.assertIsString()
    anomaly.intoMaybe('hidden')?.assertIsBoolean()
    anomaly.intoMaybe('information')?.assertIsString()
    anomaly.intoMaybe('breadcrumbTitle')?.assertIsString()
    assertIsCategory(anomaly)
  })
}

function assertIsCategory(category: typeof AnomalyTreeWalker) {
  category.into('id').assertIsString()
  category.into('title').assertIsString()
  category.intoMaybe('subcategoriesTitle')?.assertIsString()
  category.intoMaybe('companyKind')?.assertIsAllowedString(Object.values(CompanyKinds))
  const subcategories = category.intoMaybe('subcategories')
  if (subcategories) {
    subcategories.assertIsArrayWith(subcategory => {
      assertIsSubcategory(subcategory)
    })
  }
}

function assertIsSubcategory(subcategory: typeof AnomalyTreeWalker) {
  // It should have all fields of SubcategoryBase
  subcategory.intoMaybe('description')?.assertIsString()
  subcategory.intoMaybe('tags')?.assertIsArrayOfAllowedStrings(Object.values(ReportTag))
  subcategory.intoMaybe('example')?.assertIsString()
  subcategory.intoMaybe('responseconsoCode')?.assertIsArrayOfString()
  subcategory.intoMaybe('ccrfCode')?.assertIsArrayOfString()

  // Then there are two possible shapes
  const fields = Object.keys(subcategory.value)
  const subcategoryInputFields = ['detailTitle', 'fileLabel', 'detailInputs']
  const informationField = 'information'
  const information = subcategory.intoMaybe(informationField)
  if (information) {
    // we make sure the shapes are not mixed together
    if (fields.some(_ => subcategoryInputFields.includes(_))) {
      throw subcategory.err(
        `Subcategory contains a field ${information}, thus it should not contain any of the following fields: ${subcategoryInputFields.join(
          ', ',
        )}`,
      )
    }
    information.assertIsObject()
    information.intoMaybe('title')?.assertIsString()
    information.intoMaybe('content')?.assertIsString()
    const actions = information.intoMaybe('actions')
    if (actions) {
      actions.assertIsArrayWith(action => {
        action.assertIsObject()
        action.into('question').assertIsString()
        action.intoMaybe('example')?.assertIsString()
        action.into('answer').assertIsString()
      })
    }
    information.intoMaybe('subTitle')?.assertIsString()
    information.intoMaybe('outOfScope')?.assertIsBoolean()
  } else {
    subcategory.intoMaybe('detailTitle')?.assertIsString()
    subcategory.intoMaybe('fileLabel')?.assertIsString()
    const detailInputs = subcategory.intoMaybe('detailInputs')
    if (detailInputs) {
      detailInputs.assertIsArrayWith(detailInput => {
        detailInput.into('label').assertIsString()
        detailInput.intoMaybe('rank')?.assertIsNumber()
        detailInput.into('type').assertIsAllowedString(Object.values(DetailInputType))
        detailInput.intoMaybe('placeholder')?.assertIsString()
        detailInput.intoMaybe('options')?.assertIsArrayOfString()
        detailInput.intoMaybe('defaultValue')?.assertIsString()
        detailInput.intoMaybe('example')?.assertIsString()
        detailInput.intoMaybe('optionnal')?.assertIsBoolean()
      })
    }
  }

  // a Subcategory is always a Category
  // Triggers the recursion
  assertIsCategory(subcategory)
}
