import { FILE_TYPES } from './consts.js';

const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarElement = document.querySelector('.user_pic');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarElement.src = URL.createObjectURL(file);
  }
});
