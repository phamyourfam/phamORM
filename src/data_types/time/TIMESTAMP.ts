import { DataType } from '../DataType';

class Timestamp extends DataType {
  constructor() {
    const DEFAULT = 'TIMESTAMP';

    super('TIMESTAMP', {
      postgres: DEFAULT,
      mysql: DEFAULT,
      mariadb: DEFAULT,
      sqlite: DEFAULT,
    });
  }
}

export const TIMESTAMP = new Timestamp();
