import {Ship, Carrier, Battleship, Crusier, Submarine, PatrolBoat} from "../ships/ship"
import { Gameboard } from "./gameboard"



test('places a ship on a board', () => {
    const ship = new Carrier();
    const gameboard = new Gameboard();
    const coordinates = [2, 5];
    gameboard.placeShip(ship, coordinates, "horizontally");
    expect(gameboard.ships[0].coordinates).toEqual([[2, 5], [3, 5], [4, 5], [5, 5], [6, 5]]);
});


test('if misses, add missed attack cooridnate to an array', () => {
    const coordinates = [2, 5];
    const gameboard = new Gameboard();
    
    gameboard.receiveAttack(coordinates);
    expect(gameboard.missedAttacks).toEqual([[2, 5]]);
});

test('if hit, damage a ship', () => {
    const coordinates = [2, 5];
    const ship = new Carrier();
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, coordinates, "horizontally");
    const attackCoordinates = [2, 5];

    gameboard.receiveAttack(attackCoordinates);
    expect(ship.hits).toBe(1);
});


test('if last hit, destroy a ship', () => {
    const coordinates = [2, 5];
    const ship = new Carrier();
    const gameboard = new Gameboard();
    gameboard.placeShip(ship, coordinates, "vertically");

    gameboard.receiveAttack([2, 5]);
    gameboard.receiveAttack([2, 6]);
    gameboard.receiveAttack([2, 7]);
    gameboard.receiveAttack([2, 8]);
    gameboard.receiveAttack([2, 9]);
    expect(ship.isSunk()).toBe(true);
});


test('retuns true if all ships are sunk', () => {
    const gameboard = new Gameboard();
    const ship = new PatrolBoat();
    gameboard.placeShip(ship, [2, 2], "horizontally");
    gameboard.receiveAttack([2, 2]);
    gameboard.receiveAttack([3, 2]);


    expect(gameboard.areAllShipsSunk()).toBe(true);
});


test('blocks attacking the same coordinate more than once', () => {
    const gameboard = new Gameboard();
    const ship = new Carrier();
    gameboard.placeShip(ship, [2, 2]);
    gameboard.receiveAttack([1, 1]);
    expect(gameboard.receiveAttack([1, 1])).toBe("You cant attack same coordinate twice!");
});




test('of ship length takes more space', () => {
    const ship = new Carrier();
    const gameboard = new Gameboard();
    const position = "horizontally";
    gameboard.placeShip(ship, [5, 5], position)
    const coordinates = [
        [5, 5],
        [6, 5],
        [7, 5],
        [8,5],
        [9,5]
    ]
    expect(gameboard.ships[0].coordinates).toEqual(coordinates);
});




