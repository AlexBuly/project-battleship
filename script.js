function Ship(length) {
    const ship = {
        length,
        Hit: 0,
        sunk: false,

        shipDetails() {
            return `length: ${this.length}, hit: ${this.Hit}, sunk: ${this.sunk}`
        },

        hits() {
            return this.Hit++;
        },

        isSunk() {
            if (this.Hit >= this.length) {
                return this.sunk = true;
            } 
        }


    }
    return ship
}

const Gameboard = () => {
    
}

class Player {
    // player
    // computer

}

module.exports = { Ship };