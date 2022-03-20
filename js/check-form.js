const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
  errorTextTag: 'span'
});

//Проверка поля "Цена за ночь"
const priceField = adForm.querySelector('#price');
const typeField = document.querySelector('#type');

function validateMaxPrice (value) {
  return value <= 100000;
}

pristine.addValidator(priceField, validateMaxPrice, 'Максимальная цена — 100000');

const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

function validateMinPrice (value) {
  return value >= minPrice[typeField.value];
}

function getMinPriceErrorMessage () {
  return `Минимальная цена - ${minPrice[typeField.value]}`;
}

pristine.addValidator(priceField, validateMinPrice, getMinPriceErrorMessage);

function onTypeChange () {
  priceField.placeholder = minPrice[this.value];
  pristine.validate(priceField);
}

typeField.addEventListener('change', onTypeChange);

//Проверка поля "Количество мест"
const capacityField = adForm.querySelector('#capacity');
const roomNumberField = document.querySelector('#room_number');

const capacityOption = {
  '1': '1',
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': '0'
};

function validateCapacity () {
  return capacityOption[roomNumberField.value].includes(capacityField.value);
}

function getCapacityErrorMessage () {
  return 'Недопустимое значение';
}

pristine.addValidator(capacityField, validateCapacity, getCapacityErrorMessage);

const onRoomNumberChange = () => {
  pristine.validate(capacityField);
};

roomNumberField.addEventListener('change', onRoomNumberChange);

//Отправка формы
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
