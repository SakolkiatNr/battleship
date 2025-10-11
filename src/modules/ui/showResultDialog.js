export function showResult(callbackFn) {
	const dialog = document.getElementById('result-dialog');
	dialog.setAttribute("open", "");

	newGameBtnHandler(dialog, callbackFn);
}

function closeDialog(dialog) {
	dialog.removeAttribute("open");
}

function newGameBtnHandler(dialog, callbackFn) {
	const btn = document.getElementById('new-game-btn');
	btn.addEventListener('click', () => {
		closeDialog(dialog);
		callbackFn();
	});
}
