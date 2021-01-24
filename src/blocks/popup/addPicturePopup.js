export default class AddPicturePopup {
  constructor (popupElem, placeHolders, formValidator, action, authorization) {
    this.popupElem = popupElem;
    this.placeHolders = placeHolders; 
    //передаю инициализированный класс валидации как параметр
    this.formValidator = formValidator;
    //функции по добавлению данных
    this.action = action;
    this.authorization = authorization;
  }

  //добавление элементов popup
  popupExt() {
    this.form = document.forms.new;
    this.header = this.popupElem.querySelector('.popup__title')
    this.name = this.form.elements.name;
    this.link = this.form.elements.link;
    this.button = this.popupElem.querySelector('.popup__button');
    this.closeButton = this.popupElem.querySelector('#popup-close-button')
    this.nameErrMessage = this.popupElem.querySelector('#error-name');
    this.linkErrMessage = this.popupElem.querySelector('#error-link');
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
    this.header.textContent = this.placeHolders.header;
    this.name.setAttribute('placeholder', this.placeHolders.name);
    this.link.setAttribute('placeholder', this.placeHolders.link);
    this.button.textContent = this.placeHolders.button;
    this.link.setAttribute('type', 'text');
  }

  //добавление класса для кнопки popup
  popupOpen() {
    this.open();
    this.setSubmitButtonState();
    this.button.classList.add('popup__button_plus');
    this.name.removeAttribute('email', 'email');
    this.link.setAttribute('place', 'link');
    this.formValidator.errReset(this.nameErrMessage);
    this.formValidator.errReset(this.linkErrMessage);
  }

  //сообщение о загрузке
  picLoadNote() {
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

  //установка активации кнопки
  setSubmitButtonState() {
    this.buttonDisactive();
    if (this.formNameValidate() && this.formLinkValidate()) {
      this.buttonActive();
    }
  }
  
  //добавление карточки по клику на submit
  onSubmit(event) {
    event.preventDefault();
    this.action.createCard(this.name.value, this.link.value, this.openClose.bind(this), this.picLoadNote.bind(this));
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
