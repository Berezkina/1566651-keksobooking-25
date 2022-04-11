export const NUMBER_OF_OFFERS = 10;
export const NUMBER_DECIMAL_PLACES = 5;
export const TIMEOUT_DELAY = 500;
export const DEFAULT_AVATAR = 'img/muffin-grey.svg';
export const DEFAULT_VALUE = 'any';
export const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export const Forms = {
  AD_FORM: 'ad-form',
  MAP_FILTERS: 'map__filters',
};

export const MapSettings = {
  CENTER: {
    lat: 35.665279,
    lng: 139.783736,
  },
  ZOOM: 13,
  MAIN_PIN: {
    iconUrl: '../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
  OFFER_PIN: {
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
};

export const ApiUrl = {
  GET: 'https://25.javascript.pages.academy/keksobooking/data',
  POST: 'https://25.javascript.pages.academy/keksobooking',
};

export const SliderSettings = {
  RANGE: {
    min: 0,
    max: 100000,
  },
  START: 5000,
  STEP: 500,
  CONNECT: 'lower',
  NUMBER_DECIMAL_PLACES: 0,
};

export const PhotoSettings = {
  WIDTH: 70,
  HEIGHT: 70,
  ALT: 'Фотография жилья',
};

export const PriceValues = {
  MIN_PRICE: {
    bungalow: 0,
    flat: 1000,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  },
  MAX_PRICE: 100000,
};

export const OfferTypeText = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

export const MessageTemplate = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const housingPrice = {
  'low': {
    min: 0,
    max: 9999,
  },
  'middle': {
    min: 10000,
    max: 50000,
  },
  'high': {
    min: 50001,
    max: 100000,
  }
};

export const capacityOption = {
  1: '1',
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: '0',
};
