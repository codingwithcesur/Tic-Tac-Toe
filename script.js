// To do:
// Make an ai that can't be beaten
// Add 2 player mode
// Add score keeping

const gameInfo = (() => {
  const board = document.querySelector("#game-board");
  const cell = document.querySelectorAll(".cell");
  const winnerText = document.querySelector("#winner-text");
  const btnX = document.querySelector("#btn-x");
  const btnO = document.querySelector("#btn-o");
  const resetBtn = document.querySelector("#reset-btn");
  const winnerTextContent = document.querySelector("#winner-text-content");
  const markerContainer = document.querySelector("#marker-container");
  const difficultyContainer = document.querySelector("#difficulty-container");
  const easyBtn = document.querySelector("#btn-easy");
  const mediumBtn = document.querySelector("#btn-medium");
  let gameBoard = {
    board: [],
    players: {},
    currentDifficulty: "",
    moveMade: false,
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
    markerContainer,
    difficultyContainer,
    easyBtn,
    mediumBtn,
  };
})();

const difficultyPicker = (() => {
  gameInfo.easyBtn.addEventListener("click", () => {
    gameInfo.gameBoard.currentDifficulty = "easy";
    gameInfo.markerContainer.classList.remove("invisible");
    gameInfo.difficultyContainer.classList.add("invisible");
  });
  gameInfo.mediumBtn.addEventListener("click", () => {
    gameInfo.gameBoard.currentDifficulty = "medium";
    gameInfo.markerContainer.classList.remove("invisible");
    gameInfo.difficultyContainer.classList.add("invisible");
  });
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
  gameInfo.markerContainer.classList.add("invisible");
  gameInfo.resetBtn.classList.remove("invisible");
  addMarker();
};

const addMarker = () => {
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].addEventListener("click", () => {
      const fadeOut = () => {
        gameInfo.cell[i].classList.remove("fade-in-anim");
      };
      if (checkGameOn() && !checkTie()) {
        if (gameInfo.cell[i].textContent === "") {
          gameInfo.cell[i].textContent = gameInfo.gameBoard.players.player1;
          gameInfo.cell[i].classList.add("fade-in-anim");
          setTimeout(fadeOut, 500);
          gameInfo.gameBoard.board[i] = gameInfo.gameBoard.players.player1;
          checkWinner();
          computerPlay();
        }
      } else if (checkTie()) {
        gameIsTie();
      }
    });
  }
};

const computerPlay = () => {
  if (checkGameOn() && !checkTie()) {
    if (gameInfo.gameBoard.currentDifficulty === "easy") {
      computerEasy();
    } else if (gameInfo.gameBoard.currentDifficulty === "medium") {
      computerMedium();
    }
  } else if (checkTie()) {
    gameIsTie();
  }
};

const computerEasy = () => {
  aiTools.randomMove();
  gameInfo.gameBoard.moveMade = false;
  checkWinner();
};

const computerMedium = () => {
  if (aiTools.checkHorizontalWin()) {
    aiTools.computerAddMarker(aiTools.currentMoveCell);
  }
  if (aiTools.checkHorizontalPlay()) {
    aiTools.computerAddMarker(aiTools.currentMoveCell);
  }
  aiTools.randomMove();
  aiTools.currentMoveCell = "";
  checkWinner();
};

const aiTools = (() => {
  let currentMoveCell = "";

  const computerAddMarker = (i) => {
    gameInfo.cell[i].textContent = gameInfo.gameBoard.players.player2;
    gameInfo.cell[i].classList.add("fade-in-anim");
    const fadeOut = () => {
      gameInfo.cell[i].classList.remove("fade-in-anim");
    };
    setTimeout(fadeOut, 500);
    gameInfo.gameBoard.board[i] = gameInfo.gameBoard.players.player2;
  };

  const randomMove = () => {
    if (aiTools.currentMoveCell === "") {
      let randomCell = Math.floor(Math.random() * 9);
      const fadeOut = () => {
        gameInfo.cell[randomCell].classList.remove("fade-in-anim");
      };
      while (aiTools.currentMoveCell === "") {
        if (gameInfo.cell[randomCell].textContent === "") {
          gameInfo.cell[randomCell].textContent =
            gameInfo.gameBoard.players.player2;
          gameInfo.cell[randomCell].classList.add("fade-in-anim");
          setTimeout(fadeOut, 500);
          gameInfo.gameBoard.board[randomCell] =
            gameInfo.gameBoard.players.player2;
          aiTools.currentMoveCell = randomCell;
          break;
        } else {
          randomCell = Math.floor(Math.random() * 9);
        }
      }
    }
  };

  const checkHorizontalWin = () => {
    if (aiTools.currentMoveCell === "") {
      for (let i = 0; i < 9; i++) {
        if (gameInfo.cell[i].textContent === "") {
          if (i === 2 || i === 5 || i === 8) {
            if (
              gameInfo.gameBoard.board[i - 1] ===
                gameInfo.gameBoard.players.player2 &&
              gameInfo.gameBoard.board[i - 2] ===
                gameInfo.gameBoard.players.player2
            ) {
              aiTools.currentMoveCell = i;
              return true;
              break;
            }
          } else if (i === 0 || i === 3 || i === 6) {
            if (
              gameInfo.gameBoard.board[i + 1] ===
                gameInfo.gameBoard.players.player2 &&
              gameInfo.gameBoard.board[i + 2] ===
                gameInfo.gameBoard.players.player2
            ) {
              aiTools.currentMoveCell = i;
              return true;
              break;
            }
          }
        }
      }
    }
  };

  const checkHorizontalPlay = () => {
    if (aiTools.currentMoveCell === "") {
      for (let i = 0; i < 9; i++) {
        if (gameInfo.cell[i].textContent === "") {
          if (i !== 0 && (i !== 3) & (i !== 6)) {
            if (
              gameInfo.gameBoard.board[i - 1] ===
              gameInfo.gameBoard.players.player2
            ) {
              aiTools.currentMoveCell = i;
              return true;
              break;
            }
          }
          if (i !== 2 && i !== 5 && i !== 8) {
            if (
              gameInfo.gameBoard.board[i + 1] ===
              gameInfo.gameBoard.players.player2
            ) {
              aiTools.currentMoveCell = i;
              return true;
              break;
            }
          }
        }
      }
    }
  };

  return {
    currentMoveCell,
    computerAddMarker,
    randomMove,
    checkHorizontalWin,
    checkHorizontalPlay,
  };
})();

