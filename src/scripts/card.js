
import {cardTemplate} from  '../scripts/index.js';

// Функция создания карточки
export function createCard(name, link, owner, likeCount, id, deleteCardHandler, addCardLikeHandler, fullViewCardHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
    cardImage.alt = name;
    cardImage.src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardDeleteBtn.addEventListener('click', deleteCardHandler);
    cardElement.querySelector('.card__like-button').addEventListener('click', addCardLikeHandler);
    cardElement.querySelector('.likes-count').textContent = likeCount;
    cardImage.addEventListener('click', () => fullViewCardHandler(name, link));
    
    if (owner!= id) {
        // card__delete-button-disabled
        cardDeleteBtn.classList.add('card__delete-button-disabled');
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




    return cardElement;
}

// Функция удаления карточки
export function deleteCard(evt) {
    evt.target.closest('.card').remove();
};

// Функция добавления лайка
export function addCardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

