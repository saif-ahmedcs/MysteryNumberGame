'use strict';

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');
const bodyEl = document.querySelector('body');

let secretNumber = Math.trunc(Math.random() * 101);
let tries = Number(scoreEl.textContent);
let highestScore = 0;
let gameOver = false;

function checkGuess() {
  const guess = Number(guessEl.value);

  if (gameOver) {
    return;
  }

  if (!guessEl.value) {
    messageEl.textContent = '⛔ No number!';
  } else if (guess < 0 || guess > 100) {
    messageEl.textContent = '🚫 Number between 0 and 100!';
  } else if (guess === secretNumber) {
    messageEl.textContent = '🎉 Correct number!';
    numberEl.textContent = guess;
    bodyEl.style.backgroundColor = '#60b347';
    numberEl.style.width = '30rem';

    if (tries > highestScore) {
      highestScore = tries;
      highscoreEl.textContent = `${highestScore}`;
    }
    gameOver = true;
  } else if (tries > 1) {
    messageEl.textContent =
      guess < secretNumber ? '📉 Too low!' : '📈 Too high!';
    tries--;
    scoreEl.textContent = `${tries}`;
  } else {
    tries--;
    scoreEl.textContent = `${tries}`;
    messageEl.textContent = '❌ YOU LOST THE GAME ❌';
    gameOver = true;
  }
}

document.querySelector('.btn.check').addEventListener('click', checkGuess);

guessEl.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

document.querySelector('.btn.again').addEventListener('click', function () {
  gameOver = false;
  tries = 20;
  secretNumber = Math.trunc(Math.random() * 101);
  numberEl.style.width = '15rem';
  bodyEl.style.backgroundColor = '#222';
  scoreEl.textContent = tries;
  messageEl.textContent = 'Start guessing...';
  guessEl.value = '';
  numberEl.textContent = '?';
});
