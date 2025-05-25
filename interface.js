// interface.js
import { Gameboard, Player } from "./script.js";

function GameController() {
    const board = Gameboard();
    const humanShips = board.getHumanShips();
    const computerShips = board.getComputerShips();

    const playerBoard = [];
    const computerBoard = [];

    board.addBoard(playerBoard);
    board.addBoard(computerBoard);

    const player = Player();
    const humanPlayer = player.addPlayer("human", playerBoard, humanShips);
    const computerPlayer = player.addPlayer("computer", computerBoard, computerShips);

    const getHuman = () => humanPlayer;
    const getComputer = () => computerPlayer;

    const insert = (ship, array, rowStart, colStart, direction) => {
        board.placeShip(ship, array, rowStart, colStart, direction);
    }

    const attack = (turn, array, row, col, ) => {
        board.recieveAttack(turn, array, row, col);
    }
    return {
            insert, 
            attack, 
            getHuman,
            getComputer,
            getHumanCarrier: board.getHumanCarrier,
            getHumanCruiser: board.getHumanCruiser,
            getHumanBattleShip: board.getHumanBattleShip,
            getHumanDestroyer: board.getHumanDestroyer,
            getHumanSubmarine: board.getComputerSubmarine,

            getComputerCarrier: board.getHumanCarrier,
            getComputerCruiser: board.getComputerCruiser,
            getComputerDestoryer: board.getComputerDestoryer,
            getComputerBattleShip: board.getComputerBattleShip,
            getComputerSubmarine: board.getComputerSubmarine
        }
}


 function GameDisplay() {
   const displayBoard = (board, className, parent) => {
      board.forEach((row, rowIndex) => {
         row.forEach((cell, colIndex) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add(className);
            cellButton.dataset.row = rowIndex;
            cellButton.dataset.column = colIndex;
            cellButton.textContent = board[rowIndex][colIndex];
            parent.appendChild(cellButton);
         });
      })
   }
    const game = GameController();
    const human = game.getHuman();

    const computer = game.getComputer();
    const humanCarrier = game.getHumanCarrier();
    const humanCruiser = game.getHumanCruiser();
    const humanBattleShip = game.getHumanBattleShip();
    const humanDestroyer = game.getHumanDestroyer();
    const humanSubmarine = game.getHumanSubmarine();

    const computerCarrier = game.getComputerCarrier();
    const computerCruiser = game.getComputerCruiser();
    const computerDestroyer = game.getComputerDestoryer();
    const computerBattleShip = game.getComputerBattleShip();
    const computerSubmarine = game.getComputerSubmarine();


    console.log(human);

    // human
    game.insert(humanCarrier, human.gameboard, 0, 0, "right");
    game.insert(humanCruiser, human.gameboard, 8, 4, "up");
    game.insert(humanDestroyer, human.gameboard, 1, 9, "left");
    game.insert(humanBattleShip, human.gameboard, 4, 3, "right");
    game.insert(humanSubmarine, human.gameboard, 9, 9, "up");

    // computer 
    game.insert(computerCarrier, computer.gameboard, 3, 7, "down");
    game.insert(computerCruiser, computer.gameboard, 2, 5, "up");
    game.insert(computerDestroyer, computer.gameboard, 8, 8, "right");
    game.insert(computerBattleShip, computer.gameboard, 9, 0, "up");
    game.insert(computerSubmarine, computer.gameboard, 4, 3, "down");

    game.attack("player", computer.gameboard, 0, 0);
    game.attack("computer", human.gameboard, 1, 8);
    game.attack("player", computer.gameboard, 8, 0);
    game.attack("computer", human.gameboard, 1, 9);


    const playerBoard = document.querySelector(".player-board");
    const computerBoard = document.querySelector(".computer-board");

    
    // if currentPlayer is human 
    const cruiserInfo = document.querySelector(".cruiser-info");
    cruiserInfo.textContent = humanCruiser.shipDetails();
    const carrierInfo = document.querySelector(".carrier-info");
    carrierInfo.textContent = humanCarrier.shipDetails();
    const destroyerInfo = document.querySelector(".destroyer-info");
    destroyerInfo.textContent = humanDestroyer.shipDetails();
    const battleshipInfo = document.querySelector(".battleship-info");
    battleshipInfo.textContent = humanBattleShip.shipDetails();
    const submarineInfo = document.querySelector(".submarine-info");
    submarineInfo.textContent = humanSubmarine.shipDetails();

    const cruiserInfoC = document.querySelector(".cruiser-infoC");
    cruiserInfoC.textContent = computerCruiser.shipDetails();
    const carrierC = document.querySelector(".carrier-infoC");
    carrierC.textContent = computerCarrier.shipDetails();
    const destroyerInfoC = document.querySelector(".destroyer-infoC");
    destroyerInfoC.textContent = computerDestroyer.shipDetails();
    const battleshipInfoC = document.querySelector(".battleship-infoC");
    battleshipInfoC.textContent = computerBattleShip.shipDetails();
    const submarineInfoC = document.querySelector(".submarine-infoC");
    submarineInfoC.textContent = computerSubmarine.shipDetails();

    const playerName = document.querySelector(".player-name");
    playerName.textContent = human.name;

    const computerName = document.querySelector(".computer-name");
    computerName.textContent = computer.name;
    
    displayBoard(human.gameboard, "player-cell", playerBoard);
    displayBoard(computer.gameboard, "computer-cell", computerBoard);

    const clickHandler = (e) => {
       const selectedColumn = e.target.dataset.column;
       const selectedRow = e.target.dataset.row;
    }

    return {clickHandler}

    
 }

 GameDisplay();
