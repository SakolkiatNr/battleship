//generate board
// create cell
// dataset for eachcell = playerBoard value
// change board value method
// 

// import { createPlayer } from "./playerNameInput.js";

// let board = createPlayer('random name').getBoard();

export function generateBoard(board) {
	const boardDiv = document.createElement('div');

	// create board
	board.forEach((row, rowIdx) => {
		const rowDiv = document.createElement('div');

		row.forEach((cellValue, colIdx) => {
			const cell = document.createElement('button');

			cell.dataset.row = rowIdx;
			cell.dataset.col = colIdx;
			// cell.textContent = `${cellValue}`;
			cell.textContent = `${convertValueToUI(cellValue)}`;
			cell.classList.add('cell');

			rowDiv.append(cell);
		});

		boardDiv.append(rowDiv);
	});

	return boardDiv;
}

function convertValueToUI(value) {
	if (value === null) return ' =void= ';
	if (value === 0) return 'x';
	if (value === 1) return '!';
}

// if click
// check if value = null?
// if not change value to x
//

