import { DataType } from '../DataType';

import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * @method
 * JS implementation of the Snowflake ID based off of: https://github.com/twitter-archive/snowflake/tree/b3f6a3c6ca8e1b6847baa6ff42bf72201e2c2231
 * @author pham <np@phamyourfam.com>
 */
function generateSnowflakeID() {
	function integerToBinary(integer: number, bits: number = 0): string {
		let binaryString = '';

		(function recursive(integer: number) {
			if (integer <= 1) return (binaryString += integer ?? 1);

			recursive(Math.trunc(integer / 2));
			binaryString += +(integer % 2 !== 0);
		})(integer);

		return binaryString.padStart(bits, '0').slice(0, bits || Infinity);
	}
	/*
  // 41 Bit Timestamp - gives us 69 years, NICE!
  */
	const timestamp = integerToBinary(Date.now(), 41);

	/* An addressID is a numerical representation of the original address with delimiters removed
  and letters converted to their position in the alphabet (a = 0, b = 1, ...). */
	function getAddressId(addressType: string, protocol: string = 'ipv6') {
		const protocolIndex = protocol.toLowerCase() === 'ipv6' ? 0 : 1;
		// An IPv6 address is at index 0 in 'networkInterface' and the value returned from .find().

		return Number(
			Object.values(os.networkInterfaces())
				.find(
					(networkInterface: any) =>
						networkInterface[protocolIndex][addressType] !== '00:00:00:00:00:00'
				)
				[protocolIndex][addressType].replaceAll(':', '')
				.replaceAll('.', '')
				.split('')
				.map((character: string) =>
					isNaN(Number(character)) ? character.charCodeAt(0) - 97 : character
				)
				.join('')
		);
	}
	/*
  // 10 Bit Machine ID - gives us up to 1024 machines.
  Inspired by npm BIG...
  "a unique machine identifier from CPU, memory, and network interface information.."
  */
	let cpuCount = 0;
	let machineId = 0;

	// The identity is based of the hardware, if the hardware were to change, it'd be considered a "different" machine.
	machineId += os.cpus().reduce((totalCPUSpeed, { speed }) => {
		++cpuCount;
		return totalCPUSpeed + speed;
	}, 0);
	machineId += cpuCount;
	machineId += os.totalmem();
	machineId += getAddressId('mac');
	machineId += getAddressId('address');
	const binaryMachineId = machineId.toString(2).slice(0, 10);

	/*
  // 12 Bit Sequence - A per-machine local counter that rolls over every 4096.
  */
	const filePath = path.join(__dirname, '..', '..', 'config', 'default.json');
	const file = require(filePath);
	let counter = Number(file.localCounter || 0);

	file.localCounter = ++counter || 0;
	if (4096 < file.localCounter) {
		file.localCounter = 0;
		counter = 0;
	}

	const sequence = counter.toString(2).padStart(12, '0').slice(0, 12);

	fs.writeFile(filePath, JSON.stringify(file, null, 2), (err: any) => {
		throw Error;
	});

	return parseInt(timestamp + binaryMachineId + sequence, 2);
}

class Snowflake extends DataType {
	constructor() {
		super('SNOWFLAKE', {
			postgres: `VARCHAR(${length})`,
			mysql: `VARCHAR(${length})`,
			mariadb: `VARCHAR(${length})`,
			sqlite: `VARCHAR(${length})`
		});
		this.value = generateSnowflakeID();
	}
}

export function SNOWFLAKE(): Snowflake | String {
	return new Snowflake();
}

// PSEUDOCODE
// import os
// function getAddressId(addressType, protocol):
// addressString = os.getNetworkData()[protocol][addressType]
