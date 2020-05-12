import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as operationRuleAction from '../operationRuleAction'
import * as accountAction from '../account/accountAction'
import translation from '../../../util/translation'
import * as ruleListAction from '../ruleList/ruleListAction'
import operationRuleConstant from "../../../constants/operationRule"
import * as triggerAction from '../trigger/triggerAction'
import createFilterOptions from "react-select-fast-filter-options"
import Select from "react-virtualized-select"
import {CustomTokenizer} from '../../../util/customTokenizer'
import * as ruleInputInterfaceAction from '../ruleInputInterfaceAction'
import {convertMedia} from "../../../util/url"
import {
  updateActionType,
  updateStdRuleName,
  createNewStdRule,
  updateChangeActionToStdRule,
  updateTableData,
  resetTableData
} from '../form/stdRuleAction'
import {setForm} from "../ruleInputInterfaceAction";
import {getTableData} from "../form/operationRuleUtil";
import {showErrorMsg} from '../../notification/notificationAction'

class AccountSelector extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isShowBlank: false
    }
    this.changeAcc = this.changeAcc.bind(this)
    this.createRule = this.createRule.bind(this)
    this.checkChangeData = this.checkChangeData.bind(this)
  }

  componentDidMount() {
    this.processUrl()

    window.onpopstate = this.onBackAndForwardButtonEvent
  }

  onBackAndForwardButtonEvent = (e) => {
    this.processUrl()
  }

  processUrl = () => {
    let url = window.location.href

    let filterMedias = history.state
    if (filterMedias)
      this.props.updateFilterMedias(filterMedias)

    if (url.includes('rules')) {
      this.props.getDataForRuleUrl(this.props.media, this.props.mediaAccountId, this.props.ruleId)
    } else if (url.includes('accounts')) {
      this.props.getDataForAccUrl(this.props.media, this.props.mediaAccountId)
    } else {
      this.props.getAccounts()
    }
  }

  /*
   Feature: Warning when user edits rle but not saving
   - Get rule that is stored in browser's localStorage
   - Remote submit OperationRule Form to call handle submit function in OperationRule Page
  */
  checkChangeData(func) {
    this.props.checkChangeRule(localStorage.getItem('rule'), this.props.ruleInputInterface.formName, func)
  }

  changeAcc = (accountId) => {
    this.props.setShowRuleForm(false)
    this.props.setSelectedRuleIndex(-1)
    this.props.resetTrigger()
    this.props.resetTableData()

    let selectedAcc = this.props.account.accountList.find(acc => acc.id === accountId)
    let media = convertMedia(selectedAcc ? selectedAcc.media : "")
    this.props.changeAccount(accountId)

    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" + media + "/" + selectedAcc.mediaAccountId)
  }

  async createRule() {
    const media = (this.props.account.selectedAccount) ? this.props.account.selectedAccount.media : ""
    const action = operationRuleConstant.ACTION_TYPE[media][0]
    const defaultOperationRuleName = operationRuleConstant.DEFAULT_OPERATION_NAME[media]
    const ruleList = this.props.ruleList.rules
    if (media === operationRuleConstant.MEDIA_LIST.TWITTER) {
      await this.props.setIsEdit(false)
      this.props.createNewStdRule(action, defaultOperationRuleName)
      const stdRulesExisted = ruleList.filter(rule => operationRuleConstant.TWITTER_STD_ACTION.includes(action.value))
      const ruleId = stdRulesExisted.length > 0
        ? stdRulesExisted.find(stdRule => stdRule.actionType === action.value)
          ? stdRulesExisted.find(stdRule => stdRule.actionType === action.value).id
          : stdRulesExisted[0].id
        : 0
      this.props.updateChangeActionToStdRule(this.props.ruleInputInterface.isEdit, this.props.account.selectedAccount.mediaAccountId, ruleId, media, this.props.reportPeriod, action)
    } else {
      this.props.resetAndCreateNewRule(defaultOperationRuleName, action)
    }

    this.props.setSelectedRuleIndex(-1)
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" + convertMedia(media) + "/" + this.props.account.selectedAccount.mediaAccountId)
  }

  getSelectOptionHeight = () => {
    return this.props.ruleInputInterface.isShowForm ? 65 : 40
  }

  changeFilterMedia = (media) => {
    if (!this.props.ruleInputInterface.isShowForm) {
      const filterMedias = this.props.account.filterMedias.includes(media) ? this.props.account.filterMedias.filter(m => m != media) : [...this.props.account.filterMedias, media]
      if (this.props.account.selectedAccount && filterMedias.length > 0 && !filterMedias.includes(this.props.account.selectedAccount.media)) {
        this.props.updateRuleList([])
        this.props.resetTrigger()
        this.props.selectAccount(0)
      }
      this.props.updateFilterMedias(filterMedias)
    }
  }

  getMediaFilterList = () => {
    const mediaList = operationRuleConstant.COMPANY_MEDIA_LIST[this.props.companyCode]
    if(mediaList){
      return mediaList.map(media => {
        return (<span
          className={"btn btn-default media-tag media-name " + media.toLowerCase() + (this.props.account.filterMedias.includes(media) ? " selected " : " ") + (this.props.ruleInputInterface.isShowForm ? "disabled" : "")}
          onClick={e => this.changeFilterMedia(media)}>{media === 'NEW LINE' ? 'new LINE' : media}</span>)
      })
    }
  }

  render() {
    const options = this.props.account.accountList.filter(
      (account) => {
        return this.props.account.filterMedias.length === 0 || this.props.account.filterMedias.includes(account.media)
      }
    ).map((account) => {
      return {label: account.mediaAccountId + " " + account.accountName, value: account.id}
    })

    const tokenizer = new CustomTokenizer()
    const filterOptions = createFilterOptions({
      options,
      tokenizer
    })

    return (
      <div className="account-filter-page">
        <div className={"panel panel-default " + (this.props.ruleInputInterface.isShowForm ? "" : "resize")}>
          <div className="panel-heading">
            <b>{translation.t('account_filter.select_account')}</b>
          </div>
          <div className="panel-body">
            <div className="media-list">{this.getMediaFilterList()}</div>
            <ul className="list-inline">
              <li className="search"
                  onClick={e => {if (this.props.ruleInputInterface.isEdit) this.setState({isShowBlank: true})}}
                  onBlur={e => {this.setState({isShowBlank: false})}}>
                <Select filterOptions={filterOptions({options})} options={options}
                        disabled={!this.props.ruleInputInterface.isEdit} clearable={false}
                        value={this.state.isShowBlank ? "" : this.props.account.selectedAccountId}
                        optionHeight={this.getSelectOptionHeight()}
                        placeholder={translation.t('account_filter.place_holder')}
                        onChange={e => this.checkChangeData(() => {
                          this.changeAcc(e.value)
                          this.setState({isShowBlank: false})
                        })}/>
              </li>
              <li className="symbol-require">*</li>
              <li>
                <button className="btn btn-primary btn-sm"
                        disabled={!this.props.account.selectedAccountId || !this.props.ruleInputInterface.isEdit}
                        onClick={e => this.checkChangeData(() => this.createRule())}>+
                </button>
              </li>
            </ul>
            {this.props.account.selectedAccountId ?
              <div className="box-line clearfix">
                <div className="pull-right">
                  <span>{translation.t('account_filter.media_name')}</span>
                  <span
                    className={"media-name " + this.props.account.selectedAccount.media.toLowerCase()}>{" " + (this.props.account.selectedAccount.media === 'NEW LINE' ? 'new LINE' : this.props.account.selectedAccount.media)}</span>
                </div>
              </div> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
    ruleInputInterface: state.ruleInputInterface,
    reportPeriod: state.stdRule.reportPeriod,
    operationRule: state.operationRule,
    ruleList: state.ruleList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setShowRuleForm: ruleInputInterfaceAction.setShowRuleForm,
    resetAndCreateNewRule: operationRuleAction.resetAndCreateNewRule,
    remoteHandleSubmit: operationRuleAction.remoteSubmitOperationRuleForm,
    checkChangeRule: operationRuleAction.checkChangeRule,
    selectAccount: accountAction.selectAccount,
    changeAccount: accountAction.changeAccount,
    getAccounts: accountAction.getAccounts,
    setSelectedRuleIndex: ruleListAction.setSelectedRuleIndex,
    resetTrigger: triggerAction.resetTrigger,
    updateFilterMedias: accountAction.updateFilterMedias,
    updateRuleList: ruleListAction.updateRuleList,
    getDataForAccUrl: accountAction.getDataForAccUrl,
    loadAccounts: accountAction.loadAccounts,
    getDataForRuleUrl: ruleListAction.getDataForRuleUrl,
    setForm: setForm,
    updateActionType: updateActionType,
    updateStdRuleName: updateStdRuleName,
    createNewStdRule: createNewStdRule,
    updateChangeActionToStdRule: updateChangeActionToStdRule,
    getTableData: getTableData,
    updateTableData: updateTableData,
    showErrorMsg: showErrorMsg,
    setIsEdit: ruleInputInterfaceAction.setIsEdit,
    resetTableData: resetTableData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelector)
