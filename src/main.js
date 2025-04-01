// This is the main JavaScript file for the Battleship game.
// It handles the game logic and user interactions.
import { gameController } from "./controller/gameController.js";
import { domController } from "./controller/domController.js";



const startButton = document.getElementById('start-button');
const gameWindow = document.getElementById('game-window');
//take a game window and add an event listener to a start button and when clicked every children of game window is deleted
startButton.addEventListener('click', () => {
  while (gameWindow.firstChild) {
    gameWindow.removeChild(gameWindow.firstChild);
  }
  domController.InitialRender();
  gameController.startGame();
});
