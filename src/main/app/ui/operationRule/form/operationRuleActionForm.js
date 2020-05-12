import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Field} from 'redux-form'
import * as triggerAction from '../trigger/triggerAction'
import operationRuleConstant from '../../../constants/operationRule'
import translation from '../../../util/translation'
import TextInput from '../../parts/form/textInput'
import Validation from '../../parts/form/validation'
import Select from '../../parts/form/select'
import ActionDocumentLink from './actionDocumentLink'
import {
  changeOperationName,
  getActionConfig,
  getActionLimitLabel,
  getCurrencySymbol,
  setDefaultExecutionDate,
  getTableData
} from './operationRuleUtil'
import * as operationRuleAction from '../operationRuleAction'
import * as ruleScheduleAction from '../ruleSchedule/ruleScheduleAction'
import {
  getSingleTriggerNoMonthlyBudgetShort,
  getValidSingleTrigger
} from '../trigger/triggerForm/p4Line/p4LineTriggerStepUtil'
import {
  getCampaigns,
  resetCostToday,
  resetTotalMinCost,
  updateTargetCampaign
} from "./p4Facebook/p4fCampaignDataAction"
import {resetSettingRule, resetEditedCell, updateReports, resetMinimumLimitValues, refreshSettingRule, refreshCopyPaste} from "./p4Yahoo/p4YahooStdRuleAction"
import yahooStdReportsAjax from "../../../ajax/yahooStdRule";
import {showErrorMsg} from '../../notification/notificationAction'
import {showWarning} from "../../modal/modalAction";
import {setForm} from '../ruleInputInterfaceAction'
import {
  updateActionType,
  updateStdRuleName,
  updateTableData,
  updateChangeActionToStdRule,
  resetSearchText
} from './stdRuleAction'

class OperationRuleActionForm extends React.Component {
  constructor(props) {
    super(props)
  }

  //handleTriggerByChangeActionType: When actionchange action type from Ad increase/decrease to other action types that are not
  //Ad increase/decrease (excluding increase cpn daily / decrease cpn daily), delete single triggers that have monthly
  // and daily short budget since they are not valid for the new action types.
  // When change action type from Ad increase/decrease to increase cpn daily / decrease cpn daily, delete single triggers that
  // have monthly short budget since they are not valid for the new action types.

  handleLineTriggerByChangeActionType(previousActionType, newActionType) {
    if (!operationRuleConstant.AD_ACTION_LIMIT.includes(newActionType) && operationRuleConstant.AD_ACTION_LIMIT.includes(previousActionType)) {
      const newTriggersNoShortBudget = getValidSingleTrigger(this.props.triggerData.triggers)
      this.props.updateValidTriggers(newTriggersNoShortBudget)
    } else if (!operationRuleConstant.AD_BID_ACTIONS.includes(newActionType) && operationRuleConstant.AD_BID_ACTIONS.includes(previousActionType)) {
      const newTriggersNoMonthlyBudgetShort = getSingleTriggerNoMonthlyBudgetShort(this.props.triggerData.triggers)
      this.props.updateValidTriggers(newTriggersNoMonthlyBudgetShort)
    } else if (newActionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR
      || (newActionType === operationRuleConstant.ACTION_TYPE_AD_OFF && this.props.selectedAccount.media === operationRuleConstant.MEDIA_LIST.YAHOO)) {
      this.props.resetTriggers()
      if (newActionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR)
        this.props.resetReactive(false)
    }

    if ((newActionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR) || (previousActionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR)) {
      this.props.resetTriggers()
      this.props.resetReactive(false)
      this.props.resetSearchScopes()
    }
  }

  handleYahooTriggerByChangeActionType(previousActionType, newActionType) {
    if (!((previousActionType === operationRuleConstant.ACTION_TYPE_INCREASE_AD_BID && newActionType === operationRuleConstant.ACTION_TYPE_DECREASE_AD_BID)
      || (previousActionType === operationRuleConstant.ACTION_TYPE_DECREASE_AD_BID && newActionType === operationRuleConstant.ACTION_TYPE_INCREASE_AD_BID))
    ) {
      this.props.resetTriggers()
      this.props.resetReactive(false)
    }
  }

