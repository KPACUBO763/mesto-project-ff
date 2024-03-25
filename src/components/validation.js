const showInputError = (formElement, inputElement, validationConfig) => { // добавление сообщения об ошибке
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.к);
    error.textContent = inputElement.validationMessage;
    error.classList.add(validationConfig.errorClass)
};

const hideInputError = (formElement, inputElement, validationConfig) => { // удаление сообщения об ошибке
    const error = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    error.classList.remove(validationConfig.errorClass);
    error.textContent = ''
};

const checkInputValidity = (formElement, inputElement, validationConfig) => { // проверка валидности и типа ошибки
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  };
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
};

export const clearValidation = (formElement, validationConfig) => { // сброс валидации
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, validationConfig)
  });
  toggleBtnState(inputList, buttonElement, validationConfig) // сброс состояния кнопки
};

const toggleBtnState = (inputList, buttonElement, validationConfig) => { // переключатель состояния кнопки
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass)
  } else {
    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove(validationConfig.inactiveButtonClass)
  }
};

const setEventListenners = (formElement, validationConfig) => { // вешаем обработчики на все инпуты формы
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleBtnState(inputList, buttonElement, validationConfig); // сброс состояния кнопки

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, validationConfig); // проверка валидности и типа ошибки
      toggleBtnState(inputList, buttonElement, validationConfig) // сброс состояния кнопки
    })
  })
};

export const enableValidation = (validationConfig) => { // вешаем обработчик на все формы
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    });
    setEventListenners(formElement, validationConfig)
  })
};

const hasInvalidInput = (inputList) => { // проверка всех инпутов на валидность
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}
