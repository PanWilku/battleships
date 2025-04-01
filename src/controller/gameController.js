import { Player } from "../player/player.js";
import { domController } from "./domController.js";
import { Carrier, Battleship, Crusier, Submarine, PatrolBoat } from "../ships/ship.js";

let player;
let computer;
let turn = "player";
let isGameOver = false;

function startGame() {

    

    player = new Player("human");
    computer = new Player("computer");
    turn = "player";
    isGameOver = false;
}

function getPlayer() {
    return player;
}

function getComputer() {
    return computer;
}

async function battleStart() {
    console.log("Battle started!");
    placeComputerShips(computer);
    domController.addScoreboardDOM(getPlayer(), getComputer());
    
    // Initial turn handling
    handleTurn();
}

function handleTurn() {
    if (isGameOver) return;

    if (turn === "player") {
        // Set up player's turn
        domController.handleReceiveAttackComputer(computer)
            .then(result => {
                if (computer.gameboard.areAllShipsSunk()) {
                    isGameOver = true;
                    player.score++;
                    updatePlayerScore(player.score);
                    gameOver("Player");
                } else {
                    turn = "computer";
                    // Add small delay before computer's turn
                    handleComputerTurn()
                }
            });
    }
}

function handleComputerTurn() {
    if (isGameOver) return;

    const coordinates = computer.makeRandomMove(player);
    domController.handleReceiveAttackPlayer(coordinates)
        .then(() => {
            if (player.gameboard.areAllShipsSunk()) {
                isGameOver = true;
                computer.score++;
                updateComputerScore(computer.score);
                gameOver("Computer");
            } else {
                turn = "player";
                handleTurn();
            }
        });
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
    gameOverMessage.className = "fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-4xl z-50";
    gameOverMessage.innerHTML = `
        <h1>${winner} Wins!</h1>
        <p class="text-2xl mt-4">Player Score: ${player.score} - Computer Score: ${computer.score}</p>
        <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded text-2xl" id="play-again">
            Play Again
        </button>
    `;
    document.body.appendChild(gameOverMessage);

    document.getElementById('play-again').addEventListener('click', () => {
        location.reload();
    });
}

function updatePlayerScore(newScore) {
    localStorage.setItem(`${player.type}Score`, newScore);
}


function updateComputerScore(newScore) {
    localStorage.setItem(`${computer.type}Score`, newScore);
}

export const gameController = {
    startGame,
    getPlayer,
    getComputer,
    battleStart
};