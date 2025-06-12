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

    const arr = Array.from({length: 10}, () => new Array(10).fill(""));

    const checkWin = () => {
      if (board.getComputerBattleShip().sunk == true &&
          board.getComputerCruiser().sunk == true &&
          board.getComputerCarrier().sunk == true &&
          board.getComputerSubmarine().sunk == true &&
          board.getComputerDestoryer().sunk == true
          ||
          board.getHumanBattleShip().sunk == true &&
          board.getHumanCarrier().sunk == true &&
          board.getHumanDestroyer().sunk == true &&
          board.getHumanCruiser.sunk == true &&
          board.getHumanSubmarine.sunk == true
        ) {
          gameRunning = false;
        }
    }


    const randomRow = () => Math.floor(Math.random() * arr.length);
    const randomCol = () => Math.floor(Math.random() * arr.length);
    

    const attack = (row, col) => {
        board.recieveAttack(getActivePlayer().name, getActiveGameboard(), row, col);
        checkWin();

        if (gameRunning) {
         switchTurn();
         switchGameboard();
         randomRow();
         randomCol(); 
        }
    }

    return {
            insert, 
            attack,
            randomRow,
            randomCol,
            getHuman,
            getComputer,
            getActivePlayer,
            isRunning,
            getAttackMessage: board.getAttackMessage,
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
            cellButton.style.border = "2px solid black";

            if (className == "computer-cell") {
              cellButton.textContent == "X" || cellButton.textContent == "O" ? cellButton.style.color = "black" :
              cellButton.style.color = "white";
            }

            if (cellButton.textContent == "X") cellButton.style.backgroundColor = "rgb(207, 76, 76)";
            parent.appendChild(cellButton);
         });
      })
   }
    const game = GameController();
    const human = game.getHuman();
    const computer = game.getComputer();
    const playerBoard = document.querySelector(".player-board");
    const computerBoard = document.querySelector(".computer-board");

    const cruiserBtn = document.querySelector(".cruiser-btn");
    const carrierBtn = document.querySelector(".carrier-btn");
    const battleshipBtn = document.querySelector(".battleship-btn");
    const submarineBtn = document.querySelector(".submarine-btn");
    const destroyerBtn = document.querySelector(".destroyer-btn");

    cruiserBtn.addEventListener("click", () => {
     game.insert(game.getHumanCruiser(), human.gameboard, parseInt(prompt("Enter row:")), parseInt(prompt("Enter column:")), prompt("Enter direction (left, right, up, down):"));
     updateScreen();
    });

    carrierBtn.addEventListener("click", () => {
      game.insert(game.getHumanCarrier(), human.gameboard, parseInt(prompt("Enter row:")), parseInt(prompt("Enter column:")), prompt("Enter direction (left, right, up, down):"));
      updateScreen();
    });

    battleshipBtn.addEventListener("click", () => {
      game.insert(game.getHumanBattleShip(), human.gameboard, parseInt(prompt("Enter row:")), parseInt(prompt("Enter column:")), prompt("Enter direction (left, right, up, down"));
      updateScreen();
    });

    submarineBtn.addEventListener("click", () => {
      game.insert(game.getHumanSubmarine(), human.gameboard, parseInt(prompt("Enter row:")), parseInt(prompt("Enter column:")), prompt("Enter direction (left, right, up, down):"));
      updateScreen();
    });

    destroyerBtn.addEventListener("click", () => {
      game.insert(game.getHumanDestroyer(), human.gameboard, parseInt(prompt("Enter row:")), parseInt(prompt("Enter column:")), prompt("Enter direction (left, right, up, down):"));
      updateScreen();
    });

    const directions = ["up", "down", "left", "right"];

