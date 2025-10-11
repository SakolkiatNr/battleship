export function previewPlacement(playerBoardDiv, shipLength, direction) {
	const previewClass = "preview";
	const invalidClass = "invalid";

	function preview(e, showPreview = true) {
		if (!e.target.classList.contains("cell")) return;

		const baseRow = parseInt(e.target.dataset.row);
		const baseCol = parseInt(e.target.dataset.col);

		let valid = true;

		// check valid
		for (let i = 0; i < shipLength; i++) {
			const row = direction === "vertical" ? baseRow + i : baseRow;
			const col = direction === "horizontal" ? baseCol + i : baseCol;

			if (row > 9 || col > 9) {
				valid = false;
				break;
			}

			const cell = document.querySelector(
				`[data-col="${col}"][data-row="${row}"]`
			);

			// if cell doesn't exist or already has a value
			if (cell && cell.dataset.val !== "null") {
				valid = false;
				break;
			}
		}

		// render each cell
		for (let i = 0; i < shipLength; i++) {
			const row = direction === "vertical" ? baseRow + i : baseRow;
			const col = direction === "horizontal" ? baseCol + i : baseCol;

			if (row > 9 || col > 9) return;

			const cell = document.querySelector(
				`[data-col="${col}"][data-row="${row}"]`
			);

			if (cell) {
				if (showPreview && valid) {
					cell.classList.add(previewClass);
				} else if (showPreview && !valid) {
					cell.classList.add(invalidClass);
				} else {
					cell.classList.remove(previewClass);
					cell.classList.remove(invalidClass);
				}
			}
		}
	}

	function showPreview(e) {
		preview(e, true);
	}

	function hidePreview(e) {
		preview(e, false);
	}

	const addListener = () => {
		playerBoardDiv.addEventListener('mouseover', showPreview);
		playerBoardDiv.addEventListener('mouseout', hidePreview);
	}

	const removeListener = () => {
		playerBoardDiv.removeEventListener('mouseover', showPreview);
		playerBoardDiv.removeEventListener('mouseout', hidePreview);
	}

	return {
		addListener,
		removeListener
	}
}

