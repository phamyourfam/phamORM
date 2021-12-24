import { Model } from '.';

export default function reload(this: Model) {
  const extendedModelInstance = new this.__proto__.constructor();
}
