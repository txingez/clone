import ruleScheduleConstant from '../../../constants/ruleSchedule'

export function setVisibleSchedule(isVisible) {
  return { type: ruleScheduleConstant.SET_VISIBLE_SCHEDULE, value: isVisible }
}

export function saveSchedule(schedule, actionType) {
  return { type: ruleScheduleConstant.SAVE_SCHEDULE, schedule: schedule, actionType: actionType }
}

export function resetSchedule() {
  return { type: ruleScheduleConstant.RESET_SCHEDULE }
}

