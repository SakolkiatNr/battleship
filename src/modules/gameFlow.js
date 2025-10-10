//TODO
// hide enemy display
// show winner dialog
// FIX: when click enemy board and release show error!

import { Player } from "./game/player.js";
import { previewPlacement } from "./ui/previewPlacement.js";
import { placeAiShips, attackAI, attackPlayer } from "./game/ai.js";
import { generateBoard, updateBoard, removeBoard } from "./ui/renderBoard.js";
import { playerBoardHandler } from "./ui/playerBoardHandler.js";


export function newGame() {
	const playerBoardDiv = document.getElementById('player-board');
	const aiBoardDiv = document.getElementById('ai-board');

	const player = Player('Steve');
	const ai = Player('Enemy');

	placeAiShips(ai);

	// aiBoardDiv.append(generateBoard(ai.action.getBoard()));
	playerBoardDiv.append(generateBoard(player.action.getBoard()));

	let direction = 'horizontal';
	const dirBtn = document.createElement('button');
	dirBtn.textContent = 'Direction: Horizontal';
	playerBoardDiv.append(dirBtn);

	dirBtn.addEventListener('click', () => {
		direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
		dirBtn.textContent = `Direction: ${direction[0].toUpperCase() + direction.slice(1)}`;
	});

	// que ships
	const ships = player.action.getShips();
	let shipQue = Object.keys(ships).reverse();
	let iniLength = ships[shipQue[shipQue.length - 1]].length;

	let preview = previewPlacement(playerBoardDiv, iniLength, direction);

	const reloadPreview = () => {
		preview.removeListener();
		preview = previewPlacement(playerBoardDiv, iniLength, direction);
		preview.addListener();
	}
	reloadPreview();


	// Player board handler
	playerBoardDiv.addEventListener('click', (e) => {
		if (shipQue.length === 0) return;

		// coordinate
		const row = Number(e.target.dataset.row);
		const col = Number(e.target.dataset.col);

		const shipKey = shipQue[shipQue.length - 1];
		const placeShipSuccessful = player.action.placeShip(
			ships[shipKey],
			direction,
			[row, col]);

		reloadPreview();

		if (placeShipSuccessful) {
			updateBoard(playerBoardDiv, player.action.getBoard());
			shipQue.pop();

			if (shipQue.length === 0) {
				preview.removeListener();
				aiBoardDiv.append(generateBoard(ai.action.getBoard()));
				return;
			}
			playerBoardDiv.append(dirBtn);

			// preview next ship
			iniLength = ships[shipQue[shipQue.length - 1]].length;
			reloadPreview();
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
