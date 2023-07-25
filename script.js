let gameBoard = {
  board: [],
};
let players = {};
const fillBoard = () => {
  let board = document.querySelector("#game-board");
  for (let i = 0; i < 9; i++) {
    gameBoard.board.push("x");
    let cell = document.createElement("div");
    cell.classList.add("col-4", "cell");
    cell.setAttribute("id", i);
    board.appendChild(cell);
    cell.textContent = gameBoard.board[i];
    console.log(gameBoard.board);
  }
};
fillBoard();
