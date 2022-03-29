import {sendData} from './api.js';
import {resetMap} from './map.js';
import {isEscapeKey} from './utils.js';

const MinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const capacityOption = {
  1: '1',
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: '0',
};

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const priceField = adForm.querySelector('#price');
const typeField = adForm.querySelector('#type');
const capacityField = adForm.querySelector('#capacity');
const roomNumberField = adForm.querySelector('#room_number');
const timeinField = adForm.querySelector('#timein');
const timeoutField = adForm.querySelector('#timeout');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
  errorTextTag: 'span'
});

//Проверка поля "Цена за ночь"

const validateMaxPrice = (value) => value <= 100000;

pristine.addValidator(priceField, validateMaxPrice, 'Максимальная цена — 100000');

const validateMinPrice = (value) => value >= MinPrice[typeField.value.toUpperCase()];

const getMinPriceErrorMessage = () => `Минимальная цена - ${MinPrice[typeField.value.toUpperCase()]}`;

pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);

typeField.addEventListener('change', (evt) => {
  priceField.placeholder = MinPrice[evt.target.value.toUpperCase()];
  pristine.validate(priceField);
});


//Проверка поля "Количество мест"

const validateCapacity = () => capacityOption[roomNumberField.value].includes(capacityField.value);

pristine.addValidator(capacityField, validateCapacity, 'Недопустимое значение');

roomNumberField.addEventListener('change', () => {
  pristine.validate(capacityField);
});

//Проверка полей "Время заезда и выезда"

timeinField.addEventListener('change', (evt) => {
  timeoutField.value = evt.target.value;
});

timeoutField.addEventListener('change', (evt) => {
  timeinField.value = evt.target.value;
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка данных...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const showPopupMessage = (messageType) => {
  const messageTemplate = document.querySelector(`#${messageType}`).content.querySelector(`.${messageType}`);
  const messageElement = messageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', messageElement);

  document.addEventListener('click', () => {
    messageElement.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageElement.remove();
    }
  }, { once: true });
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {

    blockSubmitButton();
    sendData(
      () => {
        showPopupMessage('success');
        adForm.reset();
        resetMap();
        unblockSubmitButton();
      },
      () => {
        showPopupMessage('error');
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
});

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
});
