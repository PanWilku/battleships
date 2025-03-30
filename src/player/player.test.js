import { Player } from "./player";
import { Gameboard } from "../gameboard/gameboard";
import {Ship, Carrier, Battleship, Crusier, Submarine, PatrolBoat} from "../ships/ship"



test('creates a human player with its own gameboard', () => {
    const player = new Player("human");
    expect(player.type).toBe("human");
    expect(player.gameboard).toBeInstanceOf(Gameboard);
});



test('player can make a move on enemy board', () => {
    const player = new Player("human");
    const enemy = new Player("computer");

    enemy.gameboard.placeShip(new Crusier, [2, 2], "horizontally");
    player.makeMove([2, 2], enemy)
    expect(enemy.gameboard.attackedCoordinates[0]).toStrictEqual([2, 2]);
});


test('computer makes a random legal move, player board is attacked', () => {
    const player = new Player("human");
    const computerPlayer = new Player("comuputer");

    player.gameboard.placeShip(new Crusier, [2, 2], "horizontally");

    computerPlayer.makeRandomMove(player);

    expect(player.gameboard.attackedCoordinates.length).toBe(1);
});