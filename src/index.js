import "./style.css";
import Api from './script/api';
import Card from './blocks/place-card/card';
import CardList from './blocks/place-card/cardList';
import Popup from './blocks/popup/popup';
import AddPicturePopup from './blocks/popup/addPicturePopup';
import AddUserPopup from './blocks/popup/addUserPopup';
import AddAvatarPopup from './blocks/popup/addAvatarPopup';
import AddUserCreatePopup from './blocks/popup/addUserCreatePopup';
import AddLoginPopup from './blocks/popup/addLoginPopup';
import FormValidator from './script/formValidator';
import UserInfo from './blocks/user-info/userInfo';
import Avatar from './blocks/user-info/avatar';
import Authorization from "./script/authorization";

//основные переменные
const root = document.querySelector('.root');
const formPopup = document.querySelector('#popup');
const picturePopup = document.querySelector('#picture-popup');
const avatarPopup = document.querySelector('#avatar-popup');
const userCreatePopup = document.querySelector('#create-popup')
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__edit-button');
const createButton = document.querySelector('.user-info__create-button');
const loginButton = document.querySelector('.user-info__login-button');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
// const serverUrl = 'https://api.my-mesto.gq';
const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.my-mesto.gq';


export {userName, userJob};

//сообщения ошибок
const errorMesages = {
  requiredErr: 'Это обязательное поле',
  lengtErr: 'Должно быть от 2 до 30 символов',
  linkErr: 'Здесь должна быть ссылка',
  emailErr: 'формат email должен быть валидным'
}

// фразы-плейсхолдеры popup Новое Место
const placePlaceholders = {
  header: 'Новое место',
  name: 'Название',
  link: 'Ссылка на картинку',
  button: '+',
  buttonOnLoad: 'Загрузка'
}

// фразы-плейсхолдеры popup Редактировать профиль
const userPlaceholders = {
  header: 'Редактировать профиль',
  name: 'Имя',
}

// фразы-плейсхолдеры popup регистрации
const userCreatePlaceholders = {
  header: 'РРегистрация',
  name: 'Имя',
  about: 'О себе',
  avatar: 'Ссылка на аватар',
  email: 'Email',
  password: 'Пароль',
  button: 'Сохранить',
  buttonOnLoad: 'Загрузка'
}

// фразы-плейсхолдеры popup Редактировать аватар
const avatarPlaceholders = {
  header: 'Обновить аватар',
  link: 'Ссылка на аватар',
  button: 'Сохранить',
  buttonOnLoad: 'Загрузка'
}

//фразы-плейсхолдеры для попапа логина
const loginPlaceHolders = {
  header: 'Вход',
  email: 'Введите email',
  password: 'Введите пароль',
  button: 'Сохранить',
  buttonOnLoad: 'Загрузка'
}

//объявление запроса к серверу для получения данных пользователя
const api = new Api(serverUrl);

// объявление класса авторизации
const auth = new Authorization();

//класс карточки
const card = new Card();

//создание карточек (контейнер с карточками) + отрисовка начальных карточек
const cardContainer = document.querySelector('.places-list');

//объявление класса валидации формы
const formValidator = new FormValidator(errorMesages);

//объявление класса создания карточки через popup
const cardList = new CardList(cardContainer, card, api);

//новая форма данных пользователя
// const userInfo = new UserInfo(userName, userJob, userAvatar, api);
const userInfo = new UserInfo(auth, api);

//новая форма смены аватара
const avatar = new Avatar(userAvatar, api);

// функция открытия попапа карточки
const setPicturePopup = () => {
  const addPicturePopup = new AddPicturePopup(formPopup, placePlaceholders, formValidator, cardList, auth);
  addPicturePopup.popupOpen();
  addPicturePopup.setEventListeners();
}

// функция открытия попапа изменения пользователя
const setUserPopup = () => {
  const addUserPopup = new AddUserPopup(formPopup, userPlaceholders, formValidator, userInfo, auth);
  addUserPopup.popupOpen();
  addUserPopup.setSubmitButtonState();
  addUserPopup.setEventListeners();
}

// функция открытия попапа обновления аватара
const setUserAvatarPopup = () => {
  const addAvatarPopup = new AddAvatarPopup(avatarPopup, avatarPlaceholders, formValidator, avatar, auth);
  addAvatarPopup.popupOpen();
  addAvatarPopup.setSubmitButtonState();
  addAvatarPopup.setEventListeners();
}

// функция открытия попапа создания пользователя
const setUserCreatePopup = () => {
  const addUserCreatePopup = new AddUserCreatePopup(userCreatePopup, userCreatePlaceholders, formValidator, api, auth);
  addUserCreatePopup.popupOpen();
  addUserCreatePopup.setSubmitButtonState();
  addUserCreatePopup.setEventListeners();
}

// функция открытия попапа логина
const setLoginPopup = () => {
  const addLoginPopup = new AddLoginPopup(formPopup, loginPlaceHolders, formValidator, api, auth, userName, userJob, userAvatar);
  addLoginPopup.popupOpen();
  addLoginPopup.setEventListeners();
}


// начальная загрузка страницы
// const pageRender = () => {
//   console.log('auth - ' + auth.checkAuthorization());
//   console.log('LS - ' + localStorage.getItem('authorization'));
//   if (!auth.checkAuthorization()) {
//     userName.textContent = 'Авторизируйтесь';
//     userJob.textContent = 'Или выполните вход';
//     return;
//   } else {
//     userInfo.getUserInfo()
//     .then(user => {
//       userName = user.userName;
//       userJob = user.userAbout;
//       userAvatar.style.backgroundImage = `url(${res.avatar})`;
//     });
//   }
//   cardList.initialCards(userName);
//   cardList.setEventListeners();
// }

// pageRender();

const initialRender = () => {
  auth.removeAuthorization();
  console.log(auth.checkAuthorization());
  userName.textContent = 'Авторизируйтесь';
  userJob.textContent = 'Или выполните вход';
  cardList.initialCards(undefined);
  cardList.setEventListeners();
}

initialRender();


//слушатели событий
//слушатель кнопки добавления карточки
addButton.addEventListener('click', setPicturePopup);

//слушатель кнопки изменения данных профиля
editButton.addEventListener('click', setUserPopup);

// слушатель кнопки создания профиля
createButton.addEventListener('click', setUserCreatePopup);

// слушатель кнопки логина
loginButton.addEventListener('click', setLoginPopup);

//слушатель аватара
userAvatar.addEventListener('click', setUserAvatarPopup);

// слушатель клика на карточку для увеличения картинки
root.addEventListener('click', function () {
  if (event.target.classList.contains('place-card__image')) {
    const popup = new Popup(picturePopup);
    popup.pictureAppear();
  }
});
