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
    this.name.value = userName.textContent;
    this.link.value = userJob.textContent;
  }

  //открытие формы
  popupOpen() {
    this.open();
    this.setSubmitButtonState();  
    this.button.classList.remove('popup__button_plus');
    this.link.removeAttribute('place', 'link');
    this.name.removeAttribute('email', 'email');
    this.formValidator.errReset(this.nameErrMessage);
    this.formValidator.errReset(this.linkErrMessage);
    this.link.setAttribute('type', 'text');
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

  onSubmit(event) {
    event.preventDefault();
      this.action.setUserInfo(this.name.value, this.link.value, this.openClose.bind(this));
    return;
  }

  //установка слушателей
  setEventListeners() {
    this.popupExt();
    this.closeButton.onclick = this.openClose.bind(this);
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    this.button.onclick = this.onSubmit.bind(this);
  }
}