  handleNewLineTriggerByChangeActionType(previousActionType, newActionType) {
    if ((newActionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR) || (previousActionType === operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR)) {
      this.resetRuleActionForm()
    } else if (previousActionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE) {
      let triggers = this.props.triggerData.triggers.map((trigger) => {
        return Object.assign(
          {},
          trigger,
          {
            triggerSteps: trigger.triggerSteps.filter((triggerStep) => {
              return triggerStep.timeRange !== "LAST14DAYS"
            })
          }
        )
      }).filter((trigger) => {
        return trigger.triggerSteps.length > 0
      })
      this.props.updateValidTriggers(triggers)
    }
    if ((newActionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START) || (previousActionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START)) {
      this.props.resetTriggers()
      this.props.resetSearchScopes()
    }
  }

  handleFacebookTriggerByChangeActionType(previousActionType, newActionType) {
    if (newActionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE ||
      previousActionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE) {
      this.props.resetTriggers()
      this.props.resetSearchScopes()
    }
    if (operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(newActionType)) {
      this.resetRuleActionForm()
      this.props.getCampaigns(this.props.selectedAccount.mediaAccountId)
    }
  }

  resetRuleActionForm() {
    this.props.resetTriggers()
    this.props.resetReactive(false)
    this.props.resetSearchScopes()
  }

  handleTriggerChangeActionTypeByMedia(previousActionType, newActionType, media) {
    switch (media) {
      case "YAHOO":
        this.handleYahooTriggerByChangeActionType(previousActionType, newActionType)
        break
      case "FACEBOOK":
        this.handleFacebookTriggerByChangeActionType(previousActionType, newActionType)
        break
      case "NEW LINE":
        this.handleNewLineTriggerByChangeActionType(previousActionType, newActionType)
    }
  }

