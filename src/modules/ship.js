export function Ship(length) {
	validateInput(length);

	const shipLength = length;
	const shipId = crypto.randomUUID();
	const getId = () => { return shipId };

	let hit = 0;
	const getHit = () => hit++;
	const showHit = () => { return hit };
	const isSunk = () => hit >= shipLength;

	return { getHit, showHit, isSunk, getId };
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
