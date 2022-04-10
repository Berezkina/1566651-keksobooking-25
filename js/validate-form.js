import { PriceValues, capacityOption } from './consts.js';

const adForm = document.querySelector('.ad-form');
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
const validateMaxPrice = (value) => value <= PriceValues.MAX_PRICE;

pristine.addValidator(priceField, validateMaxPrice, `Максимальная цена — ${PriceValues.MAX_PRICE}`);

const validateMinPrice = (value) => value >= PriceValues.MIN_PRICE[typeField.value];

const getMinPriceErrorMessage = () => `Минимальная цена - ${PriceValues.MIN_PRICE[typeField.value]}`;

pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);

typeField.addEventListener('change', (evt) => {
  priceField.placeholder = PriceValues.MIN_PRICE[evt.target.value];
  if (priceField.value) {
    pristine.validate(priceField);
  }
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

export { pristine };
