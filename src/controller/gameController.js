import { Player } from "../player/player.js";
import { domController } from "./domController.js";
import { Carrier, Battleship, Crusier, Submarine, PatrolBoat } from "../ships/ship.js";

let player;
let computer;
let turn = "player";
let isGameOver = false;

function startGame() {
    // Initialize players
    player = new Player("human");
    computer = new Player("computer");

    console.log("Game started!");
    console.log("Player's gameboard:", player.gameboard);
    console.log("Computer's gameboard:", computer.gameboard);

    // You can add logic here to randomly place ships for the computer
}

function getPlayer() {
    return player;
}

function getComputer() {
    return computer;
}

function battleStart() {
    console.log("Battle started!");
    placeComputerShips(computer);
    domController.addScoreboardDOM(getPlayer(), getComputer());
    while(!isGameOver) {
    if(turn === "player") {
        turn = domController.handleReceiveAttackComputer(getComputer());
          // Check if game is over
        if (computer.gameboard.areAllShipsSunk()) {
            isGameOver = true;
            gameOver(player);
        }
    } else {
        const result = computer.makeRandomMove(getPlayer());
        turn = domController.handleReceiveAttackPlayer(result);
        if (player.gameboard.areAllShipsSunk()) {
            isGameOver = true;
            gameOver(computer);
        }
    }
    }
}


function placeComputerShips(computer) {
    //place randomly ships for a computer horizontally
    const shipClassMap = [
        {shipClass: Carrier},
        {shipClass: Battleship},
        {shipClass: Crusier},
        {shipClass: Submarine},
        {shipClass: PatrolBoat},
    ];

        shipClassMap.forEach((ship) => {
            let placed = false;
            const shipToCreate = ship.shipClass;
            const shipInstance = new shipToCreate();
            const shipPosition = "horizontally";
            while(!placed) {
                const randomX = Math.floor(Math.random() * 10) + 1;
                const randomY = Math.floor(Math.random() * 10) + 1;
                const randomCoordinates = [randomX, randomY];
                let result = computer.gameboard.placeShip(shipInstance, randomCoordinates, shipPosition);
                if(result === "You can't position ships outside the map!" || result === "You can't position ships on top of each other!") {
                    placed = false;
                }
                else {
                    placed = true;
            
                }
            }
        });

}


function gameOver(winner) {
    const gameOverMessage = document.createElement("div");
    gameOverMessage.className = "absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-4xl";
    gameOverMessage.innerHTML = `
      <h1>${winner} Wins!</h1>
      <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-2xl" onclick="location.reload()">
        Play Again
      </button>
    `;
    document.body.appendChild(gameOverMessage);
  }

export const gameController = {
    startGame,
    getPlayer,
    getComputer,
    battleStart
};