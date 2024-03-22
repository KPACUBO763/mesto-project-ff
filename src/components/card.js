 // Удаление карточки
export const deleteCard = evt => {
    evt.closest('.card').remove();
};
 // обработчик лайка карточки
export const likeCard = evt => {
    evt.classList.toggle('card__like-button_is-active');
};
// Создание карточки
export const createCard = (
    item,
    userId,
    deleteCard,
    likeCard,
    openImgHandler,
    sendDeleteCard,
    sendLikeCard,
    sendDeleteLike
    ) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const title = cardElement.querySelector('.card__title');
    const image = cardElement.querySelector('.card__image');
    const likeBtn = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const deleteBtn = cardElement.querySelector('.card__delete-button');
    image.addEventListener('click', openImgHandler); // слушатель на картинку
    title.textContent = item.name;
    image.src = item.link;
    image.alt = item.name;
    // слушатель кнопки удаления карточки
    if (userId !== item.owner._id) { // проверка создателя карточки
        deleteBtn.style.display = 'none';
        deleteBtn.disabled = true
    } else {
        cardElement.querySelector('.card__delete-button') //слушатель кнопки удаления
        .addEventListener('click', evt => {
            sendDeleteCard(item._id)
            .then(() => deleteCard(evt))
            .catch(err => console.log('Ошибка при удалении карточки: ', err));
        });
    }
    // слушатель кнопки лайка
    likeBtn.addEventListener('click', evt => {
        if (evt.target.classList.contains('card__like-button_is-active')) { // проверка лайка
            sendDeleteLike(item._id)
            .then(data => {
                likeCounter.textContent = data.likes.length;
                likeCard(evt)
            })
            .catch(err => console.log('Ошибка при удалении лайка: ', err));
        } else {
            sendLikeCard(item._id)
            .then(data => {
                likeCounter.textContent = data.likes.length;
                likeCard(evt)
            })
            .catch(err => console.log('Ошибка при добавлении лайка: ', err));
        }
    });
    return cardElement
};

