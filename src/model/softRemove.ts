import { Model } from '.';
import { SoftDeleteOptions } from './softDelete';

export default function softDelete(this: Model, options?: SoftDeleteOptions) {
  this._settings = { softDelete: options || true };
}
