const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-9';
const headers = {
    authorization: '76979254-0dab-487c-8237-afe4e26a9148',
    'Content-Type': 'application/json'
};
 // проверка запроса
const checkRequest = res => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка запроса: ${res.status}`)
};
 // шаблон запроса с проверкой
const request = (url, options) => {
    return fetch(`${baseUrl}/${url}`, options).then(checkRequest)
};
 // загрузка карточек с сервера
export const getInitialCards = () => {
    return request(`/cards`, { headers })
};
 // отправка новой карточки
export const sendNewCard = item => {
    return request(`/cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name: item.name,
            link: item.link
        })
    })
};
 // удаление карточки
export const sendDeleteCard = cardId => {
    return request(`/cards/${cardId}`, {
        method: 'DELETE',
        headers
    })
};
 // отправка лайка карточке
export const sendLikeCard = cardId => {
    return request(`/cards/likes/${cardId}`, {
        method: 'PUT',
        headers
    })
};
 // удаление лайка у карточки
export const sendDeleteLike = cardId => {
    return request(`/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers
    })
};
 // получение информации о пользователе
export const getUserInfo = () => {
    return request(`/users/me`, { headers })
};
 // отправка информации о пользователе
export const sendUserInfo = (name, about) => {
    return request(`/users/me`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
};
 // отправка аватара пользователя
export const sendUserAvatar = link => {
    return request(`/users/me/avatar`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ avatar: link })
    })
}
