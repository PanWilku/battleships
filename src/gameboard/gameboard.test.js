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




test('ship length takes more space', () => {
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


test('ship is placed outside of bound throws error', () => {
    const ship = new Carrier();
    const gameboard = new Gameboard();
    const position = "horizontally";
    expect(gameboard.placeShip(ship, [7, 5], position)).toEqual("You can't position ships outside the map!");
});



test('ship is placed outside of bound throws error and placing new ship in correct position shows correct coords', () => {
    const ship = new Carrier();
    const gameboard = new Gameboard();
    const position = "horizontally";

    expect(gameboard.placeShip(ship, [7, 5], position)).toEqual("You can't position ships outside the map!");
    
    gameboard.placeShip(ship, [6, 5], position)
    const coordinates = [
        [6, 5],
        [7, 5],
        [8,5],
        [9,5],
        [10, 5]
    ]
    expect(gameboard.ships[0].coordinates).toEqual(coordinates);
});


test('returns 10x10 gameboard', () => {
    const gameboard = new Gameboard();

    const expectedValue = [
        [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10],
        [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9], [2, 10],
        [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [3, 10],
        [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9], [4, 10],
        [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10],
        [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9], [6, 10],
        [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [7, 10],
        [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [8, 10],
        [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9], [9, 10],
        [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8], [10, 9], [10, 10]
      ]
    expect(gameboard.createBoard()).toStrictEqual(expectedValue);
});




