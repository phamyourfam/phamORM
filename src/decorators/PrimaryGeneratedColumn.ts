import 'reflect-metadata';

import { Column, ColumnOptions, getPropertyType } from '.';
import { SERIAL, UUID } from '../data_types';

/**
 * Decorator that is used to mark a specific class property as a table field.
 */

export function PrimaryGeneratedColumn(
  strategy?: 'increment' | 'uuid' | 'snowflake',
  options?: ColumnOptions
): PropertyDecorator {
  return (target: {}, propertyKey: string | symbol) => {
    let [primative, type] = getPropertyType(target, propertyKey, options);

    switch (strategy || primative) {
      case 'snowflake':
        type = 'INTEGER';
        break;
      case 'uuid':
        type = UUID();
        break;
      case 'number':
      case 'increment':
      default:
        type = SERIAL;
    }

    Column({
      primative,
      type,
      isPrimaryKey: true,
    })(target, propertyKey);
  };
}
