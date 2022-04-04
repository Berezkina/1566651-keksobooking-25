const getData = (onSuccess, onError, URL) => {
  fetch(`${URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      onError(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onError('Ошибка обработки данных'));
};

const sendData = (onSuccess, onError, body, URL) => {
  fetch(URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
};

export { getData, sendData };
