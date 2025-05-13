export function Ship() {
   const addShip = (name, length) => {
        return {
            name,
            length,
            hitCount: 0,
            sunk: false,
            leftCol: "",
            rightCol: "",
            upRow: "",
            downRow: "",

            hit() {
                this.hitCount++;
                this.isSunk();
            },

            isSunk() {
                if (this.hitCount >= this.length) {
                    this.sunk = true;
                }
            },

            setPositions() {
                if (this.length === 2) {
                    this.rightCol = 8;
                    this.leftCol = 1;
                    this.downRow = 8;
                    this.upRow = 1;
                } else if (this.length === 3) {
                    this.rightCol = 7;
                    this.leftCol = 2;
                    this.downRow = 7;
                    this.upRow = 2;
                } else if (this.length === 4) {
                    this.rightCol = 6;
                    this.leftCol = 3;
                    this.downRow = 6;
                    this.upRow = 3;
                } else if (this.length === 5) {
                    this.rightCol = 5;
                    this.leftCol = 4;
                    this.downRow = 5;
                    this.upRow = 4;
                }
            }, 

            shipDetails() {
                return `name: ${this.name}, length: ${this.length}, hits: ${this.hitCount}, sunk: ${this.sunk}`
            },

            gameShips() {
                const ship = Ship();

                const carrier = ship.addShip("carrier", 5);
                carrier.setPositions();

                const battleship = ship.addShip("battleship", 4);
                battleship.setPositions();

                const cruiser = ship.addShip("cruiser", 3);
                cruiser.setPositions();

                const submarine = ship.addShip("submarine", 3);
                submarine.setPositions();

                const destroyer = ship.addShip("destroyer", 2);
                destroyer.setPositions();

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
        if (shipName.name === "destroyer") {
            marking = "D";
        } else if (shipName.name === "cruiser") {
            marking = "CU";
        } else if (shipName.name === "carrier") {
            marking = "CA";
        } else if (shipName.name === "battleship") {
            marking = "B";
        } else if (shipName.name === "submarine") { 
            marking = "S";
        }

        if (direction === "right") {
            if (colStart <= 7 && rowStart <= shipName.rightCol) {
                let i = 0;
                while (i < shipName.length) {
                    i++;
                    array[rowStart][colStart++] = marking;
                }
            } 
        } else if (direction === "down") {
            if (rowStart <= shipName.downRow && colStart <= 9) {
                let i = 0;
                while (i < shipName.length) {
                    i++;
                    array[rowStart++][colStart] = marking;
                }
            }
        } else if (direction === "left") {
            if (colStart <= 9 && colStart >= shipName.leftCol && rowStart <= 9) {
                let i = 0;
                while (i < ship.length) {
                    i++;
                    array[rowStart][colStart--] = marking;
                }

            }
        } else if (direction === "up") {
            if (rowStart <= 9 && rowStart >= shipName.upRow && colStart <= 9) {
                let i = 0;
                while (i < shipName.length) {
                    i++;
                    array[rowStart--][colStart] = marking;
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
