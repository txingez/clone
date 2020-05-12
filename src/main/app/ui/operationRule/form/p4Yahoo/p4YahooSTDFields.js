import React from "react";
import operationRuleConstant from "../../../../constants/operationRule";
import translation from "../../../../util/translation";
import {Field} from 'redux-form'
import Select from "../../../parts/form/select";
import P4YahooStdRuleSettingTable from "./p4YahooStdRuleSettingTable"
import {bindActionCreators} from 'redux'
import {updateReportPeriod} from "./p4YahooStdRuleAction";
import {connect} from "react-redux";

class p4YahooSTDFields extends React.Component {

  render() {
    const {action } = this.props
    return(
      <span>
        <div className="half-line">
          <div className="box-line">
            <label className="frequency_label">{translation.t('schedule.label')}</label>
            <div className="schedule">
              <div>{translation.t('schedule.yahoo_std_schedule')}</div>
            </div>
          </div>
        </div>
        <div style={{"clear": "both"}}>
          <div width="100%">
              <P4YahooStdRuleSettingTable action = {action}/>
          </div>
        </div>
      </span>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    reportPeriod: state.p4YahooStdRule.reportPeriod
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateReportPeriod: updateReportPeriod
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(p4YahooSTDFields)
