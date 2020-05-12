import React from 'react'
import Navigation from './ui/parts/navigation/navigation'

class UserNotActivePage extends React.Component {
  render() {
    return (
    <div id="notactive">
      <Navigation />
      <div className="notactive">
        <div className="notactive-content"></div>
        <h1>Oops!</h1>
        <h2>アクセス権限がありません</h2>
        <p>ご迷惑をおかけしております。アクセス権限がありません。管理者にご連絡ください。</p>
      </div>
    </div>
    )
  }
}

export default UserNotActivePage
