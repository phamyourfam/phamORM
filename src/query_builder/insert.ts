import log from 'log-beautify';

import toSQLValue from './toSQLValue';
import { chain, ColumnConditions, QueryBuilder, QueryBuilderChain } from '.';

export default function insert(
  this: QueryBuilder | QueryBuilderChain,
  table: string = '',
  condition: ColumnConditions
) {
  const query =
    `INSERT INTO "${table}"` +
    ` (${Object.keys(condition)
      .map((column) => `"${column}"`)
      .join(', ')})` +
    '\nVALUES ' +
    `(${Object.values(condition)
      .map((value) => toSQLValue(value))
      .join(', ')});`;

  if (
    this.logQuery === true ||
    (typeof this.logQuery !== 'boolean' && this.logQuery.creation)
  ) {
    log.show();
    log.info('New query created.');
    log.show(query);
  }

  return chain.call(this, query);
}
