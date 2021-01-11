//класс формы popup для заполнения данных пользователя
export default class UserInfo {
  constructor(userName, userJob, userAvatar, api) {
    this.userName = userName;
    this.userJob = userJob;
    this.userAvatar = userAvatar;
    this.api = api;
  }

  loader(isLoading, loadNote) {
    if (isLoading) {
      loadNote();
    }
  }

  userInfo() {
    this.api.userInfo()
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    })
    .then((res) => {
      this.userName.textContent = res.name;
      this.userJob.textContent = res.about;
      this.userAvatar.style.backgroundImage = `url(${res.avatar})`;
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
      this.userName.textContent = res.name;
      this.userJob.textContent = res.about;
      this.userAvatar.style.backgroundImage = `url(${res.avatar})`;
      usrFormClose();
    })
    .catch((err) => {
      console.log('setUserInfoError ' + err);
    })
    .finally(this.loader(false, loadNote));

  }
}