import { Ship, Gameboard } from './script.js';
//const {Ship, Gameboard } = require("./script")


const gameboard = Gameboard();
//gameboard.gameboard();

test("Test ship details", () => {
    const cruiser = Ship("cruiser", 3);
    expect(cruiser.shipDetails()).toBe("name: cruiser, length: 3, hits: 0, sunk: false");
});

test("Test ship hits" ,() => {
    const cruiser = Ship("cruiser", 3);
    cruiser.hit();
    expect(cruiser.shipDetails()).toBe("name: cruiser, length: 3, hits: 1, sunk: false")
});
