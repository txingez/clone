import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import translation from "../../../util/translation";
import P4FStdRuleSettingTable from "./p4Facebook/p4fStdRuleSettingTable";
import operationRuleConstant from "../../../constants/operationRule";
import * as ruleInputInterfaceAction from "../ruleInputInterfaceAction"
import {setForm, setShowRuleForm} from "../ruleInputInterfaceAction"
import {
  changeActionType,
  changeOperationName,
  getTriggerDataFromTable,
  handleTriggersForChangingActionType
} from '../form/operationRuleUtil'
import ActionDocumentLink from '../form/actionDocumentLink'
import {convertMedia} from "../../../util/url";
import * as operationRuleAction from "../operationRuleAction";
import * as ruleListAction from "../ruleList/ruleListAction";
import * as modalAction from "../../modal/modalAction";
import {showErrorMsg} from "../../notification/notificationAction";
import * as triggerAction from "../trigger/triggerAction";
import {
  changeReportPeriod,
  resetCopyPaste,
  updateActionType,
  updateChangeActionToStdRule,
  updateStdRuleName,
  changeConversionType, resetConversionTypeDefault,
  resetSearchText
} from "./stdRuleAction"
import P4TStdRuleSettingTable from "./p4Twitter/p4tStdRuleSettingTable";
import stdRuleConstant from "./stdRuleConstant";
import P4LStdRuleSettingTable from "./newLine/p4lStdRuleSettingTable";
import stdRule from "../../../constants/standardRule";

class StdRuleForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isInvalid: false
    }
  }

  aggreate(media, actionType, currency, conversionType) {
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.FACEBOOK:
        return <P4FStdRuleSettingTable currency={currency}/>
      case operationRuleConstant.MEDIA_LIST.TWITTER:
        return <P4TStdRuleSettingTable currency={currency}/>
      case operationRuleConstant.MEDIA_LIST.NEWLINE:
        return <P4LStdRuleSettingTable currency={currency} conversionType={conversionType} media={media} actionType={actionType}/>
      default:
        return ""
    }
  }

  handleChangeAction(e) {
    let {ruleInputInterface, selectedAccount, operationRule, stdRule} = this.props

    const media = (this.props.selectedAccount) ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    const actionTypeSelected = e.target.value
    const action = operationRuleConstant.ACTION_TYPE[media].find(action => {
      return action.key === actionTypeSelected
    })
    const stdRuleName = action.text
    this.props.setForm(actionTypeSelected)
    this.props.updateActionType(action)
    this.props.updateStdRuleName(stdRuleName)
    this.props.changeReportPeriod("30DAY")
    this.props.resetConversionType()
    this.props.resetSearchText()

    if (operationRuleConstant.TWITTER_STD_ACTION.includes(actionTypeSelected)
      && operationRuleConstant.MEDIA_LIST.TWITTER) {
      const actionObj = stdRuleConstant.TRIGGERS_LEVEL[media]
      let tmpTriggers = getTriggerDataFromTable(this.props.stdRule.tableData, media, action.value, actionObj)
      tmpTriggers = handleTriggersForChangingActionType(tmpTriggers, actionTypeSelected, media)
      this.props.updateChangeActionToStdRule(ruleInputInterface.isEdit, selectedAccount.mediaAccountId, operationRule.id, media, "30DAY", action, tmpTriggers)
      this.props.setForm(actionTypeSelected)
      this.props.resetCopyPaste()
      this.props.updateActionType(action)
      const stdRuleName = action.text
      this.props.updateStdRuleName(stdRuleName)
    }

    if (!operationRuleConstant.RULES_USE_STD_RULE_FORM.includes(actionTypeSelected)) {
      this.props.changeActionType(actionTypeSelected)
      this.props.changeOperationName(operationRuleConstant.ACTION.ACTION_TYPE, actionTypeSelected, action, media, this.props.selectedAccount.currency)
      this.props.resetTriggers()
      this.props.resetSearchScopes()
      this.setState({isInvalid: false})
    }
  }

  confirmCancel() {
    localStorage.removeItem('rule')
    this.props.resetTriggers()
    this.props.setDefaultForSearchScope()
    this.props.setShowRuleForm(false)
    this.props.setIsEdit(true)
    this.props.hidePopup()
    this.props.setSelectedRuleIndex(-1)
    this.props.setOperationRuleId(0)
    this.props.resetCopyPaste()
    this.props.changeReportPeriod("30DAY")
    this.props.resetConversionType()
    this.props.resetSearchText()
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" + convertMedia(this.props.account.selectedAccount.media) + "/" + this.props.account.selectedAccount.mediaAccountId)
  }

  confirmDelete() {
    localStorage.removeItem('rule')
    this.props.setDefaultForSearchScope()
    this.props.setShowRuleForm(false)
    this.props.removeOperationRule(this.props.operationRule.id, this.props.account.selectedAccountId)
    this.props.hidePopup()
    this.props.setOperationRuleId(0)
    this.props.setSelectedRuleIndex(-1)
    this.props.changeReportPeriod("30DAY")
    this.props.resetConversionType()
    this.props.resetSearchText()
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" + convertMedia(this.props.account.selectedAccount.media) + "/" + this.props.account.selectedAccount.mediaAccountId)
  }

  saveRule() {
    if (!this.state.isInvalid) {
      if (this.props.stdRule.tableData.length < 1) {
        this.props.showErrorMsg(translation.t('error_can_not_save_rule'))
      } else {
        if (this.props.stdRule.rowCopied.isCopied) {
          this.props.showConfirm(
            translation.t('modal.confirm_save_with_copy_not_finish'),
            () => {
              this.executeSaveRule()
            })
        } else {
          this.executeSaveRule()
        }
      }
    }
  }

  executeSaveRule() {
    const media = this.props.selectedAccount.media
    const actionType = this.props.stdRule.actionType
    const platform = operationRuleConstant.MEDIA_LIST

    let ruleData = undefined
    switch (media) {
      case platform.FACEBOOK:
        ruleData = this.buildSTDFacebookRule(media, actionType)
        break
      case platform.TWITTER: case platform.NEWLINE:
        ruleData = this.buildSTDRule(media, actionType)
        break
    }

    this.props.changeReportPeriod("30DAY")
    this.props.resetCopyPaste()
    this.props.resetConversionType()
    this.props.resetSearchText()

    if (!this.props.ruleInputInterface.isEdit) {
      this.props.setIsEdit(true)
    }
    if (this.props.ruleInputInterface.isEdit)
      this.props.editRule(this.props.operationRule.id, ruleData, this.props.account.selectedAccountId);
    else
      this.props.createOperationRule(ruleData, this.props.account.selectedAccountId);
    this.props.setSelectedRuleIndex(-1)
  }

  buildSTDRule(media, actionType) {
    const actionObj = stdRuleConstant.TRIGGERS_LEVEL[media]
    return {
      id: this.props.operationRule.id ? this.props.operationRule.id : 0,
      operationName: this.props.stdRule.stdRuleName,
      accountId: this.props.account.selectedAccountId,
      action: {
        actionType: actionType.value,
        actionObject: actionType.actionObject
      },
      trigger: getTriggerDataFromTable(this.props.stdRule.tableData, media, actionType.value, actionObj),
      status: operationRuleConstant.STATUS_ENABLED,
      searchScopes: [],
      ruleSchedule: [],
      extension: media === operationRuleConstant.MEDIA_LIST.NEWLINE ? {action: {conversion: this.props.stdRule.conversionType.toLowerCase()}} : undefined,
      updatedAt: this.props.operationRule.updatedAt
    }
  }

  buildSTDFacebookRule(media, actionType) {
    const actionObj = stdRuleConstant.TRIGGERS_LEVEL[media]
    return {
      id: this.props.operationRule.id ? this.props.operationRule.id : 0,
      operationName: this.props.stdRule.stdRuleName,
      accountId: this.props.account.selectedAccountId,
      action: {
        actionType: actionType.value,
        actionObject: actionType.actionObject
      },
      trigger: getTriggerDataFromTable(this.props.stdRule.tableData, media, actionType.value, actionObj),
      status: operationRuleConstant.STATUS_ENABLED,
      searchScopes: [],
      ruleSchedule: [],
      extension: {
        logicVersion: operationRuleConstant.LOGIC_VERSION[media]
      },
      updatedAt: this.props.operationRule.updatedAt
    }
  }

  onChangeStdRuleName(e) {
    const nameToUpdate = e.target.value
    this.setState({isInvalid: nameToUpdate === ""})
    this.props.updateStdRuleName(nameToUpdate)
  }

  renOperationRuleButtons() {
    return (
      <ul className="list-inline">
        <li>
          <button className="btn btn-primary" type="button" onClick={e => this.saveRule()}>{translation.t('save')}
          </button>
        </li>
        {this.props.ruleInputInterface.isEdit ?
          <li>
            <button type="button" className={"btn btn-danger"}
                    onClick={e => this.props.showConfirm(translation.t('modal.confirm_delete'), this.confirmDelete.bind(this))}>{translation.t('delete')}</button>
          </li>
          : ""
        }
        <li>
          <button type="button" className="btn btn-default"
                  onClick={e => this.props.showConfirm(translation.t('modal.confirm_cancel'), this.confirmCancel.bind(this))}>{translation.t('cancel')}</button>
        </li>
      </ul>
    )
  }

  renderSelectorAction(media) {
    const actionList = operationRuleConstant.ACTION_TYPE[media].filter(actionType => actionType.company.includes(this.props.companyCode))
    return (
      <select onChange={this.handleChangeAction.bind(this)} value={this.props.stdRule.actionType.value}>
        {actionList.map(action => {
          return (<option key={action.key} value={action.value}>{action.text}</option>)
        })}
      </select>
    )
  }

  getScheduleText(media) {
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.NEWLINE:
        return translation.t('schedule.newLine_std_schedule')
      case operationRuleConstant.MEDIA_LIST.FACEBOOK:
        return translation.t('schedule.fb_std_schedule')
      case operationRuleConstant.MEDIA_LIST.TWITTER:
        return translation.t('schedule.tw_std_schedule')
    }
  }

  renderConversionType(conversionType) {
    return (
      <select onChange={this.onChangeConversionType.bind(this)}>
        {stdRule.NEWLINE_CONVERSION_TYPE.map(type => {
          return (<option key={type.index} value={type.value} selected={type.value === conversionType}>{type.text}</option>)
        })}
      </select>
    )
  }

  onChangeConversionType(e) {
    const updateValue = e.target.value
    this.props.changeConversionType(updateValue)
  }

  render() {
    const media = (this.props.selectedAccount) ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    const currency = (this.props.selectedAccount) ? this.props.selectedAccount.currency : "JPY"
    const actionType = this.props.stdRule.actionType ? this.props.stdRule.actionType : operationRuleConstant.ACTION_TYPE["NEW LINE"][0]
    const actionTypeValue = {actionType: actionType.value}
    const conversionType = this.props.stdRule.conversionType
    const classRuleNameInput = this.state.isInvalid ? "col-md-11 rule-name-input invalid-input" : "col-md-11 rule-name-input"
    return (
      <div className={"std-rule-form " + this.props.className}>
        <form>
          <div className="std-rule-form-top">
            <div className="btn-top">
              {this.renOperationRuleButtons()}
            </div>
            <div className="form-title">
              <h4>{translation.t('rule_form.title')}</h4>
            </div>
            <hr/>
            <div className="row rule-name-form">
              <label className="col-md-1">{translation.t('rule_form.name')}<span
                className="symbol-require">*</span></label>
              <div>
                <input className={classRuleNameInput}
                       type="text"
                       name="stdRuleName"
                       maxLength={operationRuleConstant.MAX_LENGTH_RULE_NAME}
                       value={this.props.stdRule.stdRuleName}
                       onChange={this.onChangeStdRuleName.bind(this)}/>
                {this.state.isInvalid ?
                  <span className="invalid-text">{translation.t('stdRuleNameRequired')}</span> : null}
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-md-6">
              <ul className="std-rule-actions">
                <li>
                  <label>{translation.t('action.label')}</label>
                </li>
                <li>
                  {this.renderSelectorAction(media)}
                </li>
                <li>
                  <ActionDocumentLink media={media} action={actionTypeValue}/>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="std-rule-schedule">
                <li>
                  <label>{translation.t('schedule.label')}</label>
                </li>
                <li>
                  <span>{this.getScheduleText(media)}</span>
                </li>
              </ul>
            </div>
          </div>
          {media === operationRuleConstant.MEDIA_LIST.NEWLINE && actionTypeValue.actionType === stdRuleConstant.ACTIONS['NEW LINE'].STD_AD_OFF.NAME
            ? <div className="select-box-conversion-type">
              <ul>
                <li>
                  <label>{translation.t('conversion_type_label')}</label>
                </li>
                <li>
                  <li>
                    {this.renderConversionType(conversionType)}
                  </li>
                </li>
              </ul>
            </div>
            : null}
          <div className="std-rule-table">
            {this.aggreate(media, actionType, currency, conversionType)}
          </div>
          <hr/>
          <div className="btn-bottom">
            {this.renOperationRuleButtons()}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ruleInputInterface: state.ruleInputInterface,
    selectedAccount: state.account.selectedAccount,
    companyCode: state.account.companyCode,
    operationRule: state.operationRule,
    account: state.account,
    stdRule: state.stdRule
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setForm: setForm,
    setShowRuleForm: setShowRuleForm,
    resetTriggers: triggerAction.resetTrigger,
    changeActionType: changeActionType,
    changeOperationName: changeOperationName,
    setIsEdit: ruleInputInterfaceAction.setIsEdit,
    setDefaultForSearchScope: operationRuleAction.setDefaultForSearchScope,
    setSelectedRuleIndex: ruleListAction.setSelectedRuleIndex,
    showConfirm: modalAction.showConfirm,
    removeOperationRule: operationRuleAction.removeOperationRule,
    hidePopup: modalAction.hidePopup,
    createOperationRule: operationRuleAction.createOperationRule,
    editRule: operationRuleAction.updateOperationRule,
    showErrorMsg: showErrorMsg,
    updateStdRuleName: updateStdRuleName,
    resetCopyPaste: resetCopyPaste,
    updateActionType: updateActionType,
    updateChangeActionToStdRule: updateChangeActionToStdRule,
    setOperationRuleId: operationRuleAction.setOperationRuleId,
    changeReportPeriod: changeReportPeriod,
    changeConversionType: changeConversionType,
    resetConversionType: resetConversionTypeDefault,
    resetSearchText: resetSearchText,
    resetSearchScopes: operationRuleAction.resetSearchScopes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StdRuleForm)
