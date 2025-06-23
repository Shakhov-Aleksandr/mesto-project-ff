
// Функция открытия модального окна
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keyup', closePopupByEsc);
};

// Функция закрытия модального окна
export function closePopup(popup) {
  if (popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopupByOverlay);
    popup.removeEventListener('keydown', closePopupByEsc);
  }
};

// Функция закрытия модального окна при нажатии на оверлэй
function closePopupByOverlay(evt) {
   if (evt.currentTarget === evt.target) { 
            closePopup(evt.currentTarget); 
        }
};

// Функция закрытия модального окна с помощью Esc
function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
};

// Обработчик нажантия на кнопоку закрытия(крестик) модального окна закреплен за каждой кнопкой 
const allCloseBtn = document.querySelectorAll('.popup__close');
const closeBtnpArr = Array.from(allCloseBtn);
closeBtnpArr.map(item => {
    item.addEventListener('click', evt => closePopup(evt.target.closest('.popup')));
});
 