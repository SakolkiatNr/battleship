export function reportAttackStatus(type, attacker, targetName) {
	const status = document.getElementById('status-bar')

	const messages = {
		playerHit: [
			`Direct hit, Captain ${attacker}! Enemy hull breached!`,
			`Great shot, Captain ${attacker}! You hit their ship!`,
			`Bullseye, ${attacker}! Enemy vessel taking damage!`,
			`Boom! That one scored!`,
			`Critical strike! Enemy crew scrambling!`,
			`Target locked and fired... BOOOOM`,
		],
		playerMiss: [
			`Splash in the water, ${attacker} — no contact.`,
			`Missed shot, Captain. Adjust your aim.`,
			`Nothing but waves. Try again.`,
			`The enemy evades! Another chance awaits.`,
			`Water splashes — we’re still afloat, captain.`,
		],
		enemyHit: [
			`Brace for impact! We took a hit!`,
			`Enemy fire landed! Captain ${targetName}, our ship’s been struck!`,
			`We’ve been hit! Damage control on the double.`,
			`Direct hit! Hull breached, ${targetName}!`,
			`Enemy cannon fire! Brace yourself!`,
			`Critical damage! ${targetName}, hold the line!`,
		],
		enemyMiss: [
			`Enemy missed! Still floating strong.`,
			`Incoming fire, but they missed.`,
			`That one whizzed past us, Captain ${targetName}! Close call.`,
			`Shots fly past, no damage sustained!`,
			`Enemy cannons misfire! We’re safe for now.`,
			`The waves absorb their fire. All clear!`,
			`They missed the mark! Stay sharp, captain ${targetName}.`,
		]
	}

	const log = messages[type];
	status.textContent = log[Math.floor(Math.random() * log.length)];
}

