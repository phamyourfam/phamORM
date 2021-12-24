import alterTable from './alterTable';
import createTable from './createTable';
import insert from './insert';
import select from './select';
import toSQLValue from './toSQLValue';
import update from './update';
import where from './where';
import { ColumnConditions, chain } from '.';
import { Connection, ConnectionManager } from '../..';

export type LogQuery =
  | boolean
  | { creation?: boolean; partial?: boolean; run?: boolean };

export interface QueryBuilderOptions {
  logQuery?: LogQuery;
}

export class QueryBuilder {
  connection: Connection;
  /**
   * Flag to set whether query creation and usage should be logged to the console.
   */
  logQuery: LogQuery;

  constructor(connection: string | Connection, options?: QueryBuilderOptions) {
    this.connection =
      typeof connection === 'string'
        ? ConnectionManager.getConnection(connection)
        : connection;
    this.logQuery = options?.logQuery || false;
  }

  alterTable = alterTable;

  createTable = createTable;

  if(condition: string | ColumnConditions | ColumnConditions[]) {
    if (typeof condition === 'string')
      return chain.call(this, `IF ${condition}`);

    if (!Array.isArray(condition)) condition = [condition];

    return chain.call(
      this,
      'IF ' +
        condition
          .map((newRecord: {}) =>
            Object.entries(newRecord)
              .map(([column, value]) => column + '=' + toSQLValue(value))
              .join(' AND ')
          )
          .join(' OR ')
    );
  }

  insert = insert;

  /**
   * Creates a `SELECT [column] FROM [Table]` query.
   */
  select = select;

  update = update;

  where = where;

  delete(table: string) {
    return chain.call(this, `DELETE FROM "${table}"`);
  }
}
