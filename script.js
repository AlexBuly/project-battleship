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
                return `hits: ${this.hitCount} sunk: ${this.sunk}`
            },

         };
    }

    const HumanShips = () => {
        const humanCarrier = addShip("carrier", 5);
        const humanCruiser = addShip("cruiser", 3);
        const humanSubmarine = addShip("submarine", 3);
        const humanDestroyer = addShip("destroyer", 2);
        const humanBattleShip = addShip("battleship", 4);

        const getHumanCarrier = () => humanCarrier;
        const getHumanCruiser = () => humanCruiser;
        const getHumanSubmarine = () => humanSubmarine;
        const getHumanDestroyer = () => humanDestroyer;
        const getHumanBattleShip = () => humanBattleShip;

        return {getHumanCarrier, getHumanCruiser, getHumanSubmarine, getHumanDestroyer, getHumanBattleShip};
    }

    const ComputerShips = () => {
        const computerCarrier = addShip("carrier", 5);
        const computerCruiser = addShip("cruiser", 3);
        const computerSubmarine = addShip("submarine", 3);
        const computerDestroyer = addShip("destroyer", 2);
        const computerBattleShip = addShip("battleship", 4);

        const getComputerCarrier = () => computerCarrier;
        const getComputerCruiser = () => computerCruiser;
        const getComputerSubmarine = () => computerSubmarine;
        const getComputerDestoryer = () => computerDestroyer;
        const getComputerBattleShip = () => computerBattleShip;

        return {getComputerCarrier, getComputerCruiser, getComputerSubmarine, getComputerDestoryer, getComputerBattleShip}
    }

    const ships = () => {
        const humanShips = HumanShips();
        const computerShips = ComputerShips();
        const getHumanShips = () => humanShips;
        const getComputerShips = () => computerShips;
        return {
            humanCarrier: humanShips.getHumanCarrier,
            humanCruiser: humanShips.getHumanCruiser,
            humanSubmarine: humanShips.getHumanSubmarine,
            humanDestroyer: humanShips.getHumanDestroyer,
            humanBattleShip: humanShips.getHumanBattleShip,
            getHumanShips, 

            computerCarrier: computerShips.getComputerCarrier,
            computerCruiser: computerShips.getComputerCruiser,
            computerSubmarine: computerShips.getComputerSubmarine,
            computerDestroyer: computerShips.getComputerDestoryer,
            computerBattleShip: computerShips.getComputerBattleShip,
            getComputerShips
        }
    }
   
   return {addShip, ships}
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

    const playerBoard = [];
    const computerBoard = [];

    addBoard(playerBoard);
    addBoard(computerBoard);

    const getHumanBoard = () => playerBoard;
    const getComputerBoard = () => computerBoard;

    const ship = Ship();
    const ships = ship.ships();
    const humanShips = ships.getHumanShips();
    const humanCarrier = ships.humanCarrier();
    const humanCruiser = ships.humanCruiser();
    const humanDestroyer = ships.humanDestroyer();
    const humanBattleShip = ships.humanBattleShip();
    const humanSubmarine = ships.humanSubmarine();

    const computerCarrier = ships.computerCarrier();
    const computerCruiser = ships.computerCruiser(); 
    const computerDestroyer = ships.computerDestroyer();
    const computerBattleShip = ships.computerBattleShip();
    const computerSubmarine = ships.computerSubmarine();
    const computerShips = ships.getComputerShips();

    const placeShip = (shipName, array, rowStart, colStart, direction) => {
        let marking;

        if (array[rowStart][colStart] == "") {
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
                } else {
                    alert("Invalid move")
                }
            } else if (direction === "down") {
                if (rowStart + len <= 10) {
                    for (let i = 0; i < len; i++) {
                        array[rowStart + i][colStart] = marking;
                    }
                } else {
                    alert("Invalid move")
                }
            } else if (direction === "left") {
                if (colStart - len + 1 >= 0) {
                    for (let i = 0; i < len; i++) {
                        array[rowStart][colStart - i] = marking;
                    }
                } else {
                    alert("Invalid move")
                }
            } else if (direction === "up") {
                if (rowStart - len + 1 >= 0) {
                    for (let i = 0; i < len; i++) {
                        array[rowStart - i][colStart] = marking;
                    }
                } else {
                    alert("Invalid move");
                }
            } else {
                alert("Invalid move");
            }            
        }
    }

    let attackMessage;

    const recieveAttack = (turn, array, row, col) => {
        const guess = array[row][col];

         if (guess === "") {
            attackMessage = "miss";
            array[row][col] = "O";
           } else if (guess !== "") {
            attackMessage = "hit";
            array[row][col] = "X";
           }

        if (turn === "human") {
             switch (guess) {
                case "D" : computerDestroyer.hit(); break;
                case "CA" : computerCarrier.hit(); break;
                case "CU" : computerCruiser.hit(); break;
                case "B" : computerBattleShip.hit(); break;
                case "S" : computerSubmarine.hit(); break;
                default: return;
            }
          
        } else if (turn === "computer") {
            switch (guess) {
                case "D" : humanDestroyer.hit(); break;
                case "CA" : humanCarrier.hit(); break;
                case "CU" : humanCruiser.hit(); break;
                case "B" : humanBattleShip.hit(); break
                case "S" : humanSubmarine.hit(); break;
                default: return;
            }
        }
    }

    const getAttackMessage = () => attackMessage;

    return {
            placeShip, 
            addBoard,
            getAttackMessage, 
            recieveAttack,
            getHumanBoard,
            getComputerBoard,
            getHumanCarrier: humanShips.getHumanCarrier,
            getHumanCruiser: humanShips.getHumanCruiser,
            getHumanBattleShip: humanShips.getHumanBattleShip,
            getHumanDestroyer: humanShips.getHumanDestroyer,
            getHumanSubmarine: humanShips.getHumanSubmarine,

            getComputerCarrier: computerShips.getComputerCarrier,
            getComputerCruiser: computerShips.getComputerCruiser,
            getComputerBattleShip: computerShips.getComputerBattleShip,
            getComputerDestoryer: computerShips.getComputerDestoryer,
            getComputerSubmarine: computerShips.getComputerSubmarine,

            getHumanShips: ships.getHumanShips,
            getComputerShips: ships.getComputerShips
    }

}

export function Player() {
    const addPlayer = (name, gameboard, ships) => {
        return {
            name,
            gameboard,
            ships
        }
    }
    return {addPlayer}
}