function Ship(length) {
	const shipLength = length;

	let hit = 0;
	const getHit = () => hit++;
	const isSunk = () => {
		if (hit >= shipLength) return true;
		return false;
	}
	const showHit = () => { return hit };


	return { getHit, isSunk, showHit };
}
