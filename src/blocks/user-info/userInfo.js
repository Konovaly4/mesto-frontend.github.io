//класс формы popup для заполнения данных пользователя
export default class UserInfo {
  constructor(api, userName, userJob, userAvatar) {
    this.api = api;
    this.userName = userName;
    this.userJob = userJob;
    this.userAvatar = userAvatar;
  }

  getUserInfo() {
    this.api.userInfo()
    .then((res) => {
      console.log(res);
      const user = {
      name: res.data.name,
      about: res.data.about,
      avatar: res.data.avatar,
      };
      return user;
    })
    .catch((err) => {
      console.log('userInfoError ' + err);
    });
  }

  //заполнение формы
  setUserInfo(usrName, usrJob, usrFormClose) {
    this.api.setUserInfo(usrName, usrJob)
    .then((res) => {
      this.userName.textContent = res.data.name;
      this.userJob.textContent = res.data.about;
      this.userAvatar.style.backgroundImage = `url(${res.data.avatar})`;
      usrFormClose();
    })
    .catch((err) => {
      console.log('setUserInfoError ' + err);
    });

  }
}