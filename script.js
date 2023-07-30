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
  if (cell[randomCell].textContent === "") {
    cell[randomCell].textContent = players.player2;
    gameBoard.board[randomCell] = players.player2;
  } else {
    computerPlay();
  }
  checkWinner();
};
