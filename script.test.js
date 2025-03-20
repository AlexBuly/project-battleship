const { Ship } = require("./script");

const ship = new Ship(2);

test('initial ship method', () => {
    ship.isSunk();
    expect(ship.shipDetails()).toBe("length: 2, hit: 0, sunk: false");
});

test('ship hits', () => {
    ship.hits();
    expect(ship.hits()).toBe(1);
})

test('is ship sink?', () => {
    ship.hits();
    ship.isSunk();
    expect(ship.isSunk()).toBe(true);
});