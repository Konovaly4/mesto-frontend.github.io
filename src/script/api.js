
export default class Api {
  constructor (serverData, loader) {
    this.serverData = serverData;
    this.loader = loader;
  }

  // создание пользователя
  createUser (userName, userAbout, userAvatar, userEmail, userPassword) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/signup`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userName}`,
        about: `${userAbout}`,
        avatar: `${userAvatar}`,
        email: `${userEmail}`,
        password: `${userPassword}`
      })
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    });
  }

  // login
  login (userEmail, userPassword) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/signin`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${userEmail}`,
        password: `${userPassword}`
      })
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    });
  }

  // выход из системы
  logout () {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/users/signout`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.status;
      } else {
        return Promise.reject(err);
      };
    })
  }

// получение данных пользователя
userInfo() {
  this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/users/me`, {
      redirect: 'follow',
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    })
  }

// отрисовка карточек с сервера
  getCards() {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/cards`, {
      redirect: 'follow',
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    })
  }

// изменение данных пользователя
  setUserInfo (userName, userAbout) {
    this.loader.classList.add('loader__active');
      return fetch(`${this.serverData}/users/me`, {
        redirect: 'follow',
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${userName}`,
          about: `${userAbout}`
      })
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
        if (res.ok) {
          return res.json();
      } else {
        return Promise.reject(err);
      }
    })
  }

// добавление карточки
  createCard(cardName, cardLink) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/cards`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${cardName}`,
        link: `${cardLink}`
      })
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err)
      };
    })
  }

// удаление карточки
  deleteCard(id) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/cards/${id}`, {
      redirect: 'follow',
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err)
      };
    })
    .catch(err => console.log(err));
  }

// лайк
  likeCard(id) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/cards/${id}/likes`, {
      redirect: 'follow',
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err)
      };
    })
    .catch(err => console.log(err));
  }

// сброс лайка
  unlikeCard(id) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/cards/${id}/likes`, {
      redirect: 'follow',
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err)
      };
    })
    .catch(err => console.log(err));
  }
  
//  смена аватара
  setAvatar(avLink) {
    this.loader.classList.add('loader__active');
    return fetch(`${this.serverData}/users/me/avatar`, {
      redirect: 'follow',
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: `${avLink}`
      })
   })
   .then((res) => {
      this.loader.classList.remove('loader__active');
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err)
      };
    })
  }

}

