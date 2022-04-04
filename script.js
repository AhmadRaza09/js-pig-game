'use strict';

//function
const nextPlayer = function () {
  currentScore = 0;

  activePlayer === 0
    ? (currentScore0El.textContent = currentScore)
    : (currentScore1El.textContent = currentScore);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  //switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // console.log(activePlayer);

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const startNewGame = function () {
  //if plaiyng != ture then do
  if (!playing) {
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');

    currentScore = 0;
    activePlayer = 0;
    totalScore = [0, 0];
    playing = true;

    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
  }
};

//variable
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const winnerScore = 100;

let currentScore;
let activePlayer = 0;
let totalScore;
let playing;

//event

//rolling dice
btnRoll.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  //   console.log('roll');

  //generate random dice rol
  const dice = Math.trunc(Math.random() * 6) + 1;
  //   console.log(dice);

  //display dice
  diceEl.classList.remove('hidden');
  diceEl.setAttribute('src', `dice-${dice}.png`);

  //check roll if 1 then switch next player
  if (dice !== 1) {
    // add dice to the current score
    currentScore = currentScore + dice;
    activePlayer === 0
      ? (currentScore0El.textContent = currentScore)
      : (currentScore1El.textContent = currentScore);
  } else {
    nextPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) {
    return;
  }
  //   console.log('hold');
  //add current score to the active player score
  totalScore[activePlayer] = totalScore[activePlayer] + currentScore;
  activePlayer === 0
    ? (score0El.textContent = totalScore[activePlayer])
    : (score1El.textContent = totalScore[activePlayer]);

  //check if player's score is >= 100
  if (totalScore[activePlayer] >= winnerScore) {
    //finish game
    playing = false;

    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //switch to the next player
    nextPlayer();
  }
});

btnNew.addEventListener('click', startNewGame);

startNewGame();
