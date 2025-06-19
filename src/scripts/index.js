import '../pages/index.css';
import initialCards from '../scripts/cards.js';

// @todo: Темплейт карточки
const card = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCardHandler) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardHandler);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(card => placeList.append(createCard(card.name, card.link, evt => deleteCard(evt))));
   

const popupProfile = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');


const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const formEditProfile = document.forms.edit_profile;



profileButton.addEventListener('click', () => openPopup(popupProfile));

function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    
    popup.addEventListener('click', evt => {
        if (evt.currentTarget === evt.target) {
            closePopup(popup);
        }
    }) 

    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameFieldInPopup.value = nameInput.textContent;
    jobFieldInPopup.value = jobInput.textContent;


    document.addEventListener('keyup', evt => closePopupByEsc(evt, popup));
    popup.querySelector('.popup__close').addEventListener('click', () => closePopup(popup)) 
};

function closePopupByEsc(event, popup) {
    console.log(event.key);
  if (event.key === 'Escape') {
    closePopup(popup);
  }
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', evt => closePopupByEsc(evt, popup));

};



function handleFormSubmit(evt, popup) {
    evt.preventDefault();
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameInput.textContent = nameFieldInPopup.value;
    jobInput.textContent = jobFieldInPopup.value;
    closePopup(popup);
};

formEditProfile.addEventListener('submit', evt => handleFormSubmit(evt, popupProfile));