const showError = (message) => {
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

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => showError(`Не удалось загрузить данные с сервера: ${err}`));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
