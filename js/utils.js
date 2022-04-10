export const isEscapeKey = (evt) => evt.key === 'Escape';

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const showErrorOnMap = (message) => {
  const messageElement = document.createElement('div');
  messageElement.style.zIndex = 500;
  messageElement.style.position = 'absolute';
  messageElement.style.left = 0;
  messageElement.style.top = 0;
  messageElement.style.right = 0;
  messageElement.style.padding = '10px 3px';
  messageElement.style.fontSize = '15px';
  messageElement.style.textAlign = 'center';
  messageElement.style.color = 'white';
  messageElement.style.backgroundColor = 'red';
  messageElement.textContent = message;
  document.querySelector('.map').insertAdjacentElement('afterbegin', messageElement);
};

export const showPopupMessage = (element) => {
  const messageTemplate = document.querySelector(`#${element}`).content.querySelector(`.${element}`);
  const messageElement = messageTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', messageElement);

  document.addEventListener('click', () => {
    messageElement.remove();
  }, { once: true });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      messageElement.remove();
    }
  }, { once: true });
};
