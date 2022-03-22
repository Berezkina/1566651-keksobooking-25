import {createOffers} from './mock.js';
import {markupCard} from './card-markup.js';
import {deactivateForms} from './toggle-state.js';
import './check-form.js';

const similarOffers = createOffers();

markupCard(similarOffers[2]);

deactivateForms(false);
