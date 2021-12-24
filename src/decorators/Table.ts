import { ConnectionManager } from '../..';
import { LogQuery } from '../query_builder';
import { Model, Record } from '../model';

interface TableOptions {
  name?: string; // Specifies the table name. If undefined, the entity name will be used instead.
  engine?: string; // Specifies the table's database engine type (like "InnoDB", "MyISAM", etc). It is only used  during table creation.
  force?: boolean;
  logQuery?: LogQuery;
}

/**
 * Decorator to create the table in the database, if not already created.
 * @param connectionName
 * @param options
 * @returns A modified subclass of Model.
 */
export function Table(
  connectionName: string,
  options?: TableOptions
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    const columns = target.prototype._columns;
    for (const column of columns) {
      if (/^[_]{1}/.test(column.name)) {
        column.isUnique = true;
        column.name = column.name.replace('_', '');
      }

      if (/^[$]{1}/.test(column.name)) {
        column.isNotNull = true;
        column.name = column.name.replace('$', '');
      }
    }
    console.log(columns);

    const connection = ConnectionManager.getConnection(connectionName);
    connection.qB.logQuery = options?.logQuery || false;
    connection.qB
      .createTable(target.name, columns, {
        force: options?.force,
      })
      .run();

    const newClass = {
      [target.name]: class extends Model {
        static readonly modelName = options?.name || target.name;
        static readonly connection = connection;
        static readonly _columns = columns;

        constructor(record?: Record) {
          super();
          if (!record) return;

          for (const [key, value] of Object.entries(
            new target.prototype.constructor()
          )) {
            if (typeof value === 'function') continue;
            this[key] = record[key] || null; // Previously 'value'.
          }
        }
      },
    }[target.name]; // Technique to dynamically name the new subclass of Entity.

    // @ts-ignore Type 'typeof [target.name]' is not assignable to type 'TFunction'.
    return newClass;
  };
}
