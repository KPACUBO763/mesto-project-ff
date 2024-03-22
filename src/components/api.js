const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-9';
const headers = {
    authorization: '76979254-0dab-487c-8237-afe4e26a9148',
    'Content-Type': 'application/json'
};

const checkRequest = (res) => { // проверка запроса
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
};

const request = (url, options) => { // шаблон запроса с проверкой
    fetch(`${baseUrl}/${url}`, options.then(checkRequest))
};

export const getInitialCards = () => { // загрузка карточек с сервера
    return fetch(`${baseUrl}/cards`, { headers })
};

export const sendNewCard = item => { // отправка новой карточки
    return request(`${baseUrl}/cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: item.name,
            link: item.link
        })
    })
};

export const sendDeleteCard = cardId => { // удаление карточки
    return request(`${baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers
    })
};

export const sendLikeCard = card => { // отправка лайка карточке
    return request(`${baseUrl}/cards/likes/${card._id}`, {
        method: 'PUT',
        headers
    })
};

export const sendDeleteLike = card => { // удаление лайка у карточки
    return request(`${baseUrl}/cards/likes/${card._id}`, {
        method: 'DELETE',
        headers
    })
};

export const getUserInfo = () => { // получение информации о пользователе
    return request(`${baseUrl}/users/me`, { headers })
};

export const sendUserInfo = (name, about) => { // отправка информации о пользователе
    return request(`${baseUrl}/users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
};

export const sendUserAvatar = link => { // отправка аватара пользователя
    return request(`${baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ avatar: link })
    })
}
