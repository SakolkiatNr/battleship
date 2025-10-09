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
	dirBtn.textContent = 'Direction: Horizontal';
	playerBoardDiv.append(dirBtn);


	// que ships
	let ships = player.action.getShips();
	let shipQue = Object.keys(ships).reverse();

	// Player board handler
	playerBoardDiv.addEventListener('click', (e) => {
		if (shipQue.length === 0) return;

		// coordinate
		const row = Number(e.target.dataset.row);
		const col = Number(e.target.dataset.col);

		// ship key
		const ship = shipQue[shipQue.length - 1];
		let placeShipSuccessful = player.action.placeShip(ships[ship], 'horizontal', [row, col]);

		if (placeShipSuccessful) {
			updateBoard(playerBoardDiv, player.action.getBoard());
			playerBoardDiv.append(dirBtn);
			shipQue.pop();
		}

	});

	// AI board handler
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

function placeAiShips(ai) {
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

function attackAI(event, player) {
	const row = event.dataset.row;
	const col = event.dataset.col;
	player.action.wasAttacked([row, col]);
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

function updateBoard(container, board) {
	container.textContent = "";
	container.append(generateBoard(board));
}

function removeBoard(playerContainer, aiContainer) {
	playerContainer.textContent = "";
	aiContainer.textContent = "";
}
