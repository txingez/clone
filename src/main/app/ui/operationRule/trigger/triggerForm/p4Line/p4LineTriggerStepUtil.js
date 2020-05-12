import triggerConstant from '../../../../../constants/trigger'

// delete monthly/daily short budget singletriggers
export function getValidSingleTrigger(triggers) {
  return triggers.filter(singleTrigger => singleTrigger.triggerSteps.every(triggerStep =>
    !triggerConstant.TRIGGER_BUDGET_SHORT_STATUS.includes(triggerStep.boundaryValue)))
}

// delete monthly short budget singletriggers
export function getSingleTriggerNoMonthlyBudgetShort(triggers) {
  return triggers.filter(singleTrigger => singleTrigger.triggerSteps.every(triggerStep =>
    !(triggerStep.boundaryValue === triggerConstant.TRIGGER_BUDGET_SHORT_MONTHLY_STATUS)))
}

export function changeTriggerSteps(trigger) {
  for (let i = 0; i < trigger.length; i++) {
    for (let j = 0; j < trigger[i].triggerSteps.length; j++) {
      const boundaryVariable = (trigger[i].triggerSteps[j].boundaryVariable) ? trigger[i].triggerSteps[j].boundaryVariable.variable : ''
      if (triggerConstant.BOUNDARY_VALUE_BUDGET_SHORT.includes(boundaryVariable)) {
        trigger[i].triggerSteps[j].triggerOperator = trigger[i].triggerSteps[j].triggerOperator === triggerConstant.TRIGGER_OPERATOR_GREATER_OR_EQUAL
          ? triggerConstant.TRIGGER_OPERATOR_EQUAL
          : triggerConstant.TRIGGER_OPERATOR_NOT_EQUAL
        trigger[i].triggerSteps[j].boundaryValue = trigger[i].triggerSteps[j].timeRange === triggerConstant.TODAY
          ? "DAILY_BUDGET_SHORT"
          : "MONTHLY_BUDGET_SHORT"
        trigger[i].triggerSteps[j].triggerComparable = triggerConstant.TRIGGER_COMPARABLE_STATUS
        trigger[i].triggerSteps[j].timeRange = triggerConstant.TIME_RANGE_NONE
        trigger[i].triggerSteps[j].costRateParam = Math.round(trigger[i].triggerSteps[j].boundaryVariable.rate * 100)
      }
    }
  }
  return trigger
}
