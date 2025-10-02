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

	console.log(checkEmpty(board, start, ship.length));

	for (let i = 0; i < end; i++) {
		board[row][col + i] = shipID;
	}
	console.log(checkEmpty(board, start, ship.length));
}

let boat = Ship(5);
let board = oceanGrid();
placeHorizontalShip(board, [9, 4], boat);
console.log(board);




function checkEmpty(board, start, shipLength) {
	// selected cell to start checking
	const [row, col] = start;

	// if out of range
	if (row < 0 || row > 9) return false;
	if (col + shipLength - 1 > 9) return false;

	// target cells must be empty
	let targetCell = board[row].slice(col, col + shipLength);
	if (targetCell.every(cell => cell === null)) return true;

	for (let i = 0; i < shipLength; i++) {
		if (board[row][col + i] !== null) return false;
	}
	return true;
}

