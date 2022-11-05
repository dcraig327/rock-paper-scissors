let wins;
let losses;
let ties;
let playing;

function getRandom() {
  return Math.random();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(getRandom() * (max - min) + min);
}

function getRandomChoice(max) {
  return getRandomInt(0, max);
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

//////////////////////////////////////////////////////////////////////

const shapes = { rock: 0, paper: 1, scissors: 2 };
function getComputerChoice() {
  return getKeyByValue(shapes, getRandomChoice(3));
}

function playRound(playerSelection, computerSelection) {
  /*
    0: rock
    1: paper
    2: scissors

              player - computer

    2-0 = 2   lose  4
    1-2 = -1  lose  1
    0-1 = -1  lose  1
    1-0 = 1   win   3
    2-1 = 1   win   3
    0-2 = -2  win   0
    2-2 = 0   tie   2
    1-1 = 0   tie   2
    0-0 = 0   tie   2
  */

  computer = shapes[computerSelection.toLowerCase()];
  player = shapes[playerSelection.toLowerCase()];

  switch (player - computer) {
    case 0:
      return `You Tie! ${playerSelection} matches ${computerSelection}`;
      break;
    case 2:
    case -1:
      return `You Lose! ${computerSelection} beats ${playerSelection}`;
      break;
    case 1:
    case -2:
      return `You Win! ${playerSelection} beats ${computerSelection}`;
      break;
  }
}

function getUserInput() {
  let shape = "asdf";
  while (true) {
    shape = window.prompt("Rock / Paper / Scissors");
    if (shape in shapes) break;
  }
}

function createPlayerButton(name) {
  let btn = document.createElement("button");
  btn.textContent = name;
  btn.addEventListener("click", playerButtonCallback);
  document.body.appendChild(btn);
}
function createRoundDetails() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  let p = document.createElement("p");
  p.id = "round-details";
  div.appendChild(p);
}
function createScoreboard() {
  let div = document.createElement("div");
  div.id = "scoreboard";
  document.body.appendChild(div);
  updateScoreboard();
}

function updateScoreboard() {
  let div = document.querySelector("#scoreboard");
  div.textContent = `Score (W-L-T): ${wins}-${losses}-${ties}`;
}
function updateRoundDetails(outcome) {
  let p = document.querySelector("#round-details");
  let text = document.createTextNode(`${outcome}`);
  if (p.hasChildNodes()) {
    let br = document.createElement("br");
    p.appendChild(br);
  }
  p.appendChild(text);
}

function updateScore(result) {
  switch (result) {
    case "W":
      wins++;
      break;
    case "L":
      losses++;
      break;
    case "T":
      ties++;
      break;
  }
}

function playerButtonCallback(event) {
  if (!playing) {
    resetGame();
  }
  let ret = playRound(this.textContent.toLowerCase(), getComputerChoice());
  let result = ret[4];
  updateRoundDetails(ret);
  updateScore(result);
  updateScoreboard();
  if (checkPlayerWon()) {
    endGame("YOU ARE THE CHAMPION!");
  } else if (checkPlayerLost()) {
    endGame("YOU ARE THE CHUMPSON!");
  }
}

function resetGame() {
  wins = 0;
  ties = 0;
  losses = 0;
  playing = true;
  //if roundDetails, clear it
  let p = document.querySelector("#round-details");
  if (p) {
    while (p.firstChild) {
      p.removeChild(p.firstChild);
    }
  }
}

function endGame(resultMessage) {
  playing = false;
  let p = document.querySelector("#round-details");
  let gameOver = document.createElement("h3");
  gameOver.textContent = "Series Over";
  p.appendChild(gameOver);
  let result = document.createElement("h3");
  result.textContent = resultMessage;
  p.appendChild(result);
}

function checkPlayerWon() {
  if (wins == 5) {
    return true;
  }
}
function checkPlayerLost() {
  if (losses == 5) {
    return true;
  }
}

function game() {
  resetGame();
  createPlayerButton("Rock");
  createPlayerButton("Paper");
  createPlayerButton("Scissors");
  createScoreboard();
  createRoundDetails();
}

////////////////////////////////////////////////////////////////////////
game();
