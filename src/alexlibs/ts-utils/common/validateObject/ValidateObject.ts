export const getMissingProperties = <T extends object>(requiredProperties: Array<keyof T>, object: T): Array<keyof T> => {
  return requiredProperties.filter(x => object[x] === undefined);
};

export const validateObject = <T extends object>(requiredProperties: Array<keyof T>, object: T): T => {
  const missingFields = getMissingProperties<T>(requiredProperties, object);
  if (missingFields.length > 0) {
    throw new Error(`Missing properties: ${missingFields.join(', ')}.`);
  }
  return object;
};
