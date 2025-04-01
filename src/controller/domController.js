import battleship from "../battleships/Battleship.png";
import carrier from "../battleships/Carrier.png";
import crusier from "../battleships/Cruiser.png";
import patrolBoat from "../battleships/PatrolBoat.png";
import submarine from "../battleships/Submarine.png";
import { gameController } from "./gameController.js";
import { Carrier, Battleship, Crusier, Submarine, PatrolBoat } from "../ships/ship.js";

// Global variables to store the dragged ship and preview cells
let draggedShip = null;
let lastPreviewCells = [];
let placedShips = 0;

/**
 * Updates preview styling on cells.
 * Applies preview style (bg-green-200) to any new cell in newPreviewCells,
 * and removes it from any cell no longer in the set,
 * except for cells that already have the final placed style (bg-green-400).
 */
function updatePreview(newPreviewCells) {
  // Remove preview style from cells that are no longer being hovered
  lastPreviewCells.forEach((id) => {
    if (!newPreviewCells.includes(id)) {
      const cell = document.getElementById(id);
      // Do not change cells that already have the final placed style.
      if (cell && !cell.classList.contains("bg-green-400")) {
        cell.classList.remove("bg-green-200");
        cell.classList.add("bg-white", "hover:bg-blue-200");
      }
    }
  });

  // Apply preview style to new cells if they don't have the final style
  newPreviewCells.forEach((id) => {
    const cell = document.getElementById(id);
    if (cell && !cell.classList.contains("bg-green-400")) {
      cell.classList.remove("bg-white", "hover:bg-blue-200");
      cell.classList.add("bg-green-200");
    }
  });
  lastPreviewCells = newPreviewCells;
}

/**
 * Initializes the game UI and board elements.
 */
function InitialRender() {
  const gameWindow = document.getElementById("game-window");
  gameWindow.className = "flex w-full bg-gray-800 h-screen";

  // Player window setup
  const playerWindow = document.createElement("div");
  playerWindow.id = "player-window";
  playerWindow.className = "flex flex-col w-full h-full bg-rose-500 items-center pt-20";
  gameWindow.appendChild(playerWindow);
  playerWindow.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Player</h2>
    <div id="available-ships-window-p" class="grid grid-cols-2 gap-4 w-2/4 h-64 border-2 border-amber-200"></div>
    <div id="player-board"></div>
  `;

  // Computer window setup
  const computerWindow = document.createElement("div");
  computerWindow.id = "computer-window";
  computerWindow.className = "flex flex-col w-full h-full bg-blue-500 items-center pt-20";
  gameWindow.appendChild(computerWindow);
  computerWindow.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Computer</h2>
    <div id="available-ships-window-c" class="grid grid-cols-2 gap-4 w-2/4 h-64 border-2 border-amber-200"></div>
    <div id="computer-board"></div>
  `;

  const availableShipsWindowP = document.getElementById("available-ships-window-p");
  const availableShipsWindowC = document.getElementById("available-ships-window-c");

  // Set up available ships for player with draggable attribute
  availableShipsWindowP.innerHTML = `
    <img src="${carrier}" alt="Carrier" class="h-16 w-64" draggable="true" data-ship="carrier" data-size="5" id="carrier">
    <img src="${battleship}" alt="Battleship" class="h-16 w-64" draggable="true" data-ship="battleship" data-size="4" id="battleship">
    <img src="${crusier}" alt="Cruiser" class="h-16 w-64" draggable="true" data-ship="cruiser" data-size="3" id="cruiser">
    <img src="${submarine}" alt="Submarine" class="h-16 w-64" draggable="true" data-ship="submarine" data-size="3" id="submarine">
    <img src="${patrolBoat}" alt="Patrol Boat" class="h-16 w-64" draggable="true" data-ship="patrolboat" data-size="2" id="patrolboat">
  `;

  // Set up available ships for computer (non-draggable)
  availableShipsWindowC.innerHTML = `
    <img src="${carrier}" alt="Carrier" class="h-16 w-64">
    <img src="${battleship}" alt="Battleship" class="h-16 w-64">
    <img src="${crusier}" alt="Cruiser" class="h-16 w-64">
    <img src="${submarine}" alt="Submarine" class="h-16 w-64">
    <img src="${patrolBoat}" alt="Patrol Boat" class="h-16 w-64">
  `;

  // Build player board grid
  const playerBoard = document.getElementById("player-board");
  playerBoard.className = "grid grid-cols-10 gap-0 p-10 min-w-max";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.id = `[p: ${i + 1}, ${j + 1}]`;
      cell.className = "aspect-square border-2 border-black w-16 h-16 bg-white hover:bg-blue-200";
      handleAddEventListenersDragOver(cell);
      playerBoard.appendChild(cell);
    }
  }

  // Build computer board grid
  const computerBoard = document.getElementById("computer-board");
  computerBoard.className = "grid grid-cols-10 gap-0 p-10 min-w-max";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.id = `[c: ${i + 1}, ${j + 1}]`;
      cell.className = "aspect-square border-2 border-black w-16 h-16 bg-white hover:bg-blue-200";
      computerBoard.appendChild(cell);
    }
  }

  // Set up dragstart events for available ships
  handleAddEventListenersDragStart(availableShipsWindowP);
}

