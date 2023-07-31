// To do:
// add break time for computer
// add reset button
// Make an ai that can't be beaten
// Add difficulty levels
// Add better UI
// Add multiplayer

const gameInfo = (() => {
  const board = document.querySelector("#game-board");
  let gameBoard = {
    board: [],
  };
  let players = {};

  return { gameBoard, players, board };
})();
const chooseMarker = ((marker) => {
  const btnX = document.querySelector("#btn-x");
  const btnO = document.querySelector("#btn-o");
  btnX.addEventListener("click", () => {
    gameInfo.players.player1 = "x";
    gameInfo.players.player2 = "o";
    startGame("x");
  });
  btnO.addEventListener("click", () => {
    gameInfo.players.player1 = "o";
    gameInfo.players.player2 = "x";
    startGame("o");
  });
})();

const startGame = () => {
  gameInfo.board.classList.remove("invisible");
  const markerContainer = document.querySelector("#marker-container");
  markerContainer.classList.add("invisible");
  addMarker();
};

const addMarker = () => {
  const cell = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    cell[i].addEventListener("click", () => {
      if (cell[i].textContent === "") {
        cell[i].textContent = gameInfo.players.player1;
        gameInfo.gameBoard.board[i] = gameInfo.players.player1;
        checkWinner();
        computerPlay();
      }
    });
  }
};

const computerPlay = () => {
  const cell = document.querySelectorAll(".cell");
  let randomCell = Math.floor(Math.random() * 9);
  if (
    gameInfo.gameBoard.board.toString().includes(",") ||
    gameInfo.gameBoard.board.length < 9
  ) {
    if (cell[randomCell].textContent === "") {
      cell[randomCell].textContent = gameInfo.players.player2;
      gameInfo.gameBoard.board[randomCell] = gameInfo.players.player2;
    } else {
      computerPlay();
    }
    checkWinner();
  } else {
    const winnerText = document.querySelector("#winner-text");
    winnerText.textContent = "It's a tie!";
    gameInfo.board.classList.add("invisible");
    winnerText.classList.remove("invisible");
  }
};

const checkWinner = () => {
  const winnerText = document.querySelector("#winner-text");
  for (let i = 0; i < gameInfo.gameBoard.board.length; i++) {
    if (i === 0 || i === 3 || i === 6) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 1] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 2]
        ) {
          winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 0 || i === 1 || i === 2) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 3] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 6]
        ) {
          winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 0) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 4] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 8]
        ) {
          winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 2) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 2] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 4]
        ) {
          winnerText.textContent = `${gameInfo.gameBoard.board[i]} is the winner!`;
          gameInfo.board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
  }
};
