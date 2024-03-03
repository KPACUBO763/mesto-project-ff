import './pages/index.css';
import {initialCards} from './components/cards.js';
import { deleteCard, likeCard, createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const cardList = document.querySelector('.places__list'); // место для вставки карточек
const popups = document.querySelectorAll('.popup'); // все попапы
const titleElement = document.querySelector('.profile__title'); // имя профиля
const descriptionElement = document.querySelector('.profile__description'); // описание профиля

const profileEditBtn = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const formEditProfile = document.forms['edit-profile']; // форма редактирования профиля
const nameInput = formEditProfile.name; // input имя
const jobInput = formEditProfile.description; // input занятие

const newPlaceBtn = document.querySelector('.profile__add-button'); // кнопка +
const popupNewCard = document.querySelector('.popup_type_new-card'); // попап новой карточки
const addForm = document.forms['new-place']; // форма новой карточки
// const popupCardName = formNewPlace.elements['place-name']; // название картинки карточки
// const popupCardUrl = formNewPlace.elements['link']; // ссылка картинки карточки

const popupCardImg = document.querySelector('.popup_type_image'); // попап карточки при клике
const cardName = popupCardImg.querySelector('.popup__image'); // картинка карточки при клике
const cardDescription = popupCardImg.querySelector('.popup__caption'); // описание карточки при клике


for (let elt of initialCards) { // добавление карточек из initialCards
    cardList.append(createCard(elt, deleteCard, likeCard, openImgHandler))
};

for (let popup of popups) { // добавление анимации попапам
    popup.classList.add('popup_is-animated');
}

function formEditProfileSubmit(evt) { // редактирование профиля
    evt.preventDefault();
    titleElement.textContent = nameInput.value;
    descriptionElement.textContent = jobInput.value;
    closeModal(popupEdit)
};
formEditProfile.addEventListener('submit', formEditProfileSubmit); // submit редактирования профиля

function formNewPlaceSubmit(evt) { // добавление новой карточки
    evt.preventDefault();
    const item = {
        name: evt.target['place-name'].value,
        link: evt.target['link'].value
    };
    cardList.prepend(createCard(item, deleteCard, likeCard, openImgHandler));
    evt.target.reset();
    closeModal(popupNewCard)
}
addForm.addEventListener('submit', formNewPlaceSubmit) // submit добавления карточки

function openImgHandler(evt) { // обработчик попапа карточки при клике
    cardName.alt = evt.target.alt;
    cardName.src = evt.target.src;
    cardDescription.textContent = evt.target.alt;
    openModal(popupCardImg)
};

profileEditBtn.addEventListener('click', () => { // Слушатель на кнопку редактирования профиля
    nameInput.value = titleElement.textContent;
    jobInput.value = descriptionElement.textContent;
    openModal(popupEdit);
});

newPlaceBtn.addEventListener('click', () => { // Слушатель на кнопку +
    openModal(popupNewCard)
});