// Registers dragstart event for ship elements.
// When a drag starts, we set the dataTransfer data and store the draggedShip globally.
function handleAddEventListenersDragStart(availableShipsWindowP) {
  availableShipsWindowP.addEventListener("dragstart", (e) => {
    const ship = e.target.getAttribute("data-ship");
    const size = e.target.getAttribute("data-size");
    e.dataTransfer.setData("ship", ship);
    e.dataTransfer.setData("size", size);
    draggedShip = { name: ship, size: parseInt(size, 10) };
  });
}

// Registers drag-related events on each board cell.
function handleAddEventListenersDragOver(cell) {
  // Use dragover to update preview cells continuously.
  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!draggedShip) return;

    // Extract row and col from cell.id (e.g., "[p: 1, 2]")
    const parts = cell.id.split(":")[1].split(",");
    const row = parseInt(parts[0].trim());
    const col = parseInt(parts[1].replace("]", "").trim());

    let newPreviewCells = [];
    for (let i = 0; i < draggedShip.size; i++) {
      const newCol = col + i;
      const newId = `[p: ${row}, ${newCol}]`;
      newPreviewCells.push(newId);
    }
    updatePreview(newPreviewCells);


  });





  // Drop event: place ship and finalize styling.
  cell.addEventListener("drop", (e) => {
    e.preventDefault();

    const player = gameController.getPlayer();
    const gameboard = player.gameboard;

    // Retrieve data from dataTransfer
    const shipName = e.dataTransfer.getData("ship");
    const shipSize = parseInt(e.dataTransfer.getData("size"), 10);
    // Extract row and col from the drop cell id
    const idParts = cell.id.split(":")[1].split(",");
    const row = parseInt(idParts[0].trim());
    const col = parseInt(idParts[1].replace("]", "").trim());

    // Build coordinates array for placement
    const coordinates = [];
    for (let i = 0; i < shipSize; i++) {
      coordinates.push([row, col + i]);
    }

    // Validate and place the ship on the gameboard
    const shipClassMap = {
      carrier: Carrier,
      battleship: Battleship,
      cruiser: Crusier,
      submarine: Submarine,
      patrolboat: PatrolBoat,
    };

    const ShipClass = shipClassMap[shipName.toLowerCase()];
    const ship = new ShipClass();

    const result = gameboard.placeShip(ship, [row, col], "horizontally");
    if (
      result === "You can't position ships outside the map!" ||
      result === "You can't position ships on top of each other!"
    ) {
      alert("Invalid placement! Try again.");
      return;
    }

    // Finalize cell styling (set to bg-green-400) for placed ship.
    coordinates.forEach(([x, y]) => {
      const cellId = `[p: ${x}, ${y}]`;
      const cellToChange = document.getElementById(cellId);
      if (cellToChange) {
        cellToChange.classList.remove("bg-white", "hover:bg-blue-200", "bg-green-200");
        cellToChange.classList.add("bg-green-400");
      }
    });

    // Remove the ship image from the available ships window.
    const img = document.getElementById(shipName);
    if (img && img.parentNode) {
      img.parentNode.removeChild(img);
    }

    // Clear preview styling once the drop is complete.
    updatePreview([]);
    //starts battle after placing ships.
    if (player.gameboard.ships.length === 5) {
      gameController.battleStart();
    }
  });



}

// Clear preview styles on dragend so that no cells remain highlighted.
document.addEventListener("dragend", () => {
  lastPreviewCells.forEach((id) => {
    const cell = document.getElementById(id);
    if (cell && !cell.classList.contains("bg-green-400")) {
      cell.classList.remove("bg-green-200");
      cell.classList.add("bg-white", "hover:bg-blue-200");
    }
  });
  lastPreviewCells = [];
});


function addScoreboardDOM(player, computer) {
  const playerScoreboard = document.createElement("div");
  playerScoreboard.id = "player-scoreboard";
  playerScoreboard.className = "text-white text-lg";
  playerScoreboard.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Player Scoreboard</h2>
    <p>Ships Remaining: ${player.gameboard.ships.length}</p>
    <p>Score: ${player.score}</p>
  `;
  document.getElementById("player-window").appendChild(playerScoreboard);

  const computerScoreboard = document.createElement("div");
  computerScoreboard.id = "computer-scoreboard";
  computerScoreboard.className = "text-white text-lg";
  computerScoreboard.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Computer Scoreboard</h2>
    <p>Ships Remaining: ${computer.gameboard.ships.length}</p>
    <p>Score: ${computer.score}</p>
  `;
  document.getElementById("computer-window").appendChild(computerScoreboard);
}


export const domController = {
  InitialRender,
  addScoreboardDOM
  // add more functions as needed
};
