export default class AddPicturePopup {
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
    this.popupElem.form = document.forms.new;
    this.popupElem.head = document.querySelector('.popup__title')
    this.popupElem.name = this.popupElem.form.elements.name;
    this.popupElem.link = this.popupElem.form.elements.link;
    this.popupElem.button = document.querySelector('.popup__button');
    this.popupElem.closeButton = document.getElementById('popup-close-button')
    this.popupElem.nameErrMessage = document.getElementById('error-name');
    this.popupElem.linkErrMessage = document.getElementById('error-link');
  }

  // деактивация кнопки
  buttonDisactive() {
    this.popupExt();
    this.popupElem.button.setAttribute('disabled', true);
    this.popupElem.button.classList.remove('popup__button_active');
  }

  // активация кнопки
  buttonActive() {
    this.popupExt();
    this.popupElem.button.removeAttribute('disabled', true);
    this.popupElem.button.classList.add('popup__button_active');
  }  

  //наследование открытия/закрытия
  openClose() {
    this.popupElem.classList.toggle('popup_is-opened');
  }
 
  //открытие popup
  open() {
    this.openClose();
    this.popupExt();
    this.popupElem.form.reset();
    this.buttonDisactive();
    this.popupElem.head.textContent = this.placeHolders.header;
    this.popupElem.name.setAttribute('placeholder', this.placeHolders.name);
    this.popupElem.link.setAttribute('placeholder', this.placeHolders.link);
    this.popupElem.button.textContent = this.placeHolders.button;
  }

  //добавление класса для кнопки popup
  popupOpen() {
    this.open();
    this.setSubmitButtonState();
    this.popupElem.button.classList.add('popup__button_plus');
    this.popupElem.link.setAttribute('place', 'link');
    this.formValidator.errReset(this.popupElem.nameErrMessage);
    this.formValidator.errReset(this.popupElem.linkErrMessage);
  }

  //сообщение о загрузке
  picLoadNote() {
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

  //установка активации кнопки
  setSubmitButtonState() {
    this.buttonDisactive();
    if (this.formNameValidate() && this.formLinkValidate()) {
      this.buttonActive();
    }
  }
  
  //добавление карточки по клику на submit
  function(event) {
    event.preventDefault();
    this.action.createCard(this.popupElem.name.value, this.popupElem.link.value, this.openClose.bind(this), this.picLoadNote.bind(this));
    return;
  }
  //установка слушателей событий
  setEventListeners() {
    this.popupExt();
    this.popupElem.closeButton.onclick = this.openClose.bind(this);
    this.popupElem.form.addEventListener('input', this.setSubmitButtonState.bind(this));
    this.popupElem.button.onclick = this.function.bind(this);
  }
}
