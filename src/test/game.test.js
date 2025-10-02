// import { types } from "@babel/core";
import { oceanGrid } from "../modules/game.js";

describe('Generate board', () => {
	const FIELD_SIZE = 10;
	let grid = oceanGrid();

	test('Returns a 10x10 array', () => {
		expect(grid.length).toBe(10);
		grid.forEach(row => expect(row.length).toBe(10));
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
