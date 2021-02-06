import wrapWithProvider from './wrap-with-provider'
import "./src/styles/global.css"

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
  })

import jwt_decode from "jwt-decode";
if(localStorage.getItem('userToken')){
    let bearerToken = localStorage.getItem('userToken')
    var decoded = jwt_decode(bearerToken);
    if (Date.now() >= decoded.exp * 1000) {
        localStorage.removeItem('userToken')
        location.reload();
      }
} else {
    console.warn('no token found')
}
// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = wrapWithProvider
