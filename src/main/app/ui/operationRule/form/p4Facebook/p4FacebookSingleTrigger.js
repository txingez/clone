import React from 'react'
import CheckboxSlider from '../../../parts/form/checkboxSlider'
import operationRuleConstant from '../../../../constants/operationRule'
import translation from '../../../../util/translation'
import triggerConstant from "../../trigger/triggerForm/triggerStepComponent/p4FacebookBaseTriggerStep/p4FacebookBaseTriggerStepConstants"

class P4FacebookSingleTrigger extends React.Component {

  generateCampaignBudgetAdjustmentLabel(trigger) {
    const stepLabels = trigger.triggerSteps.map((step, idx) => {
      const joinCondition = idx > 0 ? step.joinCondition : '      '
      let timeRange = triggerConstant.TIME_RANGE_AD_REMOVE_OPTIONS().find(timeRange => timeRange.value === step.timeRange)
      timeRange = (timeRange.value !== triggerConstant.TIME_RANGE_NONE) ? '[' + timeRange.text + ']' : ''
      let adObject = triggerConstant.AD_OBJECT_OPTIONS_FULL.find(object => object.value === step.adObject)
      adObject = '[' + adObject.text + ']'
      let boundaryValue = triggerConstant.TRIGGER_STATUS_OPTIONS.find(object => object.value === step.boundaryValue)=== undefined ?
        step.boundaryValue : triggerConstant.TRIGGER_STATUS_OPTIONS.find(object => object.value === step.boundaryValue).text
      let triggerComparable = [...triggerConstant.AD_PERFORMANCE_OPTIONS,...triggerConstant.TRIGGER_AD_REMOVE_STATUS_OPTIONS].find(triggerComparable => triggerComparable.value === step.triggerComparable)
      let triggerOperator = [...triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS, ...triggerConstant.TRIGGER_STATUS_OPERATOR_OPTIONS].find(operator => operator.value === step.triggerOperator)
      return [joinCondition.toLowerCase(), timeRange, adObject, triggerComparable.text.toLowerCase(), triggerOperator.text,boundaryValue].join(" ")
    })
    return stepLabels.map((label, index) => {
      return (<div key={index}>{label}</div>)
    })
  }

  generateAdRemoveLabel(trigger, actionType) {
    let triggerStatusComparable = actionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE ? triggerConstant.TRIGGER_AD_REMOVE_STATUS_OPTIONS :triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS

    const stepLabels = trigger.triggerSteps.map((step, idx) => {
      const joinCondition = idx > 0 ? step.joinCondition : '      '
      let timeRange = triggerConstant.TIME_RANGE_AD_REMOVE_OPTIONS().find(timeRange => timeRange.value === step.timeRange)
      timeRange = (timeRange.value !== triggerConstant.TIME_RANGE_NONE) ? '[' + timeRange.text + ']' : ''
      let adObject = triggerConstant.AD_OBJECT_OPTIONS_FULL.find(object => object.value === step.adObject)
      adObject = '[' + adObject.text + ']'
      let boundaryValue = triggerConstant.TRIGGER_STATUS_OPTIONS.find(object => object.value === step.boundaryValue)=== undefined ?
        step.boundaryValue : triggerConstant.TRIGGER_STATUS_OPTIONS.find(object => object.value === step.boundaryValue).text
      let triggerComparable = [...triggerConstant.AD_PERFORMANCE_OPTIONS,...triggerStatusComparable].find(triggerComparable => triggerComparable.value === step.triggerComparable)
      let triggerOperator = [...triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS, ...triggerConstant.TRIGGER_STATUS_OPERATOR_OPTIONS].find(operator => operator.value === step.triggerOperator)
      return [joinCondition.toLowerCase(), timeRange, adObject, triggerComparable.text.toLowerCase(), triggerOperator.text,boundaryValue].join(" ")
    })
    return stepLabels.map((label, index) => {
      return (<div key={index}>{label}</div>)
    })
  }

  generateTriggerLabelByAction(action, trigger) {
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_AD_REMOVE: return this.generateAdRemoveLabel(trigger, action.actionType)
      default: return this.generateCampaignBudgetAdjustmentLabel(trigger)
    }
  }

  render() {
    const { action } = this.props
    return (
      <tr className={"single-trigger " + (this.props.trigger.status === operationRuleConstant.STATUS_ENABLED ? "" : "gray-line")}>
        {action.actionType !== operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR ?
          <td className="status-cbx"><CheckboxSlider checked={this.props.trigger.status === operationRuleConstant.STATUS_ENABLED} onSwitch={e => this.props.changeTriggerStatus(this.props.index)}/></td>
          : null
        }
        <td>{this.props.index === 0 ? "" : "OR"} </td>
        <td className="trigger-label"><a onClick={e => this.props.showTriggerForm(this.props.trigger, this.props.index)}>{
          this.generateTriggerLabelByAction(action, this.props.trigger)
        }</a></td>
        {
          <td className="delete-btn"><span className="glyphicon glyphicon-remove remove" onClick={e => this.props.removeTrigger(this.props.index)}></span></td>
        }
      </tr>
    )
  }
}

export default P4FacebookSingleTrigger

