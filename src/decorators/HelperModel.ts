import { ConnectionManager } from '../..';
import { Model } from '../model';

interface BelongsToOptions {
  name?: string;
  logQuery?: boolean;
}
/**
 * Decorator to create the table in the database, if not already created.
 * @param connectionName
 * @param options
 * @returns A modified subclass of Model.
 */
export function HelperModel(
  connectionName: string,
  options?: BelongsToOptions
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction): TFunction => {
    // @ts-ignore Property '_connection' does not exist on type 'TFunction'.
    if (target._connection) {
      throw new Error('This model already belongs to a connection.');
    }

    const connection = ConnectionManager.getConnection(connectionName);
    connection.qB.logQuery = Boolean(options?.logQuery);

    const newClass = {
      [target.name]: class extends Model {
        static _modelName = options?.name || target.name;
        static _connection = connection;
      },
    }[target.name]; // Technique to dynamically name the new subclass of Entity.

    // @ts-ignore Type 'typeof [target.name]' is not assignable to type 'TFunction'.
    return newClass;
  };
}
