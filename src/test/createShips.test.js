
import { createShips } from "../modules/createShips.js";

describe('Create ship', () => {
	let ships;

	beforeEach(() => {
		ships = createShips();
	});

	describe('Create ships', () => {
		test('contains five ships', () => {
			expect(Object.keys(ships).length).toBe(5);
		});

		test('ship is an object:', () => {
			for (let key in ships) {
				const ship = ships[key];
				expect(ship.showHit).toBe(0);
				expect(ship.isSunk).toBe(false);
				expect(ship).toHaveProperty('showHit');
				expect(ship).toHaveProperty('length');
			}
		});
	});

});
