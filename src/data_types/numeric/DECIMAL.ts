import { DataType } from '../DataType';

class Decimal extends DataType {
	constructor(precision: number, scale: number) {
		super('DECIMAL', {
			postgres: `DECIMAL(${precision}, ${scale})`,
			mysql: `DECIMAL(${precision}, ${scale})`,
			mariadb: `DECIMAL(${precision}, ${scale})`,
			sqlite: `DECIMAL(${precision}, ${scale})`
		});
	}
}

/*
The precision represents the number of significant digits that are stored for values, 
and the scale represents the number of digits that can be stored following the decimal point.
*/
export function DECIMAL(
	precision: number = 10,
	scale: number = 0
): Decimal | String {
	return new Decimal(precision, scale);
}
