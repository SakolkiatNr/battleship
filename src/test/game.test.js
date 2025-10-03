// import { types } from "@babel/core";
import { oceanGrid, placeVerticalShip, placeHorizontalShip, checkHorizontal, checkVertical } from "../modules/game.js";
// import { oceanGrid } from "../modules/game.js";

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
	describe('Horizontally', () => {
		test('checkHorizontal return false if not empty', () => {
			const board = oceanGrid();
			const ship = { id: 'A', length: 3 }

			placeHorizontalShip(board, [0, 0], ship);

			expect(checkHorizontal(board, [0, 0], ship.length)).toBe(false);
			expect(checkHorizontal(board, [0, 1], ship.length)).toBe(false);
		});
		test('place ship if space is empty', () => {
			const board = oceanGrid();
			const ship = { id: 'A', length: 3 }

			placeHorizontalShip(board, [0, 0], ship);
			expect(board[0][0]).toBe('A');
			expect(board[0][1]).toBe('A');
			expect(board[0][2]).toBe('A');
		});
	});

	describe('Vertically', () => {
		const board = oceanGrid();
		const ship = { id: 'A', length: 3 }
		placeVerticalShip(board, [0, 0], ship);

		test('check vertical return false if not empty', () => {
			expect(checkVertical(board, [0, 0], ship.length)).toBe(false);
			expect(checkVertical(board, [1, 0], ship.length)).toBe(false);
		});
		test('place ship if space is empty', () => {
			expect(board[0][0]).toBe('A');
			expect(board[1][0]).toBe('A');
			expect(board[2][0]).toBe('A');
		});

	});



});
