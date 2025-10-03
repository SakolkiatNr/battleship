import { Ship } from "./ship.js";

function Gameboard() {
	// place ship at specific coordinates by calling ship class
	// receive attack function
	// track missed attacks
	// report if all the ships have sunk
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

	checkEmpty(board, start, ship.length);

	for (let i = 0; i < end; i++) {
		board[row][col + i] = shipID;
	}

	// console.log(board[row]);
}

function checkEmpty(board, start, shipLength) {
	// selected cell to start checking
	const [row, col] = start;

	// if out of range
	if (row < 0 || row > 9) return false;
	if (col + shipLength - 1 > 9) return false;

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
	checkEmptyVertical(board, start, ship.length)

	for (let i = 0; i < end; i++) {
		board[row + i][col] = shipID;
	}
}

function checkEmptyVertical(board, start, shipLength) {
	const [row, col] = start;

	// if out of range
	if (col < 0 || col > 9) return false;
	if (col + shipLength - 1 > 9) return false;

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
placeHorizontalShip(board, [9, 4], boat);
placeVerticalShip(board, [7, 0], boat2);

console.log(board);

