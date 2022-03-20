import {createOffers} from './mock.js';
import {markupCard} from './card-markup.js';

const similarOffers = createOffers();

markupCard(similarOffers[2]);

import {deactivateForms} from './toggle-state.js';

deactivateForms(false);

import './check-form.js';
