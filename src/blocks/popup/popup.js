export default class Popup {
  constructor (popupElem) {
    this.popupElem = popupElem;
  }

  //смена состояния "открыто-закрыто"
  openClose() {
    this.popupElem.classList.toggle('popup_is-opened');
  }

  //открытие картинки
  pictureAppear() {
    if (event.target.classList.contains('place-card__image')) {
      this.openClose();
      const closeButton = document.getElementById('picture-close-button');
      const picture = document.querySelector('.popup__picture');
      const mark = event.target.getAttribute('style', 'background-image');
      picture.setAttribute('style', mark);
      closeButton.onclick = this.openClose.bind(this);
    };
  }
}
