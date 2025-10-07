import { createPlayer } from "./playerNameInput.js";
import { generateBoard } from "./renderBoard.js";

// player1
function placePlayerShips() {
	const player = createPlayer('Steve');
	let playerShips = player.action.getShips();

	player.action.placeShip(playerShips.carrier, 'horizontal', [1, 3]);
	player.action.placeShip(playerShips.battleship, 'vertical', [2, 0]);
	player.action.placeShip(playerShips.destroyer, 'horizontal', [3, 2]);
	player.action.placeShip(playerShips.submarine, 'horizontal', [5, 2]);
	player.action.placeShip(playerShips.patrolBoat, 'vertical', [7, 6]);

	const playerBoard = generateBoard(player.action.getBoard());

	return playerBoard;
}

// bot
function placeAiShips() {
	const ai = createPlayer('aislop');
	const aiShips = ai.action.getShips();

	ai.action.placeShip(aiShips.carrier, 'horizontal', [0, 0]);
	ai.action.placeShip(aiShips.battleship, 'vertical', [2, 1]);
	ai.action.placeShip(aiShips.destroyer, 'horizontal', [8, 2]);
	ai.action.placeShip(aiShips.submarine, 'vertical', [3, 5]);
	ai.action.placeShip(aiShips.patrolBoat, 'horizontal', [7, 8]);

	const aiBoard = generateBoard(ai.action.getBoard());
	return aiBoard;
}

export function newGame() {
	const playerBoardDiv = document.getElementById('player-board');
	const aiBoardDiv = document.getElementById('ai-board');

	playerBoardDiv.append(placePlayerShips());
	aiBoardDiv.append(placeAiShips());
}
