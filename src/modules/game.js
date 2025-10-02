function Gameboard() {
	// place ship at specific coordinates by calling ship class
	// receive attack function
	// track missed attacks
	// report if all the ships have sunk
}

function oceanGrid() {
	const FIELD_SIZE = 10;
	let oceanColumn = Array.from({ length: FIELD_SIZE }, () => []);

	let emptyCell = new Array(FIELD_SIZE).fill(null);
	oceanColumn.forEach(row => row.push(...emptyCell));

	return oceanColumn;
}

let test = oceanGrid();
console.log(test);

// function placeShipHorizontal() {

// }
