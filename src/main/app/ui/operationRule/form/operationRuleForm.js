import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {formValueSelector, reduxForm} from 'redux-form'
import {bindActionCreators} from 'redux'
import {preventEnterKey, scrollToFirstError} from '../../../util/form'
import * as operationRuleAction from '../operationRuleAction'
import * as modalAction from '../../modal/modalAction'
import OperationRuleName from './operationRuleName'
import OperationRuleActionForm from './operationRuleActionForm'
import OperationRuleTrigger from './operationRuleTrigger'
import SearchScope from './searchScope'
import AccountReactive from './p4Yahoo/accountReactive'
import translation from '../../../util/translation'
import {changeOperationName} from "./operationRuleUtil"
import * as ruleListAction from '../ruleList/ruleListAction'
import operationRuleConstant from '../../../constants/operationRule'
import Schedule from './schedule'
import * as triggerAction from '../trigger/triggerAction'
import * as ruleInputInterfaceAction from '../ruleInputInterfaceAction'
import {convertMedia} from '../../../util/url'
import PreviewRuleTarget from '../previewRuleTarget/previewRuleTarget'
import P4FCampaignActionFields from './p4Facebook/p4fCampaignActionFields'
import P4YahooSTDFields from './p4Yahoo/p4YahooSTDFields'
import {refreshCopyPaste} from './p4Yahoo/p4YahooStdRuleAction'
import {resetSearchText} from "./stdRuleAction";

