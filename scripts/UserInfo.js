class UserInfo {
  // Экземпляр этого класса должен хранить в себе данные пользователя: имя и информацию о себе, а также отображать эту информацию на странице.

  constructor(authorName, authorAbout, authorAvatar, api) {
    this.userName = '';
    this.userInfo = '';
    this.avatar = '';
    this.authorName = authorName;
    this.authorAbout = authorAbout;
    this.authorAvatar = authorAvatar;
    this.api = api;
  }

  // setUserInfo, чтобы обновлять данные внутри экземпляра класса;
  setUserInfo = (newUserName, newUserInfo, newAvatar) => {
    this.userName = newUserName;
    this.userInfo = newUserInfo;
    this.avatar = newAvatar;
  }

  // updateUserInfo, чтобы отображать эти данные на странице.
  updateUserInfo = (newUserName, newUserInfo, newAvatar, myId) => {
    this.setUserInfo(newUserName, newUserInfo, newAvatar);
    this.authorName.textContent = this.userName;
    this.authorAbout.textContent = this.userInfo;
    this.authorAvatar.style.backgroundImage = `url(${newAvatar})`;
    this.myID = myId;
  }

  getUserID = () => {
    return this.myID;
  }
  
  updateAvatar = (avatar) => {
    this.authorAvatar.style.backgroundImage = `url(${avatar})`;
  }
}