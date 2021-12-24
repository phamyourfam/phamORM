import { DataType } from '../DataType';

class Uuid extends DataType {
  constructor() {
    const DEFAULT = 'UUID';

    super('UUID', {
      DEFAULT,
      postgres: DEFAULT,
      mysql: 'CHAR(36) BINARY',
      mariadb: 'VARCHAR(36) NOT NULL',
      sqlite: 'VARCHAR',
    });
  }
}

export function UUID(): Uuid | String {
  return new Uuid();
}
