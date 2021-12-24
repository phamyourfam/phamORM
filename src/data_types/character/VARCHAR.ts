import { DataType } from '../DataType';

class Varchar extends DataType {
	constructor(length: number) {
		super('VARCHAR', {
			postgres: `VARCHAR(${length})`,
			mysql: `VARCHAR(${length})`,
			mariadb: `VARCHAR(${length})`,
			sqlite: `VARCHAR(${length})`
		});
	}
}

export function VARCHAR(length: number = 255): Varchar | String {
	return new Varchar(length);
}

// An alias for VARCHAR.
export const STRING = VARCHAR;
