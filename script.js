// To do:
// Add 2 player mode
// Add score keeping
const gameInfo = (() => {
  const board = document.querySelector("#game-board");
  const cell = document.querySelectorAll(".cell");
  const winnerText = document.querySelector("#winner-text");
  const resetBtn = document.querySelector("#reset-btn");
  const winnerTextContent = document.querySelector("#winner-text-content");
  const markerContainer = document.querySelector("#marker-container");
  const difficultyContainer = document.querySelector("#difficulty-container");
  const difficultyBtn = document.querySelectorAll(".diff-btn");
  const markerBtn = document.querySelectorAll(".mark-btn");
  let gameBoard = {
    board: [],
    players: {},
    currentDifficulty: "",
  };

  return {
    gameBoard,
    board,
    cell,
    winnerText,
    resetBtn,
    winnerTextContent,
    markerContainer,
    difficultyContainer,
    difficultyBtn,
    markerBtn,
  };
})();

const setDifficulty = (diff) => {
  gameInfo.gameBoard.currentDifficulty = diff;
  gameInfo.markerContainer.classList.remove("invisible");
  gameInfo.difficultyContainer.classList.add("invisible");
};
const difficultyBtnEvents = (() => {
  for (let i = 0; i < gameInfo.difficultyBtn.length; i++) {
    gameInfo.difficultyBtn[i].addEventListener("click", () => {
      setDifficulty(gameInfo.difficultyBtn[i].textContent.trim());
    });
  }
})();

const setMarker = (marker) => {
  gameInfo.gameBoard.players.player1 = marker;
  if (marker === "X") {
    gameInfo.gameBoard.players.player2 = "O";
  } else {
    gameInfo.gameBoard.players.player2 = "X";
  }
};
const markerBtnEvents = (() => {
  for (let i = 0; i < 2; i++) {
    gameInfo.markerBtn[i].addEventListener("click", () => {
      setMarker(gameInfo.markerBtn[i].textContent.trim());
      startGame(
        gameInfo.gameBoard.players.player1,
        gameInfo.gameBoard.players.player2
      );
    });
  }
})();

const resetBtnEvent = (() => {
  gameInfo.resetBtn.addEventListener("click", () => {
    resetGame();
  });
})();

const startGame = (marker, aiMarker) => {
  gameInfo.board.classList.remove("invisible");
  gameInfo.markerContainer.classList.add("invisible");
  gameInfo.resetBtn.classList.remove("invisible");
  addMarker(marker, aiMarker);
};

const addMarker = (marker, aiMarker) => {
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].addEventListener("click", () => {
      const fadeOut = () => {
        gameInfo.cell[i].classList.remove("fade-in-anim");
      };
      if (checkGameOn() && !checkTie()) {
        if (gameInfo.cell[i].textContent === "") {
          gameInfo.cell[i].textContent = marker;
          gameInfo.cell[i].classList.add("fade-in-anim");
          setTimeout(fadeOut, 500);
          gameInfo.gameBoard.board[i] = marker;
          checkWinner();
          computerPlay(aiMarker);
        }
      } else if (checkTie()) {
        gameIsTie();
      }
    });
  }
};

const computerPlay = (marker) => {
  if (checkGameOn() && !checkTie()) {
    if (gameInfo.gameBoard.currentDifficulty === "Easy") {
      computerEasy(marker);
    } else if (gameInfo.gameBoard.currentDifficulty === "Medium") {
      computerMedium(marker);
    } else if (gameInfo.gameBoard.currentDifficulty === "Hard") {
      computerHard(marker);
    } else if (gameInfo.gameBoard.currentDifficulty === "Impossible") {
      computerImpossible(marker);
    }
  } else if (checkTie()) {
    gameIsTie();
  }
};

const computerEasy = (marker) => {
  aiTools.computerAddMarker(aiTools.randomMove(), marker);
  checkWinner();
};

const computerMedium = (marker) => {
  if (aiTools.horizontalWin() !== "noneHorizontal") {
    aiTools.computerAddMarker(aiTools.horizontalWin(), marker);
  } else if (aiTools.verticalWin() !== "noneVertical") {
    aiTools.computerAddMarker(aiTools.verticalWin(), marker);
  } else if (aiTools.horizontalBlock() === aiTools.verticalBlock()) {
    aiTools.computerAddMarker(aiTools.horizontalBlock(), marker);
  } else if (aiTools.horizontalBlock() !== "noneHorizontal") {
    aiTools.computerAddMarker(aiTools.horizontalBlock(), marker);
  } else if (aiTools.verticalBlock() !== "noneVertical") {
    aiTools.computerAddMarker(aiTools.verticalBlock(), marker);
  } else {
    aiTools.computerAddMarker(aiTools.randomMove(), marker);
  }
  checkWinner();
};

