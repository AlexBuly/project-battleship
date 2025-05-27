// interface.js
import { Gameboard, Player } from "./script.js";

function GameController() {
    const board = Gameboard();
    const player = Player();
    const humanPlayer = player.addPlayer("human", board.getHumanBoard(), board.getHumanShips());
    const computerPlayer = player.addPlayer("computer", board.getComputerBoard(), board.getComputerShips());

     const getHuman = () => humanPlayer;
     const getComputer = () => computerPlayer;

      let gameRunning = true;

      let activePlayer = humanPlayer;
      let activeGameboard = computerPlayer.gameboard;
   

      const switchTurn = () => activePlayer = activePlayer === humanPlayer ? computerPlayer : humanPlayer;
      const switchGameboard = () => activeGameboard = activePlayer === humanPlayer ? computerPlayer.gameboard : humanPlayer.gameboard;

       const getActivePlayer = () => activePlayer;
       const getActiveGameboard = () => activeGameboard;


      const isRunning = () => gameRunning;


    const insert = (ship, array, rowStart, colStart, direction) => {
      board.placeShip(ship, array, rowStart, colStart, direction);
    };

    const attack = (row, col) => {
        board.recieveAttack(getActivePlayer().name, getActiveGameboard(), row, col);
        console.log(getActivePlayer().name);
        console.log(getActiveGameboard());

        if (gameRunning) {
         switchTurn();
         switchGameboard();
        }
    }

    return {
            insert, 
            attack, 
            getHuman,
            getComputer,
            getActivePlayer,
            isRunning,
            getHumanCarrier: board.getHumanCarrier,
            getHumanCruiser: board.getHumanCruiser,
            getHumanBattleShip: board.getHumanBattleShip,
            getHumanDestroyer: board.getHumanDestroyer,
            getHumanSubmarine: board.getHumanSubmarine,

            getComputerCarrier: board.getComputerCarrier,
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
    const playerBoard = document.querySelector(".player-board");
    const computerBoard = document.querySelector(".computer-board");


    // human
   game.insert(game.getHumanCarrier(), human.gameboard, 0, 0, "right");
   game.insert(game.getHumanCruiser(), human.gameboard, 8, 4, "up");
   game.insert(game.getHumanDestroyer(), human.gameboard, 1, 9, "left");
   game.insert(game.getHumanBattleShip(), human.gameboard, 4, 3, "right");
   game.insert(game.getHumanSubmarine(), human.gameboard, 9, 9, "up");

    // computer 
   game.insert(game.getComputerCarrier(), computer.gameboard, 3, 7, "down");
   game.insert(game.getComputerCruiser(), computer.gameboard, 2, 5, "up");
   game.insert(game.getComputerDestoryer(), computer.gameboard, 8, 8, "right");
   game.insert(game.getComputerBattleShip(), computer.gameboard, 9, 0, "up");
   game.insert(game.getComputerSubmarine(), computer.gameboard, 4, 3, "down");

   /*game.attack(0, 5);
   game.attack(0, 0);
   game.attack(8, 8);
   game.attack(0, 2);
   game.attack(8, 9);*/

    const cruiserInfo = document.querySelector(".cruiser-info");
    const carrierInfo = document.querySelector(".carrier-info");
    const destroyerInfo = document.querySelector(".destroyer-info");
    const battleshipInfo = document.querySelector(".battleship-info");
    const submarineInfo = document.querySelector(".submarine-info");

    const cruiserInfoC = document.querySelector(".cruiser-infoC");
    const carrierC = document.querySelector(".carrier-infoC");
    const destroyerInfoC = document.querySelector(".destroyer-infoC");
    const battleshipInfoC = document.querySelector(".battleship-infoC");
    const submarineInfoC = document.querySelector(".submarine-infoC");

    const playerName = document.querySelector(".player-name");
    playerName.textContent = game.getHuman().name;

    const computerName = document.querySelector(".computer-name");
    computerName.textContent = game.getComputer().name;

    const updateScreen = () => {
      playerBoard.textContent = "";
      computerBoard.textContent = "";
      displayBoard(human.gameboard, "player-cell", playerBoard);
      displayBoard(computer.gameboard, "computer-cell", computerBoard);

      cruiserInfo.textContent = game.getHumanCruiser().shipDetails();
      carrierInfo.textContent = game.getHumanCarrier().shipDetails();
      destroyerInfo.textContent = game.getHumanDestroyer().shipDetails();
      battleshipInfo.textContent = game.getHumanBattleShip().shipDetails();
      submarineInfo.textContent = game.getHumanSubmarine().shipDetails();

      cruiserInfoC.textContent = game.getComputerCruiser().shipDetails();
      carrierC.textContent = game.getComputerCarrier().shipDetails();
      destroyerInfoC.textContent = game.getComputerDestoryer().shipDetails();
      battleshipInfoC.textContent = game.getComputerBattleShip().shipDetails();
      submarineInfoC.textContent = game.getComputerSubmarine().shipDetails();  
    }
   

    const clickHandler = (e) => {
       const selectedColumn = e.target.dataset.column;
       const selectedRow = e.target.dataset.row;

       if (!selectedColumn || !selectedRow) return;
       game.attack(parseInt(selectedRow), parseInt(selectedColumn));
       updateScreen();
    }

    playerBoard.addEventListener("click", clickHandler);
    computerBoard.addEventListener("click", clickHandler);
    updateScreen();   
 }

 GameDisplay();
 
