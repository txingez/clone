import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import translation from '../../../../util/translation'
import triggerConstant from '../../../../constants/trigger'
import operationRuleConstant from '../../../../constants/operationRule'
import P4FacebookSingleTrigger from './p4FacebookSingleTrigger'
import * as triggerAction from '../../trigger/triggerAction'

const createTriggerList = (triggerData, action, showTriggerForm, removeTrigger, changeTriggerStatus) => {
  return triggerData.triggers.map(
    (trigger, index) => {
      return (
        <P4FacebookSingleTrigger key={index} trigger={trigger} action={action} index={index} showTriggerForm={showTriggerForm}
                              changeTriggerStatus={changeTriggerStatus} removeTrigger={removeTrigger} />
      )
    }
  )
}

class P4FacebookSingleTriggerList extends React.Component {
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

  showTriggerByAction(action){
    switch(action.actionType){
      case operationRuleConstant.ACTION_TYPE_AD_REMOVE: {
       this.showTriggerForm(operationRuleConstant.FB_AD_REMOVE_BASE_TRIGGER)
       break
      }
      default:this.showTriggerForm(triggerConstant.NEW_TRIGGER['FACEBOOK_CAMPAIGN_ONLY'])
    }
  }

  maxTriggerNumberByAction(action){
    switch (action.actionType) {
      default:
        return triggerConstant.MAX_TRIGGER_NUMBER.FACEBBOOK

    }
  }

  render() {
    const { action, triggerData, removeTrigger, error } = this.props
    return (
      <div className="min-height-200">
        {error !== translation.t('please_set_campaign_budget_adjustment_schedule') ? <div className="error">{error}</div> : null}
        <label className="trigger-label">{translation.t('trigger.label')}</label><span className="symbol-require">*</span>
        <br />
        <label className={!operationRuleConstant.ACTION_TYPE_FACEBOOK_NOT_HOURLY.includes(action.actionType) ? "apply-action-only" : "hiding"}>{translation.t('schedule.campaign_budget_adjust')}</label>
        <div className={!operationRuleConstant.ACTION_TYPE_FACEBOOK_NOT_HOURLY.includes(action.actionType) ? "hiding" : ""}>
          <div className="box-line">
            <table>
              <tbody>
              {createTriggerList(triggerData, action, this.showTriggerForm.bind(this), removeTrigger, this.changeTriggerStatus.bind(this))}
              </tbody>
            </table>
          </div>
          <div className="box-line clearfix">
            {triggerData.triggers.length < this.maxTriggerNumberByAction(action)?
              <div className="pull-right"><button type="button" className="btn btn-primary btn-sm plus" onClick={e => this.showTriggerByAction(action)}>+</button></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(P4FacebookSingleTriggerList)
