import 'reflect-metadata';

import { DataType } from '../data_types/DataType';
import { getPropertyType, VARCHAR, FLOAT } from '../..';

export interface ColumnOptions {
  name?: string | symbol; // Column name in the database. Set as the entity's property name by default.
  primative?: any;
  type?: any;
  isPrimaryKey?: boolean;
  comment?: string; // Column comment. Not supported by all database types.
  length?: number;
}

export interface Column {
  name: string;
  primative?: string;
  type: DataType;
  isPrimaryKey?: boolean;
  isUnique?: boolean;
  isNotNull?: boolean;
}

export function Column(options?: ColumnOptions): PropertyDecorator {
  return (
    target: { [key: string]: any },
    propertyKey: string | symbol
  ): void => {
    let [primative, type] = getPropertyType(target, propertyKey, options);

    switch (options?.primative || primative) {
      case 'string':
        type = VARCHAR(255);
        break;
      case 'number':
        type = FLOAT;
        break;
    }

    if (!target._columns) target._columns = [];

    target._columns.push({
      name: options?.name ?? propertyKey,
      primative: options?.primative ?? primative,
      type: options?.type ?? type,
      isPrimaryKey: Boolean(options?.isPrimaryKey),
    });
  };
}
