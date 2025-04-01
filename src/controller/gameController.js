import { Player } from "../player/player.js";
import { domController } from "./domController.js";
import { Carrier, Battleship, Crusier, Submarine, PatrolBoat } from "../ships/ship.js";

let player;
let computer;
let turn = "player";
let gameOver = false;

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
        console.log(computer.gameboard.ships[0].coordinates);
        console.log(computer.gameboard.ships[1].coordinates);
        console.log(computer.gameboard.ships[2].coordinates);
        console.log(computer.gameboard.ships[3].coordinates);
        console.log(computer.gameboard.ships[4].coordinates);

}


export const gameController = {
    startGame,
    getPlayer,
    getComputer,
    battleStart
};