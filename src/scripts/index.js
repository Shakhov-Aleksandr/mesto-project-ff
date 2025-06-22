import '../pages/index.css';
import initialCards from '../scripts/cards.js';

const allPopups = document.querySelectorAll('.popup');
const popupArr = Array.from(allPopups);
popupArr.map( item => {
    item.classList.add('popup_is-animated');
});

// @todo: Темплейт карточки
const card = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placeList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, deleteCardHandler, addCardLikeHandler, fullViewCardHendler) {
    const cardElement = card.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardHandler);
    cardElement.querySelector('.card__like-button ').addEventListener('click', addCardLikeHandler);
    cardImage.addEventListener('click', () => fullViewCardHendler(cardImage));
    return cardElement;
}


const popupImage = document.querySelector('.popup_type_image');
const linkImage = popupImage.querySelector('.popup__image');
const descriptionImage = popupImage.querySelector('.popup__caption');
function fullViewCard(Image) {
    popupImage.classList.add('popup_is-opened');
    linkImage.src = Image.src;
    descriptionImage.textContent = Image.alt;
    popupImage.querySelector('.popup__close').addEventListener('click', () => popupImage.classList.remove('popup_is-opened'));
};

function addCardLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу
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
  if (event.key === 'Escape') {
    closePopup(popup);
  }
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', evt => closePopupByEsc(evt, popup));

};


function handleProfileSubmit(evt, popup) {
    evt.preventDefault();
    const nameFieldInPopup = formEditProfile.elements.name;
    const jobFieldInPopup = formEditProfile.elements.description;
    nameInput.textContent = nameFieldInPopup.value;
    jobInput.textContent = jobFieldInPopup.value;
    closePopup(popup);
};

formEditProfile.addEventListener('submit', evt => handleProfileSubmit(evt, popupProfile));





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
    card.name =  formAddcard.elements.place_name.value;
    card.link = formAddcard.elements.link.value;
    placeList.prepend(createCard(card.name, card.link, evt => deleteCard(evt), evt => addCardLike(evt), evt => fullViewCard(evt)));
    formAddcard.reset(); 
    popupCreateCard.classList.remove('popup_is-opened');
};

formAddcard.addEventListener('submit', evt => handleAddUserCard(evt));


