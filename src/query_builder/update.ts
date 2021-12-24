import toSQLValue from './toSQLValue';
import { chain, ColumnConditions, QueryBuilder, QueryBuilderChain } from '.';

export default function update(
  this: QueryBuilder | QueryBuilderChain,
  table: string = '',
  condition: ColumnConditions
) {
  return chain.call(
    this,
    `UPDATE "${table}"\n SET ` +
      Object.entries(condition).map(
        ([column, newValue]) => column + '=' + toSQLValue(newValue)
      )
  );
}
