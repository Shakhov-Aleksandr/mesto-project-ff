// @todo: Темплейт карточки
const card = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, handler) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', handler );
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card =>  placeList.append(createCard(card.name, card.link, evt => deleteCard(evt))));
   

