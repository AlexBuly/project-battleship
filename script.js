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

function Gameboard () {
    const gridCells = [];
    const rows = 10;
    const columns = 10;
    
    for (let i = 0; i < rows; i++) {
      gridCells[i] = [];
      for (let j = 0; j < columns; j++) {
        gridCells[i][j] = [];
      }
    }
           
    const gameboard = () => {
        console.log(gridCells); 
    }

    const placeShip = (rowStart, colStart, direction) => {
        if (direction === "right") {
            if (colStart <= 7 && rowStart <= 9) {
                let i = 0;
                while (i < 3) {
                    i++;
                    gridCells[rowStart][colStart++] = "X";
                }
            } 
        } else if (direction === "down") {
            if (rowStart <= 7 && colStart <= 9) {
                let i = 0;
                while (i < 3) {
                    i++;
                    gridCells[rowStart++][colStart] = "X";
                }
            }
        } else if (direction === "left") {
            if (colStart <= 9 && colStart >= 2 && rowStart <= 9) {
                let i = 0;
                while (i < 3) {
                    i++;
                    gridCells[rowStart][colStart--] = "X";
                }

            }
        } else if (direction === "up") {
            if (rowStart <= 9 && rowStart >= 2 && colStart <= 9) {
                let i = 0;
                while (i < 3) {
                    i++;
                    gridCells[rowStart--][colStart] = "X";
                }
            }
        } 
    }



    return {gameboard, placeShip}
}

const gameboard = Gameboard();
gameboard.placeShip(0, 3, "right");
gameboard.gameboard();


class Player {
    // player
    // computer

}

module.exports = { Ship };