import { deactivateForm } from './toggle-state.js';
import { NUMBER_OF_OFFERS, Forms, ApiUrl  } from './consts.js';
import { initMap, getMapLoaded, setOffersMarker } from './map.js';
import { getData } from './api.js';
import { setDataCache } from './cache.js';
import { showErrorOnMap } from './utils.js';
import './user-form.js';
import './slider.js';
import './avatar.js';
import './photo.js';

deactivateForm(Forms.AD_FORM, true);
deactivateForm(Forms.MAP_FILTERS, true);

initMap();

const isLoaded = getMapLoaded();

if (isLoaded) {
  deactivateForm(Forms.AD_FORM, false);
  getData((offers) => {
    setDataCache(offers);
    setOffersMarker(offers.slice(0, NUMBER_OF_OFFERS));
    deactivateForm(Forms.MAP_FILTERS, false);
  }, showErrorOnMap, ApiUrl.GET);
}

