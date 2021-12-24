import 'reflect-metadata';

import { Column, DATE, getPropertyType } from '../..';

export function CreateDateColumn(): PropertyDecorator {
  return (
    target: { [key: string]: any },
    propertyKey: string | symbol
  ): void => {
    let [primative, type] = getPropertyType(target, propertyKey);
    if (primative instanceof Date) type = DATE;

    for (const [database, query] of Object.entries(type.sqlTypes)) {
      type.sqlTypes[database] = query + ' DEFAULT CURRENT_TIMESTAMP';
    }

    Column({
      primative,
      type,
    })(target, propertyKey);
  };
}
