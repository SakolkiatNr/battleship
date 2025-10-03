import { Ship } from "./ship.js";

function Gameboard() {
	// place ship at specific coordinates by calling ship class
	// receive attack function
	// track missed attacks
	// report if all the ships have sunk

	let board = oceanGrid();
}

export function oceanGrid() {
	const FIELD_SIZE = 10;
	let oceanColumn = Array.from({ length: FIELD_SIZE }, () => []);

	let emptyCell = new Array(FIELD_SIZE).fill(null);
	oceanColumn.forEach(row => row.push(...emptyCell));

	return oceanColumn;
}

function placeHorizontalShip(board, start, ship) {
	const shipID = ship.id;
	const end = ship.length;
	const [row, col] = start;

	if (checkHorizontal(board, start, ship.length)) {
		for (let i = 0; i < end; i++) {
			board[row][col + i] = shipID;
		}
	}
}

function checkHorizontal(board, start, shipLength) {
	const [row, col] = start;

	// if out of range
	if (!(col >= 0 && col <= 9) ||
		!(row >= 0 && row <= 9) ||
		(col + shipLength - 1 > 9)) return false;

	// target cells must be empty
	for (let i = 0; i < shipLength; i++) {
		if (board[row][col + i] !== null) return false;
	}
	return true;
}

function placeVerticalShip(board, start, ship) {
	const shipID = ship.id;
	const end = ship.length;
	const [row, col] = start;

	//check vertical case
	if (checkVertical(board, start, ship.length)) {
		for (let i = 0; i < end; i++) {
			board[row + i][col] = shipID;
		}
	}
}

function checkVertical(board, start, shipLength) {
	const [row, col] = start;
	// if out of range
	if (!(col >= 0 && col <= 9) ||
		!(row >= 0 && row <= 9) ||
		(row + shipLength - 1 > 9)) return false;

	// target cells must be empty
	for (let i = 0; i < shipLength; i++) {
		if (board[row + i][col] !== null) return false;
	}
	return true;
}


// TESTING
let boat = Ship(3);
let boat2 = Ship(2);
let board = oceanGrid();
placeHorizontalShip(board, [9, 0], boat);
placeVerticalShip(board, [0, 0], boat2);
console.log(board);

// const ships = {
// ship.id : ship(n)
// "id1": 'ship1',
// "id2": 'ship2',
// "id3": 'ship3',
// }
