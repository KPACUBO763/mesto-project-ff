function openModal(modal) {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleKey);
    modal.addEventListener('click', handleBtn);
    modal.addEventListener('click', handleOverlay)
}

function closeModal(modal) {
    modal.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleKey);
    modal.removeEventListener('click', handleBtn);
    modal.removeEventListener('click', handleOverlay)
}

function handleKey(evt) { // обработчик закрытия по Esc
    if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
    }
}

function handleBtn(evt) { // обработчик закрытия по кнопке
    if (evt.target.classList.contains('popup__close')) {
        closeModal(evt.currentTarget)
    }
}

function handleOverlay(evt) { // обработчик закрытия по оверлею
    if (!evt.target.classList.contains('popup__content')) {
        closeModal(evt.target)
    }
}

export { openModal, closeModal };
