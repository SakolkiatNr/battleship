import { Player } from "./player.js";

export function createPlayer(name) {
	return Player(name);
}

function createAI() {
	const name = "Enemy";
	return Player(name);
}
