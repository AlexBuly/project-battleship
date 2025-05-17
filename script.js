export function Ship() {
   const addShip = (name, length) => {
        return {
            name,
            length,
            hitCount: 0,
            sunk: false,

            hit() {
                this.hitCount++;
                this.isSunk();
            },

            isSunk() {
                if (this.hitCount >= this.length) {
                    this.sunk = true;
                }
            },

            shipDetails() {
                return `name: ${this.name}, length: ${this.length}, hits: ${this.hitCount}, sunk: ${this.sunk}`
            },

            gameShips() {
                const ship = Ship();

                const carrier = ship.addShip("carrier", 5);
                const battleship = ship.addShip("battleship", 4);
                const cruiser = ship.addShip("cruiser", 3);
                const submarine = ship.addShip("submarine", 3);
                const destroyer = ship.addShip("destroyer", 2);

                const getCarrier = () => carrier;
                const getBattleship = () => battleship;
                const getSubmarine = () => submarine;
                const getCrusier = () => cruiser;
                const getDestroyer = () => destroyer;

              
                 
                return {getCarrier, getBattleship, getSubmarine, getCrusier, getDestroyer}
            }

         };
   }
   return {addShip}
}

export function Gameboard () {
    const ship = Ship();
    const addShips = ship.addShip();
    const gameShips = addShips.gameShips();
    const carrier = gameShips.getCarrier()
    const cruiser = gameShips.getCrusier()
    const submarine = gameShips.getSubmarine();
    const destroyer = gameShips.getDestroyer();
    const battleship = gameShips.getBattleship();

    const gridCells = [];
    const rows = 10;
    const columns = 10;
    
    for (let i = 0; i < rows; i++) {
      gridCells[i] = [];
      for (let j = 0; j < columns; j++) {
        gridCells[i][j] = "";
      }
    }

    const getBoard = () => gridCells;

    const placeShip = (shipName, array, rowStart, colStart, direction) => {
        let marking

        switch (shipName.name) {
            case "destroyer": marking = "D"; break;
            case "cruiser": marking = "CU"; break;
            case "carrier": marking = "CA"; break;
            case "battleship": marking = "B"; break;
            case "submarine": marking = "S"; break;
            default: return; 
        }

        const len = shipName.length;

        if (direction === "right") {
            if (colStart + len <= 10) {
                for (let i = 0; i < len; i++) {
                    array[rowStart][colStart + i] = marking;
                }
            }
        } else if (direction === "down") {
            if (rowStart + len <= 10) {
                for (let i = 0; i < len; i++) {
                    array[rowStart + i][colStart] = marking;
                }
            }
        } else if (direction === "left") {
            if (colStart - len + 1 >= 0) {
                for (let i = 0; i < len; i++) {
                    array[rowStart][colStart - i] = marking;
                }
            }
        } else if (direction === "up") {
            if (rowStart - len + 1 >= 0) {
                for (let i = 0; i < len; i++) {
                    array[rowStart - i][colStart] = marking;
                }
            }
        }
    }

    const recieveAttack = (array, row, col) => {
        const guess = array[row][col];
        
        if (guess === "D") {
            destroyer.hit();
            console.log("hit");
        } else if (guess === "CA") {
            carrier.hit();
            console.log("hit");
            return "hit";
        } else if (guess === "CU") {
            cruiser.hit();
            console.log("hit");
        } else if (guess === "B") {
            battleship.hit();
            console.log("hit");
        } else if (guess === "S") {
            submarine.hit();
            console.log("hit");
        } else {
            console.log("miss");
        }
    }

    const getCarrier = () => carrier;
    const getBattleship = () => battleship;
    const getSubmarine = () => submarine;
    const getCrusier = () => cruiser;
    const getDestroyer = () => destroyer;

    return {placeShip, getBoard, recieveAttack, getCarrier, getBattleship, getSubmarine, getCrusier, getDestroyer}
}
