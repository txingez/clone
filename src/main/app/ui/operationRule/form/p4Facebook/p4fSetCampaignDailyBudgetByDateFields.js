import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TimeRangeDatePicker from "../../form/timeRangeDatePicker/timeRangeDatePicker"
import translation from '../../../../util/translation'
import moment from 'moment'
import {convertToUSD} from "./p4fSetCampaignSpendCapUtil"
import CurrencyUtil from '../../../../util/currency'

class P4FSetCampaignDailyBudgetByDateFields extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {action, onChangeCampaign} = this.props
    return (
      <div>
        <div className="box-clean"> <b>{translation.t('sum_of_minimum_spending_amount')}({this.props.adSet.number} &nbsp; adSets): &nbsp;
          <span className="cost">{this.props.selectedAccount.currency==='USD'?convertToUSD(this.props.adSet.totalMinCost):this.props.adSet.totalMinCost}</span> &nbsp; { CurrencyUtil.getCurrencyLetter(this.props.selectedAccount.currency) }</b></div> <br></br>
        <div className="half-line ">
          <TimeRangeDatePicker name={"schedule.executionDate"} required={true}
                               label={translation.t("schedule.indicate_cpn_daily_budget_date_label")}
                               defaultValue={moment().add(1, 'M').startOf('M')}
          />
        </div>
        <div className="box-clean"></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ruleList: state.ruleList,
    adSet: state.p4fCampaignData.adSet,
    selectedAccount: state.account.selectedAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4FSetCampaignDailyBudgetByDateFields)
