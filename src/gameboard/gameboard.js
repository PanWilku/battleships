export class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
        this.attackedCoordinates = [];
    }

    placeShip(ship, coordinates, position) {
        let shipCoordinates = [];
        const [x, y] = coordinates;
        for(let i = 0; i < ship.length; i++) {
            if(position === "horizontally") {
                shipCoordinates.push([x + i, y]);
            } else if(position === "vertically") {
                shipCoordinates.push([x, y + i]);
            }
        }

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