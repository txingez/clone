import adjustmentRuleScheduleConstant from '../../../constants/adjustmentRuleSchedule'

export function setVisibleSchedule(isVisible) {
  return {type: adjustmentRuleScheduleConstant.SET_VISIBLE_SCHEDULE_ADJUSTMENT, value: isVisible}
}

export function saveScheduleAdjustment(schedule) {
  return {type: adjustmentRuleScheduleConstant.SAVE_SCHEDULE, schedule: schedule}
}

export function resetScheduleAdjustment() {
  return {type: adjustmentRuleScheduleConstant.RESET_SCHEDULE}
}
