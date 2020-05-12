import React from 'react'
import CheckboxSlider from '../../../parts/form/checkboxSlider'
import operationRuleConstant from '../../../../constants/operationRule'
import triggerConstant from '../../trigger/triggerForm/triggerStepComponent/newLineBaseTriggerStep/newLineBaseTriggerStepConstants'

class NewLineSingleTrigger extends React.Component {
  generateTriggerLabel(trigger) {
    const stepLabels = trigger.triggerSteps.map((step, idx) => {
      const joinCondition = idx > 0 ? step.joinCondition : '      '
      let timeRange = triggerConstant.TIME_RANGE_OPTIONS.find(timeRange => timeRange.value === step.timeRange)
      timeRange = (timeRange.value !== triggerConstant.TIME_RANGE_NONE) ? '[' + timeRange.text + ']' : ''
      let adObject = triggerConstant.AD_OBJECT_OPTIONS.find(object => object.value === step.adObject)
      adObject = '[' + adObject.text + ']'
      let boundaryValue = triggerConstant.TRIGGER_STATUS_OPTIONS.find(object => object.value === step.boundaryValue)=== undefined ?
        triggerConstant.TRIGGER_DELIVERY_STATUS_OPTIONS.find(object => object.value === step.boundaryValue)=== undefined ?step.boundaryValue
          :  triggerConstant.TRIGGER_DELIVERY_STATUS_OPTIONS.find(object => object.value === step.boundaryValue).text
        : triggerConstant.TRIGGER_STATUS_OPTIONS.find(object => object.value === step.boundaryValue).text
      let triggerComparable = [...triggerConstant.AD_PERFORMANCE_OPTIONS, ...triggerConstant.TRIGGER_OTHER_COMPARABLE_OPTIONS, triggerConstant.TRIGGER_COMPARABLE_LINE_ANAA]
        .find(triggerComparable => triggerComparable.value === step.triggerComparable)
      let triggerOperator = [...triggerConstant.TRIGGER_NOT_STATUS_OPERATOR_OPTIONS, ...triggerConstant.TRIGGER_STATUS_OPERATOR_OPTIONS].find(operator => operator.value === step.triggerOperator)
      return [joinCondition.toLowerCase(), timeRange, adObject, triggerComparable.text.toLowerCase(), triggerOperator.text,boundaryValue].join(" ").replace(/ +(?= )/g,'')
    })
    return stepLabels.map((label, index) => {
      return (<div key={index}>{label}</div>)
    })
  }

  render() {
    const { action } = this.props
    return (
      (action.actionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR) ?
        <td className="trigger-label"><a onClick={e => this.props.showTriggerForm(this.props.trigger, this.props.index)}>{this.generateTriggerLabel(this.props.trigger)}</a></td>
      : <tr className={"single-trigger " + (this.props.trigger.status === operationRuleConstant.STATUS_ENABLED ? "" : "gray-line")}>
        <td className="status-cbx">
          <div className= "on-off-style">{this.props.index === 0 ? "ON/OFF" : ""}</div>
          <CheckboxSlider checked={this.props.trigger.status === operationRuleConstant.STATUS_ENABLED} onSwitch={e => this.props.changeTriggerStatus(this.props.index)}/>
        </td>
        <td>{this.props.index === 0 ? "" : "OR"} </td>
        <td className= {"trigger-label " + (this.props.index === 0 ? "top-label" : "")}><a onClick={e => this.props.showTriggerForm(this.props.trigger, this.props.index)}>{this.generateTriggerLabel(this.props.trigger)}</a></td>
        <td className="delete-btn"><span className="glyphicon glyphicon-remove remove" onClick={e => this.props.removeTrigger(this.props.index)}></span></td>
      </tr>
    )
  }
}

export default NewLineSingleTrigger
