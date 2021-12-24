import { DataType } from '../DataType';

class DateTime extends DataType {
  constructor() {
    const DEFAULT = 'DATETIME';

    super('DATETIME', {
      postgres: new Error('DATETIME is not available with Postgres.'),
      mysql: DEFAULT,
      mariadb: DEFAULT,
      sqlite: DEFAULT,
    });
  }
}

export const DATETIME = new DateTime();
