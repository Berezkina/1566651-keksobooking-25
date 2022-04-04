import { NUMBER_OF_OFFERS, API_URL } from './consts.js';
import { showErrorOnMap } from './utils.js';
import { getData } from './api.js';
import { setOffersMarker, clearMarkerGroup } from './map.js';

const filtersArray = new Map();

const getFiltersArray = () => {
  const mapFilters = document.querySelector('.map__filters');

  filtersArray.clear();
  const features = [];
  const price = {};

  const { elements } = mapFilters;

  Array.from(elements).forEach((element) => {
    const { name, value, checked } = element;
    if (value === 'any') {
      return;
    }
    switch (name) {
      case 'housing-type':
        return filtersArray.set('type', value);
      case 'housing-price':
        switch (value) {
          case 'low':
            price.low = 0;
            price.high = 9999;
            break;
          case 'middle':
            price.low = 10000;
            price.high = 50000;
            break;
          case 'high':
            price.low = 50001;
            price.high = 100000;
        }
        return filtersArray.set('price', price);
      case 'housing-rooms':
        return filtersArray.set('rooms', Number(value));
      case 'housing-guests':
        return filtersArray.set('guests', Number(value));
      case 'features':
        if (checked) {
          features.push(value);
        }
        if (features.length === 0) {
          return;
        }
        return filtersArray.set('features', features);
    }
  });
};

const filterItem = (element, key) => {
  if (!filtersArray.has(key)) {
    return true;
  }
  switch (key) {
    case 'type':
    case 'rooms':
    case 'guests':
      return element === filtersArray.get(key);
    case 'price':
      return element >= filtersArray.get(key).low && element < filtersArray.get(key).high;
    case 'features':
      if (typeof element === 'undefined') {
        return false;
      }
      return Array.from(filtersArray.get(key)).every((feature) => element.includes(feature));
  }
};

const filterOffers = (offers) => {
  let newOffers;
  if (filtersArray.size !== 0) {
    newOffers = offers.filter((item) => filterItem(item.offer.type, 'type') &&
                                        filterItem(item.offer.price, 'price') &&
																				filterItem(item.offer.rooms, 'rooms') &&
                                        filterItem(item.offer.guests, 'guests') &&
																				filterItem(item.offer.features, 'features')).slice(0, NUMBER_OF_OFFERS);
  }
  clearMarkerGroup();
  setOffersMarker(newOffers);
};

const setFilteredOffers = () => {
  getFiltersArray();
  getData(filterOffers, showErrorOnMap, API_URL);
};

export { setFilteredOffers };

