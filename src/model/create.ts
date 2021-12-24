import getModelProperties from './getModelProperties';
import { ExtendedModel, Model, Record } from '.';

export default function find(this: Model | any, input: Record) {
  const extendedModel: ExtendedModel = this.constructor;
  this._connection.qB.insert(this._modelName, getModelProperties(input)).run();

  return this.build(input);
}
