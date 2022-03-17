import {getRandomInt, getRandomFloat} from './utils.js';
import {NUMBER_OF_OFFERS, MIN_PRICE, MAX_PRICE, MIN_ROOMS, MAX_ROOMS, MIN_GUESTS, MAX_GUESTS, TITLES, TYPES, TIME, FEATURES, DESCRIPTIONS, PHOTOS} from './consts.js';

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
      title: getRandomArrayElement(TITLES),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInt(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInt(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInt(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(TIME),
      checkout: getRandomArrayElement(TIME),
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

const createOffers = () => Array.from({length: NUMBER_OF_OFFERS}).map((item, idx) => createOffer(idx));

export {createOffers};
