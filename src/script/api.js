class Api {
  constructor (incomingData) {
    this.ip = incomingData.ip;
    this.id = incomingData.id;
    this.token = incomingData.token;
  }

// получение данных пользователя

/* REVIEW Нужно исправить, аватар так же надо подгружать с сервера при загрузке страницы (+) */
userInfo() {
    return fetch(`http://${this.ip}/${this.id}/users/me`, {
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

      /* REVIEW  Можно гораздо лучше. Лучше, когда метод Api отвечает только за общение с сервером (выполнение принципа единственной ответственности метода),
т.е. отправляет данные серверу и получает их и возвращает res (return res).
Обработку же полученных данных (res) лучше осуществлять в других модулях, это облегчит расширение приложения, например, когда этот же ответ сервера
может понадобиться какому-нибудь вновь добавленному классу. Но, при таком алгоритме работы с сервером, метод setUserInfo должен возвращать промис,
т.е. перед fetch надо поставить return (return fetch ...), а в каком-то другом модуле обработать res также в методе then возвращённого промиса:
api.setUserInfo(userName, userAbout ...).then((res) => {работа с res, закрытие формы профиля}). Это же справедливо и для других методов Api. (+)
Спасибо! Идею понял, надеюсь, правильно реализовал. */

// отрисовка карточек с сервера
  initialCards() {
    return fetch(`http://${this.ip}/${this.id}/cards`, {
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// изменение данных пользователя
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
    })
  }

// добавление карточки
  createCard(cardName, cardLink) {
    return fetch(`http://${this.ip}/${this.id}/cards`, {
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
    return fetch(`http://${this.ip}/${this.id}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// лайк
  likeCard(id) {
    return fetch(`http://${this.ip}/${this.id}/cards/like/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

// сброс лайка
  unlikeCard(id) {
    return fetch(`http://${this.ip}/${this.id}/cards/like/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setAvatar(avLink) {
    return fetch(`http://${this.ip}/${this.id}/users/me/avatar`, {
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
// здравствуйте! не успел сделать информацию по загрузке данных и функцию замены аватара, доделаю на каникулах :-)
// доделал информацию по загрузке + исправил замечания.

/* REVIEW. Резюме.

В чём достигнут успех.
1. Данные о пользователе, после редактирования в форме профиля, обновляют данные на странице только после успешного ответа сервера
и из объекта его ответа.
2.Сделано дополнительное задание по установке лайка и сохранению информации об этом на сервере.
3. Предусмотрена обработка всех видов ошибок при аботе с сервером.

Что нужно исправить.
1. Прежде всего нужно выполнить обязательные требования к заданию 7, иначе невозможно проверить и часть обязательных требований к заданию 9.
   А именно:
   а)данные со страницы с информацией о профиле всегда должны находиться в полях формы профиля при её открытии. (+)
   б)при открытии формы профиля не должно присутствовать никаких сообщений об ошибках и кнопка 'Сохранить' должна быть доступна, (+)
   поскольку форма при открытии всегда находится в валидном состоянии. (+)

   в) Форма добавления карточки не закрывается после ввода информации и нажатия на кнопку сабмита (тоже исправить). (+)

2.Подгружать аватар при загрузке страницы (подробности в ревью в этом модуле) (+).
3.Предусмотреть закрытие формы профиля после редактирования и нажатия на кнопку сабмита в нужном месте кода
(подробности в ревью в этом модуле). (+) - метод переехал в класс userInfo, комментарий я тоже перенес туда.

Что можно улучшить.
1. Можно отправлять и получать данные с сервера в методах класса Api, а обрабатывать полученные данные
в методах других классов (подробности в ревью в этом модуле). (+)



/* REVIEW2. Резюме2.

Все замечания исправлены. Сделаны дополнительные задания по установке лайка и добавлению и удалению карточек.

Сделана полная валидация формы профиля.

Что можно улучшить.
Подумать об уменьшении повторяемости кода (подробности в модуле userinfo.js)

Задание принято!

*/

