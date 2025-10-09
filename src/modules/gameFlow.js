//TODO
// player place ship
// drag and drop??
// FIX: when click enemy board and release show error!

import { createPlayer } from "./playerNameInput.js";
import { generateBoard } from "./renderBoard.js";

export function newGame() {
	// board containers
	const playerBoardDiv = document.getElementById('player-board');
	const aiBoardDiv = document.getElementById('ai-board');

	// create players
	const player = createPlayer('Steve');
	const ai = createPlayer('Enemy');

	// place ships 
	// placePlayerShips(player);
	placeAiShips(ai);


	// generate board 
	const playerBoard = player.action.getBoard();
	const aiBoard = ai.action.getBoard();
	aiBoardDiv.append(generateBoard(aiBoard));

	// show board
	playerBoardDiv.append(generateBoard(playerBoard));


	// direction button
	const dirBtn = document.createElement('button');
	dirBtn.textContent = 'Direction';
	playerBoardDiv.append(dirBtn);

	// que ships
	let ships = player.action.getShips();
	let shipQue = Object.keys(ships).reverse();

	playerBoardDiv.addEventListener('click', (e) => {
		if (shipQue.length === 0) return;

		// coordinate
		const row = Number(e.target.dataset.row);
		const col = Number(e.target.dataset.col);

		// ship key
		const ship = shipQue[shipQue.length - 1];
		if (player.action.placeShip(ships[ship], 'horizontal', [row, col])) {
			shipQue.pop();
		}

		updateBoard(playerBoardDiv, player.action.getBoard());
	});






	aiBoardDiv.addEventListener('click', (e) => {
		// if attack marked spot
		if (e.target.dataset.val === '0' ||
			e.target.dataset.val === '1') return;

		attackAI(e.target, ai);
		updateBoard(aiBoardDiv, ai.action.getBoard());

		// if all of the Ai ship sinks
		if (ai.action.CheckSink) {
			alert('you win bro')
			// restart 

			removeBoard(playerBoardDiv, aiBoardDiv);
			newGame();
			return;
		}

		// Ai strike back!!!
		attackPlayer(player);
		updateBoard(playerBoardDiv, player.action.getBoard());

		if (player.action.CheckSink) {
			alert('you lose bro!');
			// restart

			removeBoard(playerBoardDiv, aiBoardDiv);
			newGame();
			return;
		}
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
}

// bot
function placeAiShips(ai) {
	const aiShips = ai.action.getShips();

	ai.action.placeShip(aiShips.carrier, 'horizontal', [0, 0]);
	ai.action.placeShip(aiShips.battleship, 'vertical', [2, 1]);
	ai.action.placeShip(aiShips.destroyer, 'horizontal', [8, 2]);
	ai.action.placeShip(aiShips.submarine, 'vertical', [3, 5]);
	ai.action.placeShip(aiShips.patrolBoat, 'horizontal', [7, 8]);
}

function attackAI(event, player) {
	const row = event.dataset.row;
	const col = event.dataset.col;
	player.action.wasAttacked([row, col]);
}

function updateBoard(container, board) {
	container.textContent = "";
	container.append(generateBoard(board));
}

function attackPlayer(player) {
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

	player.action.wasAttacked([row, col]);
}

function removeBoard(playerContainer, aiContainer) {
	playerContainer.textContent = "";
	aiContainer.textContent = "";
}