class OperationRuleForm extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  showJsonData() {
    this.props.showJson(this.props.operationRule.id)
  }

  getMedia() {
    return (typeof this.props.account !== 'undefined' && typeof this.props.account.selectedAccount !== 'undefined') ? this.props.account.selectedAccount.media :
      operationRuleConstant.MEDIA_LIST.NEWLINE
  }

  getAction() {
    const media = this.getMedia()
    if (typeof this.props.action === 'undefined' || this.props.action.actionType === "") {
      const defaultAction = operationRuleConstant.ACTION_TYPE[media][0]
      return {actionType: defaultAction.value}
    } else return this.props.action
  }

  confirmCancel() {
    localStorage.removeItem('rule')
    this.props.resetTriggers()
    this.props.setDefaultForSearchScope()
    this.props.setShowRuleForm(false)
    this.props.setIsEdit(true)
    this.props.hidePopup()
    this.props.setSelectedRuleIndex(-1)
    this.props.resetOperationRuleForm()
    this.props.refreshCopyPaste()
    this.props.resetSearchText()
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" + convertMedia(this.props.account.selectedAccount.media) + "/" + this.props.account.selectedAccount.mediaAccountId)
  }

  confirmDelete() {
    localStorage.removeItem('rule')
    this.props.setDefaultForSearchScope()
    this.props.removeOperationRule(this.props.operationRule.id, this.props.account.selectedAccountId)
    this.props.hidePopup()
    this.props.setSelectedRuleIndex(-1)
    this.props.resetSearchText()
    window.history.pushState(this.props.account.filterMedias, "", "/accounts/" + convertMedia(this.props.account.selectedAccount.media) + "/" + this.props.account.selectedAccount.mediaAccountId)
  }

  //todo: Remove after test
  postDataToPortLine() {
    let data = {
      accountId: this.props.account.selectedAccount.mediaAccountId,
      action: this.props.action,
      searchScope: this.props.action.actionType === 'CAMPAIGN_ON_OFF' ? this.props.searchScopeForCampaign : this.props.searchScope
    }
    this.props.getPreviewTargetActionPath(data)
  }


  createPreviewTargetActionPath(targetActionPaths, media) {
    return targetActionPaths.map(targetActionPath => {
      if (media === 'NEW LINE') {
        return (
          <tr>
            <td>{targetActionPath.campaignId}</td>
            <td>{targetActionPath.campaignName}</td>
            <td>{targetActionPath.adGroupId}</td>
            <td>{targetActionPath.adGroupName}</td>
            <td>{targetActionPath.adId}</td>
            <td>{targetActionPath.adName}</td>
          </tr>
        )
      }

    })
  }

  getActionConfig = (action) => {
    return operationRuleConstant.ACTION_TYPE_CONFIG.find((config) => {
      return config.key === action.actionType
    })
  }

  getCustomForm = (action, customForm) => {
    switch (customForm) {
      case "P4FCampaignSpendCap":
        return <P4FCampaignActionFields action={action}/>
      default:
        return (<div></div>)
    }
  }

  getCustomMessageByAction = (action) => {
    let message = ""
    switch (action) {
      case operationRuleConstant.ACTION_TYPE_SET_SPEND_CAP:
        message = translation.t("rule_form.custom_message_set_spend_cap")
        break
      case operationRuleConstant.ACTION_TYPE_REMOVE_SPEND_CAP:
        message = translation.t("rule_form.custom_message_remove_spend_cap")
        break
      case operationRuleConstant.ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE:
        message = translation.t("rule_form.custom_message_indicate_cpn_budget_by_date")
        break
    }
    if (message !== "") {
      return (
        <div className="full-line">
          <div className="custom-message-icon-container">
            <img className="custom-message-icon" src={"/images/custom-message-icon.png"} />
          </div>
          <div className="custom-message-for-action">{message}</div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }

  genOperationRuleButtons () {
    return (
      <div className="box-line action-box">
        <ul className="list-inline actions">
          <li>
            <button className="btn btn-primary" type="submit"
                    onClick={e => localStorage.removeItem('rule')}>{translation.t('save')}</button>
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
      </div>
    )
  }

  render() {
    const {
      operationRule, triggerData, handleSubmit, removeTrigger, showConfirm, searchScope, error,
      statusEnabled, accountReactive, operationName, ruleInputInterface, searchScopePath, searchScopeForCampaign, getPreviewResultTarget
    } = this.props
    const accountId = (this.props.account.selectedAccountId === 0) ? "" : this.props.account.selectedAccount.mediaAccountId
    const media = this.getMedia()
    const action = this.getAction()
    const actionConfig = this.getActionConfig(action)
    return (
      <div className={this.props.className}>
        <form className="operation-rule-form" onSubmit={handleSubmit} onKeyPress={preventEnterKey} autocomplete="off">
          <div className="operation-rule-form-top">
            <div className="button-top">
              {
                operationRuleConstant.CUSTOM_FORM_DUPLICATE_BUTTON.includes(actionConfig.value.customForm) ? this.genOperationRuleButtons() : null
              }
            </div>
            <OperationRuleName searchScope={searchScope} getPreviewResultTarget={getPreviewResultTarget}
                               statusEnabled={statusEnabled} media={media} isEdit={ruleInputInterface.isEdit}
                               operationName={operationName} companyCode={this.props.companyCode}/>
          </div>
          <hr/>
          {this.getCustomMessageByAction(action.actionType)}
          <div className="box-clean"></div>
          <div className="full-line">
            <div className="half-line">
              <OperationRuleActionForm action={action} companyCode={this.props.companyCode}/>
              {actionConfig.value.customForm === undefined ?
                <div style={{"clear": "both"}}>
                  <Schedule action={action} media={media} error={error}/>
                  <SearchScope searchScopeVal={searchScope} action={action} media={media} accountId={accountId}
                               showResultPath={searchScopePath.isVisibleResult}
                               searchScopeForCampaign={searchScopeForCampaign}/>
                </div> : null}

            </div>
            {actionConfig.value.customForm === "YahooSTDRule" ? <P4YahooSTDFields action={action}/> : null}
            {actionConfig.value.customForm === undefined ?
              <div className="half-line">
                <OperationRuleTrigger triggerData={triggerData} removeTrigger={removeTrigger} error={error}
                                      action={action} media={media}/>
                <AccountReactive action={action} accountReactive={accountReactive}/>
              </div> : null}

            {
              actionConfig.value.customForm !== undefined ? this.getCustomForm(action, actionConfig.value.customForm)
                : null
            }
          </div>
          <div class="box-clean"></div>

          <hr/>
          {this.genOperationRuleButtons()}
          <button className="hiding" type="button" onClick={e => this.postDataToPortLine()}>Show Output</button>
          <button className="hiding" type="button" onClick={e => this.showJsonData()}>Show Json Data</button>
        </form>
        {this.props.previewRuleTarget.isVisible ? <PreviewRuleTarget action={action} media={media}/> : null}
        <div className="hiding" id="previewTarget">
          <div>Target action path from Line : {operationRule.targetActionPaths.length}</div>
          <table id="previewTargetTable">

            {this.props.account.selectedAccount !== undefined ?
              <tbody>
              <tr>
                <th>CampaignId</th>
                <th>CampaignName</th>
                <th>AdGroupId</th>
                <th>AdGroupName</th>
                <th>AdId</th>
                <th>AdName</th>
              </tr>
              </tbody> : ""}

            {this.createPreviewTargetActionPath(operationRule.targetActionPaths, this.props.account.selectedAccount !== undefined ? this.props.account.selectedAccount.media : 'LINE')}
          </table>
        </div>

      </div>
    )
  }
}

OperationRuleForm.propTypes = {
  operationRule: PropTypes.object.isRequired
}

const operationRuleForm = reduxForm({
  form: 'operationRuleForm',
  touchOnBlur: false,
  touchOnChange: false,
  enableReinitialize: true,
  onSubmitFail: (errors) => scrollToFirstError(errors),
})(OperationRuleForm)

const selector = formValueSelector('operationRuleForm')

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.operationRule,
    operationRule: state.operationRule,
    triggerData: state.triggerData,
    operationName: selector(state, 'operationName'),
    action: selector(state, 'action'),
    searchScope: selector(state, 'searchScope'),
    searchScopeForCampaign: selector(state, 'searchScopeForCampaign'),
    account: state.account,
    statusEnabled: selector(state, 'statusEnabled'),
    accountReactive: selector(state, 'extension.action.accountReactive'),
    ruleInputInterface: state.ruleInputInterface,
    searchScopePath: state.searchScopePath,
    previewRuleTarget: state.previewRuleTarget
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setShowRuleForm: ruleInputInterfaceAction.setShowRuleForm,
    removeOperationRule: operationRuleAction.removeOperationRule,
    showConfirm: modalAction.showConfirm,
    hidePopup: modalAction.hidePopup,
    changeOperationName: changeOperationName,
    showJson: operationRuleAction.showJson,
    setDefaultForSearchScope: operationRuleAction.setDefaultForSearchScope,
    setSelectedRuleIndex: ruleListAction.setSelectedRuleIndex,
    resetTriggers: triggerAction.resetTrigger,
    setIsEdit: ruleInputInterfaceAction.setIsEdit,
    resetOperationRuleForm: operationRuleAction.resetOperationRuleForm,
    refreshCopyPaste: refreshCopyPaste,
    resetSearchText: resetSearchText
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(operationRuleForm)

