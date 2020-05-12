import operationRuleConstant from '../../constants/operationRule'
import initialState from '../../../initialState'

export default function operationRuleReducer (operationRule = initialState.operationRule, action) {
  switch (action.type) {
    case operationRuleConstant.CREATE_NEW_RULE:
      return Object.assign({}, initialState.operationRule, {
        operationName: action.defaultOperationRuleName,
        action: Object.assign({}, initialState.operationRule.action, {actionType: action.defaultAction.value, actionObject: action.defaultAction.actionObject})
      })
    case operationRuleConstant.SHOW_OPERATION_RULE_DETAIL:
      return Object.assign({}, action.operationRule, {targetActionPaths: []})
    case operationRuleConstant.SHOW_TARGET_ACTION_PATH_FROM_LINE:
      return Object.assign({}, operationRule, {targetActionPaths: action.data})
    case operationRuleConstant.SET_DEFAULT_FOR_SEARCH_SCOPE:
      return Object.assign({}, operationRule, {searchScope: []})
    case operationRuleConstant.SHOW_JSON_TEXT:
      return Object.assign({}, operationRule, {jsonText: action.text})
    case operationRuleConstant.RESET_ACTION:
      return Object.assign({},operationRule,{action: initialState.operationRule.action })
    case operationRuleConstant.SET_OPERATION_RULE_ID:
      return Object.assign({}, operationRule, {id: action.id})
    default:
      return operationRule
  }
}
