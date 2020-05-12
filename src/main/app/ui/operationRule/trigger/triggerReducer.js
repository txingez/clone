import triggerConstant from '../../../constants/trigger'
import operationRuleConstant from '../../../constants/operationRule'
import initialState from '../../../../initialState'
import {processTriggers} from '../../operationRule/form/operationRuleUtil'

export default function triggerReducer (triggerData = initialState.triggerData, action) {
  switch (action.type) {
    case operationRuleConstant.CREATE_NEW_RULE:
      return Object.assign({}, operationRuleConstant.DEFAULT_TRIGGER_DATA)
    case triggerConstant.SELECT_TRIGGER:
      return Object.assign({}, triggerData, {selectedTrigger: action.trigger, isShowTriggerForm: true})
    case triggerConstant.ADD_NEW_TRIGGER:
      return Object.assign({}, triggerData, {triggers: [...triggerData.triggers, action.trigger]})
    case triggerConstant.UPDATE_TRIGGER: {
      let triggers = [...triggerData.triggers]
      triggers[action.index] = action.trigger
      return Object.assign({}, triggerData, {triggers: triggers})
    }
    case triggerConstant.UPDATE_VALID_TRIGGERS:{
      return Object.assign({}, triggerData, {triggers: action.triggers})
    }
    case triggerConstant.REMOVE_TRIGGER: {
      let triggers = [...triggerData.triggers]
      triggers.splice(action.index, 1)
      return Object.assign({}, triggerData, {triggers: triggers})
    }
    case triggerConstant.SET_SHOW_TRIGGER_FORM:
      return Object.assign({}, triggerData, {isShowTriggerForm: action.value})
    case triggerConstant.SHOW_TRIGGER:
      return processTriggers(action.trigger)
    case triggerConstant.RESET_TRIGGER:
      return Object.assign({}, triggerData, {triggers: []})
    default:
      return triggerData
  }
}
