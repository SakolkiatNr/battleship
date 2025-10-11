export function generateBoard(board) {
	const boardDiv = document.createElement('div');
	boardDiv.classList.add('board-container');

	// create board
	board.forEach((row, rowIdx) => {
		const rowDiv = document.createElement('div');

		row.forEach((cellValue, colIdx) => {
			const cell = document.createElement('button');

			cell.dataset.row = rowIdx;
			cell.dataset.col = colIdx;
			cell.dataset.val = cellValue;

			cell.textContent = `${convertValueToUI(cellValue)}`;
			cell.classList.add('cell');
			addCellClass(cell);

			rowDiv.append(cell);
		});

		boardDiv.append(rowDiv);
	});

	return boardDiv;
}

function convertValueToUI(value) {
	if (value === null) return '•';
	if (value === 0) return '+';
	if (value === 1) return '■';
	if (typeof value === 'string') return '■';
}

function addCellClass(cell) {
	if (cell.dataset.val === '1') {
		cell.classList.add('ship-marked');
	}
	else if (cell.dataset.val === '0') {
		cell.classList.add('missed-marked');
	} else if (cell.dataset.val.length === 36) {
		// UUID 36 char
		cell.classList.add('player-ship');
	}
}


export function generateAiBoard(board) {
	const boardDiv = document.createElement('div');
	boardDiv.classList.add('board-container');

	// create board
	board.forEach((row, rowIdx) => {
		const rowDiv = document.createElement('div');

		row.forEach((cellValue, colIdx) => {
			const cell = document.createElement('button');

			cell.dataset.row = rowIdx;
			cell.dataset.col = colIdx;
			cell.dataset.val = cellValue;

			cell.textContent = `${aiBoardUI(cellValue)}`;
			cell.classList.add('cell');
			addAICellClass(cell);

			rowDiv.append(cell);
		});

		boardDiv.append(rowDiv);
	});

	return boardDiv;
}

function aiBoardUI(value) {
	if (value === null) return '•';
	if (value === 0) return '+';
	if (value === 1) return '■'
	if (typeof value === 'string') return '■';
	// if (typeof value === 'string') return '•';
}

function addAICellClass(cell) {
	if (cell.dataset.val === '1') {
		cell.classList.add('ship-marked');
	}
	else if (cell.dataset.val === '0') {
		cell.classList.add('missed-marked');
	}
}


export function updateBoard(container, board) {
	container.textContent = "";
	container.append(generateBoard(board));
}

export function updateAiBoard(container, board) {
	container.textContent = "";
	container.append(generateAiBoard(board));
}

export function removeBoard(playerContainer, aiContainer) {
	playerContainer.textContent = "";
	aiContainer.textContent = "";
}
