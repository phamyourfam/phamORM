import { DataType } from '../DataType';

class Integer extends DataType {
  constructor() {
    const DEFAULT = 'INT';

    super('INTEGER', {
      postgres: DEFAULT,
      mysql: DEFAULT,
      mariadb: DEFAULT,
      sqlite: 'INTEGER',
    });
  }
}

export const INTEGER = new Integer();
