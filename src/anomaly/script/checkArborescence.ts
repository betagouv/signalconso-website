const {CompanyKinds, DetailInputType, ReportTag} = require('../Anomaly')
const {AnomalyTreeWalker} = require('./AnomalyTreeWalker')

// /!\ This effectively duplicates the structure, be sure to update it along with the "Anomaly" types
// /!\ This does NOT check for unexpected fields.
// Thus if you write an optional field with a typo, it will ignore it silently... (like example/exemple)
export function checkArborescence(jsonArborescence) {
  const root = new AnomalyTreeWalker(jsonArborescence)
  root.assertIsObject()
  const list = root.into('list')
  list.assertIsArrayWith(anomaly => {
    anomaly.assertIsObject()
    anomaly.into('category').assertIsString()
    anomaly.into('categoryId').assertIsString()
    anomaly.into('seoDescription').ifDefined()?.ifNotNull()?.assertIsString()
    anomaly.into('path').assertIsString()
    anomaly.into('description').ifDefined()?.assertIsString()
    anomaly.into('sprite').ifDefined()?.assertIsString()
    anomaly.into('cssClass').ifDefined()?.assertIsString()
    anomaly.into('hidden').ifDefined()?.assertIsBoolean()
    anomaly.into('information').ifDefined()?.assertIsString()
    anomaly.into('breadcrumbTitle').ifDefined()?.assertIsString()
    assertIsCategory(anomaly)
  })
}

function assertIsCategory(category: typeof AnomalyTreeWalker) {
  category.into('id').assertIsString()
  category.into('title').assertIsString()
  category.into('subcategoriesTitle').ifDefined()?.assertIsString()
  category.into('companyKind').ifDefined()?.assertIsAllowedString(Object.values(CompanyKinds))
  const subcategories = category.into('subcategories').ifDefined()
  if (subcategories) {
    subcategories.assertIsArrayWith(subcategory => {
      assertIsSubcategory(subcategory)
    })
  }
}

function assertIsSubcategory(subcategory: typeof AnomalyTreeWalker) {
  // It should have all fields of SubcategoryBase
  subcategory.into('description').ifDefined()?.assertIsString()
  subcategory.into('tags').ifDefined()?.assertIsArrayOfAllowedStrings(Object.values(ReportTag))
  subcategory.into('example').ifDefined()?.assertIsString()
  subcategory.into('responseconsoCode').ifDefined()?.assertIsArrayOfString()
  subcategory.into('ccrfCode').ifDefined()?.assertIsArrayOfString()

  // Then there are two possible shapes
  const fields = Object.keys(subcategory.value)
  const subcategoryInputFields = ['detailTitle', 'fileLabel', 'detailInputs']
  const informationField = 'information'
  const information = subcategory.into(informationField).ifDefined()
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
    information.into('title').ifDefined()?.assertIsString()
    information.into('content').ifDefined()?.assertIsString()
    const actions = information.into('actions').ifDefined()
    if (actions) {
      actions.assertIsArrayWith(action => {
        action.assertIsObject()
        action.into('question').assertIsString()
        action.into('example').ifDefined()?.assertIsString()
        action.into('answer').assertIsString()
      })
    }
    information.into('subTitle').ifDefined()?.assertIsString()
    information.into('outOfScope').ifDefined()?.assertIsBoolean()
  } else {
    subcategory.into('detailTitle').ifDefined()?.assertIsString()
    subcategory.into('fileLabel').ifDefined()?.assertIsString()
    const detailInputs = subcategory.into('detailInputs').ifDefined()
    if (detailInputs) {
      detailInputs.assertIsArrayWith(detailInput => {
        detailInput.into('label').assertIsString()
        detailInput.into('rank').ifDefined()?.assertIsNumber()
        detailInput.into('type').assertIsAllowedString(Object.values(DetailInputType))
        detailInput.into('placeholder').ifDefined()?.assertIsString()
        detailInput.into('options').ifDefined()?.assertIsArrayOfString()
        detailInput.into('defaultValue').ifDefined()?.assertIsString()
        detailInput.into('example').ifDefined()?.assertIsString()
        detailInput.into('optionnal').ifDefined()?.assertIsBoolean()
      })
    }
  }

  // a Subcategory is always a Category
  // Triggers the recursion
  assertIsCategory(subcategory)
}
