import React from 'react'
import Authen from './auth0/webAuth'

class WaitingPage extends React.Component {
  componentWillMount() {
    Authen.handleAuthResult().then(() => {
      if (Authen.isValidRole()) {
        window.open('/', '_parent')
      } else {
        window.open('/not-active', '_parent')
      }
    }).catch(err => {
      window.open('/not-active', '_parent')
    })
  }

  render() {
    return (
      <div id="notactive" className={'waiting-page'}>
        <div className="notactive">
          <img src={'/images/loading.gif'} alt="Wait..." />
        </div>
      </div>
    )
  }
}

export default WaitingPage
