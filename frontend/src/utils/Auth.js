export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify ({
      "password": password,
      "email": email
    })
  })
  .then(checkResponse)
};

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify ({
      "password": password,
      "email": email
    })
  })
  .then(checkResponse)
};

export const checkToken = ( jwt ) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  })
  .then(checkResponse)
}
