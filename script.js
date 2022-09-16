function p(s) {
  console.log(s);
}

function getRandom() {
  return Math.random();
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(getRandom() * (max - min + 1) + min);
}

function getRandomChoice(max) {
  return getRandomIntInclusive(1, max);
}

/*
play against computer

*/
//randomly return Rock Paper Scissors
function getComputerChoice() {
  switch (getRandomChoice(3)) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    case 3:
      return "Scissors";
  }
}

p(getComputerChoice());
