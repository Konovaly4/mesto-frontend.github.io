export default class FormValidator {
  constructor (errors) {
    this.errors = errors;
  }

  //сброс ошибки
  errReset(errElem) {
    errElem.textContent = '';
  }

  //проверка заполнения поля
  checkInputValidity(elem, err) {
    elem.classList.remove('popup__error-message_active');
    if (!elem.checkValidity()) {
      elem.classList.add('popup__error-message_active');
      err.textContent = this.errors.requiredErr;
      return false;
    } else return true;
  }

  //проверка количества символов (помню, что можно лучше, обещаю доработать)
  lengthInputValidity(elem, err) {
    elem.classList.remove('popup__error-message_active');
    if (!elem.hasAttribute('place') && (elem.value.length < 2 || elem.value.length > 30)) {
      elem.classList.add('popup__error-message_active');
      err.textContent = this.errors.lengtErr;
      return false;
    } else return true;
  }

  //проверка количества символов (помню, что можно лучше, обещаю доработать)
  passwordLengthInputValidity(elem, err) {
    elem.classList.remove('popup__error-message_active');
    if (!elem.hasAttribute('place') && (elem.value.length < 2 || elem.value.length > 15)) {
      elem.classList.add('popup__error-message_active');
      err.textContent = this.errors.lengtErr;
      return false;
    } else return true;
  }

  //проверка введения ссылки
  linkInputValidity(elem, err) {
    elem.classList.remove('popup__error-message_active');
    let regexp = /^https?/i;
    let test = regexp.test(elem.value);
    if (!test) {
      elem.classList.add('popup__error-message_active');
      err.textContent = this.errors.linkErr;
      return false;
    } else return true;
  }

  //проверка введения email
  emailInputValidity(elem, err) {
    elem.classList.remove('popup__error-message_active');
    let regexp = /^[a-z]+@[a-z]+\.[a-z]{2,}/;
    let test = regexp.test(elem.value);
    if (!test) {
      elem.classList.add('popup__error-message_active');
      err.textContent = this.errors.emailErr;
      return false;
    } else return true;
  }

  // выбор типа инпута текст/ссылка
  toggValidity(elem, err) {
    if (elem.hasAttribute('place')) {
      return this.linkInputValidity(elem, err);
    } else if (elem.hasAttribute('email')) {
      return this.emailInputValidity(elem, err);
    } else {
      return this.lengthInputValidity(elem, err);
    }
  }

  //общая проверка
  inputValidity(popup,inp) {
    let errorMessage = popup.querySelector(`#error-${inp.id}`);
    this.errReset(errorMessage);
    return (this.checkInputValidity(inp, errorMessage) && this.toggValidity(inp, errorMessage));
    }
}

