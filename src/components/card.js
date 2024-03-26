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
    const title = cardElement.querySelector('.card__title'); // название карточки
    const image = cardElement.querySelector('.card__image'); // url карточки
    const likeBtn = cardElement.querySelector('.card__like-button'); // кнопка лайка
    const likeCounter = cardElement.querySelector('.card__like-counter'); // счетчик лайков
    const deleteBtn = cardElement.querySelector('.card__delete-button'); // кнопка удаления
    const userLikes = item.likes; // пользователи, лайкнувшие карточку
    title.textContent = item.name; // присваивание названия карточке
    image.src = item.link; // присваивание ссылки карточке
    image.alt = item.name; // присваивание описания карточке
    likeCounter.textContent = item.likes.length; // присваивание кол-ва лайков карточке
    image.addEventListener('click', openImgHandler); // слушатель на картинку
    // слушатель кнопки удаления карточки
    if (userId !== item.owner._id) { // проверка создателя карточки
        deleteBtn.style.display = 'none'; // скрываем кнопку удаления, если не моя
        deleteBtn.disabled = true
    } else {
        cardElement.querySelector('.card__delete-button') //слушатель кнопки удаления
        .addEventListener('click', evt => {
            sendDeleteCard(item._id)
            .then(() => deleteCard(evt))
            .catch(err => console.log('Ошибка при удалении карточки: ', err));
        })
    };
    // проверка на наличие собственного лайка
    for (let like in userLikes) {
        if (like._id === userId) {
            likeBtn.classList.add('card__like-button_is-active')
        }
    };
    // слушатель кнопки лайка
    likeBtn.addEventListener('click', evt => {
        if (evt.target.classList.contains('card__like-button_is-active')) { // удаление лайка
            sendDeleteLike(item)
            .then(data => {
                likeCounter.textContent = data.likes.length; // кол-во лайков
                likeCard(evt)
            })
            .catch(err => console.log('Ошибка при удалении лайка: ', err))
        } else { // добавление лайка
            sendLikeCard(item)
            .then(data => {
                likeCounter.textContent = data.likes.length; // кол-во лайков
                likeCard(evt)
            })
            .catch(err => console.log('Ошибка при добавлении лайка: ', err))
        }
    });
    return cardElement
}
