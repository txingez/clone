import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckboxSlider from '../../parts/form/checkboxSlider'
import {Field, formValueSelector} from 'redux-form'
import operationRuleConstant from '../../../constants/operationRule'
import translation from '../../../util/translation'
import TextInput from '../../parts/form/textInput'
import Validation from '../../parts/form/validation'
import { bindActionCreators } from 'redux'
import {connect} from "react-redux"
import * as operationRuleAction from '../operationRuleAction'
import * as modalAction from '../../modal/modalAction'
import * as ruleListAction from '../ruleList/ruleListAction'
import * as accountAction from '../account/accountAction'
import {convertMedia} from '../../../util/url'
import modalConstant from '../../../constants/modal'
import {isShowExcludeSearchScope} from "./searchScopeUtil"

class OperationRuleName extends React.Component {
    constructor(props) {
      super(props)
    }
  changeOperationRuleStatus = (statusEnabled) => {
    this.props.updateOperationRuleFieldValue("statusEnabled", !statusEnabled)
  }

  confirmCopyRule = (operationRuleName) => {
    this.props.copyOperationRule(operationRuleName)
    this.props.hidePopup()
    this.props.setSelectedRuleIndex(-1)
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/"
      + convertMedia(this.props.account.selectedAccount.media) + "/" + this.props.account.selectedAccount.mediaAccountId)
  }

  getPreviewRuleTargetResult = () => {
    let data = {
      accountId: this.props.account.selectedAccount.mediaAccountId,
      action: this.props.action,
      searchScope: this.props.action.actionType === 'CAMPAIGN_ON_OFF' ? this.props.searchScopeForCampaign : this.getSearchScopes(this.props.searchScope, this.props.action.actionType),
      media: this.props.media
    }
    this.props.getPreviewResultTarget(data)
  }

  getSearchScopes(lineSearchScopes, actionType){
    return lineSearchScopes.filter(line => line.filterValue !== undefined && line.filterValue.length > 0).map(line => {
      let filterType = line.filterType
      if(isShowExcludeSearchScope(this.props.account.selectedAccount.media, actionType) && line.optionType.selectedOption === "EXCLUDE" && filterType.indexOf('_EXCLUDE') < 0){
        filterType = line.filterType + '_EXCLUDE'
      }
      return Object.assign({}, line, {filterType : filterType})
    })
  }

  confirmCopyRuleToOtherAccount = (operationRuleName) => {
    this.props.selectAccount(this.props.account.accountIdCopyRule)
    this.props.loadRuleList(this.props.account.accountIdCopyRule)
    this.props.copyOperationRuleToOtherAccount(operationRuleName)
    this.props.hidePopup()
    this.props.setSelectedRuleIndex(-1)
    let accountToCopyRule = this.props.account.accountList.find(acc => acc.id === this.props.account.accountIdCopyRule)
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/"
      + convertMedia(this.props.account.selectedAccount.media) + "/" + accountToCopyRule.mediaAccountId)
  }

  isShowPreviewButton = (media, action) => {
    return operationRuleConstant.ACTION_SHOW_PREVIEW_BUTTON.includes(action.actionType)
      || (media === operationRuleConstant.MEDIA_LIST.FACEBOOK && !operationRuleConstant.FACEBOOK_ACTION_HIDE_PREVIEW_BUTTON.includes(action.actionType))
  }

  isShowCopyButton = (media, action) => {
      return (media !== operationRuleConstant.MEDIA_LIST.FACEBOOK || !operationRuleConstant.FACEBOOK_ACTION_HIDE_COPY_BUTTON.includes(action.actionType))
  }

  isShowFunctionPannel = (media, action) => {
      return (media !== operationRuleConstant.MEDIA_LIST.YAHOO || !operationRuleConstant.YAHOO_STD_ACTION.includes(action.actionType))
  }

  getInstructionURL = (media) => {
    const ALL_MEDIA_DOCUMENT_LINK = operationRuleConstant.MANUAL_DOCUMENT_LINK[this.props.companyCode]
    return ALL_MEDIA_DOCUMENT_LINK ? ALL_MEDIA_DOCUMENT_LINK[media]:undefined
  }

    render() {
      const { statusEnabled, media, isEdit, operationName, showConfirm, action } = this.props
      return (
        <div>
          <div className="rule_form_header clearfix">
            <h4 className="float-left rule_form_title">{translation.t('rule_form.title')}</h4>
            {
              this.getInstructionURL(media) ?
                <a target="_blank" href={this.getInstructionURL(media)} className="instruction-URL">
                  {translation.t('rule_form.instructionURL')}
                  <span className="glyphicon glyphicon-new-window"></span>
                </a>
                :null
            }
          </div>
          <hr />
          <div className="box-line row no-padding-bottom">
            <div className="col-md-1 font-rule-name"><label>{translation.t('rule_form.name')}<span className="symbol-require">*</span></label>
            </div>
            <div className="col-md-11">
              <Field component={TextInput} type="text" className="form-control"
                     maxLength={operationRuleConstant.MAX_LENGTH_RULE_NAME}
                     name="operationName"
                     validate={
                       [Validation.require(translation.t('rule_form.name')),
                       Validation.maxLength(operationRuleConstant.MAX_LENGTH_RULE_NAME, translation.t('rule_form.name'))]}/>
            </div>
          </div>
          {
            this.isShowFunctionPannel(media, action) ? <div className="box-line row no-padding-top">
              <div className= "left-padding-checkbox font-label-on-off">{translation.t('rule_form.label_on_off')}</div>
              <div className="col-md-1 padding-right-10">
                <Field component={CheckboxSlider}
                       name="statusEnabled"
                       checked={statusEnabled === true} //If only checked={statusEnabled} will lead to error changing uncontrolled component to controlled component
                       onSwitch = {e => this.changeOperationRuleStatus(statusEnabled)}
                />
              </div>
              <div className="col-md-8">
                {isEdit && this.isShowCopyButton(media, action) ?
                  <div className = "left-side">
                    <button className="btn btn-default copy-rule" type="button"
                            onClick={e => showConfirm(
                              translation.t('modal.confirm_copy'),
                              this.confirmCopyRule.bind(this, operationName))}>
                      {translation.t('rule_form.copy_rule')}
                    </button>
                    <button className="btn btn-default copy-rule copy-rule-other-account" type="button"
                            onClick={e => showConfirm(
                              translation.t('modal.confirm_copy_to_other_account'),
                              this.confirmCopyRuleToOtherAccount.bind(this, operationName),
                              modalConstant.COPY_RULE_TO_OTHER_ACCOUNT)}>
                      {translation.t('rule_form.copy_rule_to_other_account')}
                    </button>
                  </div>
                  : null }
                {
                  (this.isShowPreviewButton(media, action))?
                    <button className="btn btn-info" type="button" onClick={e => this.getPreviewRuleTargetResult()}>{translation.t('preview_target.preview_btn')}</button>
                    : null
                }
              </div>
            </div> : null
          }
        </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
    action: selector(state, 'action')
  }
}

const selector = formValueSelector('operationRuleForm')

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    selectAccount: accountAction.selectAccount,
    loadRuleList: accountAction.loadRuleList,
    updateOperationRuleFieldValue: operationRuleAction.updateOperationRuleFieldValue,
    copyOperationRule: operationRuleAction.copyOperationRule,
    copyOperationRuleToOtherAccount: operationRuleAction.copyOperationRuleToOtherAccount,
    showConfirm: modalAction.showConfirm,
    hidePopup: modalAction.hidePopup,
    setSelectedRuleIndex: ruleListAction.setSelectedRuleIndex
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (OperationRuleName)
