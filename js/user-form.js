import { pristine } from './validate-form.js';
import { sendData } from './api.js';
import { showPopupMessage, debounce } from './utils.js';
import { resetSlider } from './slider.js';
import { resetMap, setOffersMarker } from './map.js';
import { setDefaultAvatar } from './avatar.js';
import { removeImage } from './photo.js';
import { getFilteredOffers } from './map-filters.js';
import { ApiUrl, MessageTemplate, NUMBER_OF_OFFERS } from './consts.js';
import { getDataCache } from './cache.js';

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');

const blockSubmitButton = (shoudBlock) => {
  submitButton.disabled = shoudBlock;
  if (shoudBlock) {
    submitButton.textContent = 'Отправка данных...';
  }
  else {
    submitButton.textContent = 'Опубликовать';
  }
};

const resetAdForm = () => {
  adForm.reset();
  resetSlider();
  resetMap();
  setDefaultAvatar();
  removeImage();
  setOffersMarker(getDataCache().slice(0, NUMBER_OF_OFFERS));
  pristine.reset();
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton(true);
    sendData(() => {
      showPopupMessage(MessageTemplate.SUCCESS);
      resetAdForm();
      blockSubmitButton(false);
    }, () => {
      showPopupMessage(MessageTemplate.ERROR);
      blockSubmitButton(false);
    }, new FormData(evt.target), ApiUrl.POST);
  }
});

mapFilters.addEventListener('change', debounce(() => {
  setOffersMarker(getFilteredOffers());
})
);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdForm();
});
