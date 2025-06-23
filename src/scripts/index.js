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
            deleteCard,
            addCardLike,
            fullViewCard
        )
    )
);

// Обработчик, открывающий модальное окно при клике по изображению карточки
const popupImage = document.querySelector('.popup_type_image');
const linkImage = popupImage.querySelector('.popup__image');
const descriptionImage = popupImage.querySelector('.popup__caption');

function fullViewCard(name, link) {
    linkImage.src = link;
    descriptionImage.textContent = name;
    openPopup(popupImage);
};

//Блок отвечает за вывод модального окна, редактирующего профиль, отображение измененных данных на странице
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__description');
export const formEditProfile = document.forms.edit_profile;
formEditProfile.addEventListener('submit', evt => handleProfileSubmit(evt));

const popupProfile = document.querySelector('.popup_type_edit');
const profileButton = document.querySelector('.profile__edit-button');
profileButton.addEventListener('click', () => {
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameFieldInPopup.value = nameInput.textContent;
    jobFieldInPopup.value = jobInput.textContent;
    openPopup(popupProfile);
});

function handleProfileSubmit(evt) {
    evt.preventDefault();
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameInput.textContent = nameFieldInPopup.value;
    jobInput.textContent = jobFieldInPopup.value;
    closePopup(popupProfile);
};

//Блок отвечает за вывод модального окна, дабавляющего кастомную карточку 
const newCardBtn = document.querySelector('.profile__add-button');
const popupCreateCard = document.querySelector('.popup_type_new-card');
newCardBtn.addEventListener('click', () => openPopup(popupCreateCard));

const formAddcard = document.forms.new_place;
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

