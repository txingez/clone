import initialState from '../../../../initialState'
import adjustmentRuleConstant from '../../../constants/adjustmentRuleSchedule'
import operationRuleConstant from '../../../constants/operationRule'

export default function adjustmentRuleScheduleReducer ( adjustmentRule = initialState.adjustmentRuleSchedule, action) {
  switch (action.type) {
    case adjustmentRuleConstant.SET_VISIBLE_SCHEDULE_ADJUSTMENT:
      return Object.assign({}, adjustmentRule, {isVisibleSchedule: action.value})
    case adjustmentRuleConstant.SAVE_SCHEDULE:
      return Object.assign({}, adjustmentRule, {adjustmentSchedule: action.schedule})
    case adjustmentRuleConstant.RESET_SCHEDULE:
      return Object.assign({}, adjustmentRule, {adjustmentSchedule: [], isVisibleSchedule: false})
    case operationRuleConstant.CREATE_NEW_RULE:
      return Object.assign({}, adjustmentRule, {adjustmentSchedule: [], isVisibleSchedule: false})
    default:
      return adjustmentRule
  }
}
