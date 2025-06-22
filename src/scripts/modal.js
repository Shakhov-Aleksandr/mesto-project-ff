
import {formEditProfile, nameInput, jobInput} from  '../scripts/index.js';

// Функция открытия модального окна
export function openPopup(popup) {
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

// Функция закрытия модального окна спомощью Esc
function closePopupByEsc(event, popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  }
};

// Функция закрытия модального окна спомощью X
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', evt => closePopupByEsc(evt, popup));

};
 