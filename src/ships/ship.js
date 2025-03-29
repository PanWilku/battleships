export class Ship {
    constructor(name) {
        this.name = name;
        this.hits = 0;
    }

    hit(value = 1) {
        this.hits += value;
        this.isSunk();
    }

    isSunk() {
        if(this.hits >= this.length) {
            console.log(`${this.name} is sunk!`);
            return true;
        } else {
            return false;
        }
    }

}


export class Carrier extends Ship {
    constructor() {
        super("Carrier");
        this.length = 5;
    }


}

export class Battleship extends Ship {
    constructor() {
        super("Battleship");
        this.length = 4;
    }
}

export class Crusier extends Ship {
    constructor() {
        super("Crusier");
        this.length = 3;
    }
}

export class Submarine extends Ship {
    constructor() {
        super("Submarine");
        this.length = 3;
    }
}

export class PatrolBoat extends Ship {
    constructor() {
        super("Patrol Boat");
        this.length = 2;
    }
}