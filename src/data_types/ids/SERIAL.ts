import { DataType } from '../DataType';

class Serial extends DataType {
  constructor() {
    const DEFAULT = 'SERIAL';

    super('SERIAL', {
      DEFAULT,
      postgres: DEFAULT,
      mysql: 'INT NOT NULL AUTO_INCREMENT',
      mariadb: 'INT NOT NULL AUTO_INCREMENT',
      sqlite: 'INTEGER AUTOINCREMENT NOT NULL',
    });
  }
}

export const SERIAL = new Serial();
