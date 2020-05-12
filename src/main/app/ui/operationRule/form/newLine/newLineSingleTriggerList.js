import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import translation from '../../../../util/translation'
import triggerConstant from '../../../../constants/trigger'
import operationRuleConstant from '../../../../constants/operationRule'
import NewLineSingleTrigger from './newLineSingleTrigger'
import * as triggerAction from '../../trigger/triggerAction'

const createTriggerList = (triggerData, action, showTriggerForm, removeTrigger, changeTriggerStatus) => {
  return triggerData.triggers.map(
    (trigger, index) => {
      return (
        <NewLineSingleTrigger key={index} trigger={trigger} action={action} index={index} showTriggerForm={showTriggerForm}
                              changeTriggerStatus={changeTriggerStatus} removeTrigger={removeTrigger} />
      )
    }
  )
}

class NewLineSingleTriggerList extends React.Component {
  constructor(props) {
    super(props)
  }

  changeTriggerStatus(index) {
    let trigger = Object.assign({}, this.props.triggerData.triggers[index])
    trigger.status = (trigger.status === 'ENABLED' ? 'DISABLED' : 'ENABLED')
    this.props.updateTrigger(Object.assign({}, trigger), index)
  }

  showTriggerForm(trigger, index = -1) {
    this.props.selectTrigger(Object.assign({}, trigger, { index: index }))
  }

  showTriggerByAction(action,triggerData){
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:{
        this.showTriggerForm(triggerConstant.NEW_TRIGGER['LINE_ACOUNT_BUDDET_MONITOR'])
        break;
      }

      case operationRuleConstant.ACTION_TYPE_AD_REMOVE: {
        if (triggerData.triggers.length === 0)
          this.showTriggerForm(triggerConstant.NEW_TRIGGER['LINE_AD_REMOVE'])
        else
          this.showTriggerForm(triggerConstant.NEW_TRIGGER['LINE_AD_REMOVE_SECOND'])
        break;
      }
      case operationRuleConstant.ACTION_TYPE_CTR_AD_START: {
        if (triggerData.triggers.length === 0)
          this.showTriggerForm(triggerConstant.NEW_TRIGGER['LINE_CTR_AD_START'])
        else
          this.showTriggerForm(triggerConstant.NEW_TRIGGER['LINE_CTR_AD_START_SECOND'])
        break;
      }
      default:
        this.showTriggerForm(triggerConstant.NEW_TRIGGER['LINE'])
    }
  }

  maxTriggerNumberByAction(action){
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
        return triggerConstant.MAX_TRIGGER_NUMBER.LINE_BUDGET_MONITOR
      default:
        return triggerConstant.MAX_TRIGGER_NUMBER.LINE
    }

  }


  render() {
    const { action, triggerData, removeTrigger, error } = this.props
    return (
      <div className="min-height-200">
        {error && <div className="error">{error}</div>}
        <label className="trigger-label no-padding-bottom">{translation.t('trigger.label')}</label><span className="symbol-require">*</span>
        <label className={action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF ? "apply-action-only" : "hiding"}>{translation.t('trigger.apply_action_only')}</label>
        <div className={action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF ? "hiding" : ""}>
          <div className="box-line no-padding-top">
            <table>
              <tbody>
              {createTriggerList(triggerData, action, this.showTriggerForm.bind(this), removeTrigger, this.changeTriggerStatus.bind(this))}
              </tbody>
            </table>
          </div>
          <div className="box-line clearfix">
            {triggerData.triggers.length < this.maxTriggerNumberByAction(action)?
              <div className="pull-right"><button type="button" className="btn btn-primary btn-sm plus" onClick={e => this.showTriggerByAction(action,triggerData)}>+</button></div>
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    triggerData: state.triggerData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectTrigger: triggerAction.selectTrigger,
    updateTrigger: triggerAction.updateTrigger,
    removeTrigger: triggerAction.removeTrigger
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLineSingleTriggerList)
