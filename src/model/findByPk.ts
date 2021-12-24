import getModelProperties from './getModelProperties';
import { Model, Record, SearchOptions } from '.';

export default async function findByPk(
  this: Model | any,
  id: string | number,
  options?: SearchOptions
) {
  const primaryKey = this._columns.find(
    (record: Record) => record.isPrimaryKey
  ).name;

  const [record] = await this.connection.qB
    .select('*', options?.table || this.modelName)
    .where({ [primaryKey]: id })
    .run();

  record._settings = { update: true };

  return getModelProperties(new this.prototype.constructor(record));
}
