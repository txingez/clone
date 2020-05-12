import React from "react"
import * as ruleScheduleAction from "../ruleSchedule/ruleScheduleAction";
import {bindActionCreators} from "redux";
import operationRuleConstant from "../../../constants/operationRule"
import {connect} from "react-redux";
import {getScheduleLinkLabel} from "../ruleSchedule/ruleScheduleUtil";
import translation from '../../../util/translation'
import * as adjustmentRuleAction from "../budgetAdjustment/adjustmentRuleScheduleAction";

class Schedule extends React.Component {

  showSchedule() {
    const { media, action } = this.props
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.YAHOO:{
        if (action.actionType === operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET) {
          this.props.setVisibleScheduleAdjustment(true)
        } else {
          this.props.setVisibleSchedule(true)
        }
        break
      }
      default:
        this.props.setVisibleSchedule(true)
    }
  }

  getComponentByMedia() {
    const { media, action, error } = this.props
    const scheduleLabel = getScheduleLinkLabel(this.props.ruleSchedule, action, media)
    return (
      <div className="box-line">
        <label className="frequency_label">{translation.t('schedule.label')}</label>
      {error === translation.t('please_set_campaign_budget_adjustment_schedule') ? <div className="error">{error}</div> : null}
        <div className="schedule">
          {(action.actionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR) ?
            <div>{scheduleLabel}</div> : <a onClick={this.showSchedule.bind(this)}>{scheduleLabel}</a>}
        </div>
      </div>
    )
  }
  render() {
    return(<div>{this.getComponentByMedia()}</div>)
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    ruleSchedule: state.ruleSchedule
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVisibleSchedule: ruleScheduleAction.setVisibleSchedule,
    setVisibleScheduleAdjustment: adjustmentRuleAction.setVisibleSchedule
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
