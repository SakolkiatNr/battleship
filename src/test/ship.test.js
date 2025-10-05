import { Ship } from "../modules/ship.js";

describe('Ship factory function', () => {

	describe('Methods', () => {
		test('ship takes hit', () => {
			const ship = Ship(3);
			expect(ship.showHit).toBe(0);

			ship.getHit();
			expect(ship.showHit).toBe(1);
			ship.getHit();
			expect(ship.showHit).toBe(2);
		});

		test('ship sink when hit enough times', () => {
			const ship = Ship(2);

			ship.getHit();
			expect(ship.isSunk).toBe(false);

			ship.getHit();
			expect(ship.isSunk).toBe(true);
		});

	})
	describe('Error handling', () => {
		test('Throw input type error', () => {
			expect(() => Ship('not number')).toThrow();
			expect(() => Ship(true)).toThrow();
			expect(() => Ship(null)).toThrow();
		});

		test('Throw if not integer', () => {
			expect(() => Ship(1.5)).toThrow();
			expect(() => Ship(0)).toThrow();
			expect(() => Ship(-1)).toThrow();
			expect(() => Ship(-1.5)).toThrow();
		});

	});



})
