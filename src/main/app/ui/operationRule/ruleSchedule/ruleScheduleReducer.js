import ruleScheduleConstant from '../../../constants/ruleSchedule'
import initialState from '../../../../initialState'
import operationRuleConstant from '../../../constants/operationRule'
import {getDefaultSchedule} from './ruleScheduleUtil'

export default function ruleScheduleReducer (ruleSchedule = initialState.ruleSchedule, action) {
  switch (action.type) {
    case ruleScheduleConstant.SET_VISIBLE_SCHEDULE:
      return Object.assign({}, ruleSchedule, {isVisibleSchedule: action.value})
    case ruleScheduleConstant.SAVE_SCHEDULE:
      if (action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF) {
        return Object.assign({}, ruleSchedule, {campaignOnOffSchedule: action.schedule})
      } else {
        return Object.assign({}, ruleSchedule, {actionEnableSchedule: action.schedule})
      }
    case ruleScheduleConstant.RESET_SCHEDULE:
      return Object.assign({}, {campaignOnOffSchedule: getDefaultSchedule(), actionEnableSchedule: getDefaultSchedule(), isVisibleSchedule: false})
    case operationRuleConstant.CREATE_NEW_RULE:
      return Object.assign({}, {campaignOnOffSchedule: [], actionEnableSchedule: [], isVisibleSchedule: false})
    default:
      return ruleSchedule
  }
}
