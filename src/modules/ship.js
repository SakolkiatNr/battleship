export function Ship(length) {
	if (typeof length != 'number') {
		throw new TypeError('argument must be number.');
	}

	const shipLength = length;

	let hit = 0;
	const getHit = () => hit++;
	const showHit = () => { return hit };
	const isSunk = () => hit >= shipLength;

	return { getHit, isSunk, showHit };
}
