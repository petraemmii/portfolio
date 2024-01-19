const grid = document.querySelector('.grid');
const stackBtn = document.querySelector('.stack');
const scoreCounter = document.querySelector('.score-counter');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

const gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
];

let currentRowIndex = gridMatrix.length - 1;

let barDirection = 'right';
let barSize = 3;
let isGameOver = false;
let score = 0;

// FUNCTIONS

function draw() {

  grid.innerHTML = '';

  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {

      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (cellContent === 1) {
        cell.classList.add('bar');
      }

      grid.appendChild(cell);
    });
  });
}

function moveRight(row) {
  row.pop();
  row.unshift(0);
}

function moveLeft(row) {
  row.shift();
  row.push(0);
}

function isRightEdge(row) {
  const lastElement = row[row.length - 1];
  return lastElement === 1;
}

function isLeftEdge(row) {
  const firstElement = row[0];
  return firstElement === 1;
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === 'right') {
    moveRight(currentRow);

    if (isRightEdge(currentRow)) {
      barDirection = 'left';
    }
  } else if (barDirection === 'left') {
    moveLeft(currentRow);

    if (isLeftEdge(currentRow)) {
      barDirection = 'right';
    }
  }
}

// GAME LOGIC / CONTROLS

function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON';
    endGameScreen.classList.add('win');
  }

  endGameScreen.classList.remove('hidden');
}

function onPlayAgain() {
  location.reload();
}

function checkWin() {

  if (currentRowIndex === 0 && !isGameOver) {
    updateScore();
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost() {

  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];

  if (!prevRow) return;

  for (let i = 0; i < currentRow.length; i++) {

    if (currentRow[i] === 1 && prevRow[i] === 0) {

      currentRow[i] = 0;
      barSize--;

      if (barSize === 0) {
        isGameOver = true;
        clearInterval(gameInterval);
        endGame(false);
      }
    }
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, '0');
}

function onStack() {

  checkLost();
  checkWin();

  if (isGameOver) return;

  updateScore();

  currentRowIndex = currentRowIndex - 1;
  barDirection = 'right';

  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }

  draw();
}

// EVENTS

stackBtn.addEventListener('click', onStack);
playAgainButton.addEventListener('click', onPlayAgain);

// START GAME
draw();

function main() {
  moveBar();
  draw();
}

const gameInterval = setInterval(main, 600);
