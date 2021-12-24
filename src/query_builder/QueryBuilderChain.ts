import log from 'log-beautify';

import { Connection } from '../..';
import { LogQuery, QueryBuilder, QueryBuilderOptions } from '.';

interface QueryBuilderChainOptions extends QueryBuilderOptions {
  shouldChain?: boolean;
}

interface CustomQueryOptions {
  newLine: boolean;
}

/**
 * Abstraction of ininitializing a new QueryBuilderChain instance.
 * @param this
 * @param query
 * @returns QueryBuilderChain
 */
export function chain(this: QueryBuilder | QueryBuilderChain, query: string) {
  return new QueryBuilderChain(
    this instanceof QueryBuilderChain ? this._query : '', // Save the previous query or create a fresh one.
    this.connection,
    {
      logQuery: this.logQuery, // Either use the 'logQuery' flag from previous QueryBuilderChain instance or get it from the QueryBuilder instance.
    }
  ).custom(query); // Add the new query and format it.
}

export class QueryBuilderChain extends QueryBuilder {
  #query: string;
  #shouldChain: boolean;
  declare readonly logQuery: LogQuery;

  constructor(
    startingQuery: string = '',
    connection: string | Connection,
    options?: QueryBuilderChainOptions
  ) {
    super(connection, { logQuery: options?.logQuery });

    this.#query = startingQuery;
    this.#shouldChain = Boolean(options?.logQuery);
  }

  /**
   * Adds custom queries to the current query. Necessary method for modifying the query along the chain.
   * @param query
   * @returns An object that facilitates method chaining on QueryBuilder methods.
   */
  custom(
    queryString: string,
    { newLine }: CustomQueryOptions = { newLine: true }
  ) {
    this.#query += newLine ? '\n' + queryString : queryString; // Add the custom query.
    this.#query = this.#query.trim(); // Trim whitespace,

    return this;
  }

  async run() {
    this.#query += /.*\;$/.test(this.#query) ? '' : ';';

    if (
      this.logQuery === true ||
      (typeof this.logQuery !== 'boolean' && this.logQuery.run)
    ) {
      log.show();
      log.info('Query ran.');
      log.show(this.#query);
    }

    return await this.connection.query(this.#query.replaceAll('\n', ' '));
  }

  get query(): string {
    if (
      this.logQuery === true ||
      (typeof this.logQuery !== 'boolean' &&
        ((this.logQuery.creation && !this.#shouldChain) ||
          (this.logQuery.partial && this.#shouldChain)))
    ) {
      if (!this.#shouldChain)
        this.#query += /.*\;$/.test(this.#query) ? '' : ';';

      log.show();
      log.info(
        this.#shouldChain ? 'Query created so far:' : 'Completed query:'
      );
      log.show(this.#query);
    }

    return this.#query;
  }

  get _query(): string {
    return this.#query;
  }
}
