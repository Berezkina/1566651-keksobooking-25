import { FILE_TYPES } from './consts.js';

const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo');
const imageElement = document.createElement('img');

photoChooser.addEventListener('change', () => {
  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  imageElement.width = '70';
  imageElement.height = '70';
  imageElement.alt = 'Фотография жилья';

  if (matches) {
    imageElement.src = URL.createObjectURL(file);
  }
  photoPreview.appendChild(imageElement);
  return imageElement;
});