const isPlacementValid = (array, rowStart, colStart, direction, len) => {
    if (direction === "right") {
        if (colStart + len <= 10) {
            for (let i = 0; i < len; i++) {
                if (array[rowStart][colStart + i] !== "") return false;
            }
            return true;
        }
    } else if (direction === "down") {
        if (rowStart + len <= 10) {
            for (let i = 0; i < len; i++) {
                if (array[rowStart + i][colStart] !== "") return false;
            }
            return true;
        }
    } else if (direction === "left") {
        if (colStart - len + 1 >= 0) {
            for (let i = 0; i < len; i++) {
                if (array[rowStart][colStart - i] !== "") return false;
            }
            return true;
        }
    } else if (direction === "up") {
        if (rowStart - len + 1 >= 0) {
            for (let i = 0; i < len; i++) {
                if (array[rowStart - i][colStart] !== "") return false;
            }
            return true;
        }
    }
    return false;
};

const placeShipRandomly = (ship, array) => {
    let placed = false;
    while (!placed) {
        const row = game.randomRow();
        const col = game.randomCol();
        const direction = directions[Math.floor(Math.random() * directions.length)];
        if (isPlacementValid(array, row, col, direction, ship.length)) {
            game.insert(ship, array, row, col, direction);
            placed = true;
        }
    }
};

const randomizeComputerShips = () => {
    const board = computer.gameboard;


    placeShipRandomly(game.getComputerCarrier(), board);
    placeShipRandomly(game.getComputerCruiser(), board);
    placeShipRandomly(game.getComputerDestoryer(), board);
    placeShipRandomly(game.getComputerBattleShip(), board);
    placeShipRandomly(game.getComputerSubmarine(), board);

    updateScreen();  
};

document.querySelector(".game-start").addEventListener("click", () => {
  randomizeComputerShips();
  document.querySelector(".game-start").style.visibility = "hidden";

});

    const cruiserInfo = document.querySelector(".cruiser-info");
    const carrierInfo = document.querySelector(".carrier-info");
    const destroyerInfo = document.querySelector(".destroyer-info");
    const battleshipInfo = document.querySelector(".battleship-info");
    const submarineInfo = document.querySelector(".submarine-info");

    const computerCell = document.querySelector(".computer-cell");

    let message = document.querySelector(".attack-message");

    const playerName = document.querySelector(".player-name");
    playerName.textContent = game.getHuman().name;

    const computerName = document.querySelector(".computer-name");
    computerName.textContent = game.getComputer().name;

    const updateScreen = () => {
      playerBoard.textContent = "";
      computerBoard.textContent = "";
      const running = game.isRunning();
      displayBoard(human.gameboard, "player-cell", playerBoard);
      displayBoard(computer.gameboard, "computer-cell", computerBoard);
      const attackMessage = game.getAttackMessage();
      const winMessage = `${game.getActivePlayer().name} wins!`;

      if (!running) {
        message.textContent = winMessage;
      } 
        
      message.textContent = attackMessage;
      
      cruiserInfo.textContent = game.getHumanCruiser().shipDetails();
      carrierInfo.textContent = game.getHumanCarrier().shipDetails();
      destroyerInfo.textContent = game.getHumanDestroyer().shipDetails();
      battleshipInfo.textContent = game.getHumanBattleShip().shipDetails();
      submarineInfo.textContent = game.getHumanSubmarine().shipDetails();
    }

    const takeTurn = (row = null, col = null) => {
      if (!game.isRunning()) return;

      if (game.getActivePlayer().name === "human") {
        if (row !== null && col !== null) {
          game.attack(row, col);
          updateScreen();
          setTimeout(() => takeTurn(), 500);
        }
      } else {
        let row, col;
        do {
          row = game.randomRow();
          col = game.randomCol();
        } while (game.getHuman().gameboard[row][col] === "X" || game.getHuman().gameboard[row][col] === "O");

        game.attack(row, col);

        updateScreen();
      }
    }

    const clickHandler = (e) => {
        if (game.getActivePlayer().name !== "human") return;

        const selectedColumn = parseInt(e.target.dataset.column);
        const selectedRow = parseInt(e.target.dataset.row);
        takeTurn(selectedRow, selectedColumn);
    }

    computerBoard.addEventListener("click", clickHandler);


    updateScreen();   
 }

 GameDisplay();
 
