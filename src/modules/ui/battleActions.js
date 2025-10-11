import { attackAI } from "../game/ai.js";
import { attackPlayer } from "../game/ai.js";
import { reportAttackStatus } from "./battleLog.js";


export function playerAttack(e, player, ai) {
	const cell = e.target.closest('button');

	if (!cell || !cell.dataset.row || !cell.dataset.col) return;
	if (cell.dataset.val === '0' || cell.dataset.val === '1') return;

	const hit = attackAI(cell, ai);
	hit
		? reportAttackStatus('playerHit', player.name, ai.name)
		: reportAttackStatus('playerMiss', player.name, ai.name);

	return true;
}

export function aiAttack(ai, player) {

	return new Promise(resolve => {
		const hit = attackPlayer(player);

		setTimeout(() => {
			hit
				? reportAttackStatus('enemyHit', ai.name, player.name)
				: reportAttackStatus('enemyMiss', ai.name, player.name);

			resolve();
		}, 800);
	});
}
