export function Ship(length) {
	if (typeof length != 'number') {
		throw new TypeError('argument must be number.');
	}

	if (!Number.isInteger(length)) {
		throw new Error('argument must be integer');
	}

	if (length < 1) {
		throw new Error('argument must more than 0');
	}

	const shipLength = length;

	let hit = 0;
	const getHit = () => hit++;
	const showHit = () => { return hit };
	const isSunk = () => hit >= shipLength;

	return { getHit, isSunk, showHit };
}
