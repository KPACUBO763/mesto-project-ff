const deleteCard = evt => { // Удаление карточки
    evt.target.closest('.card').remove();
};

function likeCard(evt) { // обработчик лайка карточки
    evt.target.classList.toggle('card__like-button_is-active');
}

function createCard ( // Создание карточки
    item, delCallback, likeCallback, openImgHandler
    ) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const title = cardElement.querySelector('.card__title');
    const image = cardElement.querySelector('.card__image');
    image.addEventListener('click', openImgHandler); // слушатель на картинку
    title.textContent = item.name;
    image.src = item.link;
    image.alt = item.name;

    const likeBtn = cardElement.querySelector('.card__like-button'); // слушатель кнопки лайка
    likeBtn.addEventListener('click', likeCallback);
    cardElement.querySelector('.card__delete-button') //слушатель кнопки удаления
    .addEventListener('click', delCallback);

    return cardElement
};

export { deleteCard, likeCard, createCard}
