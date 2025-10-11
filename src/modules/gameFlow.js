//TODO
// use Async await

import { Player } from "./game/player.js";
import { previewPlacement } from "./ui/previewPlacement.js";
import { placeAiShips } from "./game/ai.js";
import { generateBoard, generateAiBoard, updateBoard, updateAiBoard, removeBoard } from "./ui/renderBoard.js";
import { showResult } from "./ui/showResultDialog.js";
import { statusBar } from "./ui/showStatus.js";
import { getPlayerName } from "./game/playerNameInput.js";
import { aiAttack, playerAttack } from "./ui/battleActions.js";


export function newGame() {
	const oldPlayerBoardDiv = document.getElementById('player-board');
	const oldAiBoardDiv = document.getElementById('ai-board');

	// remove old event listener when start a new game
	const playerBoardDiv = oldPlayerBoardDiv.cloneNode();
	const aiBoardDiv = oldAiBoardDiv.cloneNode();
	oldPlayerBoardDiv.replaceWith(playerBoardDiv);
	oldAiBoardDiv.replaceWith(aiBoardDiv);

	const player = Player(getPlayerName());
	const ai = Player('Enemy');

	placeAiShips(ai);

	playerBoardDiv.append(generateBoard(player.action.getBoard()));

	let direction = 'horizontal';
	const dirBtn = document.createElement('button');
	dirBtn.textContent = 'Direction: Horizontal';
	dirBtn.classList.add('direction-btn');
	playerBoardDiv.append(dirBtn);

	dirBtn.addEventListener('click', () => {
		direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
		dirBtn.textContent = `Direction: ${direction[0].toUpperCase() + direction.slice(1)}`;
	});

	// que ships
	const ships = player.action.getShips();
	let shipQue = Object.keys(ships).reverse();
	let iniLength = ships[shipQue[shipQue.length - 1]].length;

	// Preview placement
	let preview = previewPlacement(playerBoardDiv, iniLength, direction);

	// status bar
	let shipName = shipQue[shipQue.length - 1];
	statusBar(shipName);
	// console.log(shipName);

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
				aiBoardDiv.append(generateAiBoard(ai.action.getBoard()));
				statusBar('startGame', player.name);
				return;
			}
			playerBoardDiv.append(dirBtn);

			// preview next ship
			iniLength = ships[shipQue[shipQue.length - 1]].length;
			reloadPreview();

			// update status bar
			let shipName = shipQue[shipQue.length - 1];
			statusBar(shipName);
		}
	});



	let isPlayerTurn = true;
	aiBoardDiv.addEventListener('click', async (e) => {
		// prevent click spamming when turn not complete
		if (!isPlayerTurn) return;
		isPlayerTurn = false;

		const didAttack = playerAttack(e, player, ai);
		if (!didAttack) return;

		updateAiBoard(aiBoardDiv, ai.action.getBoard());

		// if all of the Ai ship sinks
		if (ai.action.CheckSink) {
			showResult(newGame, true);
			removeBoard(playerBoardDiv, aiBoardDiv);
			return;
		}

		await aiAttack(ai, player);
		updateBoard(playerBoardDiv, player.action.getBoard());

		if (player.action.CheckSink) {
			showResult(newGame, false);
			removeBoard(playerBoardDiv, aiBoardDiv);
			return;
		}

		isPlayerTurn = true;
	});
}
