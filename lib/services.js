/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-shorthand */
import qs from 'qs'
import axios from 'axios'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const checkToken = () => {
  return localStorage.getItem('userToken')
}
const login = ({email, password}) => {
  return axios({
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: `${process.env.API_URL}/auth/signin`,
    data: qs.stringify({
      username: email,
      password: password,
    }),
  })
}

const signup = ({username, password}) => {
  return axios({
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: `${process.env.API_URL}/auth/signup`,
    data: qs.stringify({
      username: username,
      password: password,
    }),
  })
}

const postFamily = (name, birthday, weight, sex, species) => {
  const token = checkToken()
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${token}`,
    },
    data: qs.stringify({
      name: name,
      birthday: birthday,
      sex: sex,
      weight: weight,
      species: species,
    }),
    url: `${process.env.API_URL}/organization/members`,
  })
}

const getFamily = () => {
  const token = checkToken()

  return axios({
    method: 'get',
    headers: {
      Authorization: `${token}`,
    },
    url: `${process.env.API_URL}/organization/members`,
  })
}

const deleteFamilyMember = id => {
  const token = checkToken()
  return axios.delete(`${process.env.API_URL}/organization/members`, {
    headers: {
      Authorization: token,
    },
    data: {
      memberId: id,
    },
  })
}

const getInventory = () => {
  let token = checkToken()

  return axios({
    method: 'get',
    headers: {
      Authorization: `${token}`,
    },
    url: `${process.env.API_URL}/inventory/items`,
  })
}

const postInventory = (item_name, item_barcode, quantity, expiration_date) => {
  let token = checkToken()
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${token}`,
    },
    data: qs.stringify({
      item_name: item_name,
      item_barcode: item_barcode,
      quantity: quantity,
      expiration_date: expiration_date,
    }),
    url: `${process.env.API_URL}/inventory/items`,
  })
}

const getUserStats = () => {
  const token = checkToken()

  return axios({
    method: 'get',
    headers: {
      Authorization: `${token}`,
    },
    url: `${process.env.API_URL}/organization/stats`,
  })
}

export {
  login,
  getFamily,
  postFamily,
  deleteFamilyMember,
  signup,
  getUserStats,
  getInventory,
  postInventory,
}