const checkWinner = () => {
  let winnerCells = [];
  const checkRows = () => {
    for (let i = 0; i < 9; i += 3) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 1] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 2]
        ) {
          winnerCells.push(i) +
            winnerCells.push(i + 1) +
            winnerCells.push(i + 2);
          return true;
        }
      }
    }
  };

  const checkColumns = () => {
    for (let i = 0; i < 3; i++) {
      if (gameInfo.gameBoard.board[i] !== undefined) {
        if (
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 3] &&
          gameInfo.gameBoard.board[i] === gameInfo.gameBoard.board[i + 6]
        ) {
          winnerCells.push(i) +
            winnerCells.push(i + 3) +
            winnerCells.push(i + 6);
          return true;
        }
      }
    }
  };

  const checkDiagonals = () => {
    if (gameInfo.gameBoard.board[0] !== undefined) {
      if (
        gameInfo.gameBoard.board[0] === gameInfo.gameBoard.board[4] &&
        gameInfo.gameBoard.board[0] === gameInfo.gameBoard.board[8]
      ) {
        winnerCells.push(0) + winnerCells.push(4) + winnerCells.push(8);
        return true;
      }
    }
    if (gameInfo.gameBoard.board[2] !== undefined) {
      if (
        gameInfo.gameBoard.board[2] === gameInfo.gameBoard.board[4] &&
        gameInfo.gameBoard.board[2] === gameInfo.gameBoard.board[6]
      ) {
        winnerCells.push(2) + winnerCells.push(4) + winnerCells.push(6);
        return true;
      }
    }
  };
  if (checkRows() || checkColumns() || checkDiagonals()) {
    gameInfo.winnerTextContent.textContent = `${
      gameInfo.gameBoard.board[winnerCells[0]]
    } is the winner!`;
    if (
      gameInfo.gameBoard.board[winnerCells[0]] ===
      gameInfo.gameBoard.players.player1
    ) {
      gameInfo.winnerText.classList.add("alert-info");
      for (let i = 0; i < winnerCells.length; i++) {
        gameInfo.cell[winnerCells[i]].classList.add("text-info");
      }
    } else {
      gameInfo.winnerText.classList.add("alert-danger");
      for (let i = 0; i < winnerCells.length; i++) {
        gameInfo.cell[winnerCells[i]].classList.add("text-danger");
      }
    }
    gameInfo.winnerText.classList.remove("invisible");
  }
};

const checkTie = () => {
  for (let i = 0; i < 9; i++) {
    if (gameInfo.cell[i].textContent === "") {
      return false;
    } else if (i === 8 && gameInfo.winnerTextContent.textContent === "") {
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
  gameInfo.winnerText.classList.remove("invisible");
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].classList.add("text-dark");
  }
};

const resetGame = () => {
  gameInfo.winnerTextContent.textContent = "";
  gameInfo.winnerText.classList.add("invisible");
  gameInfo.board.classList.add("invisible");
  gameInfo.difficultyContainer.classList.remove("invisible");
  gameInfo.gameBoard.board = [];
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].textContent = "";
    gameInfo.cell[i].classList.remove("text-info");
    gameInfo.cell[i].classList.remove("text-danger");
    gameInfo.cell[i].classList.remove("text-dark");
  }
  gameInfo.resetBtn.classList.add("invisible");
  gameInfo.winnerText.classList.remove("alert-info");
  gameInfo.winnerText.classList.remove("alert-danger");
  gameInfo.winnerText.classList.remove("alert-dark");
};
