
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



// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};



// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  console.log(buttonElement)
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('button-is-not-active');
        buttonElement.classList.add('popup__button:hover');

  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove('button-is-not-active');
        buttonElement.classList.remove('popup__button:hover');
        
  }
};





const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  // console.log(inputList)

  const buttonElement = formElement.querySelector('.button');
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
 toggleButtonState(inputList, buttonElement);
      checkInputValidity(formElement, inputElement);
    });
  });
};


const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // console.log(formList)
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};






