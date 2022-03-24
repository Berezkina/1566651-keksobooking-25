const adForm = document.querySelector('.ad-form');
const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');
const resetButton = adForm.querySelector('.ad-form__reset');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('slide', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

valueElement.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.updateOptions({
    start: evt.target.value,
  });
});

typeElement.addEventListener('change', () => {
  const placeholderValue = Number(valueElement.getAttribute('placeholder'));
  if (!valueElement.value && placeholderValue !== '') {
    sliderElement.noUiSlider.updateOptions({
      start: placeholderValue,
    });
  }
});

resetButton.addEventListener('click', () => {
  sliderElement.noUiSlider.reset();
});
