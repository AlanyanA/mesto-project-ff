function showInputError(formElement, inputElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.opacity = '1';
  }
}

function hideInputError(formElement, inputElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.opacity = '0';
  }
}

const disableSubmitButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  disableSubmitButton(buttonElement, config);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

export function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
    });
  });
  })
}