import { Gameboard } from "../gameboard/gameboard";

export class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.score =  Number(localStorage.getItem(`${type}Score`)) || 0;;
    }


    makeMove(cooridnates, enemy) {
        return enemy.gameboard.receiveAttack(cooridnates);
    }


    makeRandomMove(opponent) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10) + 1;
            y = Math.floor(Math.random() * 10) + 1;
        } while (opponent.gameboard.attackedCoordinates.some(
            coord => coord[0] === x && coord[1] === y
        ));

        opponent.gameboard.receiveAttack([x, y]);
        return [x, y];
    }

    getRandomMove() {
        let randomMove = [];

        const randomNumberX = Math.floor(Math.random() * 10) + 1;
        const randomNumberY = Math.floor(Math.random() * 10) + 1;
        randomMove.push(randomNumberX, randomNumberY);

        return randomMove;
    }
}