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
  const btnX = document.querySelector("#btn-x");
  const btnO = document.querySelector("#btn-o");
  const resetBtn = document.querySelector("#reset-btn");
  const winnerTextContent = document.querySelector("#winner-text-content");
  let gameBoard = {
    board: [],
    players: {},
  };

  return {
    gameBoard,
    board,
    cell,
    winnerText,
    btnX,
    btnO,
    resetBtn,
    winnerTextContent,
  };
})();

const btnEvents = (() => {
  gameInfo.btnX.addEventListener("click", () => {
    gameInfo.gameBoard.players.player1 = "x";
    gameInfo.gameBoard.players.player2 = "o";
    startGame();
  });
  gameInfo.btnO.addEventListener("click", () => {
    gameInfo.gameBoard.players.player1 = "o";
    gameInfo.gameBoard.players.player2 = "x";
    startGame();
  });
  gameInfo.resetBtn.addEventListener("click", () => {
    resetGame();
  });
})();

const startGame = () => {
  gameInfo.board.classList.remove("invisible");
  const markerContainer = document.querySelector("#marker-container");
  markerContainer.classList.add("invisible");
  gameInfo.resetBtn.classList.remove("invisible");
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
          gameInfo.winnerTextContent.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          if (gameInfo.gameBoard.board[i] === "x") {
            gameInfo.winnerText.classList.add("alert-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
          }
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
          gameInfo.winnerTextContent.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          if (gameInfo.gameBoard.board[i] === "x") {
            gameInfo.winnerText.classList.add("alert-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
          }
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
          gameInfo.winnerTextContent.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          if (gameInfo.gameBoard.board[i] === "x") {
            gameInfo.winnerText.classList.add("alert-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
          }
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
          gameInfo.winnerTextContent.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          if (gameInfo.gameBoard.board[i] === "x") {
            gameInfo.winnerText.classList.add("alert-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
          }
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
  if (gameInfo.winnerTextContent.textContent === "") {
    return true;
  }
  return false;
};

const gameIsTie = () => {
  gameInfo.winnerTextContent.textContent = "It's a tie!";
  gameInfo.winnerText.classList.add("alert-dark");
  gameInfo.board.classList.add("invisible");
  gameInfo.winnerText.classList.remove("invisible");
};

const resetGame = () => {
  const markerContainer = document.querySelector("#marker-container");
  gameInfo.winnerTextContent.textContent = "";
  gameInfo.winnerText.classList.add("invisible");
  markerContainer.classList.remove("invisible");
  gameInfo.board.classList.add("invisible");
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].textContent = "";
    gameInfo.gameBoard.board[i] = undefined;
  }
  gameInfo.resetBtn.classList.add("invisible");
  gameInfo.winnerText.classList.remove("alert-info");
  gameInfo.winnerText.classList.remove("alert-danger");
  gameInfo.winnerText.classList.remove("alert-dark");
};
