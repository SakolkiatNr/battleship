export function previewPlacement(playerBoardDiv, shipLength, direction) {
	const previewClass = "preview";
	const invalidClass = "invalid";

	function preview(e, showPreview = true) {
		if (!e.target.classList.contains("cell")) return;

		const baseRow = parseInt(e.target.dataset.row);
		const baseCol = parseInt(e.target.dataset.col);

		for (let i = 0; i < shipLength; i++) {
			const row = direction === "vertical" ? baseRow + i : baseRow;
			const col = direction === "horizontal" ? baseCol + i : baseCol;

			if (row > 9 || col > 9) return;

			const cell = document.querySelector(
				`[data-col="${col}"][data-row="${row}"]`
			);

			// check valid
			// if cell.dataset.value !== null
			// invalid
			// red cell!

			if (cell) {
				if (showPreview) {
					cell.classList.add(previewClass);
				} else {
					cell.classList.remove(previewClass);
				}
			}
		}
	}

	playerBoardDiv.addEventListener('mouseover', (e) => {
		preview(e, true);
	});
	playerBoardDiv.addEventListener('mouseout', (e) => {
		preview(e, false);
	});

}

