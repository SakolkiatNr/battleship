export function showResult(callbackFn, ifWin) {
	const dialog = document.getElementById('result-dialog');
	dialog.setAttribute("open", "");

	newGameBtnHandler(dialog, callbackFn);
	result(ifWin);
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

function result(value) {
	const header = document.getElementById('game-result');

	if (value) header.textContent = "VICTORY !";
	else header.textContent = "DEFEAT !";
}
