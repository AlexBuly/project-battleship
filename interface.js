// interface.js
import { Gameboard } from "./script.js";

const gameboard = Gameboard();

const rows = 10;
const columns = 10;
 const board = [];
 const div = document.querySelector(".game-board");

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            const l = document.createElement("button");
            board[i].push(gameboard.getBoard());
            div.appendChild(l);
        }
    }