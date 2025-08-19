
import {card} from  '../scripts/index.js';

// Функция создания карточки
export function createCard(name, link, likesCount, deleteCardHandler, addCardLikeHandler, fullViewCardHandler) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardHandler);
    cardElement.querySelector('.card__like-button').addEventListener('click', addCardLikeHandler);
    cardElement.querySelector('.likes-count').textContent = likesCount;
    cardImage.addEventListener('click', () => fullViewCardHandler(name, link));
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

