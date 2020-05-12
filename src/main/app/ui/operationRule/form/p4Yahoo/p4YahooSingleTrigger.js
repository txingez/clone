import React from 'react'
import CheckboxSlider from '../../../parts/form/checkboxSlider'
import operationRuleConstant from '../../../../constants/operationRule'
import translation from '../../../../util/translation'
import triggerConstant from "../../../../constants/trigger";

class P4YahooSingleTrigger extends React.Component {
  generateTriggerLabel(trigger) {
    let triggerStepsLine1 = trigger.triggerSteps[0]
    let triggerStepsLine3 = trigger.triggerSteps[1]
    return (<div className = "yahoo-trigger">
      <div>{translation.t('trigger.yahoo.fixed_show_trigger_line_1')} {triggerStepsLine1.boundaryValue} {translation.t('trigger.ANAA_tail_label')}</div>
      <div>{translation.t('trigger.yahoo.fixed_show_trigger_line_2_part_1')}</div>
      <div>{translation.t('trigger.yahoo.fixed_show_trigger_line_2_part_2')}</div>
      <div>AND {translation.t('trigger.yahoo.fixed_show_trigger_line_3')}</div>
      <div>AND {translation.t('trigger.yahoo.fixed_label_trigger_line_4')}</div>
    </div>)
  }

  generateBudgetMonitorTriggerLabel(trigger) {
    let triggerStepsLine1 = trigger.triggerSteps[0]
    return (<div className = "yahoo-trigger">
      <div>{translation.t('trigger.yahoo.fixed_show_account_budget_monitor_trigger')} {triggerStepsLine1.boundaryValue}</div>
    </div>)
  }

  generateIncreaseDecreaseAdBidLabel(trigger) {
    const stepLabels = trigger.triggerSteps.map((step, idx) => {
    const joinCondition = idx > 0 ? step.joinCondition : '      '
    let timeRange = triggerConstant.TIME_RANGE_OPTIONS['YAHOO'].find(timeRange => timeRange.value === step.timeRange)
    timeRange = (timeRange.value !== triggerConstant.TIME_RANGE_NONE) ? '[' + timeRange.text + ']' : ''
    let adObject = triggerConstant.AD_OBJECT_OPTIONS['INCREASE_DECREASE_YAHOO_AD_OBJECT'].find(object => object.value === step.adObject)
    adObject = '[' + adObject.text + ']'
    let boundaryValue = step.boundaryValue
    let triggerComparable = [...triggerConstant.AD_PERFORMANCE_OPTIONS['YAHOO'], triggerConstant.TRIGGER_COMPARABLE_YAHOO_AVERAGE_DELIVER_RANK,
      triggerConstant.TRIGGER_COMPARABLE_YAHOO_ANAA].find(triggerComparable => triggerComparable.value === step.triggerComparable)
    let triggerOperator = triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS.find(operator => operator.value === step.triggerOperator)
    return [joinCondition.toLowerCase(), timeRange, adObject, triggerComparable.text.toLowerCase(), triggerOperator.text,boundaryValue].join(" ").replace(/ +(?= )/g,'')
    })
    return stepLabels.map((label, index) => {
      return (<div key={index}>{label}</div>)
    })
  }

  generateBudgetMonitorTriggerLabelByAction(action, trigger) {
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
        return this.generateBudgetMonitorTriggerLabel(trigger)
      case operationRuleConstant.ACTION_TYPE_AD_OFF:
        return this.generateTriggerLabel(trigger)
      case operationRuleConstant.ACTION_TYPE_INCREASE_AD_BID: case operationRuleConstant.ACTION_TYPE_DECREASE_AD_BID:
      case operationRuleConstant.ACTION_TYPE_CAMPAIGN_ON: case operationRuleConstant.ACTION_TYPE_CAMPAIGN_OFF:
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_ON: case operationRuleConstant.ACTION_TYPE_ACCOUNT_OFF:
      case operationRuleConstant.ACTION_TYPE_AD_GROUP_ON: case operationRuleConstant.ACTION_TYPE_AD_GROUP_OFF:
      case operationRuleConstant.ACTION_TYPE_AD_ON:
        return this.generateIncreaseDecreaseAdBidLabel(trigger)
      default:
        return null
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
        this.generateBudgetMonitorTriggerLabelByAction(action, this.props.trigger)
      }</a></td>
      {(action.actionType === operationRuleConstant.ACTION_TYPE_INCREASE_AD_BID || action.actionType === operationRuleConstant.ACTION_TYPE_DECREASE_AD_BID) ?
        <td className="delete-btn"><span className="glyphicon glyphicon-remove remove" onClick={e => this.props.removeTrigger(this.props.index)}></span></td>
        : null
      }
      </tr>
    )
  }
}

export default P4YahooSingleTrigger

