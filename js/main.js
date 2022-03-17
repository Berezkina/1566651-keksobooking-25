import {createOffers} from './mock.js';
import {markupCard} from './card-markup.js';

const similarOffersElement = document.querySelector('#map-canvas');

const similarOffersFragment = document.createDocumentFragment();

const similarOffers = createOffers();

similarOffersFragment.append(markupCard(similarOffers[2]));
similarOffersElement.append(similarOffersFragment);

import {activateForms} from './toggle-state.js';

activateForms();
