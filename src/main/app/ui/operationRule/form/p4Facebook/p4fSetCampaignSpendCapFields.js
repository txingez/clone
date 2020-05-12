import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {formValueSelector, Field} from "redux-form"
import {updateTargetCampaign, updatePreviousCost} from "./p4fCampaignDataAction"
import TimeRangeDatePicker from "../../form/timeRangeDatePicker/timeRangeDatePicker"
import translation from '../../../../util/translation'
import DateUtil from "../../../../util/date"
import moment from "moment"
import TextInputNoHelpBlock from "../../../parts/form/textInputNoHelpBlock"
import TextInput from "../../../parts/form/textInput"
import Validation from "../../../parts/form/validation"
import operationRuleConstant from "../../../../constants/operationRule";
import {getClosedDateConfig, getSpendCapValue} from "./p4fSetCampaignSpendCapUtil"
import CurrencyUtil from '../../../../util/currency'

class P4FSetCampaignSpendCapFields extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  clearClosedDate() {
    this.props.updateTargetCampaign(Object.assign({}, this.props.targetCampaign, {
        costUntilClosedDate: "",
        previousClosedDate: ""
    }))
  }

  onChangeClosedDate(e) {
    this.updateCampaignCost(this.props.targetCampaign.campaignId, DateUtil.convertDateByFormat(e, "YYYY/MM/DD"))

  }

  updateCampaignCost(campaignId, closedDate) {
    if (campaignId && closedDate) {
      let targetCampaignId = typeof campaignId === "string" ? campaignId : campaignId.value
      let targetCampaign = this.props.campaigns.find((campaign) => {return campaign.campaignId === targetCampaignId})
      this.props.updatePreviousCost(
        campaignId,
        targetCampaign.startDate,
        closedDate
      )
    }
  }

  render() {
    const {targetCampaign} = this.props
    const campaignStartDate = targetCampaign ? targetCampaign.startDate : ""
    const costUntilClosedDate = targetCampaign ? parseFloat(targetCampaign.costUntilClosedDate) : ""
    const closedDateConfig = getClosedDateConfig(campaignStartDate)
    const currentMonthCost = (targetCampaign && targetCampaign.currentMonthCost) ? parseInt(targetCampaign.currentMonthCost) : ""
    const currencyOptions = (this.props.selectedAccount && this.props.selectedAccount.currency) ?
      operationRuleConstant.ACTION_UNIT_INDICATE[this.props.selectedAccount.currency] : operationRuleConstant.ACTION_UNIT_INDICATE['JPY']
    return (
      <div style={{"clear": "both"}}>
        <div className="full-line">
          <ul className="list-inline" style={{"display": "inline-block"}}>
            <li className="float-left">
              <label>{translation.t('spend_cap.previous_month_cost_label')}</label>
              <div className="box-line">
                <Field name={"extension.targetCampaign.costUntilClosedDate"} component={TextInputNoHelpBlock} disabled={true} type={"text"} />
              </div>
            </li>
            <li className="float-left">
              <label>&nbsp;</label>
              <div className="box-line spend-cap-symbol">+</div>
            </li>
            <li className="float-left">
              <label>{translation.t('spend_cap.this_month_cost_label')}<span className="symbol-require">*</span></label>
              <div className="box-line">
                {this.props.account.isSetSpendCapRule === true ?
                  <div>
                    <Field name={"extension.targetCampaign.currentMonthCost"} component={TextInput}/>
                  </div>
                  :
                  <Field name={"extension.targetCampaign.currentMonthCost"} component={TextInput}
                         validate={[Validation.requireCustomMsg(translation.t("spend_cap.cost_this_month_not_empty")), Validation.isOnlyDigitNumber, Validation.greaterThanZero, Validation.maxLength(10, ""), Validation.actionValueLimit]}/>
                }
              </div>
            </li>
            <li className="float-left">
              <label>&nbsp;</label>
              <div className="box-line spend-cap-symbol">=</div>
            </li>
            <li className="float-left">
              <label>{translation.t('spend_cap.spend_cap_value_label')}</label>
              <div className="box-line">
                <input className="form-control" type="text" value={getSpendCapValue(costUntilClosedDate, currentMonthCost)} disabled={true} />
              </div>
            </li>
            <li className="float-left">
              <label>&nbsp;</label>
              <div className="box-line spend-cap-symbol">{currencyOptions[0].text}</div>
            </li>

          </ul>
          <div>
            <b> {translation.t('spend_cap.current_spend_cap_lower_limit_label_head')}<span className="cost">{this.props.spendCapLowerLimit[this.props.selectedAccount.currency]}</span>
              {CurrencyUtil.replaceCurrencyLetter(translation.t('spend_cap.current_spend_cap_lower_limit_label_tail'), this.props.selectedAccount.currency)} </b>
          </div>
          <br></br>
        </div>
        <div className="half-line">
          <div className="half-line">
            <label>{translation.t("spend_cap.start_date_label")}</label>
            <div className="box-line">
              <Field name={"extension.targetCampaign.startDate"} component={TextInputNoHelpBlock} disabled={true} type={"text"} />
            </div>
          </div>
          <div className="box-clean"></div>
          <TimeRangeDatePicker name={"schedule.executionDate"} label={translation.t("schedule.set_spend_cap_date_label")} required={true}
             minDate={moment().add(1, 'd')} maxDate={moment().add(2, 'M').endOf('M')} />
          <div className="box-clean"></div>
        </div>
        <div className="half-line">
          <TimeRangeDatePicker name={"extension.targetCampaign.previousClosedDate"} label={translation.t("spend_cap.closed_date_label")}
             disabled={closedDateConfig.disabled} required={closedDateConfig.isRequired}
             clearable={!closedDateConfig.isRequired && !closedDateConfig.disabled} onClear={this.clearClosedDate.bind(this)} validate={closedDateConfig.isRequired ? [Validation.require("")] : []}
             minDate={closedDateConfig.minDate} maxDate={closedDateConfig.maxDate} onChange={this.onChangeClosedDate.bind(this)}/>
        </div>
        <div className="box-clean"></div>
      </div>

    )
  }
}

const selector = formValueSelector('operationRuleForm')

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
    selectedAccount: state.account.selectedAccount,
    ruleList: state.ruleList,
    costToday: state.p4fCampaignData.costToday,
    spendCapLowerLimit: state.p4fCampaignData.spendCapLowerLimit,
    targetCampaign: selector(state, "extension.targetCampaign"),
    executionDate: selector(state, "schedule.executionDate")
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateTargetCampaign: updateTargetCampaign,
    updatePreviousCost: updatePreviousCost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4FSetCampaignSpendCapFields)
