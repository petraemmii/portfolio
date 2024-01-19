//Select the relevant elements from the HTML
const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainBtn = document.querySelector('.play-again');

const gridMatrix = [
  ['', '', '', '', '' ,'', '', '', ''],
  ['river', 'wood', 'wood', 'river', 'wood', 'river','river', 'river', 'river'],
  ['river', 'river', 'river', 'wood', 'wood', 'river', 'wood', 'wood', 'river'],
  ['', '', '', '', '', '', '', '', ''],
  ['road', 'bus', 'road', 'road', 'road', 'car', 'road', 'road', 'road'],
  ['road', 'road', 'road', 'car', 'road', 'road', 'road', 'road', 'bus'],
  ['road', 'road', 'car', 'road', 'road', 'road', 'bus', 'road', 'road'],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '']
];

const victoryRow = 0;
const riverRows = [1, 2];
const roadRows = [4, 5, 6];
const duckPosition = { x: 4, y: 8 };
let contentBeforeDuck = '';
let time = 15;

function drawGrid() {
  grid.innerHTML = '';

gridMatrix.forEach(function(gridRow, gridRowIndex) {
gridRow.forEach(function(cellContent, cellContentIndex) {
 
const cellDiv = document.createElement('div');
cellDiv.classList.add('cell');

if (riverRows.includes(gridRowIndex)) {
  cellDiv.classList.add('river');
} else if (roadRows.includes(gridRowIndex)) {
  cellDiv.classList.add('road');
}

if (cellContent) {
cellDiv.classList.add(cellContent);
}

grid.appendChild(cellDiv);
});
});
}

function placeDuck () {
  contentBeforeDuck = gridMatrix [duckPosition.y][duckPosition.x];
  gridMatrix[duckPosition.y][duckPosition.x] = 'duck';
}

function moveDuck(event) {
  const key = event.key;
  console.log(key);
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  switch(key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
     if (duckPosition.y > 0) duckPosition.y--;
     break;
    case 'ArrowDown':
    case 's':
    case 'S':
     if(duckPosition.y < 8) duckPosition.y++;
     break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
     if(duckPosition.x > 0) duckPosition.x--;
     break;
    case 'ArrowRight':
    case 'd':
    case 'D':
     if (duckPosition.x < 8) duckPosition.x++;
     break;
  }

  render();
}

function moveRight(gridRowIndex) {
const currentRow = gridMatrix[gridRowIndex];
const lastElement = rowCells.pop()
currentRow.unshift(lastElement);
}

function moveLeft(gridRowIndex) {
  const currentRow = gridMatrix[gridRowIndex];
  const firstElement = currentRow.shift();
  currentRow.push(firstElement);
}

function animateGame() {
  moveRight (1);
  moveLeft (2);
  moveRight (4);
  moveRight (5);
  moveRight (6);
}

function updateDuckPosition () {
  gridMatrix[duckPosition.y][duckPosition.x] = contentBeforeDuck;

  if (contentBeforeDuck === 'wood') {
    if (duckPosition.y === 1 && duckPosition.x < 8) duckPosition.x++;
    else if (duckPosition.y === 2 && duckPosition.x > 0) duckPosition.x--;
  }
}

function checkPosition() {
if(duckPosition.y === victoryRow) endGame('duck-arrived');
else if (contentBeforeDuck === 'river') endGame('duck-drowned');
else if (contentBeforeDuck === 'car' || contentBeforeDuck === 'bus') 
endGame('duck-hit');
}

function endGame(reason) {

  if (reason === 'duck-arrived') {
    endGameText.innerHTML = 'YOU<br>WIN!';
    endGameScreen.classList.add('win');
  }

gridMatrix [duckposition.y][duckPosition.x] = reason;

  clearInterval(countdownLoop);
  clearInterval(renderLoop);
  document.removeEventListener('keyup', moveDuck);
  endGameScreen.classList.remove('hidden');
}

function countdown() {
  if (time !== 0) {
  time--;
  timer.innerText = time.toString().padStart(5, '0');
  }

  if (time === 0) {
endGame();
  }
}

function render() {
placeDuck();
checkPosition();
drawGrid();
}

const renderLoop = setInterval(function () {
  updateDuckPosition();
  animateGame();
  render();
}, 600);

const countdownLoop = setInterval(countdown, 1000);

document.addEventListener('keyup', moveDuck);
playAgainBtn.addEventListener('click', function () {
location.reload();
});
