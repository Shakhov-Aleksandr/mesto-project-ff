import '../pages/index.css';
import initialCards from '../scripts/card_list.js';
import {
    createCard,
    deleteCard,
    addCardLike
} from '../scripts/card.js';
import {
    openPopup,
    closePopup
} from '../scripts/modal.js';

import {
    validationConfig, 
    enableValidation,
    clearValidation
} from '../scripts/validation.js';

// Анимирование модальных окон
const allPopups = document.querySelectorAll('.popup');
const popupArr = Array.from(allPopups);
popupArr.map(item => {
    item.classList.add('popup_is-animated');
});

// Обработчик нажантия на кнопоку закрытия(крестик) модального окна закреплен за каждой кнопкой 
const allCloseBtn = document.querySelectorAll('.popup__close');
const closeBtnpArr = Array.from(allCloseBtn);
closeBtnpArr.map(item => {
    item.addEventListener('click', evt => closePopup(evt.target.closest('.popup')));
});
 

// Темплейт карточки
export const card = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');



// const getUserDataPromise = fetch('/api/user').then(response => response.json());
// const getCardsPromise = fetch('/api/cards').then(response => response.json());

// Promise.all([getUserDataPromise, getCardsPromise])
//   .then(([userData, cards]) => {
//     const userId = userData._id;
//     // Здесь вы можете отобразить карточки с учётом userId
//     console.log('Пользователь:', userData);
//     console.log('Карточки:', cards);
//   })
//   .catch(error => {
//     console.error('Ошибка при загрузке данных:', error);
//   });

// const getCardsPromise = fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', { headers: { authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7', method: 'GET' }}).then((res) => {
//     return res.json();
//   });
  



  fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
  headers: {
    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7',
    method: 'GET'
  }
})
  .then((res) => {
    return res.json();
  })
  .then(data => data.forEach(card => placeList.append(
        createCard(
            card.name,
            card.link,
            deleteCard,
            addCardLike,
            fullViewCard
       )
      )
    )
  )
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });



// Вывести дефолтные карточки на страницу
// initialCards.forEach(
    // card => placeList.append(
    //     createCard(
    //         card.name,
    //         card.link,
    //         deleteCard,
    //         addCardLike,
    //         fullViewCard
    //     )
//     )
// );

// Обработчик, открывающий модальное окно при клике по изображению карточки
const popupImage = document.querySelector('.popup_type_image');
const linkImage = popupImage.querySelector('.popup__image');
const descriptionImage = popupImage.querySelector('.popup__caption');

function fullViewCard(name, link) {
    linkImage.src = link;
    descriptionImage.textContent = name;
    openPopup(popupImage);
};




// fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
//   headers: {
//     authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
//   }
// })
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//       console.log(data); 
//   })
//   .catch((err) => {
//     console.log('Ошибка. Запрос не выполнен: ', err);
//   });




const getInfoAboutMe = (nameInput, jobInput) => {

fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  headers: {
      authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
    }
  }
)
  .then((res) => {
      return res.json();
    }
  )
  .then((data) => {
      nameInput.textContent = data.name;
      jobInput.textContent = data.about; 
    }
  )
  .catch((err) => {
      console.log('Ошибка. Запрос не выполнен: ', err);
    }
  );

}

const sentInfoAboutMe = (nameFieldInPopup, jobFieldInPopup) => {
  // console.log(nameInput.textContent,' ', jobInput.textContent)
  fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameFieldInPopup.value,
    about: jobFieldInPopup.value
  })
});
}


//Блок отвечает за вывод модального окна, редактирующего профиль, отображение измененных данных на странице
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__description');
export const formEditProfile = document.forms.edit_profile;
formEditProfile.addEventListener('submit', evt => handleProfileSubmit(evt));

    getInfoAboutMe(nameInput, jobInput);


const popupProfile = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
profileButton.addEventListener('click', () => {
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameFieldInPopup.value = nameInput.textContent;
    jobFieldInPopup.value = jobInput.textContent;
    clearValidation(popupProfile, validationConfig);
    openPopup(popupProfile);
  }
);

function handleProfileSubmit(evt) {
    evt.preventDefault();
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameInput.textContent = nameFieldInPopup.value;
    jobInput.textContent = jobFieldInPopup.value;
    sentInfoAboutMe(nameFieldInPopup, jobFieldInPopup);
    getInfoAboutMe(nameInput, jobInput);
    closePopup(popupProfile);
};

//Блок отвечает за вывод модального окна, дабавляющего кастомную карточку 
const newCardBtn = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_new-card');
const formAddcard = document.forms.new_place;

newCardBtn.addEventListener('click', () => {
    formAddcard.place_name.value="";
    formAddcard.link.value="";
    openPopup(popupCreateCard)
    clearValidation(popupCreateCard, validationConfig);
    }
);
    

formAddcard.addEventListener('submit', evt => handleAddUserCard(evt));
function handleAddUserCard(evt) {
    evt.preventDefault();
    card.name = formAddcard.elements.place_name.value;
    card.link = formAddcard.elements.link.value;
    placeList.prepend(
        createCard(
            card.name,
            card.link,
            deleteCard,
            addCardLike,
            fullViewCard
        )
    );
    formAddcard.reset();    

    closePopup(popupCreateCard);    
};




enableValidation(validationConfig);


//  fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
//   headers: {
//     authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   }); 

  





