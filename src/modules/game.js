import { createShips } from "./createShips.js";

export function Gameboard() {
	// place ship at specific coordinates by calling ship class
	// receive attack function
	// track missed attacks
	// report if all the ships have sunk

	const board = oceanGrid();
	const ships = createShips();

	const placeShip = (ship, direction, target) => {
		direction === 'horizontal'
			? placeHorizontalShip(board, target, ship)
			: placeVerticalShip(board, target, ship);
	}

	const wasAttacked = (target) => {
		receiveAttack(board, target, ships);
		checkAllSink(ships);
	}

	const getBoard = () => board;
	const getShips = () => ships;

	return {
		placeShip,
		wasAttacked,
		getBoard,
		getShips,
		get CheckSink() { return checkAllSink(ships) }
	};
}


export function oceanGrid() {
	const FIELD_SIZE = 10;
	let oceanColumn = Array.from({ length: FIELD_SIZE }, () => []);

	let emptyCell = new Array(FIELD_SIZE).fill(null);
	oceanColumn.forEach(row => row.push(...emptyCell));

	return oceanColumn;
}

export function placeHorizontalShip(board, start, ship) {
	const shipID = ship.id;
	const end = ship.length;
	const [row, col] = start;

	if (checkHorizontal(board, start, ship.length)) {
		for (let i = 0; i < end; i++) {
			board[row][col + i] = shipID;
		}
	}
}

export function checkHorizontal(board, start, shipLength) {
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

export function placeVerticalShip(board, start, ship) {
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

export function checkVertical(board, start, shipLength) {
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

function markSpot(board, pointer) {
	// mark 0 on the board if empty
	// mark 1 if it's a ship
	const [row, col] = pointer;
	let cell = board[row][col];

	if (cell === null) board[row][col] = 0;
	else if (cell === 1 || cell === 0) return;
	else board[row][col] = 1;
}

export function receiveAttack(board, pointer, ships) {
	const [row, col] = pointer;
	let cell = board[row][col];

	// if found ship, hit it! 
	if (typeof cell === 'string') {
		for (let ship in ships) {
			if (ships[ship].id === cell)
				ships[ship].getHit();
		}
	}
	markSpot(board, pointer);
}

export function checkAllSink(ships) {
	for (let ship in ships) {
		if (ships[ship].isSunk === false) return false;
	}
	return true;
}

