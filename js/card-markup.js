import {offerTypeText} from './consts.js';

const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getFeaturesList = (featuresContainer, features) => {
  if (!features.length) {
    featuresContainer.classList.add('hidden');
  }
  else {
    const featuresList = featuresContainer.querySelectorAll('.popup__feature');
    const modifiers = features.map((feature) => `popup__feature--${feature}`);

    featuresList.forEach((featuresListItem) => {
      const modifier = featuresListItem.classList[1];

      if (!modifiers.includes(modifier)) {
        featuresListItem.remove();
      }
    });
  }
};

const getPhotosList = (photosContainer, photos) => {
  if (!photos.length) {
    photosContainer.classList.add('hidden');
  }
  else {
    const photoTemplate = photosContainer.querySelector('.popup__photo');
    const photosFragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.setAttribute('src', photo);
      photosFragment.appendChild(photoElement);
    });

    photosContainer.querySelector('.popup__photo').replaceWith(photosFragment);
  }
};

const markupCard = ({author, offer}) => {
  const cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = offerTypeText[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getFeaturesList(cardElement.querySelector('.popup__features'), offer.features);
  cardElement.querySelector('.popup__description').textContent = offer.description;
  getPhotosList(cardElement.querySelector('.popup__photos'), offer.photos);
  cardElement.querySelector('.popup__avatar').setAttribute('src', author.avatar);
  return cardElement;
};

export {markupCard};
