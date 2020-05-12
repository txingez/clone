import { WebAuth } from 'auth0-js';
import {localConfig, devConfig, stagConfig, prodConfig, devConfig2} from './authConfig'
import authConstant from '../constants/auth0'
import _ from 'lodash'

class Authentication {
  constructor() {
    this.config = this.loadConfig()
    this.webAuth = new WebAuth(this.config.login)
  }

  getAuth(){
    return this.webAuth
  }

  loadConfig() {
    let config = undefined
    let host = location.hostname

    if (host.startsWith(authConstant.LOCAL_ENVI)) {
      config = localConfig
    } else if(host.startsWith(authConstant.DEV_ENVI)) {
      config = devConfig
    } else if (host.startsWith(authConstant.DEV_ENVI_2)){
      config = devConfig2
    } else if(host.startsWith(authConstant.STAG_ENVI)) {
      config = stagConfig
    } else {
      config = prodConfig
    }

    return config
  }

  handleAuthResult() {
    return (new Promise((resolve, reject) => {
      this.webAuth.parseHash((err, authResult) => {
        if (this.isValidAuthResult(authResult)) {
          this.setSessions(authResult)
          resolve()
        } else {
          reject(err)
        }
      })
    }))
  }

  isValidAuthResult(authResult) {
    return !_.isNil(authResult) &&
      !_.isNil(authResult.accessToken) &&
      !_.isNil(authResult.idToken) &&
      !_.isNil(authResult.expiresIn)
  }

  setSessions(authResult) {
    localStorage.setItem(authConstant.ACCESS_TOKEN, authResult.accessToken);
    localStorage.setItem(authConstant.ROLE.PARAM, this.getRole(authResult))
    localStorage.setItem(
      authConstant.EXPIRES_AT,
      JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    )
  }

  getRole(authResult) {
    let namespace = location.origin

    if (authResult.idTokenPayload[`${namespace}/role`]) {
      return authResult.idTokenPayload[`${namespace}/role`]
    } else {
      return authConstant.NOT_FOUND
    }
  }

  getAccessToken() {
    return localStorage.getItem(authConstant.ACCESS_TOKEN) || authConstant.NOT_FOUND
  }

  isAccessTokenNotExpired() {
    let expiresAt = localStorage.getItem(authConstant.EXPIRES_AT) || authConstant.DEFAULT_EXPIRE_AT
    return new Date().getTime() < Number.parseInt(expiresAt, 10);
  }

  clearSessions() {
    localStorage.removeItem(authConstant.ACCESS_TOKEN)
    localStorage.removeItem(authConstant.EXPIRES_AT)
    localStorage.removeItem(authConstant.ROLE.PARAM)
    this.webAuth.logout(this.config.logout)
  }

  isValidRole() {
    let role = localStorage.getItem(authConstant.ROLE.PARAM) || authConstant.NOT_FOUND
    return authConstant.ROLE.VALUES.includes(role)
  }

  isAuthorizeNow() {
    return this.isAccessTokenNotExpired() && this.isValidRole()
  }
}

const authen = Object.freeze(new Authentication())
export default authen
