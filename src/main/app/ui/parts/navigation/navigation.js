import React from 'react'
import Authen from '../../../auth0/webAuth'

class Navigation extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div className="navigation-box">
        <nav className="navbar  navbar-fixed-top">
          <div className="container-fluid row navbar-inverse">
            <div className="navbar-header col-sm-3 col-md-2">
              <div className="page-title">PYXIS</div>
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                      aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <button className={'btn btn-default btn-logout'} onClick={e => Authen.clearSessions()}>LOGOUT</button>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navigation
