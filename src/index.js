import "./output.css";

import { newGame } from "./modules/gameFlow.js";

const startGameBtn = document.getElementById('name-confirm');
startGameBtn.addEventListener('click', newGame);
// newGame();
