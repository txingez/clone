import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import translation from '../../../../util/translation'
import triggerConstant from '../../../../constants/trigger'
import operationRuleConstant from '../../../../constants/operationRule'
import P4YahooSingleTrigger from './p4YahooSingleTrigger'
import * as triggerAction from '../../trigger/triggerAction'

const createTriggerList = (triggerData, action, showTriggerForm, removeTrigger, changeTriggerStatus) => {
  return triggerData.triggers.map(
    (trigger, index) => {
      return (
        <P4YahooSingleTrigger key={index} trigger={trigger} action={action} index={index}
                              showTriggerForm={showTriggerForm}
                              changeTriggerStatus={changeTriggerStatus} removeTrigger={removeTrigger}/>
      )
    }
  )
}

class P4YahooSingleTriggerList extends React.Component {
  constructor(props) {
    super(props)
  }

  changeTriggerStatus(index) {
    let trigger = Object.assign({}, this.props.triggerData.triggers[index])
    trigger.status = (trigger.status === 'ENABLED' ? 'DISABLED' : 'ENABLED')
    this.props.updateTrigger(Object.assign({}, trigger), index)
  }

  showTriggerForm(trigger, index = -1) {
    this.props.selectTrigger(Object.assign({}, trigger, {index: index}))
  }

  showTriggerByAction(action) {
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
        this.showTriggerForm(triggerConstant.NEW_TRIGGER['YAHOO_ACOUNT_BUDDET_MONITOR'])
        break
      case operationRuleConstant.ACTION_TYPE_AD_OFF:
        this.showTriggerForm(triggerConstant.NEW_TRIGGER['YAHOO_AD_OFF'])
        break
      default:
        this.showTriggerForm(triggerConstant.NEW_TRIGGER['YAHOO_INCREASE_DECREASE_AD_BID'])
        break
    }
  }

  maxTriggerNumberByAction(action) {
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_INCREASE_AD_BID:
      case operationRuleConstant.ACTION_TYPE_DECREASE_AD_BID:
      case operationRuleConstant.ACTION_TYPE_CAMPAIGN_ON:
      case operationRuleConstant.ACTION_TYPE_CAMPAIGN_OFF:
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_ON:
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_OFF:
      case operationRuleConstant.ACTION_TYPE_AD_GROUP_ON:
      case operationRuleConstant.ACTION_TYPE_AD_GROUP_OFF:
      case operationRuleConstant.ACTION_TYPE_AD_ON:
        return triggerConstant.MAX_TRIGGER_NUMBER.YAHOO_INCREASE_DECREASE_AD_BID
      default:
        return triggerConstant.MAX_TRIGGER_NUMBER.YAHOO

    }
  }

  render() {
    const {action, triggerData, removeTrigger, error} = this.props
    return (
      <div className="min-height-200">
        {error !== translation.t('please_set_campaign_budget_adjustment_schedule') ?
          <div className="error">{error}</div> : null}
        <label className="trigger-label">{translation.t('trigger.label')}</label><span
        className="symbol-require">*</span>
        <br/>
        <label
          className={action.actionType === operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET ? "apply-action-only" : "hiding"}>{translation.t('schedule.campaign_budget_adjust')}</label>
        <div className={action.actionType === operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET ? "hiding" : ""}>
          <div className="box-line">
            <table>
              <tbody>
              {createTriggerList(triggerData, action, this.showTriggerForm.bind(this), removeTrigger, this.changeTriggerStatus.bind(this))}
              </tbody>
            </table>
          </div>
          <div className="box-line clearfix">
            {triggerData.triggers.length < this.maxTriggerNumberByAction(action) ?
              <div className="pull-right">
                <button type="button" className="btn btn-primary btn-sm plus"
                        onClick={e => this.showTriggerByAction(action)}>+
                </button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(P4YahooSingleTriggerList)
