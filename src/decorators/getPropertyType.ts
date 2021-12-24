export function getPropertyType(
  target: {},
  propertyKey: string | symbol,
  fieldOptions?: any
) {
  const constructor = target.constructor as {
    new (): { [key: string]: any };
  };

  return [
    fieldOptions?.primative ||
      typeof Reflect.getMetadata('design:type', target, propertyKey)(),
    fieldOptions?.type || new constructor()[String(propertyKey)],
  ];
}
