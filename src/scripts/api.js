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
    // ...
     .then(res => {
      if (res.ok) {
        // console.log('hello')
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {return data});
} 



//   fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
//   headers: {
//     authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7',
//   }
//     })


export const getID = () => {
return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers
    })
    // ...
     .then(res => {
      if (res.ok) {
        // console.log('hello')
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => {return data});
}


