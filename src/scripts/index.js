import '../pages/index.css';
import initialCards from '../scripts/card_list.js';
import {
  configForDeletingCard,
  createCard,
  deleteCard,
  addCardLike,
  deleteCardLike
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

import {
    getInitialCards,
    getID,
    deleteCardFromServer,
    sendCardLikeToServer,
    sendCardToServer,
    deleteCardLikeFromServer
} from '../scripts/api.js';




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
 export const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');


const rendCards = () => {
  // placeList.innerHTML = "";

  Promise.all([getInitialCards(), getID()])
  .then(
    ([cards, me]) => cards.forEach(
      card => placeList.append(
        createCard(
          card,
          me._id,
          deleteCard,
          sendCardLikeToServer,
          deleteCardLikeFromServer,
          fullViewCard
        ) 
      )
    )
  )
  .catch((err) => {console.log('Ошибка. Запрос не выполнен: ', err)});
}



rendCards();


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







fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
  headers: {
    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
  }
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
      console.log(data); 
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  }
);






const sendInfoAboutMe = (nameFieldInPopup, jobFieldInPopup) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameFieldInPopup.value,
      about: jobFieldInPopup.value
    })
  })
}




const profileImage = document.querySelector('.profile__image');

const avatarBtn = document.querySelector('.profile__avatar-image-edit');


avatarBtn.addEventListener("click", () => {
  avatarForm.elements.link.value = "";

  clearValidation(popupAvatarImage, validationConfig);
  openPopup(popupAvatarImage);
})



const popupAvatarImage = document.querySelector('.popup_avatar-image');
const avatarForm = document.forms.avatar;
avatarForm.addEventListener('submit', evt => heandlerAddNewAvatarImage(evt));
const heandlerAddNewAvatarImage = evt => {
  evt.preventDefault();
  const avatarLink = avatarForm.elements.link;
  sendAvatarImageLinkToServer(avatarLink.value)
  getAvatarImageLinkFromServer();

  avatarForm.reset();
  closePopup(popupAvatarImage);
}


const sendAvatarImageLinkToServer = link => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-41/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  })
}


const getAvatarImageLinkFromServer = () => {
  getID().then(me => 
    profileImage.style.backgroundImage= `url(${me.avatar})`)
}

getAvatarImageLinkFromServer();



//Блок отвечает за вывод модального окна, редактирующего профиль, отображение измененных данных на странице
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__description');
export const formEditProfile = document.forms.edit_profile;
formEditProfile.addEventListener('submit', evt => handleProfileSubmit(evt));

    
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
  )
}
   

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
});



const renderLoader = (isLoading, btn) => {
    if (isLoading == true) {
      btn.textContent = "Сохранение...";
    }
    else {
      btn.textContent = "Сохранить";
    }
} 


function handleProfileSubmit(evt) {
    evt.preventDefault();
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameInput.textContent = nameFieldInPopup.value;
    jobInput.textContent = jobFieldInPopup.value;


    const btn = evt.target.querySelector(".button");
    renderLoader(true, btn);
    
    sendInfoAboutMe(nameFieldInPopup, jobFieldInPopup).finally(() => renderLoader(false, btn));
    getInfoAboutMe(nameInput, jobInput);


    formEditProfile.reset();
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
    




const handleAddUserCard = (evt) => {
    evt.preventDefault();
    sendCardToServer(formAddcard.elements.place_name.value, formAddcard.elements.link.value)
      .then((card) => {
         placeList.prepend(createCard(
          card,
          "f0173b2fceb8a6f592738266",
          deleteCard,
          sendCardLikeToServer,
          deleteCardLikeFromServer,
          fullViewCard
        )) 
      })
      .catch((err) => {
        console.log(err);
      });  
    formAddcard.reset();    
    closePopup(popupCreateCard);    
};

formAddcard.addEventListener('submit', evt => handleAddUserCard(evt));





enableValidation(validationConfig);


 fetch('https://nomoreparties.co/v1/wff-cohort-41/cards', {
  headers: {
    authorization: '305b30cb-0349-4bc6-ad31-8b3f0302eab7'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  }); 

  



export const popupDeleteCard = document.querySelector('.popup_delete_card');

const formDeleteCard = document.forms.delete_card;
formDeleteCard.addEventListener('submit', evt => handlerDeleteCard(evt));
const handlerDeleteCard = (evt) => {
  evt.preventDefault();
  deleteCardFromServer(configForDeletingCard.cardID)
    .then(() => {
      console.log(configForDeletingCard.cardInPage);

      configForDeletingCard.cardInPage.remove();
    })
    .catch((err) => {
      console.log(err);
    }); 
  configForDeletingCard.cardID = "";
  configForDeletingCard.cardInPage = "";
  closePopup(popupDeleteCard)
}