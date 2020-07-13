(function () {
  const errorArr = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  };

  const config = {
    infoUrl: 'https://praktikum.tk/cohort11/users/me',
    cardsUrl: 'https://praktikum.tk/cohort11/cards',
    headers: {
      authorization: '6cc1c878-03b7-427e-8f9e-de21fe557342',
      'Content-Type': 'application/json'
    }
  }

  const cardsContainer = document.querySelector('.places-list');
  const addBtn = document.querySelector('.user-info__button');
  const editBtn = document.querySelector('.user-info__button-edit');
  const userBio = document.querySelector('.user-info');
  const authorName = userBio.querySelector('.user-info__name');
  const authorAbout = userBio.querySelector('.user-info__job');
  const authorAvatar = userBio.querySelector('.user-info__photo');
  const myAvatar = document.querySelector('.user-info__photo');
  const popupElement = document.querySelector('#popup');
  const popupClose = popupElement.querySelector('.popup__close');
  const addFormContent = document.querySelector('#add-form-dynamic-content');
  const formCardName = addFormContent.querySelector('#new-name');
  const formCardLink = addFormContent.querySelector('#new-link');
  const editFormContent = document.querySelector('#edit-form-dynamic-content');
  const formUserName = editFormContent.querySelector('#profile-name');
  const formUserAbout = editFormContent.querySelector('#profile-about');
  const avatarFormContent = document.querySelector('#avatar-form-dynamic-content');
  const formAvatarLink = avatarFormContent.querySelector('#link-avatar');
  const popupImgElement = document.querySelector('.popup-image');
  const closeImg = popupImgElement.querySelector('.popup-image__close');
  const imgElement = popupImgElement.querySelector('.popup-image__img');

  const api = new Api(config);
  const profileData = new UserInfo(authorName, authorAbout, authorAvatar, api);
  const popupWindow = (...args) => new Popup(...args, popupElement, popupClose);
  const imgWindow = new ImgPopup(popupImgElement, closeImg, imgElement);
  const createCard = (...args) => new Card(...args, imgWindow, api);
  const cardList = new CardList(cardsContainer, createCard);

  // Можно лучше
  // Код первичной загрузки вынести в отдельный метод -- так код будет лучше организован.
  api.getUserInfo()
    .then(obj => {
      profileData.updateUserInfo(obj.name, obj.about, obj.avatar, obj._id);
      const myId = obj._id;
      return myId;
    })
    .then(myId => {
      api.getInitialCards()
        .then((obj) => {
          const newCardsArr = obj.map(item => {
            return {
              name: item.name,
              link: item.link,
              likes: item.likes,
              myId: item.owner._id,
              _id: item._id
            }
          })
          cardList.render(newCardsArr, myId);
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));


  addBtn.addEventListener('click', function () {

    const popupWithAddForm = popupWindow(addFormContent);
    const checkAddForm = new FormValidator(popupWithAddForm, errorArr)
    checkAddForm.resetErrors();

    popupWithAddForm.open();

    checkAddForm.checkFormValidity(popupWithAddForm.currentForm);

    function isValid(evt) {
      checkAddForm.handleFormInteraction(evt);
    }

    function addCard(evt) {

      evt.preventDefault();
      popupWithAddForm.submitBtn.textContent = 'Загрузка...';

      api.postNewCards(formCardName.value, formCardLink.value)
        .then(data => {
          const newData = {
            name: data.name,
            link: data.link,
            likes: data.likes,
            myId: data.owner._id,
            _id: data._id
          }
          const ownerId = profileData.getUserID();
          cardList.addCard(createCard(newData, ownerId).create());
        })
        .then(() => {
          popupWithAddForm.removeEventListeners(isValid, addCard);
          popupWithAddForm.close();
        })
        .catch(err => console.log(err))
        .finally(popupWithAddForm.submitBtn.textContent = 'Сохранить');

    };
    popupWithAddForm.currentForm.addEventListener('input', isValid);
    popupWithAddForm.currentForm.addEventListener('submit', addCard);

  });

  editBtn.addEventListener('click', function () {

    const popupWithEditForm = popupWindow(editFormContent);
    const checkEditForm = new FormValidator(popupWithEditForm, errorArr);

    checkEditForm.resetErrors();
    formUserName.value = profileData.authorName.textContent;
    formUserAbout.value = profileData.authorAbout.textContent;

    popupWithEditForm.open();
    checkEditForm.checkFormValidity(popupWithEditForm.currentForm);

    function isValid(evt) {
      checkEditForm.handleFormInteraction(evt);
    };

    function editInfo(evt) {
      evt.preventDefault();
      popupWithEditForm.submitBtn.textContent = 'Загрузка...';
      api.updateUserInfo(formUserName.value, formUserAbout.value)
        .then((obj) => {
          profileData.updateUserInfo(obj.name, obj.about, obj.avatar);
        })
        .then(() => {
          popupWithEditForm.removeEventListeners(isValid, editInfo);
          popupWithEditForm.close();
        })
        .catch(err => console.log(err))
        .finally(popupWithEditForm.submitBtn.textContent = 'Сохранить');
    };

    popupWithEditForm.currentForm.addEventListener('input', isValid);
    popupWithEditForm.currentForm.addEventListener('submit', editInfo);
  });

  myAvatar.addEventListener('click', function () {

    const popupWithAvatarForm = popupWindow(avatarFormContent);
    const checkAvatarForm = new FormValidator(popupWithAvatarForm, errorArr);
    checkAvatarForm.resetErrors();


    popupWithAvatarForm.open();

    checkAvatarForm.checkFormValidity(popupWithAvatarForm.currentForm);

    function isValid(evt) {
      checkAvatarForm.handleFormInteraction(evt);
    };

    function changeAvatar(evt) {
      evt.preventDefault();
      popupWithAvatarForm.submitBtn.textContent = 'Загрузка...';
      api.updateAvatar(formAvatarLink.value)
        .then((obj) => {
          profileData.updateAvatar(obj.avatar);
        })
        .then(() => {
          popupWithAvatarForm.removeEventListeners(isValid, changeAvatar);
          popupWithAvatarForm.close();
        })
        .catch(err => console.log(err))
        .finally(popupWithAvatarForm.submitBtn.textContent = 'Сохранить');
    }

    popupWithAvatarForm.currentForm.addEventListener('input', isValid);
    popupWithAvatarForm.currentForm.addEventListener('submit', changeAvatar);
  })
}())

// Добрый день!

// ## Итог

// - класс Api реализован согласно поставленной задаче
// - информация о пользователе  (имя, подпись и аватар) подгружаются с сервера (GET запрос)
// - имя и о себе можно отредактировать (отправляется PATCH запрос, новые данные)
// - карточки подгружаются с сервера (GET запрос)
// - обязательный функционал работает без багов
// - корректная работа с асинхронным кодом
// - DOM изменяется только после того, как запрос успешно выполнен
// - ошибки сервера обрабатываются
// - выполнены дополнительные задания!

// Работа принята

// ## Можно лучше

// Большое количество параметров лучше передвать в метод или в конструктор используя деструктуризацию.

// Например в коде:
// ~~~
// const newClass = new Class({ windowOne, userForm, popupObj })
// ~~~
// А внутри класса:
// ~~~
// constructor ({ userForm, popupObj, windowOne }) {...}
// ~~~
// И тогда порядок переменных будет неважен, это удобно







// Эта часть не про исправления, а просто для информации

// Немного хочу затронуть тему шаблонов и одного окна попапа: при динамическом формировании окон вы добавляете элементы в DOM,
// а потом их снова удаляете. Это колоссальная нагрузка, браузеру легче накинуть модификатор класса на окно, чтобы оно появилось
// перед пользователем, чем все добавлять и удалять каждый раз. Как минимум это отрицательно влияет на производительность, кроме того
// Класс валидатора не может слушатели поставить внутри себя, часть классов используется как статические по сути, хотя
// задачей прошлого спринта было больше умение тиражировать одинаковые абстрактые объекты. Видно, что вы достаточно сильный студент
// и мне бы хотелось чтобы вы видели варианты реализаци с разных сторон.

// Кроме того, ваш подход накладывает некоторые ограничения на реализацию --
// там где удобнее было создать, например, для каждой формы по валидирующему ее экземпляру одного и того же класса, вам приходится пользоваться
// одним экземпляром, который толком ничего в себе сохранить не может. А мог бы: кнопку, массив инпутов и подстрочников с ошибками,
// можно сделать объект с перечнем элементов ошибок и id инпута как ключами для быстрого доступа к нужному подстрочнику, слушатели поставить, да и вообще
// сделать класс более функциональным. Шаблоны же хороши для тиражирования одинаковых объектов, таких как карточки.