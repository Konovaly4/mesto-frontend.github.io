import "./style.css";
import Api from './script/api';
import Card from './blocks/place-card/card';
import CardList from './blocks/place-card/cardList';
import Popup from './blocks/popup/popup';
import AddPicturePopup from './blocks/popup/addPicturePopup';
import AddUserPopup from './blocks/popup/addUserPopup';
import AddAvatarPopup from './blocks/popup/addAvatarPopup';
import AddUserCreatePopup from './blocks/popup/addUserCreatePopup';
import FormValidator from './script/formValidator';
import UserInfo from './blocks/user-info/userInfo';
import Avatar from './blocks/user-info/avatar';
import Authorization from "./script/authorization";

//основные переменные
const root = document.querySelector('.root');
const formPopup = document.querySelector('#popup');
const picturePopup = document.querySelector('#picture-popup');
const avatarPopup = document.querySelector('#avatar-popup');
const userCreatePopup = document.querySelector('#user-create-popup')
const addButton = document.querySelector('.user-info__button');
const userEditButton = document.querySelector('.user-info__edit-button');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const serverUrl = process.env.NODE_ENV === 'development' ? 'http' : 'https';


export {userName, userJob};

//сообщения ошибок
const errorMesages = {
  requiredErr: 'Это обязательное поле',
  lengtErr: 'Должно быть от 2 до 30 символов',
  linkErr: 'Здесь должна быть ссылка'
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
  link: 'О себе',
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

//данные для доступа к серверу
const serverRequest = {
  serverName: 'https://api.my-mesto.gq'
}

//console.log(process.env.NODE_ENV, serverUrl);

//объявление запроса к серверу для получения данных пользователя
const api = new Api(serverRequest.serverName);

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
cardList.initialCards(userName);
cardList.setEventListeners();

//новая форма данных пользователя
const userInfo = new UserInfo(userName, userJob, userAvatar, api);
userInfo.userInfo();

//новая форма смены аватара
const avatar = new Avatar(userAvatar, api);

// функция открытия попапа карточки
const setPicturePopup = () => {
  const addPicturePopup = new AddPicturePopup(formPopup, placePlaceholders, formValidator, cardList);
  addPicturePopup.popupOpen();
  addPicturePopup.setEventListeners();
}

// функция открытия попапа изменения пользователя
const setUserPopup = () => {
  const addUserPopup = new AddUserPopup(formPopup, userPlaceholders, formValidator, userInfo);
  addUserPopup.popupOpen();
  addUserPopup.setSubmitButtonState();
  addUserPopup.setEventListeners();
}

// функция открытия попапа обновления аватара
const setUserAvatarPopup = () => {
  const addAvatarPopup = new AddAvatarPopup(avatarPopup, avatarPlaceholders, formValidator, avatar);
  addAvatarPopup.popupOpen();
  addAvatarPopup.setSubmitButtonState();
  addAvatarPopup.setEventListeners();
}

// функция открытия попапа создания пользователя
const setUserCreatePopup = () => {
  const addUserCreatePopup = new AddUserCreatePopup(userCreatePopup, userPlaceholders, formValidator, )
}

//слушатели событий
//слушатель кнопки добавления карточки
addButton.addEventListener('click', setPicturePopup);

//слушатель кнопки изменения данных профиля
userEditButton.addEventListener('click', setUserPopup);

//слушатель аватара
userAvatar.addEventListener('click', setUserAvatarPopup);

// слушатель клика на карточку для увеличения картинки
root.addEventListener('click', function () {
  if (event.target.classList.contains('place-card__image')) {
    const popup = new Popup(picturePopup);
    popup.pictureAppear();
  }
});
