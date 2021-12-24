import toSQLValue from './toSQLValue';
import { chain, ColumnConditions, QueryBuilder, QueryBuilderChain } from '.';

export default function where(
  this: QueryBuilder | QueryBuilderChain,
  condition: ColumnConditions | ColumnConditions[]
) {
  if (!Array.isArray(condition)) condition = [condition];

  return chain.call(
    this,
    'WHERE ' +
      condition
        .map((newRecord: {}) =>
          Object.entries(newRecord)
            .map(([column, value]) => column + '=' + toSQLValue(value))
            .join(' AND ')
        )
        .join(' OR ')
  );
}
