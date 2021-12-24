import crypto from 'crypto';
import log from 'log-beautify';

import createPostgresConnection from './createPostgresConnection';
import createMySQLConnection from './createMySQLConnection';
import { QueryBuilder } from '../..';

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

interface sslOptions {
  ca: string;
  key: string;
  cert: string;
}

interface commonOptions {
  name?: string;
}

interface classicOptions extends commonOptions {
  databaseType: string;
  host: string;
  port?: number;
  user: string;
  password?: string;
  database?: string;
  ssl?: boolean | sslOptions;
  uri?: string;
  pool?: boolean;
}

interface uriOptions extends commonOptions {
  uri: string;
}

export type ConnectionOptions = XOR<classicOptions, uriOptions>;

/**
 * Data, including the ORM's metadata and that of the respective SQL client's, about a connection to the database.
 */
export interface Connection {
  name: string;
  databaseType: string;
  query(query: string): any;
  /**
   * Instance of a helper class that creates queries via. method calls. 1 connection has 1 instance of QueryBuilder only.
   */
  qB: QueryBuilder;
  [key: string]: any;
}

interface ConnectionsStore {
  [name: string]: Connection;
}

export abstract class ConnectionManager {
  static #connectionsStore: ConnectionsStore = {};

  /**
   * Static method to establish (multiple) connections to a database and/or a connection pool.
   * @param connectionOptions
   * @returns Promise
   */
  static createConnection(...connectionOptions: ConnectionOptions[]) {
    for (const connectionOption of connectionOptions) {
      const {
        uri,
        name = crypto.randomBytes(4).toString('hex'), // Generate the connection's name if no name's provided.
        databaseType = uri?.match(/.+?(?=[^a-zA-Z])/)?.[0] ?? 'postgres', // Get the database type from the connection URI if not specified.
        host = 'localhost',
        port = 5432,
        user = 'postgres',
        password = 'password',
        database = name, // Equivalent to the connection name if the database isn't provided.
        pool = false,
      } = connectionOption;

      let sqlClientResponse = {};

      switch (databaseType?.toLowerCase()) {
        case 'mysql':
          sqlClientResponse = createMySQLConnection({
            uri,
            databaseType,
            host,
            port,
            user,
            database,
            pool,
          });
          break;

        case 'postgres':
          sqlClientResponse = createPostgresConnection({
            uri,
            databaseType,
            host,
            port,
            user,
            password,
            database,
            pool,
          });
          break;

        default:
          log.error(`'${databaseType}' is not a recognised type of database.`);
      }

      const connection: Connection = {
        name,
        async query(query: string) {
          // Placeholder for the real query method.
        },
        qB: new QueryBuilder(name),
        databaseType,
        ...sqlClientResponse,
      };

      connection.qB.connection = connection;
      ConnectionManager.#connectionsStore[name] = connection;

      log.success_(
        `Sucessfully connected to the  '${database}' ${
          databaseType[0].toUpperCase() + databaseType.slice(1)
        } database.`
      );
    }

    return ConnectionManager.#connectionsStore;
  }

  /**
   * Static getter method to return a specific connection if its name is provided or an object with every connection included.
   * @param name
   * @returns object
   */
  public static getConnection(name: string) {
    return ConnectionManager.#connectionsStore[name];
  }

  /**
   * Get index of every connection made, including the connections themselves.
   */
  public static get connections() {
    return ConnectionManager.#connectionsStore;
  }
}
