import { Player } from "./player.js";
// player input
// store in variables


export function createPlayer(name) {
	// const input = document.getElementById('player-name');

	return Player(name);
}

function createAI() {
	const name = "Enemy";
	return Player(name);
}
