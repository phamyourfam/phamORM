import { DataType } from '../DataType';

class Date extends DataType {
  constructor() {
    const DEFAULT = 'DATE';

    super('DATE', {
      postgres: DEFAULT,
      mysql: DEFAULT,
      mariadb: DEFAULT,
      sqlite: DEFAULT,
    });
  }
}

export const DATE = new Date();
