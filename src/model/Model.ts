import build from './build';
import create from './create';
import find from './find';
import findByPk from './findByPk';
import reload from './reload';
import remove from './remove';
import save from './save';
import softDelete, { SoftDeleteOptions } from './softDelete';
import softRemove from './softRemove';
import { Column, Connection } from '../..';

const defaultModelSettings = Object.freeze({
  new: false,
  update: false,
  softDelete: false,
  delete: false,
});

export interface Record {
  [attribuite: string]: string | number | boolean | bigint;
}

export interface ExtendedModel extends Function {
  modelName?: string;
  connection?: Connection;
  _columns?: Column[];
}

export abstract class Model {
  static readonly modelName: string;
  static readonly connection: Connection;
  static readonly _columns: Column[];

  #settings: {
    new?: boolean;
    update?: boolean;
    softDelete?: boolean | SoftDeleteOptions;
    delete?: boolean;
  } = defaultModelSettings;
  [attribuite: string]: any;

  constructor() {
    this._settings = { new: true };
  }

  static build = build;

  static create = create;

  static find = find;

  static findByPk = findByPk;

  reload = reload;

  remove = remove;

  save = save;

  softDelete = softDelete;

  softRemove = softRemove;

  delete() {
    this.connection.qB.delete(this.modelName).run();
  }

  get _settings() {
    return this.#settings;
  }

  set _settings(newSettings) {
    this.#settings = { ...defaultModelSettings, ...newSettings };
  }
}
