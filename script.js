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

function playerButtonCallback(event) {
  updateRoundDetails(
    playRound(this.textContent.toLowerCase(), getComputerChoice())
  );
}
function createPlayerButton(name) {
  let btn = document.createElement("button");
  btn.textContent = name;
  btn.addEventListener("click", playerButtonCallback);
  document.body.appendChild(btn);
}

function createScoreboard() {
  let div = document.createElement("div");
  div.id = "scoreboard";
  div.textContent = "Score (W-L-T): 0-0-0";
  document.body.appendChild(div);
}
function updateScoreboard(wins, losses, ties) {
  let div = document.querySelector("#scoreboard");
  div.textContent = `Score (W-L-T): ${wins}-${losses}-${ties}`;
}

function createRoundDetails() {
  let div = document.createElement("div");
  div.id = "round-details";
  document.body.appendChild(div);
}
function updateRoundDetails(outcome) {
  let div = document.querySelector("#round-details");
  let p = document.createElement("p");
  p.textContent = `${outcome}`;
  div.appendChild(p);
}

function game() {
  let wins = 0;
  let ties = 0;
  let losses = 0;

  //create 3 buttons for each selection
  createScoreboard();
  createPlayerButton("Rock");
  createPlayerButton("Paper");
  createPlayerButton("Scissors");
  createRoundDetails();

  updateScoreboard(wins, losses, ties);
  //add event listener that call playRound with correct playerSelection
}

////////////////////////////////////////////////////////////////////////
game();
