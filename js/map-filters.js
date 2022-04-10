import { getDataCache } from './cache.js';
import { NUMBER_OF_OFFERS, DEFAULT_VALUE, housingPrice } from './consts.js';

const mapFilters = document.querySelector('.map__filters');
const typeFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelector('#housing-features');

const checkType = (element) => typeFilter.value === DEFAULT_VALUE || element.type === typeFilter.value;

const checkRooms = (element) => roomsFilter.value === DEFAULT_VALUE || element.rooms === Number(roomsFilter.value);

const checkGuests = (element) => guestsFilter.value === DEFAULT_VALUE || element.guests === Number(guestsFilter.value);

const checkPrice = (element) => priceFilter.value === DEFAULT_VALUE || element.price >= housingPrice[priceFilter.value].min && element.price <= housingPrice[priceFilter.value].max;

const checkFeatures = (element) => {
  const features = Array.from(featuresFilter.querySelectorAll('input[name="features"]:checked'));
  if (features.length === 0) {
    return true;
  }
  if (typeof element.features === 'undefined') {
    return false;
  }
  return features.every((item) => element.features.includes(item.value));
};

const filterItem = (element) => checkType(element) && checkPrice(element) && checkRooms(element) && checkGuests(element) && checkFeatures(element);

const filterOffers = (offers) => {
  const newOffers = [];
  for (let i = 0; i < offers.length; i++) {
    if (newOffers.length === NUMBER_OF_OFFERS) {
      break;
    }
    if (filterItem(offers[i].offer)) {
      newOffers.push(offers[i]);
    }
  }
  return newOffers;
};

const getFilteredOffers = () => filterOffers(getDataCache());

export { getFilteredOffers };
