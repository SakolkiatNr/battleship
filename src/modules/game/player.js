import { Gameboard } from "./game.js";

export function Player(name) {
	const action = Gameboard();

	return { name, action };
}
