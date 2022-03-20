import {FORM_LIST} from './consts.js';

const deactivateForms = (bool) => {
  FORM_LIST.forEach((formName) => {
    const form = document.querySelector(`.${formName}`);

    if (form) {
      if (bool) {
        form.classList.add(`${formName}--disabled`);
      }
      else {
        form.classList.remove(`${formName}--disabled`);
      }

      form.querySelectorAll('fieldset').forEach((field) => {
        field.disabled = bool;
      });

      form.querySelectorAll('select').forEach((field) => {
        field.disabled = bool;
      });
    }
  });
};

export {deactivateForms};
