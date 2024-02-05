"use strict";

const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");
const playerScore1 = document.querySelector("#score--0");
const playerScore2 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");

//buttons

const rollDice = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");

let currentVal, activePlayer, playing;

//init function

const init = function () {
  currentVal = 0;
  activePlayer = 1;
  playing = true;

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playerScore1.textContent = 0;
  playerScore2.textContent = 0;

  dice.classList.add("hidden");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};

init();
//switch player function

const switchPlayer = function () {
  if (activePlayer === 1) {
    currentScore0.textContent = 0;
    activePlayer = 2;
    player1.classList.remove("player--active");
    player2.classList.add("player--active");
  } else {
    currentScore1.textContent = 0;
    activePlayer = 1;
    player1.classList.add("player--active");
    player2.classList.remove("player--active");
  }

  currentVal = 0;
};

//When user clicks on dice button

rollDice.addEventListener("click", function () {
  if (playing) {
    let diceVal = Math.trunc(Math.random() * 6) + 1;
    console.log(diceVal);
    dice.classList.remove("hidden");
    dice.src = `dice-${diceVal}.png`;

    if (diceVal != 1) {
      // Add scores into current value for active player
      if (activePlayer === 1) {
        currentVal += diceVal;
        currentScore0.textContent = currentVal;
      } else {
        currentVal += diceVal;
        currentScore1.textContent = currentVal;
      }
      // activePlayer === 1
      //   ? ((currentVal += diceVal), (currentScore0.textContent = currentVal))
      //   : ((currentVal += dice), (currentScore1.textContent = currentVal));
    } else {
      // switch player
      switchPlayer();
    }
  }
});

holdButton.addEventListener("click", function () {
  if (playing) {
    if (activePlayer === 1) {
      const totalScore0 = currentVal + Number(playerScore1.textContent);
      playerScore1.textContent = totalScore0;
      if (totalScore0 >= 10) {
        playing = false;
        player1.classList.add("player--winner");
        dice.classList.add("hidden");
      }
      switchPlayer();
    } else {
      const totalScore1 = currentVal + Number(playerScore2.textContent);
      playerScore2.textContent = totalScore1;
      if (totalScore1 >= 10) {
        playing = false;
        player2.classList.add("player--winner");
        dice.classList.add("hidden");
      }
      switchPlayer();
    }
  }
});
newGame.addEventListener("click", init);
