export function statusBar(shipName, name) {
	const status = document.getElementById('status-bar');
	if (shipName === "startGame") {

		return status.textContent = `Captain ${name}, the fleet is ready. Awaiting your command to strike!`;

	}
	status.textContent = `Place your ${capitalize(shipName)}`;
}

function capitalize(string) {
	return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
