function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat (min, max, dec) {
  return Number(Math.random() * (max - min) + min).toFixed(dec);
}

getRandomInt(2, 56);
getRandomFloat(3.5, 82.9, 4);
