// interface.js
//import { Gameboard } from "./script.js";
import { Ship } from "./script.js";
import { Gameboard } from "./script.js";

const gameD = document.querySelector(".game-board");
const ship = Ship();

 const gameboard = Gameboard();
 const carrier = gameboard.getCrusier();

 const board = gameboard.getBoard();
 gameD.textContent = board;

 gameboard.placeShip(carrier, board, 0, 0, "down");
 gameboard.recieveAttack(board, 0, 0);

 console.log(board);
 console.log(carrier);