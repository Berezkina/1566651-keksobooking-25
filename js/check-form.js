const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const capacityOption = {
  1: '1',
  2: ['2', '1'],
  3: ['3', '2', '1'],
  100: '0',
};

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

const validateMaxPrice = (value) => value <= 100000;

pristine.addValidator(priceField, validateMaxPrice, 'Максимальная цена — 100000');

const validateMinPrice = (value) => value >= minPrice[typeField.value];

const getMinPriceErrorMessage = () => `Минимальная цена - ${minPrice[typeField.value]}`;

pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);

typeField.addEventListener('change', (evt) => {
  priceField.placeholder = minPrice[evt.target.value];
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

//Отправка формы

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
