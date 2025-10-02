// import { types } from "@babel/core";
import { oceanGrid } from "../modules/game.js";

describe('Generate board', () => {
	const FIELD_SIZE = 10;
	test('Each column has correct length', () => {
		expect(oceanGrid().length).toBe(FIELD_SIZE);
	});

	test('Each row has correct length', () => {
		expect(oceanGrid()[0].length).toBe(FIELD_SIZE);
		expect(oceanGrid()[5].length).toBe(FIELD_SIZE);
		expect(oceanGrid()[9].length).toBe(FIELD_SIZE);
	});

	test('All cells are null', () => {
		expect(oceanGrid()[0].every(value => value === null)).toBe(true);
		expect(oceanGrid()[5].every(value => value === null)).toBe(true);
		expect(oceanGrid()[9].every(value => value === null)).toBe(true);
	});

	test('Return type is array of array', () => {
		const grid = oceanGrid();
		expect(Array.isArray(grid)).toBe(true);

		grid.forEach(row =>
			expect(Array.isArray(row))
				.toBe(true));
	});
});
