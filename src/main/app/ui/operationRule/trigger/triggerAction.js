import triggerConstant from '../../../constants/trigger'

export function selectTrigger(trigger) {
  return {type: triggerConstant.SELECT_TRIGGER, trigger}
}

export function addNewTrigger(trigger) {
  return {type: triggerConstant.ADD_NEW_TRIGGER, trigger}
}

export function updateTrigger(trigger, index) {
  return {type: triggerConstant.UPDATE_TRIGGER, trigger: trigger, index: index}
}

export function removeTrigger(index) {
  return {type: triggerConstant.REMOVE_TRIGGER, index: index}
}

export function setShowTriggerForm(isShow) {
  return {type: triggerConstant.SET_SHOW_TRIGGER_FORM, value: isShow}
}

export function showTrigger(trigger) {
  return {type: triggerConstant.SHOW_TRIGGER, trigger}
}

export function updateValidTriggers(triggers) {
  return {type: triggerConstant.UPDATE_VALID_TRIGGERS, triggers}
}

export function resetTrigger() {
  return {type: triggerConstant.RESET_TRIGGER}
}

