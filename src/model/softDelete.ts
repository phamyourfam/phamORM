import { ExtendedModel } from '.';
import { Column, DataType, Model, TIMESTAMP } from '../..';

export interface SoftDeleteOptions {
  name?: string;
  type?: DataType;
  table?: boolean | { name?: string; columns: Column | Column[] };
}

export default function softDelete(
  this: Model,
  options?: boolean | SoftDeleteOptions
) {
  const extendedModel: ExtendedModel = this.constructor;
  const queryBuilder = extendedModel?.connection?.qB;

  if (typeof options === 'boolean')
    options = { name: undefined, table: undefined };

  if (typeof options?.table === 'object') {
    queryBuilder
      ?.createTable(
        options?.table.name || `Deleted${extendedModel.modelName}`,
        options?.table.columns || {
          name: `${extendedModel?.modelName?.toLowerCase()}_id`,
          type: extendedModel?._columns?.find(
            (column: Column) => column.isPrimaryKey
          ),
        }
      )
      .run();
  }

  queryBuilder
    ?.alterTable(
      extendedModel?.modelName,
      {
        name: options?.name || 'deleted_at',
        type: options?.type || TIMESTAMP,
      },
      { operation: 'ADD' }
    )
    .run();
}
