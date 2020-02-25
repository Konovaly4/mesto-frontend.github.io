import AddPicturePopup from './addPicturePopup';
import {userName, userJob} from '../../index';

export default class AddUserPopup extends AddPicturePopup {

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
    super.open();
    this.popupElem.name.value = userName.textContent;
    this.popupElem.link.value = userJob.textContent;
  }

  //открытие формы
  popupOpen() {
    this.open();
    this.setSubmitButtonState();
    this.popupElem.button.classList.remove('popup__button_plus');
    this.popupElem.link.removeAttribute('place', 'link');
    this.formValidator.errReset(this.popupElem.nameErrMessage);
    this.formValidator.errReset(this.popupElem.linkErrMessage);
  }

  //сообщение о загрузке
  usrLoadNote() {
    this.popupElem.button.textContent = this.placeHolders.buttonOnLoad;
  }

  //валидация поля name
  formNameValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem.name);
  }

  //валидация поля link
  formLinkValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem.link);
  } 

  setSubmitButtonState() {
    super.setSubmitButtonState();
  }

  function(event) {
    event.preventDefault();
      this.action.setUserInfo(this.popupElem.name.value, this.popupElem.link.value, this.openClose.bind(this), this.usrLoadNote.bind(this));
    return;
  }

  //установка слушателей
  setEventListeners() {
    this.popupExt();
    this.popupElem.closeButton.onclick = this.openClose.bind(this);
    this.popupElem.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    this.popupElem.button.onclick = this.function.bind(this);
  }
}
