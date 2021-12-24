import { DataType } from '../DataType';

class Float extends DataType {
	constructor() {
		super('FLOAT', {
			postgres: 'FLOAT',
			mysql: 'FLOAT',
			mariadb: 'FLOAT',
			sqlite: 'FLOAT'
		});
	}
}

export const FLOAT = new Float();
