const rollDiceBtn = document.getElementById("roll-dice");
const player1Name = document.querySelector("#player1-score h3");
const player2Name = document.querySelector("#player2-score h3");

const player1Points = document.getElementById("player1-points");
const player2Points = document.getElementById("player2-points");
const player1Sticks = document.getElementById("player1-sticks");
const player2Sticks = document.getElementById("player2-sticks");

let currentPlayer = 1;
let player1 = { points: 0, sticks: 0 };
let player2 = { points: 0, sticks: 0 };

function rollDice() {
  const diceResults = [];
  for (let i = 0; i < 6; i++) {
    diceResults.push(Math.floor(Math.random() * 2));
  }
  return diceResults;
}

function calculatePoints(diceResults) {
  const markedDice = diceResults.filter(result => result === 1);
  const unmarkedDice = diceResults.filter(result => result === 0);

  if (markedDice.length === 6 || unmarkedDice.length === 6) {
    return 5;
  } else if (markedDice.length === 5 || unmarkedDice.length === 5) {
    return 1;
  } else {
    return 0;
  }
}

function updateScores() {
  player1Points.innerText = player1.points;
  player1Sticks.innerText = player1.sticks;
  player2Points.innerText = player2.points;
  player2Sticks.innerText = player2.sticks;
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  displayCurrentPlayer();
}

function displayCurrentPlayer() {
  const player1H3 = document.querySelector("#player1-score h3");
  const player2H3 = document.querySelector("#player2-score h3");

  if (currentPlayer === 1) {
    player1H3.classList.add("active-player-1");
    player1H3.classList.remove("active-player-2");
    player2H3.classList.remove("active-player-1");
    player2H3.classList.add("active-player-2");
  } else {
    player1H3.classList.remove("active-player-1");
    player1H3.classList.add("active-player-2");
    player2H3.classList.add("active-player-1");
    player2H3.classList.remove("active-player-2");
  }
}

rollDiceBtn.addEventListener("click", async () => {
  rollDiceBtn.disabled = true; // Disable the button while rolling

  const diceResults = rollDice();

  // Add the rolling animation and wait for 1 second
  const dish = document.getElementById("dish");
  dish.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const die = document.createElement("div");
    die.classList.add("die");
    die.classList.add("die-rolling");
    dish.appendChild(die);
  }
  await new Promise(resolve => setTimeout(resolve, 1000));

  const points = calculatePoints(diceResults);
  displayDice(diceResults);

  if (currentPlayer === 1) {
    player1.points += points;
    player1.sticks += points;
  } else {
    player2.points += points;
    player2.sticks += points;
  }

  updateScores();

  if (points === 0) {
    switchPlayer();
  }

  rollDiceBtn.disabled = false; // Enable the button again
});

function displayDice(diceResults) {
  const dish = document.getElementById("dish");

  dish.innerHTML = "";

  diceResults.forEach((result, index) => {
    const die = document.createElement("div");
    die.classList.add("die");

    const top = Math.floor(Math.random() * 70) + 10;
    const left = Math.floor(Math.random() * 70) + 10;
    die.style.top = `${top}%`;
    die.style.left = `${left}%`;

    if (result === 1) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      die.appendChild(dot);
    }

    dish.appendChild(die);
  });
}

displayCurrentPlayer();
