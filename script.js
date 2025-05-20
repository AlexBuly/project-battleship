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

         };
   }
   
   return {addShip}
}

export function Gameboard () {
    const addBoard = (array) => {
        const rows = 10;
        const columns = 10;

        for (let i = 0; i < rows; i++) {
            array[i] = [];
            for (let j = 0; j < columns; j++) {
                array[i][j] = "";
            }
        }
    }
    const ship = Ship();
    
    const carrier = ship.addShip("carrier", 5);
    const cruiser = ship.addShip("cruiser", 3);
    const submarine = ship.addShip("submarine", 3);
    const destroyer = ship.addShip("destroyer", 2);
    const battleship = ship.addShip("battleship", 4);


    const playerBoard = [];
    const computerBoard = [];

    addBoard(playerBoard);
    addBoard(computerBoard);

    const getPlayerBoard = () => playerBoard;
    const getComputerBoard = () => computerBoard;

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

        switch (guess) {
            case "D" : destroyer.hit(); break;
            case "CA" : carrier.hit(); break;
            case "CU" : cruiser.hit(); break;
            case "B" : battleship.hit(); break;
            case "S" : submarine.hit(); break;
            default: return;
        }

        return guess !== "" ? console.log("hit") : console.log("miss");
    }

    const getCarrier = () => carrier;
    const getBattleship = () => battleship;
    const getSubmarine = () => submarine;
    const getCrusier = () => cruiser;
    const getDestroyer = () => destroyer;

    return {placeShip, getPlayerBoard, getComputerBoard, recieveAttack, getCarrier, getBattleship, getSubmarine, getCrusier, getDestroyer}
}

export function Player() {
    const addPlayer = (name, gameboard) => {
        return {
            name,
            gameboard,
        }
    }
    return {addPlayer}
}

 export function GameController() {
    const board = Gameboard();

    const insert = (ship, array, rowStart, colStart, direction) => {
        board.placeShip(ship, array, rowStart, colStart, direction);
    }

    const playRound = (array, row, col, ) => {
        board.recieveAttack(array, row, col);
    }
    return {
            insert, 
            playRound, 
            getPlayerBoard: board.getPlayerBoard, 
            getComputerBoard: board.getComputerBoard,
            getCarrier: board.getCarrier,
            getBattleship: board.getBattleship,
            getSubmarine: board.getSubmarine,
            getCrusier: board.getCrusier,
            getDestroyer: board.getDestroyer
        }
}