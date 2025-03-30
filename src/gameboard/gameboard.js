export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.attackedCoordinates = [];
        this.size = this.createBoard();
    }

    createBoard() {
        const numbersX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let gameboard = [];

        for(const letter of numbersX) {
            for(let i = 1; i <= numbersX.length; i++) {
            gameboard.push([letter, i]);
            }
        }
        return gameboard;
    }

    placeShip(ship, coordinates, position) {
        let shipCoordinates = [];
        let tempCords = [];
        const [x, y] = coordinates;
        for(let i = 0; i < ship.length; i++) {
            if(position === "horizontally") {

                tempCords.push([x + i, y]);
            } else if(position === "vertically") {
                tempCords.push([x, y + i]);
            }
        }

        for(const cord of tempCords) {
            if(cord[0] > 10 || cord[1] > 10) {

                return "You can't position ships outside the map!";
            }
        }

        shipCoordinates = tempCords;

        this.ships.push({ship, coordinates: shipCoordinates});
    }


    receiveAttack(coordinates) {

        const alreadyAttacked = this.attackedCoordinates.some((coordinate) => {
            return coordinate[0] === coordinates[0] && coordinate[1] === coordinates[1]
        });

        if(alreadyAttacked) {
            return "You cant attack same coordinate twice!";
        }

        this.attackedCoordinates.push(coordinates);



        let hit = false;

        for(const ship of this.ships) {
            if(ship.coordinates.some((coord) => {
                return coord[0] === coordinates[0] && coord[1] === coordinates[1]
            })) {
                ship.ship.hit();
                hit = true;
            }
        }

        if(hit === false) {
            this.missedAttacks.push(coordinates);
        }



    }


    areAllShipsSunk() {
        for( const {ship} of this.ships) {
            if(ship.isSunk() != true) {
                return false;
            }
        }
        return true;
        }

}