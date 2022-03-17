// Вспомогательные функции

const getRandomInt = (a, b) => {
  const min = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const max = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (a, b, dec = 1) => {
  const min = Math.min(Math.abs(a), Math.abs(b));
  const max = Math.max(Math.abs(a), Math.abs(b));
  return Number(Math.random() * (max - min) + min).toFixed(dec);
};

export {getRandomInt, getRandomFloat};
