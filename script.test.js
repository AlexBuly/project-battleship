import { Ship, Gameboard } from './script.js';


const ship = Ship();

const gameboard = Gameboard();
const cruiser = ship.addShip("cruiser", 3);

test("Test ship details", () => {
    expect(cruiser.shipDetails()).toBe("hits: 0 sunk: false");
});

test("Test ship hits" ,() => {
    cruiser.hit();
    expect(cruiser.shipDetails()).toBe("hits: 1 sunk: false");
});

test("Test ship sunk", () => {
    cruiser.hit();
    cruiser.hit();
    expect(cruiser.shipDetails()).toBe("hits: 3 sunk: true");
});