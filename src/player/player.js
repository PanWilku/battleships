import { Gameboard } from "../gameboard/gameboard";

export class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }


    makeMove(cooridnates, enemy) {
        return enemy.gameboard.receiveAttack(cooridnates);
    }


    makeRandomMove(target) {
        const randomCords = this.getRandomMove();

        target.gameboard.receiveAttack(randomCords);
    }

    getRandomMove() {
        let randomMove = [];

        const randomNumberX = Math.floor(Math.random() * 10) + 1;
        const randomNumberY = Math.floor(Math.random() * 10) + 1;
        randomMove.push(randomNumberX, randomNumberY);

        return randomMove;
    }
}