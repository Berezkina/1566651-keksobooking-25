import {getRandomInt, getRandomFloat} from './utils.js';

const MinValues = {
  MIN_PRICE: 1,
  MIN_ROOMS: 1,
  MIN_GUESTS: 1,
};

const MaxValues = {
  MAX_PRICE: 1000000,
  MAX_ROOMS: 10,
  MAX_GUESTS: 100,
};

const NUMBER_OF_OFFERS = 10;

const titles = [
  'Гостевой дом',
  'Апартаменты Sweet Home',
  'Семейный отель Мария',
  'Бунгало на Лесной',
  'Уютная квартира в центре'
];

const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const time = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const descriptions = [
  'Номер с великолепным видом на горы',
  'В каждом номере есть кабельное телевидение, а в некоторых даже установлен кондиционер',
  'Райское место для любителей тишины',
  'Имеется всё необходимое для проживания',
  'Парк-отель с баром и прямым доступом к лыжным трассам',
];

const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Генерация данных

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

const getRandomArraySlice = (array) => {
  const elementsNumber = getRandomInt(0, array.length - 1);
  return array.sort(() => 0.5 - Math.random()).slice(0, elementsNumber);
};

const createOffer = (idx) => {
  const locationLat = getRandomFloat(35.65000, 35.70000, 5);
  const locationLng = getRandomFloat(139.70000, 139.80000, 5);
  const currentIndex = idx+=1;

  return {
    author: {
      avatar: `img/avatars/user${(currentIndex.toString()).padStart(2, '0')}.png`
    },
    offer: {
      title: getRandomArrayElement(titles),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInt(MinValues.MIN_PRICE, MaxValues.MAX_PRICE),
      type: getRandomArrayElement(types),
      rooms: getRandomInt(MinValues.MIN_ROOMS, MaxValues.MAX_ROOMS),
      guests: getRandomInt(MinValues.MIN_GUESTS, MaxValues.MAX_GUESTS),
      checkin: getRandomArrayElement(time),
      checkout: getRandomArrayElement(time),
      features: getRandomArraySlice(features),
      description: getRandomArrayElement(descriptions),
      photos: getRandomArraySlice(photos),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const createOffers = () => Array.from({length: NUMBER_OF_OFFERS}).map((item, idx) => createOffer(idx));

export {createOffers};
