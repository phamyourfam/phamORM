import log from 'log-beautify';

import { Column } from '../..';
import { chain, QueryBuilder, QueryBuilderChain } from '.';

interface AlterTableOptions {
  operation:
    | 'ADD'
    | 'DROP COLUMN'
    | 'ALTER COLUMN'
    | 'MODIFY'
    | 'MODIFY COLUMN';
}

export default function alterTable(
  this: QueryBuilder | QueryBuilderChain,
  name: string = '',
  columns: Column | Column[],
  options: AlterTableOptions
) {
  let query = `ALTER TABLE "${name}"\n`;

  switch (options.operation) {
    case 'ADD':
      if (!Array.isArray(columns))
        query += `ADD COLUMN IF NOT EXISTS "${columns.name}" ${
          columns.type.sqlTypes[this.connection.databaseType]
        };`;
      break;
    case 'DROP COLUMN':
      // code block
      break;
    default:
    // code block
  }

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
