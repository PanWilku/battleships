import { Player } from "../player/player.js";

let player;
let computer;

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

export const gameController = {
    startGame,
    getPlayer,
    getComputer,
};