const computerHard = (marker) => {
  if (aiTools.horizontalWin() !== "noneHorizontal") {
    aiTools.computerAddMarker(aiTools.horizontalWin(), marker);
  } else if (aiTools.verticalWin() !== "noneVertical") {
    aiTools.computerAddMarker(aiTools.verticalWin(), marker);
  } else if (aiTools.diagonalWin() !== "noneDiagonal") {
    aiTools.computerAddMarker(aiTools.diagonalWin(), marker);
  } else if (
    aiTools.horizontalBlock() === aiTools.verticalBlock() ||
    aiTools.horizontalBlock() === aiTools.diagonalBlock()
  ) {
    aiTools.computerAddMarker(aiTools.horizontalBlock(), marker);
  } else if (aiTools.verticalBlock() === aiTools.diagonalBlock()) {
    aiTools.computerAddMarker(aiTools.verticalBlock(), marker);
  } else if (aiTools.horizontalBlock() !== "noneHorizontal") {
    aiTools.computerAddMarker(aiTools.horizontalBlock(), marker);
  } else if (aiTools.verticalBlock() !== "noneVertical") {
    aiTools.computerAddMarker(aiTools.verticalBlock(), marker);
  } else if (aiTools.diagonalBlock() !== "noneDiagonal") {
    aiTools.computerAddMarker(aiTools.diagonalBlock(), marker);
  } else {
    aiTools.computerAddMarker(aiTools.randomMove(), marker);
  }
  checkWinner();
};
const computerImpossible = (marker) => {
  if (aiTools.horizontalWin() !== "noneHorizontal") {
    aiTools.computerAddMarker(aiTools.horizontalWin(), marker);
  } else if (aiTools.verticalWin() !== "noneVertical") {
    aiTools.computerAddMarker(aiTools.verticalWin(), marker);
  } else if (aiTools.diagonalWin() !== "noneDiagonal") {
    aiTools.computerAddMarker(aiTools.diagonalWin(), marker);
  } else if (
    aiTools.horizontalBlock() === aiTools.verticalBlock() ||
    aiTools.horizontalBlock() === aiTools.diagonalBlock()
  ) {
    aiTools.computerAddMarker(aiTools.horizontalBlock(), marker);
  } else if (aiTools.verticalBlock() === aiTools.diagonalBlock()) {
    aiTools.computerAddMarker(aiTools.verticalBlock(), marker);
  } else if (aiTools.horizontalBlock() !== "noneHorizontal") {
    aiTools.computerAddMarker(aiTools.horizontalBlock(), marker);
  } else if (aiTools.verticalBlock() !== "noneVertical") {
    aiTools.computerAddMarker(aiTools.verticalBlock(), marker);
  } else if (aiTools.diagonalBlock() !== "noneDiagonal") {
    aiTools.computerAddMarker(aiTools.diagonalBlock(), marker);
  } else if (aiTools.prepMove() !== "nonePrep") {
    aiTools.computerAddMarker(aiTools.prepMove(), marker);
  } else {
    aiTools.computerAddMarker(aiTools.randomMove(), marker);
  }
  checkWinner();
};

