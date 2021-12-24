import { DataType } from '../DataType';

class Text extends DataType {
	constructor() {
		super('TEXT', {
			postgres: 'TEXT',
			mysql: 'TEXT',
			mariadb: 'TEXT',
			sqlite: 'TEXT'
		});
	}
}

export function TEXT(): Text | String {
	return new Text();
}
