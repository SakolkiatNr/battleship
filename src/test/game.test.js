// import { types } from "@babel/core";
// import { RuleTester } from "eslint";
import {
	oceanGrid,
	placeVerticalShip, placeHorizontalShip,
	checkHorizontal, checkVertical,
	receiveAttack,
	checkAllSink,

} from "../modules/game.js";
import { Ship } from "../modules/ship.js";

describe('Generate board', () => {
	const FIELD_SIZE = 10;
	let grid = oceanGrid();

	test('Returns a 10x10 array', () => {
		expect(grid.length).toBe(FIELD_SIZE);
		grid.forEach(row => expect(row.length).toBe(FIELD_SIZE));
	});

	test('All cells are null', () => {
		grid.forEach(row => {
			row.forEach(cell => expect(cell).toBe(null));
		});
	});

	test('Return type is array of array', () => {
		const grid = oceanGrid();
		expect(Array.isArray(grid)).toBe(true);

		grid.forEach(row =>
			expect(Array.isArray(row)).toBe(true));
	});
});

describe('Place ship', () => {
	let board = oceanGrid();
	const ship = { id: 'A', length: 3 }

	// reset board for each test
	beforeEach(() => {
		board = oceanGrid();
	})

	describe('Horizontally', () => {

		test('checkHorizontal return false if not empty', () => {
			expect(checkHorizontal(board, [0, 0], ship.length)).toBe(true);
			placeHorizontalShip(board, [0, 0], ship);
			expect(checkHorizontal(board, [0, 1], ship.length)).toBe(false);
		});
		test('place ship if space is empty', () => {
			placeHorizontalShip(board, [0, 0], ship);
			expect(board[0][0]).toBe('A');
			expect(board[0][1]).toBe('A');
			expect(board[0][2]).toBe('A');
		});
	});

	describe('Vertically', () => {
		test('check vertical return false if not empty', () => {
			expect(checkVertical(board, [0, 0], ship.length)).toBe(true);
			placeVerticalShip(board, [0, 0], ship);
			expect(checkVertical(board, [1, 0], ship.length)).toBe(false);
		});
		test('place ship if space is empty', () => {
			placeVerticalShip(board, [0, 0], ship);
			expect(board[0][0]).toBe('A');
			expect(board[1][0]).toBe('A');
			expect(board[2][0]).toBe('A');
		});
	});
});

describe('RecieveAttack', () => {
	let board, ships;
	const MISSED_ATTACK = 0;
	const MARKED = 1;
	beforeEach(() => {
		board = oceanGrid();
		ships = {
			ship1: Ship(2),
			ship2: Ship(3),
		}
	});

	test('when cell is empty mark 0', () => {
		receiveAttack(board, [0, 0], ships);
		expect(board[0][0]).toBe(MISSED_ATTACK);

		// hit again
		receiveAttack(board, [0, 0], ships);
		expect(board[0][0]).toBe(MISSED_ATTACK);
	});

	test('when cell have a ship mark 1', () => {
		placeHorizontalShip(board, [0, 0], ships.ship1);
		receiveAttack(board, [0, 0], ships);
		expect(board[0][0]).toBe(MARKED);
		expect(ships.ship1.showHit).toBe(MARKED);

		// hit again
		receiveAttack(board, [0, 0], ships);
		expect(ships.ship1.showHit).toBe(MARKED);
	});
});

describe('Check whether all ships are sunk', () => {
	let ships;
	beforeEach(() => {
		ships = {
			ship1: Ship(1),
			ship2: Ship(1)
		}
	});

	test('return false when some ships remain', () => {
		expect(checkAllSink(ships)).toBe(false);
		ships.ship1.getHit();
		expect(checkAllSink(ships)).toBe(false);
	});

	test('return true when all ships are sunk', () => {
		ships.ship1.getHit();
		ships.ship2.getHit();
		expect(checkAllSink(ships)).toBe(true);
	});

	test('return true when no ships exists', () => {
		ships = {};
		expect(checkAllSink(ships)).toBe(true);
	});
});
