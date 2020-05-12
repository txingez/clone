import React, {Component} from 'react'
import Navigation from '../ui/parts/navigation/navigation'
import {Route} from 'react-router-dom'
import Authen from '../auth0/webAuth'

const MainLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps =>
      Authen.isAuthorizeNow() ?
      (<div className="main-layout">
        <div>
          <Navigation/>
          <div className="container-fluid">
            <div id="page-content-wrapper">
              <Component {...matchProps} />
            </div>
          </div>
        </div>
      </div>) : Authen.getAuth().authorize()
    }/>
  )
}

export default MainLayout
