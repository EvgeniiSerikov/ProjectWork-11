// Класс для валидации полей формы
class FormValidator {
  // Его конструктор должен принимать один из двух аргументов:
  // элемент формы,
  // или элемент попапа, внутри которого находится эта форма.

  constructor(popup, errorArr) {
    //[Ожидает проверки]
    // Можно лучше
    // Объект с ошибками стоит передавать в конструктор, так можно будет легко осуществлять
    // локализацию, передав объект с теми эе ключами, но другим текстом.
    this.errorArr = errorArr;
    this.popup = popup;
  }

  checkInputValidity(field) {
    this.errorCaption = this.popup.dynamicContent.querySelector(`#${field.id}-error`);
    field.setCustomValidity("");

    if (!field.checkValidity()) {

      if (field.validity.valueMissing) {
        field.setCustomValidity(this.errorArr.empty);
        this.errorCaption.textContent = field.validationMessage;
      }
      if (field.validity.tooLong || field.validity.tooShort) {
        field.setCustomValidity(this.errorArr.wrongLength);
        this.errorCaption.textContent = field.validationMessage;
      }
      if (field.validity.typeMismatch && field.type === "url") {
        field.setCustomValidity(this.errorArr.wrongUrl);
        this.errorCaption.textContent = field.validationMessage;
      }
    } else this.errorCaption.textContent = field.validationMessage;
  }

  resetErrors = () => {
    this.errorElems = this.popup.dynamicContent.querySelectorAll('.error');
    this.errorElems.forEach(err => {
      err.textContent = '';
    })
  }

  setSubmitButtonState = (button, state) => {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add('popup__button_valid');
      button.classList.remove('popup__button_invalid');
    } else {
      button.setAttribute('disabled', true);
      button.classList.remove('popup__button_valid');
      button.classList.add('popup__button_invalid');
    }
  }

  checkFormValidity = () => {
    this.formState = this.popup.inputs.every(field => field.checkValidity());
    this.setSubmitButtonState(this.popup.submitBtn, this.formState);
  }

  handleFormInteraction = (event) => {
    this.checkInputValidity(event.target);
    this.checkFormValidity(event.target.parentNode);
  }
}