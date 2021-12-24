import { chain, QueryBuilder, QueryBuilderChain } from '.';

export default function select(
  this: QueryBuilder | QueryBuilderChain,
  // 1st call 'this' context: QueryBuilder, 2nd, 3rd, ... call 'this' context: QueryBuilderChain.
  columns: string | string[] = ['*'],
  table: string
) {
  if (!Array.isArray(columns)) columns = [columns];

  return chain.call(
    this,
    `SELECT ${columns
      .map((column) => (column === '*' ? '*' : `"${column}"`))
      .join(', ')} FROM "${table}"`
  );
}
