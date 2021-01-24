import CardList from "../blocks/place-card/cardList";

export default class Api {
  constructor (serverData) {
    this.serverData = serverData;
  }

  // создание пользователя
  createUser (userName, userAbout, userAvatar, userEmail, userPassword) {
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
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      };
    });
  }

  // login
  login (userEmail, userPassword) {
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
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      };
    });
  }

// получение данных пользователя
userInfo() {
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
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    })
  }

// отрисовка карточек с сервера
  initialCards() {
    return fetch(`${this.serverData}/initialCards`, {
      redirect: 'follow',
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(err);
      };
    })
  }

// изменение данных пользователя
  setUserInfo (userName, userAbout) {
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
  }

// добавление карточки
  createCard(cardName, cardLink) {
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
      if(res.ok) {
        console.log('res - ' + res);
        return res.json();
      } else {
        return Promise.reject(err)
      };
    })
  }

// удаление карточки
  deleteCard(id) {
    return fetch(`${this.serverData}/cards/${id}`, {
      redirect: 'follow',
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  

// лайк
  likeCard(id) {
    return fetch(`${this.serverData}/cards/like/${id}`, {
      redirect: 'follow',
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

// сброс лайка
  unlikeCard(id) {
    return fetch(`${this.serverData}/cards/like/${id}`, {
      redirect: 'follow',
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  setAvatar(avLink) {
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
}

}

