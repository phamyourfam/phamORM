import { DataType } from '../DataType';

class ForeignKey extends DataType {
  constructor(
    foreignKeyColumns: string[],
    reference: string,
    referenceColumns: string[] = ['id']
  ) {
    const DEFAULT = `FOREIGN KEY (${foreignKeyColumns
      .map((column) => `"${column}"`)
      .join(', ')}) REFERENCES "${reference}"(${referenceColumns
      .map((column) => `"${column}"`)
      .join(', ')})`;

    super('FOREIGN KEY', {
      DEFAULT,
      postgres: DEFAULT,
      mysql: DEFAULT,
      mariadb: DEFAULT,
      sqlite: DEFAULT,
    });
  }
}

export function FOREIGN_KEY(
  foreignKeyColumns: string[],
  reference: string,
  referenceColumns: string[] = ['id']
): ForeignKey | String {
  return new ForeignKey(foreignKeyColumns, reference, referenceColumns);
}
