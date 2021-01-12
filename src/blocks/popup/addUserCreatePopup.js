export default class AddUserCreatePopup {
  constructor (popupElem, placeHolders, formValidator, api) {
    this.popupElem = popupElem;
    this.placeHolders = placeHolders; 
    //передаю инициализированный класс валидации как параметр
    this.formValidator = formValidator;
    //функции по добавлению данных
    this.api = api;
  }

  //добавление элементов popup
  popupExt() {
    this.form = document.forms.create;
    this.head = this.popupElem.querySelector('.popup__title')
    this.name = this.form.elements.name;
    this.about = this.form.elements.about;
    this.avatar = this.form.elements.avatar;
    this.email = this.form.elements.email;
    this.password = this.form.elements.password;
    this.button = this.popupElem.querySelector('#submit');
    this.closeButton = this.popupElem.querySelector('#close-button')
    this.nameErrMessage = this.popupElem.querySelector('#error-name');
    this.aboutErrMessage = this.popupElem.querySelector('#error-about');
    this.avatarErrMessage = this.popupElem.querySelector('#error-avatar');
    this.emailErrMessage = this.popupElem.querySelector('#error-email');
    this.passwordErrMessage = this.popupElem.querySelector('#error-password');
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
    this.formValidator.errReset(this.nameErrMessage);
    this.formValidator.errReset(this.aboutErrMessage);
    this.formValidator.errReset(this.avatarErrMessage);
    this.formValidator.errReset(this.emailErrMessage);
    this.formValidator.errReset(this.passwordErrMessage);
  }

  //валидация поля name
  formNameValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.name);
  }

  //валидация поля about
  formAboutValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.about);
  }

  //валидация поля avatar
  formAvatarValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.avatar);
  } 

  //валидация поля email
  formEmailValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.email);
  }

  //валидация поля email
  formPasswordValidate() {
    this.popupExt();
    return this.formValidator.inputValidity(this.popupElem, this.password);
  }

  //установка активации кнопки
  setSubmitButtonState() {
    this.buttonDisactive();
    if (
      this.formNameValidate() && 
      this.formAboutValidate() &&
      this.formAvatarValidate() &&
      this.formEmailValidate() &&
      this.formPasswordValidate()
      ) {
      this.buttonActive();
    }
  }
  
  //добавление карточки по клику на submit
  onSubmit(event) {
    event.preventDefault();
    this.button.textContent = this.placeHolders.buttonOnLoad;
    this.api.createUser(
      this.name.value, 
      this.about.value, 
      this.avatar.value, 
      this.email.value, 
      this.password.value, 
      )
    .then(res => {
      this.name.value = res.name, 
      this.about.value = res.about, 
      this.avatar.value = res.avatar, 
      this.email.value = res.email, 
      this.password.value = res.password
    })
    this.button.textContent = this.placeHolders.button;
    this.openClose();
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
