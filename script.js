const board = document.querySelector("#game-board");

let gameBoard = {
  board: [],
};
let players = {};

const chooseMarker = ((marker) => {
  const btnX = document.querySelector("#btn-x");
  const btnO = document.querySelector("#btn-o");
  btnX.addEventListener("click", () => {
    players.player1 = "x";
    players.player2 = "o";
    startGame("x");
  });
  btnO.addEventListener("click", () => {
    players.player1 = "o";
    players.player2 = "x";
    startGame("o");
  });
})();

const startGame = () => {
  board.classList.remove("invisible");
  const markerContainer = document.querySelector("#marker-container");
  markerContainer.classList.add("invisible");
  addMarker();
};

const addMarker = () => {
  const cell = document.querySelectorAll(".cell");
  for (let i = 0; i < 9; i++) {
    cell[i].addEventListener("click", () => {
      if (cell[i].textContent === "") {
        cell[i].textContent = players.player1;
        gameBoard.board[i] = players.player1;
        checkWinner();
        computerPlay();
      }
    });
  }
};

const computerPlay = () => {
  const cell = document.querySelectorAll(".cell");
  let randomCell = Math.floor(Math.random() * 9);
  if (gameBoard.board.toString().includes(",,") || gameBoard.board.length < 9) {
    if (cell[randomCell].textContent === "") {
      cell[randomCell].textContent = players.player2;
      gameBoard.board[randomCell] = players.player2;
    } else {
      computerPlay();
    }
    checkWinner();
  } else {
    const winnerText = document.querySelector("#winner-text");
    winnerText.textContent = "It's a tie!";
    board.classList.add("invisible");
    winnerText.classList.remove("invisible");
  }
};

const checkWinner = () => {
  const winnerText = document.querySelector("#winner-text");
  for (let i = 0; i < gameBoard.board.length; i++) {
    if (i === 0 || i === 3 || i === 6) {
      if (gameBoard.board[i] !== undefined) {
        if (
          gameBoard.board[i] === gameBoard.board[i + 1] &&
          gameBoard.board[i] === gameBoard.board[i + 2]
        ) {
          winnerText.textContent = `${gameBoard.board[i]} is the winner!`;
          board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 0 || i === 1 || i === 2) {
      if (gameBoard.board[i] !== undefined) {
        if (
          gameBoard.board[i] === gameBoard.board[i + 3] &&
          gameBoard.board[i] === gameBoard.board[i + 6]
        ) {
          winnerText.textContent = `${gameBoard.board[i]} is the winner!`;
          board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 0) {
      if (gameBoard.board[i] !== undefined) {
        if (
          gameBoard.board[i] === gameBoard.board[i + 4] &&
          gameBoard.board[i] === gameBoard.board[i + 8]
        ) {
          winnerText.textContent = `${gameBoard.board[i]} is the winner!`;
          board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
    if (i === 2) {
      if (gameBoard.board[i] !== undefined) {
        if (
          gameBoard.board[i] === gameBoard.board[i + 2] &&
          gameBoard.board[i] === gameBoard.board[i + 4]
        ) {
          winnerText.textContent = `${gameBoard.board[i]} is the winner!`;
          board.classList.add("invisible");
          winnerText.classList.remove("invisible");
        }
      }
    }
  }
};
