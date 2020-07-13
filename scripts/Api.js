class Api {
  constructor(config) {
    this.infoUrl = config.infoUrl;
    this.cardsUrl = config.cardsUrl;
    this.headers = config.headers;
  }

  getUserInfo = () => {
    return fetch(this.infoUrl, {
      headers: this.headers
    })
      // Повторяющийся код разбора ответа можно вынести в отдельный метод класса
      // Можно лучше
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      })
  }

  updateUserInfo = (nameValue, aboutValue) => {
    return fetch(this.infoUrl,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: nameValue,
          about: aboutValue
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

  }

  updateAvatar = (avatarValue) => {
    return fetch(`${this.infoUrl}/avatar`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatarValue
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  getInitialCards = () => {
    return fetch(this.cardsUrl,
      {
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

  }

  postNewCards = (nameValue, linkValue) => {
    return fetch(this.cardsUrl,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: nameValue,
          link: linkValue
        }
        )
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard = (id) => {
    return fetch(`${this.cardsUrl}/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })

  }

  addLike = (id) => {
    return fetch(`${this.cardsUrl}/like/${id}`,
      {
        method: 'PUT',
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  removeLike = (id) => {
    return fetch(`${this.cardsUrl}/like/${id}`,
      {
        method: 'DELETE',
        headers: this.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}