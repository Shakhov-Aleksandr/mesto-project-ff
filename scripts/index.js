// @todo: Темплейт карточки
const card = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(name, link) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click',  evt => deleteCard(evt));
    placeList.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card => addCard(card.name, card.link));
