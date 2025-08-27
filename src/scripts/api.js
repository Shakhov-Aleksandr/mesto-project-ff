const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-41',
  headers: {
    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: config.headers
    })
     .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then(data => {return data});
} 



export const deleteCardFromServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
  }); 
}

 export const sendCardLikeToServer = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, { 
      method: 'PUT',
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }); 
}

export const deleteCardLikeFromServer = cardID => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, { 
      method: 'DELETE',
      headers: config.headers
  })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }); 
}




export const getID = () => {
return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }); 
}



export const sendCardToServer = (name, link) => {

  return fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link 
    })
  })
  .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }); 
}
