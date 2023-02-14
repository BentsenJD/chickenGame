'use strict';

// assigns variables from HTML file it mutable variables for startup
let score0Element = document.querySelector('#score--0');
let score1Element = document.querySelector('#score--1');
let diceElement = document.querySelector('.dice');
let player0Element = document.querySelector('.player--0');
let player1Element = document.querySelector('.player--1');

//STARTING PARAMETERS

//.textContent changes text in HTML to 0 when run
score0Element.textContent = 0;
score1Element.textContent = 0;

//Hides Dice on start
// adds hidden class (from .css file) to dice element to hide it
diceElement.classList.add('hidden');

//ROLE THE DICE -> When button clicked, random dice image appear

// assigns variables from HTML file for dice roll
let btnRoll = document.querySelector('.btn--roll');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');

// initialize current score so it can be changed
let current0Element = document.querySelector('#current--0');
let current1Element = document.querySelector('#current--1');

const score = [0, 0];

let tempScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  tempScore = 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

//1.Generate Random dice roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //math.random gives random number between 0 - 1
    //math.trunc removes decimal
    let dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display Dice (manipulate src link from HTML file)
    diceElement.classList.remove('hidden'); // makes dice reappear
    diceElement.src = `dice-${dice}.png`; //changes src link based on random number

    //3. Check if dice 1 rolled, if rolled, switch players
    if (dice !== 1) {
      //add to tempScore
      tempScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        tempScore;
    } else {
      //switch to next player if dice is 1
      switchPlayer();
    }
  }
});

//1. Hold Total Score
btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += tempScore; // adds temp score to total score
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    //2. check if players score is greater than or equal to 100
    //2.a if 100+ player wins
    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      playing = false;
      diceElement.classList.add('hidden');
    } else {
      //2.b else Switch player
      switchPlayer();
    }
  }
});

//Reloads page to reset game
btnNew.addEventListener('click', function () {
  document.location.reload(true);
});
