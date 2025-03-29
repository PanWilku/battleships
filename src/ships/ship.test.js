import { Ship, Carrier, Battleship, Crusier, Submarine, PatrolBoat } from "./ship";


test('carrier initializes with proper length and name', () => {
    const ship = new Carrier();
    expect(ship.length).toBe(5);
    expect(ship.name).toBe("Carrier");
});

test('battleship initializes with proper length and name', () => {
    const ship = new Battleship();
    expect(ship.length).toBe(4);
    expect(ship.name).toBe("Battleship");
});

test('crusier initializes with proper length and name', () => {
    const ship = new Crusier();
    expect(ship.length).toBe(3);
    expect(ship.name).toBe("Crusier");
});

test('submarine initializes with proper length and name', () => {
    const ship = new Submarine();
    expect(ship.length).toBe(3);
    expect(ship.name).toBe("Submarine");
});

test('patrol boat initializes with proper length and name', () => {
    const ship = new PatrolBoat();
    expect(ship.length).toBe(2);
    expect(ship.name).toBe("Patrol Boat");
});


test('increments hit when ship is hit', () => {
    const ship = new Carrier();
    ship.hit();
    expect(ship.hits).toBe(1);
});

test('returns true when ship sunk', () => {
    const ship = new Carrier();
    ship.hit(5);
    expect(ship.isSunk()).toBe(true);
});

test('returns false when ship didnt recieve enough hits', () => {
    const ship1 = new Carrier();
    ship1.hit(4);
    expect(ship1.isSunk()).toBe(false);

    const ship2 = new Submarine();
    ship2.hit(2);
    expect(ship2.isSunk()).toBe(false);
});