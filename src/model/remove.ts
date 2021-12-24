import { Model } from '.';

export default function remove(this: Model) {
  this._settings = { delete: true };
}
