const cardList = document.querySelector('.places__list');

function createCard(item, delCard = card => {
    card.remove();
}) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').alt = item.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        delCard(cardElement);
    });

    return cardElement;
};

function addCard(name, link) {
    item = {
        name,
        link
    }
    cardList.append(createCard(item));
};

initialCards.forEach(elt => addCard(elt.name, elt.link));
