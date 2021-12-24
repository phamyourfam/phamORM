import log from 'log-beautify';
import { Client, Pool } from 'pg';

import { ConnectionOptions } from './ConnectionManager';

export default function createPostgresConnection({
  uri,
  host,
  port,
  user,
  password,
  database,
  pool,
}: ConnectionOptions) {
  const choice = uri
    ? { connectionString: uri }
    : {
        user,
        host,
        database,
        password,
        port,
      };

  const sqlClientResponse = pool ? new Pool(choice) : new Client(choice);

  sqlClientResponse.connect((err: Error) => {
    if (err) {
      log.error_(
        `Cannot connect to ${"'" + database + "'" || ''} Postgres database.`
      );
      log.show(err);
    }
  });

  return {
    ...sqlClientResponse,
    async query(this: Pool | Client, query: string) {
      try {
        const res = await sqlClientResponse.query(query);
        return res.rows;
      } catch (err) {
        log.error_('Something went wrong when querying.');
        log.show(err);
      }
    },
  };
}
