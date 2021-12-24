import { Column, ColumnOptions, getPropertyType } from '.';
import { FOREIGN_KEY } from '../data_types';

interface RelationOptions extends ColumnOptions {
  foreignKeyFields?: string[];
  referenceFields?: string | string[];
}

export function Relation(
  reference: Function,
  options?: RelationOptions
): PropertyDecorator {
  return (target: {}, propertyKey: string | symbol): void => {
    Column(options)(target, propertyKey);
    Column({
      name: propertyKey,
      primative: 'object',
      type: FOREIGN_KEY(
        options?.foreignKeyFields || [String(propertyKey)],
        reference.name,
        typeof options?.referenceFields === 'string'
          ? [options?.referenceFields]
          : options?.referenceFields
      ),
    })(target, propertyKey);
  };
}
