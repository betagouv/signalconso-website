import _get from 'lodash.get'

export const getMissingPropertiesDeep = (
  requiredProperties: Array<string>,
  object: object
): Array<string> => {
  return requiredProperties.filter((path: string) => _get(object, path) === undefined);
};

export const validateObjectDeep = <T extends object>(
  requiredProperties: Array<string>,
  object: T
): T => {
  const missingFields = getMissingPropertiesDeep(requiredProperties, object);
  if (missingFields.length > 0) {
    throw new Error(`Missing properties: ${missingFields.join(', ')}.`);
  }
  return object;
};
