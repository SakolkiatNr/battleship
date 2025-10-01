export function Ship(length) {
	const shipLength = length;

	let hit = 0;
	const getHit = () => hit++;
	const showHit = () => { return hit };
	const isSunk = () => {
		if (hit >= shipLength) return true;
		return false;
	}

	return { getHit, isSunk, showHit };
}
