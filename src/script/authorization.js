export default class Authorization {
  constructor () {
  }

  // установка элементов для проверки авторизации
  setAuthorization () {
    localStorage.setItem('authorization', 'true');
    return;
  }

  // снятие элементов для проверки авторизации
  removeAuthorization () {
    localStorage.removeItem('authorization', 'true');
    return;
  }

  // проверка авторизации
  checkAuthorization () {
    return !!localStorage.getItem('authorization');
  }
}