import log from 'log-beautify';

import { Column } from '../..';
import { chain, QueryBuilder, QueryBuilderChain } from '.';

interface CreateTableOptions {
  force?: boolean;
}

/**
 * Creates a table query.
 * @param name Name of the table to be created.
 * @param columns The columns and the corresponding datatypes of the table.
 * @param options
 * @returns An object that allows for chaining or void.
 */
export default function createTable(
  this: QueryBuilder | QueryBuilderChain,
  name: string,
  columns: Column | Column[],
  options?: CreateTableOptions
) {
  if (!Array.isArray(columns)) columns = [columns];

  const query =
    (options?.force ? `DROP TABLE IF EXISTS "${name}";\n` : '') +
    `CREATE TABLE IF NOT EXISTS "${name}" (\n` +
    columns
      .map(
        (column) =>
          `  "${column.name}" ${
            column.type.sqlTypes[this.connection.databaseType] +
            (column.isPrimaryKey === true ? ' PRIMARY KEY' : '')
          }`
      )
      .join(',\n')
      .replaceAll(/"\w+"(?=\s+FOREIGN)\s/g, '') +
    '\n);';

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
