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
import Authorization from './script/authorization';
import {
  errorMesages,
  placePlaceholders,
  userPlaceholders,
  userCreatePlaceholders,
  avatarPlaceholders,
  loginPlaceHolders,
  userButtonPlaceholders,
  defaultUserFills} from './constants/placeholders';
import avatarDefault from './images/avatar-default.jpg';

//основные переменные
const root = document.querySelector('.root');
const formPopup = document.querySelector('#popup');
const picturePopup = document.querySelector('#picture-popup');
const avatarPopup = document.querySelector('#avatar-popup');
const userCreatePopup = document.querySelector('#create-popup')
const addButton = document.querySelector('.user-info__button');
const userButton = document.querySelector('.user-info__user-button');
const authButton = document.querySelector('.user-info__auth-button');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userAvatar = document.querySelector('.user-info__photo');
const loader = document.querySelector('.loader');
const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.my-mesto.gq';


export {userName, userJob};

//объявление запроса к серверу для получения данных пользователя
const api = new Api(serverUrl, loader);

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
const userInfo = new UserInfo(api, userName, userJob, userAvatar);

//новая форма смены аватара
const avatar = new Avatar(userAvatar, api);

// функция открытия попапа карточки
const setPicturePopup = () => {
  if (!localStorage.getItem('userId')) { 
    alert('Зарегистрируйтесь или войдите, чтобы добавить карточку');
    return;
   }
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
  const addLoginPopup = new AddLoginPopup(
    formPopup,
    loginPlaceHolders,
    formValidator,
    api,
    auth,
    userName,
    userJob,
    userAvatar,
    userButton,
    authButton,
    userButtonPlaceholders,
    cardList);
  addLoginPopup.popupOpen();
  addLoginPopup.setEventListeners();
}

// начальная загрузка страницы
const initialRender = () => {
  auth.removeAuthorization();
  localStorage.removeItem('userId');
  userName.textContent = defaultUserFills.nameFill;
  userJob.textContent = defaultUserFills.aboutFill;
  userAvatar.style.backgroundImage = `url(${avatarDefault})`;
  authButton.textContent = userButtonPlaceholders.loginMode;
  userButton.textContent = userButtonPlaceholders.createMode;
  cardList.getCards(localStorage.getItem('userId'));
  cardList.setEventListeners();
}

// выход из системы
const logout = () => {
  api.logout()
  .then(res => {
    console.log(res);
    initialRender();
  })
  .catch(err => {console.log(err)})
}

// установка функций кнопки пользователя
const setUserButtonFunction = () => { auth.checkAuthorization() ? setUserPopup() : setUserCreatePopup() };
const setAuthButtonFunction = () => { auth.checkAuthorization() ? logout() : setLoginPopup() };

initialRender();


//слушатели событий
//слушатель кнопки добавления карточки
addButton.addEventListener('click', setPicturePopup);

//слушатель кнопки профиля
userButton.addEventListener('click', setUserButtonFunction);

// слушатель кнопки регистрации
authButton.addEventListener('click', setAuthButtonFunction);

//слушатель аватара
userAvatar.addEventListener('click', setUserAvatarPopup);

// слушатель клика на карточку для увеличения картинки
root.addEventListener('click', function () {
  if (event.target.classList.contains('place-card__image')) {
    const popup = new Popup(picturePopup);
    popup.pictureAppear();
  }
});
