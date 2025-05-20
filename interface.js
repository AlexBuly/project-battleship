
// interface.js
import { GameController } from "./script.js";

 function GameDisplay() {
    const game = GameController();
    const carrier = game.getCarrier();
    const cruiser = game.getCrusier();
    const submarine = game.getSubmarine();
    const destroyer = game.getDestroyer();
    const battleship = game.getBattleship();

    let currentShip;

    const board = game.getBoard();
    const gameBoard = document.querySelector(".board");

    game.insert(carrier, board, 0, 0, "down");
    game.insert(destroyer, board, 0, 2, "down");
    game.insert(submarine, board, 9, 4, "right");
    game.insert(battleship, board, 1, 9, "down");
    game.insert(cruiser, board, 9, 1, "up");

    game.playRound(board, 9, 4);
    game.playRound(board, 9, 5);
    game.playRound(board, 9, 6);

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
    

    board.forEach((row, rowIndex) => {
              row.forEach((cell, colIndex) => {
              const cellButton = document.createElement("button");
              cellButton.classList.add("cell");
              cellButton.dataset.row = rowIndex;
              cellButton.dataset.column = colIndex;
              cellButton.textContent = board[rowIndex][colIndex];
              gameBoard.appendChild(cellButton);
              });
          });

    const clickHandler = (e) => {
       const selectedColumn = e.target.dataset.column;
       const selectedRow = e.target.dataset.row;
    }

    return {clickHandler}

    
 }

 GameDisplay();
