class Card {
  /*
      Отлично, что для создания разметки используется template и он вынесен в приватное статическое поле но,
      чтобы класс Card был ещё универсальней, можно передавать селектор темплейта как параметр конструктора класса
  */
  constructor(cardData, myId, imgWindow, api) {
    // Можно лучше
    // Шаблон лучше передать в конструктор класса, таким образом класс будет более универсальным
    // Как альтернатива -- можно передать селектор шаблона, и уже внутри метода создания
    // осуществить поиск элемента
    this.cardData = cardData;
    this.imgWindow = imgWindow;
    this.api = api;
    this.myId = myId;
  }

  create = () => {
    this.template = document.querySelector('#card-template').content;
    this.cardElement = this.template.cloneNode(true).querySelector('.place-card');
    this.likeBtn = this.cardElement.querySelector('.place-card__like-icon');
    this.deleteBtn = this.cardElement.querySelector('.place-card__delete-icon');
    this.cardImg = this.cardElement.querySelector('.place-card__image');

    this.cardImg.style.backgroundImage = `url(${this.cardData.link})`;
    this.cardElement.querySelector('.place-card__name').textContent = this.cardData.name;
    this.cardElement.querySelector('.place-card__like-figure').textContent = this.cardData.likes.length;
    this.setEventListeners();
    if (this.cardData.myId === this.myId) {
      this.deleteBtn.classList.add('place-card__delete-icon_is-shown');
    }
    return this.cardElement;
  }

  setEventListeners = () => {
    this.likeBtn.addEventListener('click', this.like);
    this.deleteBtn.addEventListener('click', this.remove);
    this.cardImg.addEventListener('click', this.showImg);
  }

  removeEventListeners = () => {
    this.likeBtn.removeEventListener('click', this.like);
    this.deleteBtn.removeEventListener('click', this.remove);
    this.cardImg.removeEventListener('click', this.showImg);
  }

  like = (evt) => {
    if (evt.target.classList.contains('place-card__like-icon_liked')) {
      this.api.removeLike(this.cardData._id)
        .then((obj) => {
          this.cardElement.querySelector('.place-card__like-figure').textContent = obj.likes.length;
          evt.target.classList.remove('place-card__like-icon_liked');
        })
        .catch(err => console.log(err));

    } else {
      this.api.addLike(this.cardData._id)
        .then((obj) => {
          this.cardElement.querySelector('.place-card__like-figure').textContent = obj.likes.length;
          evt.target.classList.add('place-card__like-icon_liked');
        })
        .catch(err => console.log(err))
    }
  }


  remove = () => {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
      this.api.deleteCard(this.cardData._id)
        .then(() => {
          this.removeEventListeners();
          this.cardElement.remove()
        })
        .catch(err => console.log(err));
    }

  }

  showImg = (evt) => {
    if (evt.target.classList.contains('place-card__image')) {
      this.imgWindow.open(this.cardData.link);
    }
  }
}