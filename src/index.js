import './pages/index.css';
import { deleteCard, likeCard, createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {
    getInitialCards,
    sendNewCard,
    sendDeleteCard,
    getUserInfo,
    sendUserInfo,
    sendUserAvatar,
    sendLikeCard,
    sendDeleteLike
} from './components/api.js'
// глобальные переменные
const cardList = document.querySelector('.places__list'); // место для вставки карточек
const popups = document.querySelectorAll('.popup'); // все попапы
const titleElement = document.querySelector('.profile__title'); // имя профиля
const descriptionElement = document.querySelector('.profile__description'); // описание профиля
const popupBtn = document.querySelector('.popup__button');
// редактирование профиля
const profileEditBtn = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const formEditProfile = document.forms['edit-profile']; // форма редактирования профиля
const nameInput = formEditProfile.name; // input имя
const jobInput = formEditProfile.description; // input занятие
const profileTitleElement = document.querySelector('.profile__title'); // DOM-елемент имени
const profileDescriptionElement = document.querySelector('.profile__description'); // DOM-елемент описания
// новая карточка
const newPlaceBtn = document.querySelector('.profile__add-button'); // кнопка +
const popupNewCard = document.querySelector('.popup_type_new-card'); // попап новой карточки
const addForm = document.forms['new-place']; // форма новой карточки
// картинка карточки
const popupCardImg = document.querySelector('.popup_type_image'); // попап карточки при клике
const cardName = popupCardImg.querySelector('.popup__image'); // картинка карточки при клике
const cardDescription = popupCardImg.querySelector('.popup__caption'); // описание карточки при клике
// аватар
const avatarEditBtn = document.querySelector('.profile__image'); // кнопка редактирования аватара
const popupAvatar = document.querySelector('.popup_type_edit-avatar'); // попап редактирования аватара
const avatarForm = document.forms['edit-avatar']; // форма редактирования аватара
// валидация
const validationConfig = { // конфиг валидации
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
enableValidation(validationConfig); // вызов валидации
 // добавление анимации попапам
for (let popup of popups) {
    popup.classList.add('popup_is-animated');
}
 // переменная для ID пользователя
let userId;
 // функция заполнения данных информацией с сервера при загрузке
const setUserInfo = data => {
    titleElement.textContent = data.name;
    descriptionElement.textContent = data.about;
    avatarEditBtn.style.backgroundImage = `url(${data.avatar})`
};
// функция для добавления карточек с сервера при загрузке
const setCardList = cards => {
    cards.forEach(res => {
        cardList.append(createCard(
            res,
            userId,
            deleteCard,
            likeCard,
            openImgHandler,
            sendDeleteCard,
            sendLikeCard,
            sendDeleteLike
        ))
    })
};
 // загрузка информации о пользователе и карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
    .then(([user, cards]) => {
        userId = user._id;
        setUserInfo(user);
        setCardList(cards)
    })
    .catch(err => console.log('Ошибка: загрузки информации о пользователе и карточек', err));
// функция редактирования информации в профиле
const submitEditProfile = evt => {
    evt.preventDefault();
    popupBtn.textContent = 'Сохранение...';
    sendUserInfo(nameInput.value, jobInput.value) // отправка данных серверу
    .then(data => {
        profileTitleElement.textContent = data.name;
        profileDescriptionElement.textContent = data.about;
        closeModal(popupEdit)
    })
    .catch(err => console.log('Ошибка редактирования профиля: ', err))
    .finally(() => popupBtn.textContent = 'Сохранить')

};
formEditProfile.addEventListener('submit', submitEditProfile); // submit редактирования профиля
// функция добавления новой карточки
const submitNewPlace = evt => {
    evt.preventDefault();
    popupBtn.textContent = 'Сохранение...';
    const data = {
        name: evt.target['place-name'].value,
        link: evt.target['link'].value
    };
    sendNewCard(data) // отправка данных серверу
    .then(res => {
        cardList.prepend(
            createCard(
                res,
                userId,
                deleteCard,
                likeCard,
                openImgHandler,
                sendDeleteCard,
                sendLikeCard,
                sendDeleteLike
            )
        );
        closeModal(popupNewCard);
        evt.target.reset() // сброс формы
    })
    .catch(err => console.log('Ошибка добавления новой карточки: ', err))
    .finally(() => popupBtn.textContent = 'Сохранить')
};
addForm.addEventListener('submit', submitNewPlace); // submit добавления карточки
// функция изменения аватара
const submitNewAvatar = evt => {
    evt.preventDefault();
    popupBtn.textContent = 'Сохранение...';
    sendUserAvatar(evt.target['avatar-link'].value)
    .then(data => {
        avatarEditBtn.style.backgroundImage = `url(${data.avatar})`;
        closeModal(popupAvatar)
        evt.target.reset() // сброс формы
    })
    .catch(err => console.log('Ошибка изменения аватара: ', err))
    .finally(() => popupBtn.textContent = 'Сохранить')
};
avatarForm.addEventListener('submit', submitNewAvatar) // submit добавления аватара
 // обработчик попапа карточки при клике
const openImgHandler = evt => {
    cardName.alt = evt.target.alt;
    cardName.src = evt.target.src;
    cardDescription.textContent = evt.target.alt;
    openModal(popupCardImg)
};
// слушатели на формы
avatarEditBtn.addEventListener('click', () => { // Слушатель на кнопку редактирования аватара
    clearValidation(avatarForm, validationConfig); // сброс валидации
    openModal(popupAvatar)
});

profileEditBtn.addEventListener('click', () => { // Слушатель на кнопку редактирования профиля
    nameInput.value = titleElement.textContent;
    jobInput.value = descriptionElement.textContent;
    clearValidation(popupEdit, validationConfig); // сброс валидации
    openModal(popupEdit)
});

newPlaceBtn.addEventListener('click', () => { // Слушатель на кнопку +
    clearValidation(popupNewCard, validationConfig); // сброс валидации
    openModal(popupNewCard);
});
