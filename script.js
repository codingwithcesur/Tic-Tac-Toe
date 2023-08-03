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
  let randomCell = Math.floor(Math.random() * 9);
  const fadeOut = () => {
    gameInfo.cell[randomCell].classList.remove("fade-in-anim");
  };

  if (gameInfo.cell[randomCell].textContent === "") {
    gameInfo.cell[randomCell].textContent = gameInfo.gameBoard.players.player2;
    gameInfo.cell[randomCell].classList.add("fade-in-anim");
    setTimeout(fadeOut, 500);
    gameInfo.gameBoard.board[randomCell] = gameInfo.gameBoard.players.player2;
  } else {
    computerPlay();
  }
  checkWinner();
};

const computerMedium = () => {
  for (let i = 0; i < 7; i++) {
    if (
      (gameInfo.cell[i].textContent === "" &&
        gameInfo.gameBoard.board[i - 1] ===
          gameInfo.gameBoard.players.player2 &&
        gameInfo.gameBoard.board[i - 2] ===
          gameInfo.gameBoard.players.player2) ||
      (gameInfo.cell[i].textContent === "" &&
        gameInfo.gameBoard.board[i + 1] ===
          gameInfo.gameBoard.players.player2 &&
        gameInfo.gameBoard.board[i + 2] === gameInfo.gameBoard.players.player2)
    ) {
      gameInfo.cell[i].textContent = gameInfo.gameBoard.players.player2;
      gameInfo.cell[i].classList.add("fade-in-anim");
      const fadeOut = () => {
        gameInfo.cell[i].classList.remove("fade-in-anim");
      };
      setTimeout(fadeOut, 500);
      gameInfo.gameBoard.board[i] = gameInfo.gameBoard.players.player2;
      gameInfo.gameBoard.moveMade = true;
      break;
    }
  }
  if (!gameInfo.gameBoard.moveMade) {
    for (let i = 0; i < 8; i++) {
      if (
        (gameInfo.cell[i].textContent === "" &&
          gameInfo.gameBoard.board[i - 1] ===
            gameInfo.gameBoard.players.player2) ||
        (gameInfo.cell[i].textContent === "" &&
          gameInfo.gameBoard.board[i + 1] ===
            gameInfo.gameBoard.players.player2)
      ) {
        gameInfo.cell[i].textContent = gameInfo.gameBoard.players.player2;
        gameInfo.cell[i].classList.add("fade-in-anim");
        const fadeOut = () => {
          gameInfo.cell[i].classList.remove("fade-in-anim");
        };
        setTimeout(fadeOut, 500);
        gameInfo.gameBoard.board[i] = gameInfo.gameBoard.players.player2;
        gameInfo.gameBoard.moveMade = true;
        break;
      }
    }
  }
  if (!gameInfo.gameBoard.moveMade) {
    let randomCell = Math.floor(Math.random() * 9);
    const fadeOut = () => {
      gameInfo.cell[randomCell].classList.remove("fade-in-anim");
    };
    while (gameInfo.gameBoard.moveMade === false) {
      if (gameInfo.cell[randomCell].textContent === "") {
        gameInfo.cell[randomCell].textContent =
          gameInfo.gameBoard.players.player2;
        gameInfo.cell[randomCell].classList.add("fade-in-anim");
        setTimeout(fadeOut, 500);
        gameInfo.gameBoard.board[randomCell] =
          gameInfo.gameBoard.players.player2;
        gameInfo.gameBoard.moveMade = true;
        break;
      } else {
        randomCell = Math.floor(Math.random() * 9);
      }
    }
  }
  gameInfo.gameBoard.moveMade = false;
  checkWinner();
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
          if (
            gameInfo.gameBoard.board[i] === gameInfo.gameBoard.players.player1
          ) {
            gameInfo.winnerText.classList.add("alert-info");
            gameInfo.cell[i].classList.add("text-info");
            gameInfo.cell[i + 1].classList.add("text-info");
            gameInfo.cell[i + 2].classList.add("text-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
            gameInfo.cell[i].classList.add("text-danger");
            gameInfo.cell[i + 1].classList.add("text-danger");
            gameInfo.cell[i + 2].classList.add("text-danger");
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
          if (
            gameInfo.gameBoard.board[i] === gameInfo.gameBoard.players.player1
          ) {
            gameInfo.winnerText.classList.add("alert-info");
            gameInfo.cell[i].classList.add("text-info");
            gameInfo.cell[i + 3].classList.add("text-info");
            gameInfo.cell[i + 6].classList.add("text-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
            gameInfo.cell[i].classList.add("text-danger");
            gameInfo.cell[i + 3].classList.add("text-danger");
            gameInfo.cell[i + 6].classList.add("text-danger");
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
          if (
            gameInfo.gameBoard.board[i] === gameInfo.gameBoard.players.player1
          ) {
            gameInfo.winnerText.classList.add("alert-info");
            gameInfo.cell[i].classList.add("text-info");
            gameInfo.cell[i + 4].classList.add("text-info");
            gameInfo.cell[i + 8].classList.add("text-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
            gameInfo.cell[i].classList.add("text-danger");
            gameInfo.cell[i + 4].classList.add("text-danger");
            gameInfo.cell[i + 8].classList.add("text-danger");
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
          if (
            gameInfo.gameBoard.board[i] === gameInfo.gameBoard.players.player1
          ) {
            gameInfo.winnerText.classList.add("alert-info");
            gameInfo.cell[i].classList.add("text-info");
            gameInfo.cell[i + 2].classList.add("text-info");
            gameInfo.cell[i + 4].classList.add("text-info");
          } else {
            gameInfo.winnerText.classList.add("alert-danger");
            gameInfo.cell[i].classList.add("text-danger");
            gameInfo.cell[i + 2].classList.add("text-danger");
            gameInfo.cell[i + 4].classList.add("text-danger");
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
  for (let i = 0; i < 9; i++) {
    gameInfo.cell[i].textContent = "";
    gameInfo.cell[i].classList.remove("text-info");
    gameInfo.cell[i].classList.remove("text-danger");
    gameInfo.cell[i].classList.remove("text-dark");
    gameInfo.gameBoard.board[i] = undefined;
  }
  gameInfo.resetBtn.classList.add("invisible");
  gameInfo.winnerText.classList.remove("alert-info");
  gameInfo.winnerText.classList.remove("alert-danger");
  gameInfo.winnerText.classList.remove("alert-dark");
};
