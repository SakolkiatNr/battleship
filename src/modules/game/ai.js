export function placeAiShips(ai) {
	const aiShips = ai.action.getShips();
	const que = Object.keys(aiShips).reverse();

	const BOARD_SIZE = 10;
	const randomCoord = () => Math.floor(Math.random() * BOARD_SIZE);

	const dir = ['horizontal', 'vertical'];
	const DIRECTIONS = 2;
	const randomPick = () => Math.floor(Math.random() * DIRECTIONS);

	let row = randomCoord();
	let col = randomCoord();

	while (que.length !== 0) {
		let ship = que[que.length - 1];
		let placeShipSucc = ai.action.placeShip(
			aiShips[ship],
			dir[randomPick()],
			[row, col]
		);

		if (placeShipSucc) {
			que.pop();
		}
		row = randomCoord();
		col = randomCoord();
	}
}

export function attackAI(event, player) {
	const row = event.dataset.row;
	const col = event.dataset.col;
	return player.action.wasAttacked([row, col]);
}


export function attackPlayer(player) {
	// ai attack player randomly
	// it's an array so index is between 0 - 9
	const BOARD_SIZE = 10;
	const randomCoord = () => Math.floor(Math.random() * BOARD_SIZE);

	let row = randomCoord();
	let col = randomCoord();
	let cell = player.action.getBoard()[row][col];

	// prevent ai attack the same cell
	while (cell === 1 || cell === 0) {
		row = randomCoord();
		col = randomCoord();
		cell = player.action.getBoard()[row][col];
	}

	return player.action.wasAttacked([row, col]);
}
