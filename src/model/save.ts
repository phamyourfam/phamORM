import getModelProperties from './getModelProperties';
import { ExtendedModel, Model } from '.';

export default function save(this: Model) {
  const extendedModel: ExtendedModel = this.constructor;
  const queryBuilder = extendedModel?.connection?.qB;

  if (this._settings.new) {
    return queryBuilder
      ?.insert(
        extendedModel.modelName,
        getModelProperties(this, { removeUndefined: false })
      )
      .run();
  }

  if (this._settings.update) {
    return extendedModel?.connection?.qB
      .update(extendedModel.modelName, getModelProperties(this))
      .where({ id: this.id })
      .run();
  }

  if (this._settings.softDelete) {
    return this.softDelete(this._settings.softDelete);
  }

  if (this._settings.delete) {
    return queryBuilder?.delete(this.modelName).run();
  }

  return 'gay';
}
