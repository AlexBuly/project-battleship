class Ship {
    hit(hitTimes) {
        return `ship hit ${hitTimes} times`;
    }

    isSunk() {
       return "Has ship been sunk?";
    }
}

class Gameboard {
    receiveAttack() {
        return 'hit or miss';
    }
}

class Player {

}

const ship = new Ship();
const gameboard = new Gameboard();

console.log(ship.hit(6));
console.log(ship.isSunk());
console.log(gameboard.receiveAttack());