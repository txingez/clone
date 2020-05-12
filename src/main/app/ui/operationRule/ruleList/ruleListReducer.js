import ruleListConstant from '../../../constants/ruleList'
import initialState from '../../../../initialState'

export default function ruleListReducer(ruleList = initialState.ruleList, action) {
  switch (action.type) {
    case ruleListConstant.UPDATE_RULE_LIST:
      return Object.assign({}, ruleList, {rules: action.rules})
    case ruleListConstant.SHOW_RULE_LIST:
      return Object.assign({}, ruleList, {isDisplayRuleList: true})
    case ruleListConstant.SET_SELECTED_RULE_INDEX:
      return Object.assign({}, ruleList, {selectedRuleIndex: action.index})
    case ruleListConstant.CHANGE_RULE_STATUS: {
      const listToChange = ruleList.rules
      const elementOfListToChange = listToChange[action.index]
      const newList = Object.assign({}, ruleList,
        {
        rules: [
          ...listToChange.slice(0, action.index),
          Object.assign({}, elementOfListToChange, {status: elementOfListToChange.status === "ENABLED" ? "DISABLED" : "ENABLED"}),
          ...listToChange.slice(action.index + 1, listToChange.length)]})
      return newList }
    default:
      return ruleList
  }
}
