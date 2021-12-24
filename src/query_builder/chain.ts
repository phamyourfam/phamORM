import log from 'log-beautify';

import { QueryBuilder } from '.';

interface CustomQueryOptions {
  newLine: boolean;
}

export interface QBC extends QueryBuilder {
  _query: string;
  /**
   * Adds custom queries to the current query. Necessary method for modifying the query along the chain.
   * @param query
   * @returns An object that facilitates method chaining on QueryBuilder methods.
   */
  custom(query: string, options?: CustomQueryOptions): QBC;
  get query(): string;
  /**
   * Method that runs the query on the actual database via. a SQL client.
   */
  run(): void;
}

/**
 * Facilitates method chaining of QueryBuilder's methods with metadata about the query.
 * @param qB Reference to this instance of QueryBuilder.
 * @param shouldChain Flag to determine wheter the another method will be able to be chained after this method.
 * @returns An object with methods and metadata.
 */
export function chain(
  qB: QueryBuilder,
  startingQuery: string = '',
  shouldChain: boolean = true
): QBC {
  // @ts-ignore - TS thinks properties of QueryBuilder doesn't exist on the object but they do.
  return {
    _query: startingQuery,
    custom(
      query: string,
      { newLine }: CustomQueryOptions = { newLine: true }
    ): QBC {
      this._query += newLine ? '\n' + query : query;
      this._query = this._query.trim().replace(/[;\s]*$/, ';'); // Trim whitespace and add a semicolon if the query doesn't already end in one.
      return this;
    },
    get queryString(): string {
      if (qB.logQuery) {
        log.show();
        log.info(shouldChain ? 'Query created so far:' : 'Completed query:');
        log.show(this._query);
      }

      return this._query;
    },
    run() {
      // qB.connection.query(this._query);

      if (qB.logQuery) {
        log.show();
        log.info('Query ran.');
        log.show(this._query);
      }
    },
    ...(shouldChain && qB), // Spread QueryBuilder's methods so you can chain them (by default).
  };
}
