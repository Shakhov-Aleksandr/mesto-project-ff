export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
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

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  // console.log(buttonElement)
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
  }
};



// inactiveButtonClass, inputErrorClass, errorClass


const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
    });
  });
};




export function enableValidation(validationConfig) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  // console.log(formList)
  // Переберём полученную коллекцию
    // console.log(formList)

  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(
      formElement, 
      validationConfig.inputSelector, 
      validationConfig.submitButtonSelector, 
      validationConfig.inactiveButtonClass, 
      validationConfig.inputErrorClass, 
      validationConfig.errorClass
    );
  });
};



const showInputError = (formElement, inputElement, errorMessage,  inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement,  inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (
    formElement, 
    inputElement, 
    inputErrorClass, 
    errorClass
  ) => {
  if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement, 
      inputElement, 
      inputElement.validationMessage, 
      inputErrorClass, 
      errorClass
    );
  } else {
    hideInputError(
      formElement, 
      inputElement, 
      inputErrorClass, 
      errorClass);
  }
};






export const clearValidation = (profileForm, validationConfig) => {
  if (!profileForm.querySelector(".popup__content_content_image")) {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach(inputElement => 
      hideInputError(profileForm, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass)
    );
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
  }
}