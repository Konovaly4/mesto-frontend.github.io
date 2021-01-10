export default class AddUserEditPopup {
  constructor (popupElem, placeHolders, formValidator, action) {
    this.popupElem = popupElem;
    this.placeHolders = placeHolders; 
    //передаю инициализированный класс валидации как параметр
    this.formValidator = formValidator;
    //функции по добавлению данных
    this.action = action;
  }

  //добавление элементов popup
  popupExt() {
    this.form = this.popupelem.forms.user-update;
    this.head = this.popupelem.querySelector('.popup__title')
    this.name = this.form.elements.name;
    this.about = this.form.elements.about;
    this.avatar = this.form.elements.avatar;
    this.email = this.form.elements.email;
    this.password = this.form.elements.password;
    this.button = this.popupelem.querySelector('#user-update-submit');
    this.closeButton = this.popupelem.querySelector('#user-update-close-button')
    this.nameErrMessage = this.popupelem.querySelector('#error-user-update-name');
    this.nameErrMessage = this.popupelem.querySelector('#error-user-update-about');
    this.nameErrMessage = this.popupelem.querySelector('#error-user-update-avatar');
    this.nameErrMessage = this.popupelem.querySelector('#error-user-update-email');
    this.linkErrMessage = this.popupelem.querySelector('#error-user-update-password');
  }

  // деактивация кнопки
  buttonDisactive() {
    this.popupExt();
    this.button.setAttribute('disabled', true);
    this.button.classList.remove('popup__button_active');
  }

  // активация кнопки
  buttonActive() {
    this.popupExt();
    this.button.removeAttribute('disabled', true);
    this.button.classList.add('popup__button_active');
  }  

  //наследование открытия/закрытия
  openClose() {
    this.popupElem.classList.toggle('popup_is-opened');
  }
 
  //открытие popup
  open() {
    this.openClose();
    this.popupExt();
    this.form.reset();
    this.buttonDisactive();
    this.head.textContent = this.placeHolders.header;
    this.name.setAttribute('placeholder', this.placeHolders.name);
    this.about.setAttribute('placeholder', this.placeHolders.about);
    this.avatar.setAttribute('placeholder', this.placeHolders.avatar);
    this.email.setAttribute('placeholder', this.placeHolders.email);
    this.password.setAttribute('placeholder', this.placeHolders.password);
    this.button.textContent = this.placeHolders.button;
  }

  //добавление класса для кнопки popup
  popupOpen() {
    this.open();
    this.setSubmitButtonState();
    this.formValidator.errReset(this.emailErrMessage);
    this.formValidator.errReset(this.linkErrMessage);
  }

  //сообщение о загрузке
  picLoadNote() {
    this.button.textContent = this.placeHolders.buttonOnLoad;
  }

  //валидация поля name
  formNameValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.name);
  }

  //валидация поля about
  formAboutValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.about);
  }

  //валидация поля avatar
  formAvatarValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.avatar);
  } 

  //валидация поля email
  formEmailValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.email);
  }

  //валидация поля email
  formPasswordValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.password);
  }

  //установка активации кнопки
  setSubmitButtonState() {
    this.buttonDisactive();
    if (
      this.formNameValidate() && 
      this.formAboutValidate() &&
      formAvatarValidate() &&
      formEmailValidate() &&
      formPasswordValidate()
      ) {
      this.buttonActive();
    }
  }
  
  //добавление карточки по клику на submit
  onSubmit(event) {
    event.preventDefault();
    this.action.createUser(
      this.name.value, 
      this.about.value, 
      this.avatar.value, 
      this.email.value, 
      this.password.value, 
      this.openClose.bind(this), 
      this.picLoadNote.bind(this)
      );
    return;
  }
  //установка слушателей событий
  setEventListeners() {
    this.popupExt();
    this.closeButton.onclick = this.openClose.bind(this);
    this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    this.button.onclick = this.onSubmit.bind(this);
  }
}
