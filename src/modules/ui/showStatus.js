export function statusBar(shipName) {
	const status = document.getElementById('status-bar');
	if (shipName === "startGame") {

		return status.textContent = "Attack opponent";

	}
	status.textContent = `Place your ${capitalize(shipName)}`;
}

function capitalize(string) {
	return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
