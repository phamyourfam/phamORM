import getModelProperties from './getModelProperties';
import { Model, SearchOptions } from '.';

export default async function find(
  this: Model | any,
  columns: string | string[],
  { table = this.modelName, where }: SearchOptions
) {
  const records = await this.connection.qB
    .select(columns, table)
    .where(where)
    .run();

  return records.map((record: any) => {
    record._settings = { update: true };
    return getModelProperties(new this.prototype.constructor(record));
  });
}
