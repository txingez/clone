import React from 'react'
import {Route} from 'react-router-dom'
import Header from '../ui/parts/header/header'

const LoginLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <div class="login-layout">
        <Header/>
        <Component {...matchProps} />
      </div>
    )}/>
  )
}

export default LoginLayout
