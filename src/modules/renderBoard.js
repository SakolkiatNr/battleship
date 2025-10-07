export function generateBoard(board) {
	const boardDiv = document.createElement('div');

	// create board
	board.forEach((row, rowIdx) => {
		const rowDiv = document.createElement('div');

		row.forEach((cellValue, colIdx) => {
			const cell = document.createElement('button');

			cell.dataset.row = rowIdx;
			cell.dataset.col = colIdx;
			cell.dataset.val = cellValue;

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
	if (value === null) return '•';
	if (value === 0) return 'X';
	// if (typeof value === 'string') return '■';
	if (typeof value === 'string') return 'X';
}
