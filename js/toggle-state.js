import {FORM_LIST} from './consts.js';

const activateForms = () => {
  FORM_LIST.forEach((formName) => {
    const form = document.querySelector(`.${formName}`);

    if (!form) {
      form.classList.remove(`${formName}--disabled`);

      form.querySelectorAll('fieldset').forEach((field) => {
        field.disabled = false;
      });

      form.querySelectorAll('select').forEach((field) => {
        field.disabled = false;
      });
    }
  });
};

const deactivateForms = () => {
  FORM_LIST.forEach((formName) => {
    const form = document.querySelector(`.${formName}`);

    if (form) {
      form.classList.add(`${formName}--disabled`);

      form.querySelectorAll('fieldset').forEach((field) => {
        field.disabled = true;
      });

      form.querySelectorAll('select').forEach((field) => {
        field.disabled = true;
      });
    }
  });
};

export {activateForms, deactivateForms};
