import "./output.css";

import { newGame } from "./modules/gameFlow.js";

const startGameBtn = document.getElementById('name-confirm');
const playerName = document.getElementById('player-name').value;
console.log(playerName);
startGameBtn.addEventListener('click', newGame);
