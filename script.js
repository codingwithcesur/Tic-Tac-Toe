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

const startGame = (marker) => {
  board.classList.remove("invisible");
  const markerContainer = document.querySelector("#marker-container");
  markerContainer.classList.add("invisible");
};

// const addMarker = () => {
//   for (let i = 0; i < 9; i++) {
//     if (Math.random() > 0.5) {
//       gameBoard.board.push("x");
//     } else {
//       gameBoard.board.push("o");
//     }

//     let cell = document.createElement("div");
//     cell.classList.add("col-4", "cell");
//     cell.setAttribute("id", i);
//     board.appendChild(cell);
//     cell.textContent = gameBoard.board[i];
//     console.log(gameBoard.board);
//   }
// };
