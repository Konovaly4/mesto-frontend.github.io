export default class Api {
  constructor (incomingData, serverUrl) {
    this.ip = incomingData.ip;
    this.id = incomingData.id;
    this.token = incomingData.token;
    this.serverUrl = serverUrl;
  }

// получение данных пользователя
userInfo() {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/users/me`, {
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// отрисовка карточек с сервера
  initialCards() {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/cards`, {
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// изменение данных пользователя
  setUserInfo (usrName, usrAbout) {
      return fetch(`${this.serverUrl}://${this.ip}/${this.id}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${usrName}`,
        about: `${usrAbout}`
      })
    })
  }

// добавление карточки
  createCard(cardName, cardLink) {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${cardName}`,
        link: `${cardLink}`
      })
    })
  }

// удаление карточки
  deleteCard(id) {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// лайк
  likeCard(id) {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// сброс лайка
  unlikeCard(id) {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setAvatar(avLink) {
    return fetch(`${this.serverUrl}://${this.ip}/${this.id}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: `${this.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${avLink}`
    })
  })
}

}

