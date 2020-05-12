import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import translation from "../../../../util/translation";
import operationRuleConstant from "../../../../constants/operationRule";
import {updateTableByReportPeriod, changeReportPeriod} from "../../../operationRule/form/stdRuleAction"

class ReportPeriodComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeReportPeriod = this.onChangeReportPeriod.bind(this)
  }

  onChangeReportPeriod(e) {
    const media = this.props.selectedAccount ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    const updateValue = e.target.value
    const key = "reports_" + updateValue
    const reportsGet = JSON.parse(localStorage.getItem("reports"))[key]
    const reports = reportsGet ? reportsGet : []
    this.props.changeReportPeriod(updateValue)
    this.props.updateTableByReportPeriod(reports, media)
  }

  render() {
    const {reportColName, reportPeriod} = this.props
    return (
      <div className="report-col-group">
        <div>{reportColName}</div>
        <div>
          {translation.t('report_period.label')}
          <select onChange={this.onChangeReportPeriod.bind(this)}>
            {operationRuleConstant.REPORT_PERIOD_LIST.map(opt => {
              return (<option value={opt.value} selected={opt.value === reportPeriod}>{opt.text}</option>)
            })}
          </select>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedAccount: state.account.selectedAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeReportPeriod: changeReportPeriod,
    updateTableByReportPeriod: updateTableByReportPeriod
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportPeriodComponent)
