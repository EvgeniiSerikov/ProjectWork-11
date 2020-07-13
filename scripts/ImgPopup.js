class ImgPopup {
  constructor(popupImgElement, closeImg, imgElement) {
    this.popupImgElement = popupImgElement;
    this.closeBtn = closeImg;
    this.imgElement = imgElement;
  };

  open = (link) => {
    this.popupImgElement.classList.add('popup-image_is-opened');
    this.closeBtn.addEventListener('click', this.close);
    this.imgElement.src = `${link}`;
  };

  close = () => {
    this.closeBtn.removeEventListener('click', this.close);
    this.imgElement.src = '';
    this.popupImgElement.classList.remove('popup-image_is-opened');
  };

}