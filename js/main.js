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

// Генерация данных

const NUMBER_OF_OFFERS = 10;
const MIN_PRICE = 1;
const MAX_PRICE = 1000000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_GUESTS = 1;
const MAX_GUESTS = 100;

const TITLES = [
  'Гостевой дом',
  'Апартаменты Sweet Home',
  'Семейный отель Мария',
  'Бунгало на Лесной',
  'Уютная квартира в центре'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTIONS = [
  'Номер с великолепным видом на горы',
  'В каждом номере есть кабельное телевидение, а в некоторых даже установлен кондиционер',
  'Райское место для любителей тишины',
  'Имеется всё необходимое для проживания',
  'Парк-отель с баром и прямым доступом к лыжным трассам',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomArraySlice = (array) => {
  const elementsNumber = getRandomInt(0, array.length - 1);
  return array.sort(() => 0.5 - Math.random()).slice(0, elementsNumber);
};

let currentIndex = 0;

const getImageAddress = () => {
  currentIndex++;
  const xx = (currentIndex.toString()).padStart(2, '0');
  return `img/avatars/user${xx}.png`;
};

const createOffer = () => {
  const locationLat = getRandomFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: getImageAddress(),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKIN),
      checkout: getRandomArrayElement(CHECKOUT),
      features: getRandomArraySlice(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArraySlice(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const createOffers = () => Array.from({length: NUMBER_OF_OFFERS}, createOffer);

createOffers();
