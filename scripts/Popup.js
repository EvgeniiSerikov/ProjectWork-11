class Popup {
  constructor(dynamicContent, popupElement, closeBtn) {
    this.popupElement = popupElement;
    this.closeBtn = closeBtn;
    this.dynamicContent = dynamicContent;
    this.currentForm = this.dynamicContent.querySelector('.popup__form');
    this.submitBtn = this.currentForm.querySelector('.button');
    this.inputs = Array.from(this.currentForm.querySelectorAll('.popup__input'));
  };

  removeEventListeners = (inputFunc, submitFunc) => {
    this.currentForm.removeEventListener('input', inputFunc);
    this.currentForm.removeEventListener('submit', submitFunc);
  }

  open = () => {
    this.closeBtn.addEventListener('click', this.close);
    this.dynamicContent.classList.add('dynamic-content_is-shown');
    this.popupElement.classList.add('popup_is-opened');
  }

  close = () => {
    this.closeBtn.removeEventListener('click', this.close);
    this.dynamicContent.classList.remove('dynamic-content_is-shown');
    this.currentForm.reset();
    this.popupElement.classList.remove('popup_is-opened');

  }
}
