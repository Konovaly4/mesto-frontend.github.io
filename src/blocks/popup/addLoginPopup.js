import AddPicturePopup from './addPicturePopup';

export default class AddLoginPopup extends AddPicturePopup {

  popupExt() {
    super.popupExt();
  }

  buttonDisactive() {
    super.buttonDisactive();
  }

  buttonActive() {
    super.buttonActive();
  }

  errReset () {
    super.errReset ();
  }

  openClose() {
    super.openClose();
  }

  //добавление данных пользователя при открытии формы
  open() {
    this.openClose();
    this.popupExt();
    this.form.reset();
    this.buttonDisactive();
    this.head.textContent = this.placeHolders.header;
    this.name.setAttribute('placeholder', this.placeHolders.email);
    this.link.setAttribute('placeholder', this.placeHolders.password);
    this.button.textContent = this.placeHolders.button;

  }

  //открытие формы
  popupOpen() {
    this.open();
    this.setSubmitButtonState();
    this.button.classList.remove('popup__button_plus');
    this.link.removeAttribute('place', 'link');
    this.name.setAttribute('email', 'email');
    this.formValidator.errReset(this.nameErrMessage);
    this.formValidator.errReset(this.linkErrMessage);
  }

  //сообщение о загрузке
  usrLoadNote() {
    this.button.textContent = this.placeHolders.buttonOnLoad;
  }

  //валидация поля name
  formNameValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.name);
  }

  //валидация поля link
  formLinkValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.link);
  } 

  setSubmitButtonState() {
    super.setSubmitButtonState();
  }

  function(event) {
    event.preventDefault();
      this.action.setUserInfo(this.name.value, this.link.value, this.openClose.bind(this), this.usrLoadNote.bind(this));
    return;
  }

  //установка слушателей
  setEventListeners() {
    this.popupExt();
    this.closeButton.onclick = this.openClose.bind(this);
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    this.button.onclick = this.function.bind(this);
  }
}
