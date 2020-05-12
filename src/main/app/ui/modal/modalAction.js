import modalConstant from '../../constants/modal'

export function hidePopup() {
  return { type: modalConstant.HIDE_POPUP }
}

export function showConfirm(message, confirmedFunction, additionAction = '', isShowCancelButton = true) {
  let modalType = additionAction === modalConstant.COPY_RULE_TO_OTHER_ACCOUNT ? 'warning' : 'error'
  return { type: modalConstant.SHOW_CONFIRM, message, confirmedFunction, isShowCancelButton, additionAction , modalType}
}

export function showWarningNotSave(message) {
  let modalType = 'error'
  return { type: 'SHOW_WARNING_USER_NOT_SAVE', message, modalType}
}

export function showInfo(messages) {
  return { type: modalConstant.SHOW_INFO_POPUP, messages}
}

export function showWarning(message) {
  return { type: 'SHOW_WARNING', message}
}

export function showWarningDuplicateCpnAndDate(message) {
  let modalType = 'error'
  return {type: 'SHOW_WARNING_DUPLICATE_CPN_AND_DATE', message, modalType}
}

export function addAction(confirmedFunction) {
  return { type: 'ADD_CONFIRM_FUNCTION', confirmedFunction}
}
