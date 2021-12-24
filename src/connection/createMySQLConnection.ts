import {createConnection, createPool} from "mysql2";

import {Connection, ConnectionOptions} from "./ConnectionManager";

export default function createPostgresConnection({uri, host, port, user, database, pool}: ConnectionOptions) {
  const choice = uri
    ? {uri}
    : {
        user,
        host,
        database,
        port
      };

  return pool ? createPool(choice) : createConnection(choice);
}
