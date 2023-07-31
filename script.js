// To do:
// add break time for computer
// add reset button
// Make an ai that can't be beaten
// Add difficulty levels
// Add better UI
// Add multiplayer

const gameInfo = (() => {
  const board = document.querySelector("#game-board");
  const cell = document.querySelectorAll(".cell");
  const winnerText = document.querySelector("#winner-text");
  let gameBoard = {
    board: [],
    players: {},
  };

  return { gameBoard, board, cell, winnerText };
})();
const chooseMarker = ((marker) => {
  const btnX = document.querySelector("#btn-x");
  const btnO = document.querySelector("#btn-o");
  btnX.addEventListener("click", () => {
    gameInfo.gameBoard.players.player1 = "x";
    gameInfo.gameBoard.players.player2 = "o";
    startGame();
  });
  btnO.addEventListener("click", () => {
    gameInfo.gameBoard.players.player1 = "o";
    gameInfo.gameBoard.players.player2 = "x";
    startGame();
  });
})();

const startGame = () => {
  gameInfo.board.classList.remove("invisible");
  const markerContainer = document.querySelector("#marker-container");
  markerContainer.classList.add("invisible");
  addMarker();
};

const addMarker = () => {
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].addEventListener("click", () => {
      if (checkGameOn()) {
        if (!checkTie()) {
          if (gameInfo.cell[i].textContent === "") {
            gameInfo.cell[i].textContent = gameInfo.gameBoard.players.player1;
            gameInfo.gameBoard.board[i] = gameInfo.gameBoard.players.player1;
            checkWinner();
            computerPlay();
          }
        } else {
          gameIsTie();
        }
      }
    });
  }
};

const computerPlay = () => {
  if (checkGameOn()) {
    if (!checkTie()) {
      let randomCell = Math.floor(Math.random() * 9);
      if (gameInfo.cell[randomCell].textContent === "") {
        gameInfo.cell[randomCell].textContent =
          gameInfo.gameBoard.players.player2;
        gameInfo.gameBoard.board[randomCell] =
          gameInfo.gameBoard.players.player2;
      } else {
        computerPlay();
      }
      checkWinner();
    } else {
      gameIsTie();
    }
  }
};

const checkWinner = () => {
  for (let i = 0; i < gameInfo.gameBoard.board.length; i++) {
    if (i === 0 || i === 3 || i === 6) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 1] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 2]
        ) {
          gameInfo.winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          gameInfo.winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 0 || i === 1 || i === 2) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 3] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 6]
        ) {
          gameInfo.winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          gameInfo.winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 0) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 4] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 8]
        ) {
          gameInfo.winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          gameInfo.winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 2) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 2] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 4]
        ) {
          gameInfo.winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          gameInfo.winnerText.classList.remove("invisible");
        }
      }
    }
  }
};

const checkTie = () => {
  for (let i = 0; i < 9; i++) {
    if (gameInfo.cell[i].textContent === "") {
      return false;
    } else if (i === 8) {
      return true;
    }
  }
};

const checkGameOn = () => {
  if (gameInfo.winnerText.textContent === "") {
    return true;
  }
  return false;
};

const gameIsTie = () => {
  gameInfo.winnerText.textContent = "It's a tie!";
  gameInfo.board.classList.add("invisible");
  gameInfo.winnerText.classList.remove("invisible");
};
