function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', keyHandler);
    modal.addEventListener('click', BtnHandler);
    modal.addEventListener('click', overlayHandler)
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
    modal.removeEventListener('click', BtnHandler);
    modal.removeEventListener('click', overlayHandler)
}

function keyHandler(evt) { // обработчик закрытия по Esc
    if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
}

function BtnHandler(evt) { // обработчик закрытия по кнопке
    if (evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget)
    }
}

function overlayHandler(evt) { // обработчик закрытия по оверлею
    if (!evt.target.classList.contains('popup__content')) {
        closeModal(evt.target)
    }
}

export { openModal, closeModal };
