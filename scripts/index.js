// @todo: Темплейт карточки
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// @todo: DOM узлы
const card = document.querySelector('#card-template').content;
const cardDeleteButton = card.querySelector('.card__delete-button');
const cardLikeButton = card.querySelector('.card__like-button')

// @todo: Функция создания карточки
function addCard(name, link) {
    const cardElement = card.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    cardDeleteButton.addEventListener('click', deleteCard);

    placeList.append(cardElement);
}

// @todo: Функция удаления карточки
const deleteCard = function() {
    
    cardElement.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card => addCard(card.name, card.link));
