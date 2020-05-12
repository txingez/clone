import React from 'react'
import {connect} from 'react-redux'
import Notifications from 'react-notification-system-redux'

class NotificationContainer extends React.Component {
  render() {
    const {notifications} = this.props
    return (
        <Notifications notifications={notifications} />
    )
  }
}

export default connect(
  state => ({ notifications: state.notifications })
)(NotificationContainer)
