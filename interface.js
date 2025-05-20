
// interface.js
import { GameController } from "./script.js";

 function GameDisplay() {
   const displayBoard = (board, className, parent) => {
      board.forEach((row, rowIndex) => {
         row.forEach((colIndex) => {
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
    const carrier = game.getCarrier();
    const cruiser = game.getCrusier();
    const submarine = game.getSubmarine();
    const destroyer = game.getDestroyer();
    const battleship = game.getBattleship();

    const getplayerBoard = game.getPlayerBoard();
    const getComputerBoard = game.getComputerBoard();

    const playerBoard = document.querySelector(".player-board");
    const computerBoard = document.querySelector(".computer-board");

    const cruiserInfo = document.querySelector(".cruiser-info");
    cruiserInfo.textContent = cruiser.shipDetails();
    const carrierInfo = document.querySelector(".carrier-info");
    carrierInfo.textContent = carrier.shipDetails();
    const destroyerInfo = document.querySelector(".destroyer-info");
    destroyerInfo.textContent = destroyer.shipDetails();
    const battleshipInfo = document.querySelector(".battleship-info");
    battleshipInfo.textContent = battleship.shipDetails();
    const submarineInfo = document.querySelector(".submarine-info");
    submarineInfo.textContent = submarine.shipDetails();
    
    displayBoard(getplayerBoard, "player-cell", playerBoard);
    displayBoard(getComputerBoard, "computer-cell", computerBoard)

    const clickHandler = (e) => {
       const selectedColumn = e.target.dataset.column;
       const selectedRow = e.target.dataset.row;
    }

    return {clickHandler}

    
 }

 GameDisplay();
