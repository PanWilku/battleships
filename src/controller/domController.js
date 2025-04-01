import battleship from "../battleships/Battleship.png";
import carrier from "../battleships/Carrier.png";
import crusier from "../battleships/Cruiser.png";
import patrolBoat from "../battleships/PatrolBoat.png";
import submarine from "../battleships/Submarine.png";

import {Carrier} from "../ships/ship.js";



function InitialRender() {
const gameWindow = document.getElementById('game-window');
gameWindow.classList = "";
gameWindow.classList = "flex w-full bg-gray-800 h-screen";
;

  const playerWidnow = document.createElement('div');
  playerWidnow.id = "player-window";
  playerWidnow.classList = "flex flex-col w-full h-full bg-rose-500 items-center pt-20";
  gameWindow.appendChild(playerWidnow);
  //make an inner html of player window
  playerWidnow.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Player</h2>
    <div id="available-ships-window-p" class="grid grid-cols-2 gap-4 w-2/4 h-64 border-2 border-amber-200"></div>
    <div id="player-board"></div>
  `;
  //make the same thing but for computer
  const computerWindow = document.createElement('div');
  computerWindow.id = "computer-window";
  computerWindow.classList = "flex flex-col w-full h-full bg-blue-500 items-center pt-20";
  gameWindow.appendChild(computerWindow);
  computerWindow.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Computer</h2>
    <div id="available-ships-window-c" class="grid grid-cols-2 gap-4 w-2/4 h-64 border-2 border-amber-200"></div>
    <div id="computer-board"></div>
  `;

const availableShipsWindowP = document.getElementById('available-ships-window-p');
const availableShipsWindowC = document.getElementById('available-ships-window-c');


availableShipsWindowP.innerHTML = `
  <img src="${carrier}" alt="Carrier" class="h-16 w-64" draggable="true" data-ship="carrier" data-size="5">
  <img src="${battleship}" alt="Battleship" class="h-16 w-64" draggable="true" data-ship="battleship" data-size="4">
  <img src="${crusier}" alt="Cruiser" class="h-16 w-64" draggable="true" data-ship="cruiser" data-size="3">
  <img src="${submarine}" alt="Submarine" class="h-16 w-64" draggable="true" data-ship="submarine" data-size="3">
  <img src="${patrolBoat}" alt="Patrol Boat" class="h-16 w-64" draggable="true" data-ship="patrolBoat" data-size="2">
`;
handleAddEventListenersDragStart(availableShipsWindowP);

availableShipsWindowC.innerHTML = `
<img src="${carrier}" alt="Carrier" class="h-16 w-64">
<img src="${battleship}" alt="Battleship" class="h-16 w-64">
<img src="${crusier}" alt="Cruiser" class="h-16 w-64">
<img src="${submarine}" alt="Submarine" class="h-16 w-64">
<img src="${patrolBoat}" alt="Patrol Boat" class="h-16 w-64">
`;



const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
playerBoard.classList = "grid grid-cols-10 gap-0 p-10 min-w-max";
computerBoard.classList = "grid grid-cols-10 gap-0 p-10 min-w-max";
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.id = `[p: ${i + 1}, ${j + 1}]`;
        cell.classList = "aspect-square border-2 border-black w-16 h-16 bg-white hover:bg-blue-200";
        handleAddEventListenersDragOver(cell);
        playerBoard.appendChild(cell);
    }
}
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.id = `[c: ${i + 1}, ${j + 1}]`;
        cell.classList = "aspect-square border-2 border-black w-16 h-16 bg-white hover:bg-blue-200";
        computerBoard.appendChild(cell);
    }
}




}


function handleAddEventListenersDragStart(availableShipsWindowP) {

    availableShipsWindowP.addEventListener('dragstart', (e) => {
    const ship = e.target.getAttribute('data-ship');
    const size = e.target.getAttribute('data-size');
    e.dataTransfer.setData('ship', ship);
    e.dataTransfer.setData('size', size);
    
    });
    
}


function handleAddEventListenersDragOver(cell) {
    cell.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    cell.addEventListener('drop', (e) => {
        e.preventDefault();
        let coordsToPlace = [];

        const ship = e.dataTransfer.getData('ship');
        const size = e.dataTransfer.getData('size');
        //extract row and col
        const id = cell.id;
        const row = parseInt(id.split(':')[1].split(',')[0]);
        const col = parseInt(id.split(':')[1].split(',')[1]);
        
        let cellToChangeArr = [];
        for(let i = 0; i < size; i++) {
            
            const cellId = `[p: ${row}, ${col + i}]`;
            const cellToChange = document.getElementById(cellId);
            if(!cellToChange) {
                console.log("You can't position ships outside the map!");
                cellToChangeArr.forEach((cellId) => {
                    const cellToChange = document.getElementById(cellId);
                    cellToChange.classList.remove("bg-green-400");
                    cellToChange.classList.add("bg-white", "hover:bg-blue-200");
                });
                return;
            }
            cellToChangeArr.push(cellId); 
            coordsToPlace.push([row, col + i]);
        }
        cellToChangeArr.forEach((cellId) => {
            const cellToChange = document.getElementById(cellId);
            cellToChange.classList.remove("bg-white", "hover:bg-blue-200");
            cellToChange.classList.add("bg-green-400");
        });

        console.log(`${ship} placed at ${row}, ${col}`);
    });
}






export const domController = {
    InitialRender,
    // add more functions as needed
}
