import ruleInputInterfaceConstant from '../../constants/ruleInputInterface'
import operationRuleConstant from "../../constants/operationRule";

export function setIsEdit(isEdit) {
  return {type: ruleInputInterfaceConstant.SET_IS_EDIT, isEdit: isEdit}
}

export function setShowRuleForm(isShow) {
  return { type: ruleInputInterfaceConstant.SET_SHOW_RULE_FORM, isShow }
}

export function setForm(actionType) {
  const formName = (operationRuleConstant.RULES_USE_STD_RULE_FORM.includes(actionType))
    ? operationRuleConstant.FORM_NAME.STD_RULE_FORM
    : operationRuleConstant.FORM_NAME.SIMPLE_RULE_FORM
  return { type: ruleInputInterfaceConstant.SET_FORM, formName}
}

export function setShowSTDCreatForm() {
  return {type: ruleInputInterfaceConstant.SET_SHOW_STD_CREATE_FORM}
}
