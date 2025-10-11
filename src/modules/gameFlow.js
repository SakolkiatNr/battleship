//TODO
// use Async await

import { Player } from "./game/player.js";
import { previewPlacement } from "./ui/previewPlacement.js";
import { placeAiShips, attackAI, attackPlayer } from "./game/ai.js";
import { generateBoard, generateAiBoard, updateBoard, updateAiBoard, removeBoard } from "./ui/renderBoard.js";
import { showResult } from "./ui/showResultDialog.js";
import { statusBar } from "./ui/showStatus.js";
import { getPlayerName } from "./game/playerNameInput.js";
import { reportAttackStatus } from "./ui/battleLog.js";

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
		if (!isPlayerTurn) return;
		isPlayerTurn = false;

		const didAttack = await playerAttack(e, player, ai);
		if (!didAttack) {
			isPlayerTurn = true;
			return;
		}

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

async function playerAttack(e, player, ai) {
	const cell = e.target.closest('button');
	if (!cell || !cell.dataset.row || !cell.dataset.col) return;

	// if attack marked spot
	if (cell.dataset.val === '0' || cell.dataset.val === '1') return;

	const hit = attackAI(cell, ai);

	// battle log
	if (hit) {
		await reportAttackStatus('playerHit', player.name, ai.name, 0);
	} else {
		await reportAttackStatus('playerMiss', player.name, ai.name, 0);
	}

	return true;
}

async function aiAttack(ai, player) {
	const hit = attackPlayer(player);
	// Ai strike back!!!
	if (hit) {
		await reportAttackStatus('enemyHit', ai.name, player.name, 800);
	} else {
		await reportAttackStatus('enemyMiss', ai.name, player.name, 800);
	}
} 
