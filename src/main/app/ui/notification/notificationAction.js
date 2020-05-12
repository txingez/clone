import React from 'react'
import translation from '../../util/translation'
import { success, error, warning } from 'react-notification-system-redux'

export function showSuccessMsg(message) {
  return (dispatch) => {
    const notificationOpts = {
      title: translation.t('notification.success_title'),
      message: message,
      position: 'tc',
      autoDismiss: 3
    }
    dispatch(success(notificationOpts))
  }
}

export function showErrorMsg(message) {
  return (dispatch) => {
    const notificationOpts = {
      title: translation.t('notification.error_title'),
      message: message,
      position: 'tc',
      autoDismiss: 10
    }
    dispatch(error(notificationOpts))
  }
}

export function showWarningMsg(message) {
  return (dispatch) => {
    const notificationOpts = {
      title: translation.t('notification.warning_title'),
      message: message,
      position: 'tc',
      autoDismiss: 10
    }
    dispatch(warning(notificationOpts))
  }
}
