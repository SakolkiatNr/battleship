import { Ship } from "./ship.js";

export function createShips() {
	const carrier = Ship(5);
	const battleship = Ship(4);
	const destroyer = Ship(3);
	const submarine = Ship(3);
	const patrolBoat = Ship(2);

	return { carrier, battleship, destroyer, submarine, patrolBoat };
}
