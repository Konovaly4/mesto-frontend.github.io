export default class CardList {
    constructor(container, card, api, auth) {
        this.card = card;
        this.container = container;
        this.cards = [];
        this.api = api;
        this.auth = auth;
    }

//указатель загрузки
    loader(isLoading, loadNote) {
        if (isLoading) {
          loadNote();
        }
      }  

//добавление карточки в контейнер
    addCard(cardName, cardLink, cardId, likeCount, isLiked) {
        this.cards.push(this.card.cardElement(cardName, cardLink, cardId, likeCount, isLiked));
        this.container.appendChild(this.card.cardElement(cardName, cardLink, cardId, likeCount, isLiked));
    }

//карточки с сервера для зарегистрированного пользователя
    getCards(userId) {
      this.cards = [];
      this.container.innerHTML = '';
        this.api.getCards()
          .then(res => {return res.data})
          .then((data) => {
            data.forEach(elem => {
              const isLiked = elem.likes.some((position) => {
                return position === userId;
              });
              this.addCard(elem.name, elem.link, elem._id, elem.likes.length, isLiked);
            })
          })
          .catch((err) => {
            console.log('initialCardsError ' + err);
          });
    }

//создание карточки
    createCard(cardName, cardLink, picFormClose, loadNote) {
        this.loader(true, loadNote);
        this.api.createCard(cardName, cardLink)
          .then((res) => {
            this.addCard(res.data.name, res.data.link, res.data._id, res.data.likes.length);
            picFormClose();
          })
          .catch((err) => {
            console.log('createCardError ' + err);
          })
    }


// удаление карточки
    deleteCard() {
        if (event.target.classList.contains('place-card__delete-icon')) {
          if (!this.auth.checkAuthorization()) {
            alert('Вы не авторизированы');
            return;
          }
          if (confirm('Вы действительно хотите удалить эту карточку?')) {  
            let cardId = event.target.closest('.place-card__image').getAttribute('id');
            this.api.deleteCard(cardId)
              .then((res) => {
                if (!res) {
                  alert('Вы не можете удалить эту карточку');
                  return;
                }
                this.container.removeChild(document.getElementById(`${cardId}`).closest('.place-card'));
              })
              .catch((err) => {
                console.log('deleteCardError ' + err);
                alert('Ошибка: пост не удален.');
              })
          }
        }
      }

// лайк
    like() {
        if (event.target.classList.contains('place-card__like-icon')) {
         if (event.target.classList.contains('place-card__like-icon_liked')) {
          if (!this.auth.checkAuthorization()) {
            alert('Авторизируйтесь, чтобы засчитать лайк');
            return;
          }
            let cardId = event.target.closest('.place-card').querySelector('.place-card__image').getAttribute('id');
            this.api.likeCard(cardId)
            .then((res) => {
            document.getElementById(`${cardId}`).closest('.place-card').querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
            document.getElementById(`${cardId}`).closest('.place-card').querySelector('.place-card__like-count').textContent = res.data.likes.length;
            })
            .catch((err) => {
            console.log('likeError ' + err);
            alert('Ошибка: карточка не отмечена.');
            })
            }
        }
    }

// снятие лайка
    unlike() {
        if (event.target.classList.contains('place-card__like-icon')) {
         if (!event.target.classList.contains('place-card__like-icon_liked')) {
          if (!this.auth.checkAuthorization()) {
            alert('Авторизируйтесь, чтобы засчитать лайк');
            return;
          }
            let cardId = event.target.closest('.place-card').querySelector('.place-card__image').getAttribute('id');
            this.api.unlikeCard(cardId)
              .then((res) => {
                document.getElementById(`${cardId}`).closest('.place-card').querySelector('.place-card__like-icon').classList.remove('place-card__like-icon_liked');
                document.getElementById(`${cardId}`).closest('.place-card').querySelector('.place-card__like-count').textContent = res.data.likes.length;
              })
              .catch((err) => {
                console.log('likeError ' + err);
                alert('Ошибка: карточка не отмечена.');
              })
            }
        }
    }
  
// установка слушателей
    setEventListeners() {
        this.container.addEventListener('click', this.deleteCard.bind(this));
        this.container.addEventListener('click', this.like.bind(this));
        this.container.addEventListener('click', this.unlike.bind(this));
    }

}



