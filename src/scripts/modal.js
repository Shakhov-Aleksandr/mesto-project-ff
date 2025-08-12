
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
    document.removeEventListener('keydown', closePopupByEsc);
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

const popForm = document.querySelector('.popup__form');
const popInp = popForm.querySelector('.popup__input');
const formErr = popForm.querySelector(`.${popInp.id}-error`);
console.log(`.${popInp.id}-error`);

// Вызовем функцию isValid на каждый ввод символа
popInp.addEventListener('input', () => isValid()); 
// popInp.addEventListener('input', () => console.log('hello')); 


// Передадим текст ошибки вторым параметром
const showInputError = (element, errorMessage) => {
  element.classList.add('form__input_type_error');
  // Заменим содержимое span с ошибкой на переданный параметр
  formErr.textContent = errorMessage;
  formErr.classList.add('form__input-error_active');
};

const hideInputError = (element) => {
  element.classList.remove('form__input_type_error');
  formErr.classList.remove('form__input-error_active');
  // Очистим ошибку
  formErr.textContent = '';
};

const isValid = () => {
  console.log('hello');
  if (!popInp.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(popInp, popInp.validationMessage);
  } else {
    hideInputError(popInp);
  }
};

