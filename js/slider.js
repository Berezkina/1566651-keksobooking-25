import { SliderSettings } from './consts.js';

const adForm = document.querySelector('.ad-form');
const sliderElement = adForm.querySelector('.ad-form__slider');
const valueElement = adForm.querySelector('#price');
const typeElement = adForm.querySelector('#type');

noUiSlider.create(sliderElement, {
  range: {
    min: SliderSettings.RANGE.min,
    max: SliderSettings.RANGE.max,
  },
  start: SliderSettings.START,
  step: SliderSettings.STEP,
  connect: SliderSettings.CONNECT,
  format: {
    to: (value) => value.toFixed(SliderSettings.NUMBER_DECIMAL_PLACES),
    from: (value) => parseFloat(value),
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
  const placeholderValue = Number(valueElement.placeholder);
  if (!valueElement.value && placeholderValue !== '') {
    sliderElement.noUiSlider.updateOptions({
      start: placeholderValue,
    });
  }
});

const resetSlider = () => {
  sliderElement.noUiSlider.reset();
};

export { resetSlider };
