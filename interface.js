// interface.js
//import { Gameboard } from "./script.js"
import { Gameboard } from "./script.js";

 const gameboard = Gameboard();
 const carrier = gameboard.getCarrier();
 const cruiser = gameboard.getCrusier();
 const submarine = gameboard.getSubmarine();
 const destroyer = gameboard.getDestroyer();
 const battleship = gameboard.getBattleship();

 const board = gameboard.getBoard();

 gameboard.placeShip(carrier, board, 0, 0, "down");
 gameboard.placeShip(destroyer, board, 0, 2, "down");
 gameboard.placeShip(submarine, board, 9, 4, "right");
 gameboard.placeShip(battleship, board, 1, 9, "down");
 gameboard.placeShip(cruiser, board, 9, 1, "up");

 gameboard.recieveAttack(board, 0, 0);

 console.log(board);
 console.log(carrier);


 function grid() {
   const gameBoard = document.querySelector(".board");

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
 }

 grid();