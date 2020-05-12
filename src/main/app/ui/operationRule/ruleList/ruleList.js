import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as operationRuleAction from '../operationRuleAction'
import * as ruleListAction from './ruleListAction'
import translation from '../../../util/translation'
import ReactTooltip from 'react-tooltip'
import {convertMedia} from "../../../util/url";
import CheckboxSlider from "../../parts/form/checkboxSlider";
import * as modalAction from "../../modal/modalAction";
import operationRuleConstants from '../../../constants/operationRule'
import {refreshCopyPaste} from '../form/p4Yahoo/p4YahooStdRuleAction'

class RuleList extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.checkChangeData = this.checkChangeData.bind(this)
    this.viewOperationRule = this.viewOperationRule.bind(this)
  }

  componentDidMount() {
    localStorage.removeItem('rule')
    $(window).bind("beforeunload", function (event) {
      return "You have some unsaved changes";
    });
  }

  /*
    Feature: Warning when user edits rle but not saving
    - Get rule that is stored in browser's localStorage
    - Remote submit OperationRule Form to call handle submit function in OperationRule Page
   */

  checkChangeData(operationRuleId, index) {
    this.props.checkChangeRule(
      localStorage.getItem('rule'),
      this.props.ruleInputInterface.formName,
      () => this.viewOperationRule(operationRuleId, index)
    )
  }

  viewOperationRule(operationRuleId, index) {
    this.props.refreshCopyPaste()
    this.props.setSelectedRuleIndex(index)
    this.props.loadOperationRule(operationRuleId, index, this.props.selectedAccount)
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" +
      convertMedia(this.props.selectedAccount.media) + "/" + this.props.selectedAccount.mediaAccountId + "/rules/" + operationRuleId)
  }

  changeStatusRule(index, rule) {
    this.viewOperationRule(rule.id, index)
    setTimeout(
      () => {
        this.props.showConfirm(translation.t('modal.confirm_change_status_rule_list'), this.props.changeStatus.bind(this, index, rule.id, rule.status))
      },
    20)
  }


  createRuleList() {
    return this.props.ruleList.rules.map((rule, index) => {
      return (
        <li data-place="right" data-tip={rule.operationName} key={index}
            className={this.props.ruleList.selectedRuleIndex == index ? "selected row" : "row"}>
          {
            (!operationRuleConstants.YAHOO_STD_ACTION.includes(rule.actionType) &&
            !operationRuleConstants.RULES_USE_STD_RULE_FORM.includes(rule.actionType)) ?
              <CheckboxSlider checked={rule.status === "ENABLED"} onSwitch={e => this.changeStatusRule(index, rule)}
                              className="col-md-1 newSwitch"/>
            : null
          }
          <span className="col-md-10" onClick={e => this.checkChangeData(rule.id, index)}>{rule.operationName}</span>
          <ReactTooltip delayHide={100} effect="solid"/>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={"account-filter-page " + (this.props.ruleList.isDisplayRuleList ? "" : "hiding")}>
        <div className={"panel panel-default " + (this.props.ruleInputInterface.isShowForm ? "" : "resize")}>
          <div className="panel-heading">
            <b>{translation.t('rule_list.label')}</b>
            <br/>
            <b className="account-name">アカウント名:&ensp;
              {this.props.selectedAccount ? this.props.selectedAccount.accountName : ""}</b>
          </div>
          <div className={"panel-body " + (!this.props.ruleInputInterface.isEdit ? "rule-list-disable" : "")}>
            <ul className="list-unstyled rule-list">
              {this.createRuleList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    operationRule: state.operationRule,
    selectedAccount: state.account.selectedAccount,
    ruleList: state.ruleList,
    ruleInputInterface: state.ruleInputInterface,
    account: state.account,
    ruleStatus: state.ruleList.ruleStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setSpendCapFlag: operationRuleAction.setSpendCapFlag,
    loadOperationRule: operationRuleAction.loadOperationRule,
    setSelectedRuleIndex: ruleListAction.setSelectedRuleIndex,
    remoteHandleSubmit: operationRuleAction.remoteSubmitOperationRuleForm,
    checkChangeRule: operationRuleAction.checkChangeRule,
    showConfirm: modalAction.showConfirm,
    changeStatus: ruleListAction.callAjaxChangeStatus,
    refreshCopyPaste: refreshCopyPaste
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RuleList)
