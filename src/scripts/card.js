
import {cardTemplate, popupDeleteCard} from  '../scripts/index.js';
import {openPopup} from './modal.js';



// Функция создания карточки
export function createCard(card, id, addCardLikeHandler, deleteCardLikeHandler, fullViewCardHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    const cardLikeBtn = cardElement.querySelector('.card__like-button');
    const cardLikesCount = cardElement.querySelector('.likes-count');
    cardImage.alt = card.name;
    cardImage.src = card.link;
    cardLikesCount.textContent = card.likes.length;
    cardElement.querySelector('.card__title').textContent = card.name;

    //отображаем поставленный мной лайк карточки, выгруженной с сервера
    card.likes.forEach(like => {
        if (like._id == "f0173b2fceb8a6f592738266") {
            rendLikeHeart(cardLikeBtn);
        }
    });


    //вешаем слушателя на кнопку лайка. Если нажать на кнопку, то
    cardLikeBtn.addEventListener('click', () => {
        //если лайк есть - отправляем запрос удаления лайка в сервере, при успехе - лайк с карточки убирается
        if(cardLikeBtn.classList.contains('card__like-button_is-active')) {
            deleteCardLikeHandler(card._id)
                .then((result) => {
                    cardLikesCount.textContent = result.likes.length;
                    rendLikeHeart(cardLikeBtn);
                })
                .catch((err) => {
                    console.log(err);
                });  
        }// если лайка нет - отправляем запрос на добавление лайка в сервере, при успехе - лайк на карточку добавляется
        else {
            addCardLikeHandler(card._id)
                .then((result) => {
                    cardLikesCount.textContent = result.likes.length;
                    rendLikeHeart(cardLikeBtn);
                })
                .catch((err) => {
                    console.log(err);
                });  
        }

    });


    cardImage.addEventListener('click', () => fullViewCardHandler(card.name, card.link));
    
    renderDeleteCardBtn(cardDeleteBtn, cardElement, card._id, card.owner._id, id);
    
    return cardElement;
}

//       /// проверка на авторство карточки
//   if (card.owner._id !== profileId) {
//     deleteButton.classList.add("element__delete-unactive");
//   } else {
//     /// Удаление карточки
//     deleteButton.addEventListener("click", function () {
//       currentCardId = cardId;
//       currentDeleteButton = deleteButton;
//       openDeletePopup();
//     });
//   }


export let cardIDForDelete = "";
export let cardElementForDelete = "";


const renderDeleteCardBtn = (btn, cardInPage, cardID, cardOwnerID, myID) => {
    if (cardOwnerID != myID) {
        btn.disabled = true;
        btn.classList.add('card__delete-button-disabled');
    } 
    else {
        btn.addEventListener('click', () => {
           
            cardIDForDelete = cardID;
            cardElementForDelete = cardInPage;
            openPopup(popupDeleteCard);
      
        })
    }
}



// avatarForm.addEventListener('submit', evt => heandlerAddNewAvatarImage(evt));
// const heandlerAddNewAvatarImage = evt => {
//   evt.preventDefault();
//   const avatarLink = avatarForm.elements.link;
//   sendAvatarImageLinkToServer(avatarLink.value)
//   getAvatarImageLinkFromServer();

//   avatarForm.reset();
//   closePopup(popupAvatarImage);
// }




//Функция отрисовки лайка
const rendLikeHeart = heart => {
    heart.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function deleteCard(card) {
    card.remove();
};



