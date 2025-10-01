export function Ship(length) {
	const shipLength = length;

	let hit = 0;
	const getHit = () => hit++;
	const showHit = () => { return hit };
	const isSunk = () => hit >= shipLength;

	return { getHit, isSunk, showHit };
}
