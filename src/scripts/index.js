import "../pages/index.css";

import initialCards from "../scripts/card_list.js";

import { cardIDForDelete, cardElementForDelete, createCard } from "../scripts/card.js";

import { openPopup, closePopup } from "../scripts/modal.js";

import { validationConfig, enableValidation, clearValidation } from "../scripts/validation.js";

import { myID, getInitialCards, getInfoAboutMeFromServer, deleteCardFromServer, sendCardLikeToServer, sendCardToServer, deleteCardLikeFromServer, sendInfoAboutMeToServer, sendAvatarImageLinkToServer } from "../scripts/api.js";

// Активация валидации
enableValidation(validationConfig);

// Анимирование модальных окон
const allPopups = document.querySelectorAll(".popup");
const popupArr = Array.from(allPopups);
popupArr.map((item) => {
  item.classList.add("popup_is-animated");
});

// Обработчик нажантия на кнопоку закрытия(крестик) модального окна закреплен за каждой кнопкой
const allCloseBtn = document.querySelectorAll(".popup__close");
const closeBtnpArr = Array.from(allCloseBtn);
closeBtnpArr.map((item) => {
  item.addEventListener("click", (evt) => closePopup(evt.target.closest(".popup")));
});

// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;

// DOM узлы
const content = document.querySelector(".content");
const placeList = content.querySelector(".places__list");

// Обработчик, открывающий модальное окно при клике по изображению карточки
const popupImage = document.querySelector(".popup_type_image");
const linkImage = popupImage.querySelector(".popup__image");
const descriptionImage = popupImage.querySelector(".popup__caption");
function fullViewCard(name, link) {
  linkImage.src = link;
  descriptionImage.textContent = name;
  openPopup(popupImage);
}

//БЛОК ОТВЕЧАЕТ ЗА ОБНОВЛЕНИЕ АВАТАРКИ
// Обработчик, открывающий модальное окно при клике по аватару
const profileImage = document.querySelector(".profile__image");
const avatarBtn = document.querySelector(".profile__avatar-image-edit");
const popupAvatarImage = document.querySelector(".popup_avatar-image");
const avatarForm = document.forms.avatar;
avatarBtn.addEventListener("click", () => {
  avatarForm.elements.link.value = "";
  clearValidation(popupAvatarImage, validationConfig);
  openPopup(popupAvatarImage);
});
// Обработчик формы обновления изображения аватара
avatarForm.addEventListener("submit", (evt) => heandlerAddNewAvatarImage(evt));
const heandlerAddNewAvatarImage = (evt) => {
  evt.preventDefault();
  const avatarLink = avatarForm.elements.link;
  const btn = evt.target.querySelector(".button");
  renderLoader(true, btn);
  sendAvatarImageLinkToServer(avatarLink.value)
    .then((avatar) => {
      profileImage.style.backgroundImage = `url(${avatar.avatar})`;
      renderLoader(false, btn);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarForm.reset();
      closePopup(popupAvatarImage);
    });
};

//БЛОК ОТВЕЧАЕТ ЗА ОБНОВЛЕНИЕ ИНФОРМАЦИИ О ПОЛЬЗОВАТЕЛЕ
// Обработчик, открывающий модальное окно при клике по кнопке редактирования
export const nameInput = document.querySelector(".profile__title");
export const jobInput = document.querySelector(".profile__description");
export const formEditProfile = document.forms.edit_profile;
const popupProfile = document.querySelector(".popup_type_edit");
const profileButton = document.querySelector(".profile__edit-button");
profileButton.addEventListener("click", () => {
  const nameFieldInPopup = formEditProfile.elements.name;
  const jobFieldInPopup = formEditProfile.elements.description;
  nameFieldInPopup.value = nameInput.textContent;
  jobFieldInPopup.value = jobInput.textContent;
  clearValidation(popupProfile, validationConfig);
  openPopup(popupProfile);
});
// Обработчик формы изменения данных о пользователе
formEditProfile.addEventListener("submit", (evt) => handleProfileSubmit(evt));
const handleProfileSubmit = (evt) => {
  evt.preventDefault();
  const nameFieldInPopup = formEditProfile.elements.name;
  const jobFieldInPopup = formEditProfile.elements.description;
  const btn = evt.target.querySelector(".button");
  renderLoader(true, btn);
  sendInfoAboutMeToServer(nameFieldInPopup, jobFieldInPopup)
    .then((me) => {
      nameInput.textContent = me.name;
      jobInput.textContent = me.about;
      renderLoader(false, btn);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditProfile.reset();
      closePopup(popupProfile);
    });
};

//БЛОК ОТВЕЧАЕТ ЗА ДОБАВЛЕНИЕ КАСТОМНОЙ КАРТОЧКИ
// Обработчик, открывающий модальное окно при клике по кнопке добавления карточки
const popupCreateCard = document.querySelector(".popup_type_new-card");
const formAddcard = document.forms.new_place;
const newCardBtn = document.querySelector(".profile__add-button");
newCardBtn.addEventListener("click", () => {
  formAddcard.place_name.value = "";
  formAddcard.link.value = "";
  clearValidation(popupCreateCard, validationConfig);
  openPopup(popupCreateCard);
});
// Обработчик формы добавления кастомной карточки
formAddcard.addEventListener("submit", (evt) => handleAddUserCard(evt));
const handleAddUserCard = (evt) => {
  evt.preventDefault();
  const btn = evt.target.querySelector(".button");
  renderLoader(true, btn);
  sendCardToServer(formAddcard.elements.place_name.value, formAddcard.elements.link.value)
    .then((card) => {
      placeList.prepend(createCard(card, myID, sendCardLikeToServer, deleteCardLikeFromServer, fullViewCard));
      renderLoader(false, btn);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAddcard.reset();
      closePopup(popupCreateCard);
    });
};

// БЛОК ОТВЕЧАЕТ ЗА УДАЛЕНИЕ КАРТОЧКИ
export const popupDeleteCard = document.querySelector(".popup_delete_card");
const formDeleteCard = document.forms.delete_card;
// Обработчик формы удаления кастомной карточки после подтверждения действия (кнопка Да)
formDeleteCard.addEventListener("submit", (evt) => handlerDeleteCard(evt));
const handlerDeleteCard = (evt) => {
  evt.preventDefault();
  deleteCardFromServer(cardIDForDelete)
    .then(() => {
      cardElementForDelete.remove();
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(popupDeleteCard);
};

// Отрисовка элементов страницы, полученных с сервера
const rendSiteFromServer = () => {
  Promise.all([getInitialCards(), getInfoAboutMeFromServer()])
    .then(([cards, me]) => {
      nameInput.textContent = me.name;
      jobInput.textContent = me.about;
      profileImage.style.backgroundImage = `url(${me.avatar})`;

      cards.forEach((card) => placeList.append(createCard(card, me._id, sendCardLikeToServer, deleteCardLikeFromServer, fullViewCard)));
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
};

rendSiteFromServer();

const renderLoader = (isLoading, btn) => {
  if (isLoading == true) {
    btn.textContent = "Сохранение...";
  } else {
    btn.textContent = "Сохранить";
  }
};
