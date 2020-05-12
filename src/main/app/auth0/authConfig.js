const RESPONSE_TYPE = "code token id_token"
const SCOPE = "offline_access openid"

export const localConfig = {
  login: {
    domain: "pyxis-dev.auth0.com",
    clientID: "z7m9I1KjGudBZGeWw1wo1a2r2hXBA4IE",
    audience: "http://localhost:9000",
    redirectUri: "http://localhost:3000/callback",
    scope: SCOPE,
    responseType: RESPONSE_TYPE,
  },
  logout: {
    clientID: "z7m9I1KjGudBZGeWw1wo1a2r2hXBA4IE",
    returnTo: 'http://localhost:3000'
  }
}

export const devConfig = {
  login: {
    domain: "pyxis-dev.auth0.com",
    clientID: "Izr77Dl36FI7lGzg6OHIMvFIMhzIGpnb",
    audience: "https://api-development-p4x.pyxis-social.com",
    redirectUri: "https://development-p4x.pyxis-social.com/callback",
    scope: SCOPE,
    responseType: RESPONSE_TYPE,
  },
  logout: {
    clientID: "Izr77Dl36FI7lGzg6OHIMvFIMhzIGpnb",
    returnTo: 'https://development-p4x.pyxis-social.com'
  }
}

export const devConfig2 = {
  login: {
    domain: "pyxis-dev.auth0.com",
    clientID: "Izr77Dl36FI7lGzg6OHIMvFIMhzIGpnb",
    audience: "https://api-alpha-p4x.pyxis-social.com",
    redirectUri: "https://alpha-p4x.pyxis-social.com/callback",
    scope: SCOPE,
    responseType: RESPONSE_TYPE,
  },
  logout: {
    clientID: "Izr77Dl36FI7lGzg6OHIMvFIMhzIGpnb",
    returnTo: 'https://alpha-p4x.pyxis-social.com'
  }
}

export const stagConfig = {
  login: {
    domain: "pyxis-dev.auth0.com",
    clientID: "aAQtBONQTMOc6LgySYyoqG7BMDrFw4tj",
    audience: "https://api-staging-p4x.pyxis-social.com",
    redirectUri: "https://staging-p4x.pyxis-social.com/callback",
    scope: SCOPE,
    responseType: RESPONSE_TYPE,
  },
  logout: {
    clientID: "aAQtBONQTMOc6LgySYyoqG7BMDrFw4tj",
    returnTo: 'https://staging-p4x.pyxis-social.com'
  }
}

export const prodConfig = {
  login: {
    domain: "pyxis-dev.auth0.com",
    clientID: "Mo8QjcZo1R4GIZiVE4n7TuVoQN7sgeI9",
    audience: "https://api-px.pyxis-social.com",
    redirectUri: "https://px.pyxis-social.com/callback",
    scope: SCOPE,
    responseType: RESPONSE_TYPE,
  },
  logout: {
    clientID: "Mo8QjcZo1R4GIZiVE4n7TuVoQN7sgeI9",
    returnTo: 'https://px.pyxis-social.com'
  }
}
