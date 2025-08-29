const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "305b30cb-0349-4bc6-ad31-8b3f0302eab7",
    "Content-Type": "application/json",
  },
};

export const myID = "f0173b2fceb8a6f592738266";

// Запрос на получение имеющихся карточек на сервере
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос на добавление карточки на сервер
export const sendCardToServer = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос на удаление карточки с сервера
export const deleteCardFromServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос добавление лайка карточки на сервере
export const sendCardLikeToServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос удаления лайка карточки на сервере
export const deleteCardLikeFromServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос на отрправку информации о пользователе на сервер
export const sendInfoAboutMeToServer = (nameFieldInPopup, jobFieldInPopup) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameFieldInPopup.value,
      about: jobFieldInPopup.value,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос на получение информации о пользователе с сервера
export const getInfoAboutMeFromServer = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Запрос на обновление изображение аватара на сервере
export const sendAvatarImageLinkToServer = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
