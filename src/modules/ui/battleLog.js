export function reportAttackStatus(type, attacker, targetName, delay = 1000) {
	const status = document.getElementById('status-bar')

	const messages = {
		playerHit: [
			`Direct hit, Captain ${attacker}! Enemy hull breached!`,
			`Great shot, Captain ${attacker}! You hit their ship!`,
			`Bullseye, ${attacker}! Enemy vessel taking damage!`,
		],
		playerMiss: [
			`Splash in the water, ${attacker} — no contact.`,
			`Missed shot, Captain. Adjust your aim.`,
			`Nothing but waves, ${attacker}. Try again.`,
		],
		enemyHit: [
			`Brace for impact! ${targetName} took a hit!`,
			`Enemy fire landed! Captain ${targetName}, our ship’s been struck!`,
			`We’ve been hit! Damage control on the double, Captain ${targetName}!`,
		],
		enemyMiss: [
			`Enemy missed! Still floating strong, ${targetName}.`,
			`Incoming fire — but they missed, Captain ${targetName}!`,
			`That one whizzed past us, ${targetName}! Close call.`,
		]
	}

	const log = messages[type];
	// status.textContent = log[Math.floor(Math.random() * log.length)];
	status.textContent = "...";

	setTimeout(() => {
		status.textContent = log[Math.floor(Math.random() * log.length)];
	}, delay)
}

