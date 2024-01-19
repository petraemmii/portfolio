const grid = document.querySelector('.grid');
const scoreCounter = document.querySelector('.score-counter');

const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

const totalCells = 100;
const totalBombs = 6;
const maxScore = totalCells - totalBombs;
const bombsList = [];

let score = 0;

while (bombsList.length < totalBombs) {
  
  const randomNumber = Math.floor(Math.random() * totalCells) + 1;

  if (!bombsList.includes(randomNumber)) bombsList.push(randomNumber);
}

console.log(bombsList);

// GRID AND GAME LOGIC

for (let i = 1; i <= totalCells; i++) {
  
  const cell = document.createElement('div');
  cell.classList.add('cell');

  cell.addEventListener('click', function () {
  
    if (cell.classList.contains('cell-clicked')) return;

    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
      endGame(false);
    } else {
      cell.classList.add('cell-clicked');
      updateScore();
    }
  });

  grid.appendChild(cell);
}

// FUNCTIONS

function updateScore() {
  score++;
  scoreCounter.innerText = score.toString().padStart(5, '0');
  if (score === maxScore) endGame(true);
}

function revealAllBombs() {
  
  const cells = document.querySelectorAll('.cell');

  for (let i = 1; i <= cells.length; i++) {
    const cell = cells[i - 1];

    
    if (bombsList.includes(i)) {
      cell.classList.add('cell-bomb');
    }
  }
}

// Function for when the game ends
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = 'YOU<br>WON';
    endGameScreen.classList.add('win');
  }

  revealAllBombs();
  endGameScreen.classList.remove('hidden');
}

// PLAY AGAIN

playAgainButton.addEventListener('click', function () {
  window.location.reload();
});
