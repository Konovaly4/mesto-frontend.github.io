//класс формы popup для заполнения данных пользователя
export default class UserInfo {
  constructor(auth, api) {
    this.auth = auth;
    this.api = api;
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
  setUserInfo(usrName, usrJob, usrFormClose, loadNote) {
    this.loader (true, loadNote);
    this.api.setUserInfo(usrName, usrJob)
      .then((res) => {
        if (res.ok) {
          return res.json();
      } else {
        return Promise.reject(err);
      };
    })
    .then((res) => {
      this.userName.textContent = res.data.name;
      this.userJob.textContent = res.data.about;
      this.userAvatar.style.backgroundImage = `url(${res.avatar})`;
      usrFormClose();
    })
    .catch((err) => {
      console.log('setUserInfoError ' + err);
    })
    .finally(this.loader(false, loadNote));

  }
}