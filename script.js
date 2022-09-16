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

function game() {
  let wins = 0;
  let ties = 0;
  let losses = 0;
  console.group("Round Results");
  for (let i = 0; i < 5; i++) {
    //const playerSelection = getUserInput();
    const playerSelection = getComputerChoice();
    const computerSelection = getComputerChoice();
    roundResult = playRound(playerSelection, computerSelection);
    switch (roundResult[4]) {
      case "T":
        ties++;
        break;
      case "L":
        losses++;
        break;
      case "W":
        wins++;
        break;
    }
    console.log(roundResult);
  }
  console.groupEnd();
  console.log(`Your score (W-L-T): ${wins}-${losses}-${ties}`);
}

////////////////////////////////////////////////////////////////////////
game();