const aiTools = (() => {
  const computerAddMarker = (i, marker) => {
    gameInfo.cell[i].textContent = marker;
    gameInfo.cell[i].classList.add("fade-in-anim");
    const fadeOut = () => {
      gameInfo.cell[i].classList.remove("fade-in-anim");
    };
    setTimeout(fadeOut, 500);
    gameInfo.gameBoard.board[i] = marker;
  };

  const checkEmptyCell = (i) => {
    if (gameInfo.cell[i].textContent === "") {
      return true;
    }
  };

  const randomMove = () => {
    console.log("randomMove");
    let randomCell = Math.floor(Math.random() * 9);
    while (true) {
      if (gameInfo.cell[randomCell].textContent === "") {
        return randomCell;
        break;
      } else {
        randomCell = Math.floor(Math.random() * 9);
      }
    }
  };

  const horizontalWin = () => {
    return horizontalBlock(gameInfo.gameBoard.players.player2);
  };
  const horizontalBlock = (setMarker = 1) => {
    for (let i = 0; i < 9; i++) {
      if (checkEmptyCell(i)) {
        if (i === 2 || i === 5 || i === 8) {
          if (!checkEmptyCell(i - 1)) {
            if (
              gameInfo.gameBoard.board[i - 1] ===
                gameInfo.gameBoard.board[i - 2] &&
              setMarker
            ) {
              return i;
            }
          }
        }
        if (i === 0 || i === 3 || i === 6) {
          if (!checkEmptyCell(i + 1)) {
            if (
              gameInfo.gameBoard.board[i + 1] ===
                gameInfo.gameBoard.board[i + 2] &&
              setMarker
            ) {
              return i;
            }
          }
        }
        if (i === 1 || i === 4 || i === 7) {
          if (!checkEmptyCell(i - 1)) {
            if (
              gameInfo.gameBoard.board[i - 1] ===
                gameInfo.gameBoard.board[i + 1] &&
              setMarker
            ) {
              return i;
            }
          }
        }
      }
    }
    return "noneHorizontal";
  };

  const verticalWin = () => {
    return verticalBlock(gameInfo.gameBoard.players.player2);
  };

  const verticalBlock = (setMarker = 1) => {
    for (let i = 0; i < 9; i++) {
      if (checkEmptyCell(i)) {
        if (i === 6 || i === 7 || i === 8) {
          if (!checkEmptyCell(i - 3)) {
            if (
              gameInfo.gameBoard.board[i - 3] ===
                gameInfo.gameBoard.board[i - 6] &&
              setMarker
            ) {
              return i;
            }
          }
        }
        if (i === 0 || i === 1 || i === 2) {
          if (!checkEmptyCell(i + 3)) {
            if (
              gameInfo.gameBoard.board[i + 3] ===
                gameInfo.gameBoard.board[i + 6] &&
              setMarker
            ) {
              return i;
            }
          }
        }
        if (i === 3 || i === 4 || i === 5) {
          if (!checkEmptyCell(i - 3)) {
            if (
              gameInfo.gameBoard.board[i - 3] ===
                gameInfo.gameBoard.board[i + 3] &&
              setMarker
            ) {
              return i;
            }
          }
        }
      }
    }
    return "noneVertical";
  };

  const diagonalWin = () => {
    return diagonalBlock(gameInfo.gameBoard.players.player2);
  };
  const diagonalBlock = (setMarker = 1) => {
    for (let i = 0; i < 9; i++) {
      if (checkEmptyCell(i)) {
        if (i === 0 && !checkEmptyCell(i + 4) && !checkEmptyCell(i + 8)) {
          if (
            gameInfo.gameBoard.board[i + 4] ===
              gameInfo.gameBoard.board[i + 8] &&
            setMarker
          ) {
            return i;
          }
        } else if (
          i === 2 &&
          !checkEmptyCell(i + 2) &&
          !checkEmptyCell(i + 4)
        ) {
          if (
            gameInfo.gameBoard.board[i + 2] ===
              gameInfo.gameBoard.board[i + 4] &&
            setMarker
          ) {
            return i;
          }
        } else if (
          i === 4 &&
          !checkEmptyCell(i + 2) &&
          !checkEmptyCell(i - 2)
        ) {
          if (
            gameInfo.gameBoard.board[i - 2] ===
              gameInfo.gameBoard.board[i + 2] &&
            setMarker
          ) {
            return i;
          }
        } else if (
          i === 4 &&
          !checkEmptyCell(i + 4) &&
          !checkEmptyCell(i - 4)
        ) {
          if (
            gameInfo.gameBoard.board[i + 4] ===
              gameInfo.gameBoard.board[i - 4] &&
            setMarker
          ) {
            return i;
          }
        } else if (
          i === 6 &&
          !checkEmptyCell(i - 2) &&
          !checkEmptyCell(i - 4)
        ) {
          if (
            gameInfo.gameBoard.board[i - 2] ===
              gameInfo.gameBoard.board[i - 4] &&
            setMarker
          ) {
            return i;
          }
        } else if (
          i === 8 &&
          !checkEmptyCell(i - 4) &&
          !checkEmptyCell(i - 8)
        ) {
          if (
            gameInfo.gameBoard.board[i - 4] ===
              gameInfo.gameBoard.board[i - 8] &&
            setMarker
          ) {
            return i;
          }
        }
      }
    }
    return "noneDiagonal";
  };

  const prepMove = () => {
    for (let i = 0; i < 9; i++) {
      if (!checkEmptyCell(i)) {
        if (i === 4 || i === 5 || i === 3 || i === 2 || i === 7) {
          if (i === 4) {
            for (let i = 0; i < 8; i++) {
              if (checkEmptyCell(i)) {
                if (i === 6 || i === 8 || i === 0 || i === 2) {
                  return i;
                }
              }
            }
          } else if (i === 6) {
            if (checkEmptyCell(i)) {
              if (i === 0 && i === 3) {
                return i;
              }
            }
          } else if (i === 8) {
            if (checkEmptyCell(i)) {
              if (i === 2 && i === 5) {
                return i;
              }
            }
          } else if (i === 0) {
            if (checkEmptyCell(i)) {
              if (i === 3 && i === 6) {
                return i;
              }
            }
          } else if (i === 2) {
            if (checkEmptyCell(i)) {
              if (i === 5 && i === 8) {
                return i;
              }
            }
          }
        }
      } else if (i === 4) {
        return i;
      }
    }
    return "nonePrep";
  };

  return {
    computerAddMarker,
    randomMove,
    horizontalWin,
    horizontalBlock,
    verticalWin,
    verticalBlock,
    diagonalWin,
    diagonalBlock,
    prepMove,
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

  const diagonalBlocks = () => {
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

  if (checkRows() || checkColumns() || diagonalBlocks()) {
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
