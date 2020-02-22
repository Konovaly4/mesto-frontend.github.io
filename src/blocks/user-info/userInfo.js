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

  /* REVIEW Нужно исправить, аватар так же надо подгружать с сервера при загрузке страницы (+) */
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

    /* REVIEW Нужно исправить, закрытие формы профиля вы должны предусмотреть в этом месте (если не сделаете, как рекомендовано выше), так как она должна
    закрыться не раньше, чем придет ответ от сервера и вы его обработаете. Закрытие в любом другом месте кода выполнится раньше, чем придет ответ,
    так как fetch выполняется асинхронно. (+)
    Поправил, но думаю, вы имели в виду модуль setUserInfo, расположенный ниже, так как данный модуль отрисовывает данные пользователя при загрузке страницы.
    Исправления внес туда */
    /*REVIEW2.  Да, я имела ввиду метод setUserInfo.*/


    })
    .catch((err) => {
      console.log('userInfoError ' + err);
    });
  }

  //заполнение формы
  setUserInfo(usrName, usrJob, usrFormClose, loadNote) {
  //this.setInfoFunction.setUserInfo(usrName, usrJob, closeFunc, this.userName, this.userJob, this.userAvatar);
    this.loader (true, loadNote);
    this.api.setUserInfo(usrName, usrJob)
      .then((res) => {
        if (res.ok) {                   //
          return res.json();              //
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

/*REVIEW2. Как Вы сделали работает, но я бы первый метод then с проверкой if(res.ok) {...} оставила в методе api.setUserInfo, поскольку, если Вам
потребуется информация, возвращаемая api.setUserInfo ещё в каком-то методе другого класса, Вам в этом методе код этого then придётся полностью повторять.
То есть метод api.setUserInfo в классе Api, мне кажется лучше бы записать в следующем виде:

  setUserInfo (usrName, usrAbout) {
      return fetch(`http://${this.ip}/${this.id}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${usrName}`,
        about: `${usrAbout}`
      })
    }).then((res) => {
        if (res.ok) {
          return res.json();
      } else {
        return Promise.reject(err);
      };
    })
  }


  А метод setUserInfo класса UserInfo был бы тогда в следующем виде:

  setUserInfo(usrName, usrJob, usrFormClose, loadNote) {
  //this.setInfoFunction.setUserInfo(usrName, usrJob, closeFunc, this.userName, this.userJob, this.userAvatar);
    this.loader (true, loadNote);
    this.api.setUserInfo(usrName, usrJob)
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

В реальном проекте можно было бы ещё продумать, какие общие блоки оставить в api.setUserInfo и что из него возвращать для обработки в других методах.

*/