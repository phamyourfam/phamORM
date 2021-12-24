interface GetModelPropertiesOptions {
  removeUndefined: boolean;
}

export default function getModelProperties(
  inputObject: { [key: string]: any },
  options?: GetModelPropertiesOptions
) {
  options ??= { removeUndefined: true };

  const shallowClone = Object.assign({}, inputObject);
  delete shallowClone.reload;
  delete shallowClone.remove;
  delete shallowClone.save;
  delete shallowClone.softDelete;
  delete shallowClone.softRemove;

  const definedProperties = JSON.parse(JSON.stringify(shallowClone));

  return options?.removeUndefined
    ? definedProperties
    : { ...shallowClone, ...definedProperties };
}
