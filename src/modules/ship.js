export function Ship(length) {
	validateInput(length);

	const shipLength = length;
	const shipId = crypto.randomUUID();

	let hit = 0;
	const getHit = () => hit++;
	const isSunk = () => hit >= shipLength;

	return {
		getHit, isSunk,
		get showHit() { return hit },
		get getId() { return shipId },
		get getLength() { return shipLength }
	};
}

function validateInput(input) {
	if (typeof input != 'number') {
		throw new TypeError('argument must be number.');
	}

	if (!Number.isInteger(input)) {
		throw new Error('argument must be integer');
	}

	if (input < 1) {
		throw new Error('argument must more than 0');
	}
}
