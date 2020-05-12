import ruleInputInterfaceConstant from '../../constants/ruleInputInterface'
import operationRuleConstant from '../../constants/operationRule'
import initialState from '../../../initialState'

export default function ruleInputInterfaceReducer (ruleInputInterface = initialState.ruleInputInterface, action) {
  switch (action.type) {
    case ruleInputInterfaceConstant.SET_IS_EDIT:
      return Object.assign({}, initialState.ruleInputInterface, {isEdit: action.isEdit})
    case ruleInputInterfaceConstant.SET_SHOW_STD_CREATE_FORM:
      return Object.assign({},initialState.ruleInputInterface,{
        isEdit: false,
        isShowForm: true,
        formName: operationRuleConstant.FORM_NAME.STD_RULE_FORM})
    case operationRuleConstant.CREATE_NEW_RULE:
      return Object.assign({}, initialState.ruleInputInterface, {isEdit: false, isShowForm: true})
    case operationRuleConstant.SHOW_OPERATION_RULE_DETAIL:
      return Object.assign({}, initialState.ruleInputInterface, {isEdit: true, isShowForm: true})
    case operationRuleConstant.SET_SHOW_RULE_FORM:
      return Object.assign({}, ruleInputInterface, {isShowForm: action.isShow})
    case ruleInputInterfaceConstant.SET_FORM:
      return Object.assign({}, ruleInputInterface, {formName: action.formName})
    default:
      return ruleInputInterface
  }
}
