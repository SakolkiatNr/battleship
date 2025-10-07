import { createPlayer } from "./playerNameInput.js";
import { generateBoard } from "./renderBoard.js";

export function newGame() {
	const playerBoardDiv = document.getElementById('player-board');
	const aiBoardDiv = document.getElementById('ai-board');

	// create players
	const player = createPlayer('Steve');
	const ai = createPlayer('Enemy');

	// place ships 
	playerBoardDiv.append(placePlayerShips(player));
	aiBoardDiv.append(placeAiShips(ai));

	aiBoardDiv.addEventListener('click', (e) => {

		// attack AI
		clickHandler(e.target, ai);
		console.log(ai.action.CheckSink);
		updateBoard(aiBoardDiv, ai.action.getBoard());

		// updateBoard(playerBoardDiv, player.action.getBoard());
	});
}

// player1
function placePlayerShips(player) {
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
function placeAiShips(ai) {
	const aiShips = ai.action.getShips();

	ai.action.placeShip(aiShips.carrier, 'horizontal', [0, 0]);
	ai.action.placeShip(aiShips.battleship, 'vertical', [2, 1]);
	ai.action.placeShip(aiShips.destroyer, 'horizontal', [8, 2]);
	ai.action.placeShip(aiShips.submarine, 'vertical', [3, 5]);
	ai.action.placeShip(aiShips.patrolBoat, 'horizontal', [7, 8]);

	const aiBoard = generateBoard(ai.action.getBoard());
	return aiBoard;
}


function clickHandler(event, player) {
	const row = event.dataset.row;
	const col = event.dataset.col;
	player.action.wasAttacked([row, col]);
}

function updateBoard(container, board) {
	container.textContent = "";
	container.append(generateBoard(board));
}