  validateActionLimit(media) {
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.FACEBOOK:
        return [Validation.actionLimitFacebook(translation.t('action.number_parameter')), Validation.isOnlyDigitNumber, Validation.maxLength(10, ""), Validation.actionValueLimit]
      default:
        return [Validation.isOnlyDigitNumber, Validation.maxLength(10, ""), Validation.actionValueLimit]
    }
  }

  handleChangeAction(item, e) {
    const {action} = this.props
    const actionValue = e.target.value
    //get media type from selected account. If cannot get the selected account, we should get LINE as default media
    const media = (this.props.selectedAccount) ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    this.props.changeOperationName(item, actionValue, action, media, this.props.selectedAccount.currency)
    this.props.resetSearchText()

    if (operationRuleConstant.RULES_USE_STD_RULE_FORM.includes(actionValue)
      && operationRuleConstant.MEDIAS_USE_STD_RULE_FORM.includes(media)) {
      const actionTypeToUpdate = operationRuleConstant.ACTION_TYPE[media].find(action => {
        return action.key === actionValue})
      this.props.updateChangeActionToStdRule(this.props.ruleInputInterface.isEdit, this.props.selectedAccount.mediaAccountId, this.props.operationRule.id, media, this.props.reportPeriod, actionTypeToUpdate)
      this.props.setForm(actionValue)
      this.props.updateActionType(actionTypeToUpdate)
      const stdRuleName = actionTypeToUpdate.text
      this.props.updateStdRuleName(stdRuleName)
    }

    if (operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(actionValue)) {
      this.props.setDefaultExecutionDate(actionValue)
      this.props.updateTargetCampaign({
        campaignId: "",
        costUntilClosedDate: "",
        previousClosedDate: ""
      })
      this.props.resetCostToday()
      this.props.resetTotalMinCost()
    }
    if(operationRuleConstant.YAHOO_STD_ACTION.includes(action.actionType) &&
      operationRuleConstant.YAHOO_STD_ACTION.includes(actionValue)) {
      if((operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType) && !operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(actionValue)) ||
        (!operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType) && operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(actionValue))
      )
      this.props.resetMinimumLimitValues()
      this.props.refreshCopyPaste()
    }

    if(!operationRuleConstant.YAHOO_STD_ACTION.includes(action.actionType) &&
      operationRuleConstant.YAHOO_STD_ACTION.includes(actionValue)){
      this.props.refreshCopyPaste()
      const self = this
      yahooStdReportsAjax.getReports(this.props.selectedAccount.id).then(function (response) {
        let periodReports = response.data.result.periodReports
        if(periodReports.length < 1) {
          self.props.showWarning(translation.t('warning_can_not_save_or_create_rule'))
        }
        yahooStdReportsAjax.getSettingStdRule(self.props.selectedAccount.id, actionValue).then(function (response){
          if(response.data.result.checkDiff){
            self.props.showWarning([translation.t('p4YahooDifferenceSettingWarning')])
          }
          let validSetting = response.data.result.adGroupParameters.filter(setting => {
              return periodReports[0].reportParameters.find(report => {
                return report.adGroupId === setting.adGroupId}) !== undefined
          })
          self.props.refreshSettingRule(validSetting)
        } , function (errors) {
          self.props.showErrorMsg("Can't standard rule's setting : " + errors)
        } )
        self.props.updateReports(periodReports)
      }, function (errors) {
        self.props.showErrorMsg("Can't get report: " + errors)
      }
      )
    }

    if (item === operationRuleConstant.ACTION.ACTION_TYPE) {
      this.handleTriggerChangeActionTypeByMedia(action.actionType, actionValue, media)
    }
  }

  handleChangeUnitParameter(item, e) {
    const {action} = this.props
    if (!operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(action.actionType)) {
      this.handleChangeAction(item, e)
    }
  }

  getUnitParameter() {
    if (this.props.selectedAccount && this.props.selectedAccount.currency) {
      return operationRuleConstant.ACTION_UNIT_PARAMETER[this.props.selectedAccount.currency]
    }
    return operationRuleConstant.ACTION_UNIT_PARAMETER['JPY']
  }

  getUnitParameterIndicate() {
    if (this.props.selectedAccount && this.props.selectedAccount.currency) {
      return operationRuleConstant.ACTION_UNIT_INDICATE[this.props.selectedAccount.currency]
    }
    return operationRuleConstant.ACTION_UNIT_INDICATE['JPY']
  }

  getActionList() {
    const media = (this.props.selectedAccount) ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    return operationRuleConstant.ACTION_TYPE[media].filter(actionType => actionType.company.includes(this.props.companyCode))
  }

  getNumberParameterLabelNotFacebook(actionType) {
    let label = translation.t('action.number_parameter')
    if (operationRuleConstant.ACTION.INDICATE_BUDGET.includes(actionType)) {
      label = translation.t('action.amount')
    } else if (actionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START) {
      label = translation.t('action.ctr_ad_start_amount')
    }
    return label
  }

  getNumberParameterLabelForFacebook(actionType) {
    if (operationRuleConstant.ACTION.INDICATE_BUDGET.includes(actionType))
      return translation.t('action.amount')
    else return translation.t('action.amount_adjustment')
  }

  getUnitNumberComponent(actionType, actionConfig) {
    const isIndicateBudget = operationRuleConstant.ACTION.INDICATE_BUDGET.includes(actionType)
    const unitParameterOption = (isIndicateBudget) ?
      this.getUnitParameterIndicate() : this.getUnitParameter()
    const actionUnitParameterLabelClassName = (isIndicateBudget) ? "label-hidden" : ""
    if (actionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START) {
      return (
        <li style={{"width": "15%"}}>
          <label className={actionUnitParameterLabelClassName}>&nbsp;</label>
          <div className="box-line spend-cap-symbol">
            {translation.t("action.ctr_ad_unit")}
          </div>
        </li>
      )
    }
    if (actionConfig.isVisibleUnitParameter) {
      return (<li style={{"width": "15%"}}>
        <label className={actionUnitParameterLabelClassName}>{translation.t('action.unit_parameter')}</label>
        <div className="box-line">
          <Field
            onChange={this.handleChangeAction.bind(this, operationRuleConstant.ACTION.UNIT_PARAMETER)}
            name="action.actionUnitParameter"
            component={Select}
            options={unitParameterOption}
          />
        </div>
      </li>)
    }
  }

  getWarningMessage(action) {
    switch (action) {
      case operationRuleConstant.ACTION_TYPE_CTR_AD_START:
        return 'action.target_anaa';

      default:
        return 'action.number_parameter';
    }
  }

  setNumberParameterLabel(actionType, account) {
    if (account === undefined || account.media !== operationRuleConstant.MEDIA_LIST.FACEBOOK) {
      return this.getNumberParameterLabelNotFacebook(actionType)
    } else if (account.media == operationRuleConstant.MEDIA_LIST.FACEBOOK)
      return this.getNumberParameterLabelForFacebook(actionType)
  }

  render() {
    const media = (this.props.selectedAccount) ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    const {action} = this.props
    const actionConfig = getActionConfig(action.actionType)
    const actionLimit = getActionLimitLabel(action.actionType)
    const actionNumberParameterLabel = this.setNumberParameterLabel(action.actionType, this.props.selectedAccount)

    return (
      <div>
        <ul className="list-inline" style={{"display": "inline-block", "width": "100%"}}>
          <li className="action-style" style={{"width": "240px"}}>
            <label>{translation.t('action.label')}</label>
            <div className={"box-line"}>
              <Field
                onChange={this.handleChangeAction.bind(this, operationRuleConstant.ACTION.ACTION_TYPE)}
                name="action.actionType"
                component={Select}
                options={this.getActionList()}
              />
              <ActionDocumentLink action = {action} media = {media}/>
              {operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType) && media === operationRuleConstant.MEDIA_LIST.YAHOO ?
              <div className="warning-text-action">{translation.t('p4YahooStdRuleSettingTable.std_ad_bid_warning_action_text')}</div> : null}
            </div>
          </li>
          {actionConfig.isVisibleNumberParameter ?
            <li className="action-style " style={{"width": "30%"}}>
              <label>{actionNumberParameterLabel}<span className="symbol-require">*</span></label>
              <div className="box-line">
                <Field
                  component={TextInput}
                  type="text"
                  className="form-control"
                  onChange={this.handleChangeUnitParameter.bind(this, operationRuleConstant.ACTION.NUMBER_PARAMETER)}
                  name="action.actionNumberParameter"
                  validate={[Validation.require(translation.t(this.getWarningMessage(action.actionType))), Validation.integerNumber,
                    Validation.maxLength(10, ""), Validation.greaterThanZero, Validation.actionValueLimit]}
                />
              </div>
            </li> : null}
          {this.getUnitNumberComponent(action.actionType, actionConfig)}
        </ul>
        {actionConfig.isVisibleActionLimit ?
          <div className="action-vertical-div">
            <ul className="list-inline" style={{"display": "inline-block", "float": "left"}}>
              <li>
                <label>{actionLimit}{media === operationRuleConstant.MEDIA_LIST.FACEBOOK ?
                  <span className="symbol-require">*</span> : null}</label>
                <div style={{"width": "130px"}}>
                  <Field
                    component={TextInput}
                    type="text"
                    name="extension.action.actionLimit"
                    validate={this.validateActionLimit(media)}
                  />
                </div>
              </li>
            </ul>
            <div style={{"padding-top": "35px"}}>{getCurrencySymbol(this.props.selectedAccount)}</div>
          </div>
          : null}
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    triggerData: state.triggerData,
    selectedAccount: state.account.selectedAccount,
    ruleInputInterface: state.ruleInputInterface,
    operationRule: state.operationRule,
    reportPeriod: state.stdRule.reportPeriod
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeOperationName: changeOperationName,
    resetSchedule: ruleScheduleAction.resetSchedule,
    resetSearchScopes: operationRuleAction.resetSearchScopes,
    updateValidTriggers: triggerAction.updateValidTriggers,
    resetTriggers: triggerAction.resetTrigger,
    resetReactive: operationRuleAction.changeNextDayActivateStatus,
    getCampaigns: getCampaigns,
    setDefaultExecutionDate: setDefaultExecutionDate,
    updateTargetCampaign: updateTargetCampaign,
    resetSettingRule: resetSettingRule,
    resetMinimumLimitValues: resetMinimumLimitValues,
    resetEditedCell: resetEditedCell,
    refreshSettingRule: refreshSettingRule,
    updateReports: updateReports,
    showErrorMsg: showErrorMsg,
    showWarning: showWarning,
    resetCostToday: resetCostToday,
    resetTotalMinCost: resetTotalMinCost,
    refreshCopyPaste: refreshCopyPaste,
    setForm: setForm,
    updateActionType: updateActionType,
    updateStdRuleName: updateStdRuleName,
    getTableData: getTableData,
    updateTableData: updateTableData,
    updateChangeActionToStdRule: updateChangeActionToStdRule,
    resetSearchText: resetSearchText
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OperationRuleActionForm)
