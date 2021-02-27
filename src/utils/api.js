class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
      if (res.ok) return res.json()
      return Promise.reject(new Error(`Ошибка: ${res.status}`))
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  setUserData(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._getResponseData)
  }

  getInitialCards () {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._getResponseData)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  switchLike(card, method) {
    return fetch(`${this._baseUrl}cards/likes/${card._id}`, {
      method: method,
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  addAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "avatar": data
      })
    })
      .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19/',
  headers: {
    authorization: '7a0583fa-0284-4573-a326-4d7fa2ed6e73',
    'Content-Type': 'application/json'
  }
})

export default api