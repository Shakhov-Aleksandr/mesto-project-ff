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

// Анимирование модальных окон
const allPopups = document.querySelectorAll('.popup');
const popupArr = Array.from(allPopups);
popupArr.map(item => {
    item.classList.add('popup_is-animated');
});

// Темплейт карточки
export const card = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// Вывести дефолтные карточки на страницу
initialCards.forEach(
    card => placeList.append(
        createCard(
            card.name,
            card.link,
            evt => deleteCard(evt),
            evt => addCardLike(evt),
            evt => fullViewCard(evt)
        )
    )
);

// Обработчик, открывающий попап при клике по изображению карточки
const popupImage = document.querySelector('.popup_type_image');
const linkImage = popupImage.querySelector('.popup__image');
const descriptionImage = popupImage.querySelector('.popup__caption');

function fullViewCard(Image) {
    popupImage.classList.add('popup_is-opened');
    linkImage.src = Image.src;
    descriptionImage.textContent = Image.alt;
    popupImage.querySelector('.popup__close').addEventListener('click', () => popupImage.classList.remove('popup_is-opened'));
};

//Блок отвечает за вывод модального окна, редактирующего профиль, отображение измененных данных на странице
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__description');
export const formEditProfile = document.forms.edit_profile;

const popupProfile = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
profileButton.addEventListener('click', () => openPopup(popupProfile));

function handleProfileSubmit(evt, popup) {
    evt.preventDefault();
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameInput.textContent = nameFieldInPopup.value;
    jobInput.textContent = jobFieldInPopup.value;
    closePopup(popup);
};

formEditProfile.addEventListener('submit', evt => handleProfileSubmit(evt, popupProfile));

//Блок отвечает за вывод модального окна, дабавляющего кастомную карточку 
const newCardBtn = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_new-card');
const popupCreateCardClose = popupCreateCard.querySelector('.popup__close');

newCardBtn.addEventListener('click', () => {
    popupCreateCard.classList.add('popup_is-opened');
});

popupCreateCardClose.addEventListener('click', () => {
    popupCreateCard.classList.remove('popup_is-opened');
})

const formAddcard = document.forms.new_place;

function handleAddUserCard(evt) {
    evt.preventDefault();
    card.name = formAddcard.elements.place_name.value;
    card.link = formAddcard.elements.link.value;
    placeList.prepend(
        createCard(
            card.name,
            card.link,
            evt => deleteCard(evt),
            evt => addCardLike(evt),
            evt => fullViewCard(evt)
        )
    );
    formAddcard.reset();
    popupCreateCard.classList.remove('popup_is-opened');
};

formAddcard.addEventListener('submit', evt => handleAddUserCard(evt));