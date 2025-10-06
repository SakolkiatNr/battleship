import { Player } from "../modules/player.js";


describe('Player', () => {
	let player;

	beforeEach(() => {
		player = Player('lmao');
	});

	describe('have property', () => {
		test('return property', () => {
			expect(player.name).toBe('lmao');
			expect(player).toHaveProperty('action');
			expect(player.action).toHaveProperty('placeShip');
			expect(player.action).toHaveProperty('wasAttacked');
		});
	});

	describe('Player gameplay', () => {
		test('can place ship on the board', () => {
			const ship = { id: 1, length: 3 };
			player.action.placeShip(ship, 'horizontal', [0, 0]);
			expect(player.action.getBoard[0][0]).toBe(1);
		});

		test('can be attacked', () => {
			player.action.wasAttacked([0, 0]);
			expect(player.action.getBoard[0][0]).toBe(0);
		});
	});
});
