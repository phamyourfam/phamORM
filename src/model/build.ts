import { Record } from '.';

export default function build(input: Record) {
  // @ts-ignore This expression is not constructable...
  const record = new this.prototype.constructor(input);
  record._settings = { new: true };
  return record;
}
