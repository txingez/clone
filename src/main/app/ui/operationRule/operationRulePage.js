import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {SubmissionError} from 'redux-form'
import * as operationRuleAction from './operationRuleAction'
import * as triggerAction from './trigger/triggerAction'
import AccountSelector from './account/accountSelector'
import RuleList from './ruleList/ruleList'
import {setSelectedRuleIndex} from './ruleList/ruleListAction'
import OperationRuleForm from './form/operationRuleForm'
import TriggerForm from './trigger/triggerForm/triggerForm'
import ModalConfirm from '../modal/modalConfirm'
import ModalMessage from '../modal/modalMessage'
import operationRuleConstant from '../../constants/operationRule'
import * as adjustmentRuleScheduleUtil from './budgetAdjustment/adjustmentRuleScheduleUtil'
import translation from '../../util/translation'
import NotificationContainer from '../notification/notificationContainer'
import {getDefaultSchedule} from './ruleSchedule/ruleScheduleUtil'
import {isShowExcludeSearchScope} from './form/searchScopeUtil'
import RuleSchedule from "./ruleSchedule/ruleSchedule"
import AdjustmentRuleSchedule from './budgetAdjustment/adjustmentRuleSchedule'
import triggerConstant from '../../constants/trigger'
import {getActionConfig, getActionUnitParameterOptions, hasOnlySearchScopeForCampaign, isDefined, isNumberType} from './form/operationRuleUtil'
import {showPreviewRulePopup} from '../operationRule/previewRuleTarget/previewRuleTargetAction'
import * as modalAction from '../../ui/modal/modalAction'
import * as _ from 'lodash'
import DateUtil from "../../util/date"
import moment from "moment"
import CurrencyUtil from "../../util/currency"
import {setIsEdit} from './ruleInputInterfaceAction'
import {showErrorMsg} from '../notification/notificationAction'
import {convertToUSD, getSpendCapValue} from "./form/p4Facebook/p4fSetCampaignSpendCapUtil";
import {calculateWithCurrencyUSD} from "../../util/common";
import {refreshCopyPaste} from './form/p4Yahoo/p4YahooStdRuleAction'
import StdRuleForm from "./form/stdRuleForm";
import {resetSearchText} from "./form/stdRuleAction";

class OperationRulePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.getAction = this.getAction.bind(this);
    this.getSearchScopes = this.getSearchScopes.bind(this);
    this.getTriggers = this.getTriggers.bind(this);
    this.isWarningDailyBudgetByDateRule = this.isWarningDailyBudgetByDateRule.bind(this);
    this.getIndicateDailyBudgetByDateRule = this.getIndicateDailyBudgetByDateRule.bind(this);
    this.isDuplicateCpnAndDate = this.isDuplicateCpnAndDate.bind(this);
    this.saveData = this.saveData.bind(this);
    this.checkStatusAndSaveSpendCapRules = this.checkStatusAndSaveSpendCapRules.bind(this);

    this.state = {
      initRuleId: 0
    }
  }

  handleSubmit(values) {
    const data = this.getData(values);
    //If localStorage is not cleared, it will be for action: create rule, change acc, switch rule.
    // So this code will check the data change.
    let oldDataStr = localStorage.getItem('rule');
    let isYahooStdRule = operationRuleConstant.YAHOO_STD_ACTION.includes(data.action.actionType)
    if (oldDataStr !== null && !isYahooStdRule) {
      this.checkChangeData(oldDataStr, data)
    } else if(data.action.actionType === operationRuleConstant.ACTION_TYPE_SET_SPEND_CAP) {
      if (this.checkSpendCap(values)) {
        this.props.showConfirm(this.getWarningSaveRuleForSetSpendCapMessage(values), () => this.checkStatusAndSaveSpendCapRules(data), '', false)
      } else {
        this.showErrorSaveRuleForSetSpendCapMessage()
      }
    }
    else if (isYahooStdRule) {
      if (this.props.reports.length < 1) {
        this.props.showErrorMsg(translation.t('error_can_not_save_rule'))
      } else if (this.props.rowCopied.isCopied) {
        this.props.showConfirm(
          translation.t('modal.confirm_save_with_copy_not_finish'),
          () => {
            this.props.refreshCopyPaste()
            this.saveData(data)
          }
        )
      } else {
        this.saveData(data)
      }
    }
    else if( data.action.actionType === operationRuleConstant.ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE){
      if(this.checkCPNDailyBudget(data)){
        if(data.status === operationRuleConstant.STATUS_ENABLED){
          this.saveData(data)
        }else{
          this.props.showConfirm(translation.t('warning_user_not_enable_rule'), () => this.saveData(data))
        }
      } else{
        this.showConfirmIndicateCPNDailyBudget(data)
      }
    } else if (this.isWarningDailyBudgetByDateRule(data)) {
      this.props.showWarningDuplicateCpnAndDate(translation.t('warning_duplicate_cpn_and_date'))
    } else if (!this.isEnableRule(data) && data.id !== this.state.initRuleId && !isYahooStdRule) {
      this.props.showConfirm(translation.t('warning_user_not_enable_rule'), () => this.saveData(data))
    } else{
      this.saveData(data)
    }
  }

  checkStatusAndSaveSpendCapRules(data){
    let status = data.status
    if(status === operationRuleConstant.STATUS_ENABLED){
      this.saveData(data)
    }else {
      this.props.showConfirm(translation.t('warning_user_not_enable_rule'), () => this.saveData(data))
    }
  }

  saveData(data) {
    const id = this.props.account.selectedAccountId;
    if(operationRuleConstant.YAHOO_STD_ACTION.includes(data.action.actionType)){
      this.props.updateYahooStdRule(this.props.operationRule.id, data, this.props.account.selectedAccountId)
      if (!this.props.ruleInputInterface.isEdit) {
        this.props.setIsEdit(true)
      }
    } else {
      if (this.props.ruleInputInterface.isEdit)
        this.props.editRule(this.props.operationRule.id, data, this.props.account.selectedAccountId);
      else
        this.props.createOperationRule(data, id);
    }
    this.props.setSelectedRuleIndex(-1)
    this.props.resetSearchText()
  }

  getWarningSaveRuleForSetSpendCapMessage(values){
    const todayStr = DateUtil.getToday("YYYY-MM-DD")
    let rawMessage = CurrencyUtil.replaceCurrencyLetter(translation.t('warning_save_rule_for_set_spend_cap'), this.props.selectedAccount.currency)
    let message = _.replace( rawMessage, 'PERIOD', todayStr + ' 00:00～' + DateUtil.getValueFromDatePicker(values.schedule.executionDate) + ' 00:00')
    let warningCost = 0

    if(this.props.selectedAccount.currency==='USD'){
      warningCost = calculateWithCurrencyUSD(getSpendCapValue(values.extension.targetCampaign.costUntilClosedDate , values.extension.targetCampaign.currentMonthCost), parseFloat(this.props.spendCapLowerLimit[this.props.selectedAccount.currency] ))
    }else{
      warningCost = getSpendCapValue(values.extension.targetCampaign.costUntilClosedDate , values.extension.targetCampaign.currentMonthCost) - parseFloat(this.props.spendCapLowerLimit[this.props.selectedAccount.currency] )
    }
    this.props.showConfirm(_.replace(message,'TOTAL_MIN_COST', warningCost), () => this.checkStatusAndSaveSpendCapRules(data))
    message = _.replace(message,'SPEND_CAP_LOWER_LIMIT',warningCost  )
    return message
  }

  showErrorSaveRuleForSetSpendCapMessage(){
    let message = CurrencyUtil.replaceCurrencyLetter(translation.t('error_can_not_save_rule_for_set_spend_cap'), this.props.selectedAccount.currency)
    return this.props.showErrorMsg(_.replace(message,'SPEND_CAP_LOWER_LIMIT',this.props.spendCapLowerLimit[this.props.selectedAccount.currency] ))
  }

  showConfirmIndicateCPNDailyBudget(data){
    let message =  CurrencyUtil.replaceCurrencyLetter(translation.t('warning_save_rule_for_indicate_cpn_daily_budget'), this.props.selectedAccount.currency)
    let warningCost = 0

    if(this.props.selectedAccount.currency==='USD'){
      warningCost = calculateWithCurrencyUSD(convertToUSD(this.props.adSet.totalMinCost), parseFloat(data.action.actionNumberParameter))
    }else{
      warningCost = this.props.adSet.totalMinCost - parseInt(data.action.actionNumberParameter)
    }
    this.props.showConfirm(_.replace(message,'TOTAL_MIN_COST', warningCost), () => this.checkStatusAndSaveSpendCapRules(data))
  }

  checkSpendCap(values){
    const spendCapUpperLimit = getSpendCapValue(values.extension.targetCampaign.costUntilClosedDate , values.extension.targetCampaign.currentMonthCost)
    return spendCapUpperLimit >= this.props.spendCapLowerLimit[this.props.selectedAccount.currency]
  }

  checkCPNDailyBudget(data){
    const totalMinCost = this.props.selectedAccount.currency === 'USD'?convertToUSD(this.props.adSet.totalMinCost):this.props.adSet.totalMinCost
    const currentMonthCost = parseFloat(data.action.actionNumberParameter)
    return currentMonthCost >= totalMinCost
  }

  isWarningDailyBudgetByDateRule(rule) {
    if (rule.action.actionType !== operationRuleConstant.ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE)
      return false;

    let ruleList = this.getIndicateDailyBudgetByDateRule(this.props.ruleList.rules, rule.id);
    let comparedData = {
      cpnId: rule.extension.targetCampaign.campaignId,
      date: rule.ruleSchedule[0].executionDate
    };

    return this.isDuplicateCpnAndDate(ruleList, comparedData)
  }

  getIndicateDailyBudgetByDateRule(ruleList, currentRuleId) {
    return ruleList.filter(rule =>
      rule.actionType === operationRuleConstant.ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE && rule.id !== currentRuleId
    )
  }

  isDuplicateCpnAndDate(ruleList, comparedData) {
    let datas = ruleList.map(rule => {
      return {
        cpnId: rule.extension.targetCampaign.campaignId,
        date: rule.executionDate
      }
    });

    return _.findIndex(datas, comparedData) > -1
  }

  checkChangeData(oldDataStr, data) {
    if (_.isEqual(JSON.parse(oldDataStr), data) !== true && oldDataStr !== JSON.stringify(data)) {
      this.props.showWarningMsg(translation.t('warning_user_change_data_not_save'))
    } else {
      localStorage.removeItem('rule');
      this.props.modal.confirmedFunction()
    }
  }

  isEnableRule(data) {
    return data.status === operationRuleConstant.STATUS_ENABLED
  }

  getPreviewTargetActionPath(data) {
    const action = this.getAction(data);
    let actionData = {
      actionType: action.actionType === "CAMPAIGN_ON_OFF" ? "CAMPAIGN_ON" : action.actionType,
      actionObject: action.actionObject,
      actionNumberParameter: action.actionNumberParameter
    };
    this.props.getLineTargetActionPath({
      operationName: data.operationName,
      accountId: data.accountId,
      action: actionData,
      searchScopes: action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF ? this.getSearchScopeForCampaign(data.searchScope) : this.getSearchScopes(data.searchScope, actionData.actionType),
      trigger: this.getTriggers(this.props.triggerData.triggers),
      version: 1,
      extension: {}
    }, this.props.account.selectedAccount.media)
  }

  getPreviewResultTarget = (data) => {
    const action = this.getAction(data);
    let actionData = {
      actionType: action.actionType === "CAMPAIGN_ON_OFF" ? "CAMPAIGN_ON" : action.actionType,
      actionObject: action.actionObject
    };
    this.props.showPreviewRulePopup({
      media: data.media,
      operationName: data.operationName,
      accountId: data.accountId,
      action: actionData,
      searchScopes: action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF ? this.getSearchScopeForCampaign(data.searchScope) : this.getSearchScopes(data.searchScope),
      trigger: this.getTriggers(this.props.triggerData.triggers),
      version: 1,
      extension: {}
    })
  };

  getData(values) {
    const status = values.statusEnabled ? operationRuleConstant.STATUS_ENABLED : operationRuleConstant.STATUS_DISABLED;
    const action = this.getAction(values);
    if(operationRuleConstant.YAHOO_STD_ACTION.includes(action.actionType)) {
      let data = {
        id: this.props.operationRule.id ? this.props.operationRule.id : 0,
        operationName: values.operationName,
        accountId: this.props.account.selectedAccountId,
        action: action,
        adGroupParameters: this.getYahooStdRuleData(action.actionType),
        updatedAt: values.updatedAt
      };
      return data
    }
    const actionCampaignOnOff = action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF;
    const actionBudgetAdjustment = action.actionType === operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET;
    const actionCampaignHourlyFacebook = operationRuleConstant.ACTION_TYPE_FACEBOOK_HOURLY.includes(action.actionType);
    const searchScopes = this.getSearchScopesAll(values.searchScopeForCampaign, values.searchScope, action.actionType, this.props.account.selectedAccount.media);
    const triggers = actionCampaignOnOff || actionBudgetAdjustment || actionCampaignHourlyFacebook ? [] : this.getTriggers(this.props.triggerData.triggers);
    const ruleSchedule = operationRuleConstant.ACTION_TYPE_NONE_RULE_SCHEDULE.includes(action.actionType) ? [] : this.getRuleSchedule(this.props.ruleSchedule, action.actionType, values.schedule);
    const budgetAdjuster = actionBudgetAdjustment ? this.props.adjustmentRuleSchedule.adjustmentSchedule : [];
    const actionFacebookHourly = operationRuleConstant.ACTION_TYPE_FACEBOOK_HOURLY.includes(action.actionType);
    if (actionBudgetAdjustment) {
      if (!adjustmentRuleScheduleUtil.validateAdjuster(budgetAdjuster) || budgetAdjuster.length === 0) {
        throw new SubmissionError({
          _error: translation.t('please_set_campaign_budget_adjustment_schedule')
        })
      }
    }
    const extension = this.getExtension(values.extension, action.actionType);
    if (!actionFacebookHourly && !actionCampaignOnOff && !actionBudgetAdjustment &&
      !operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(action.actionType) && this.props.triggerData.triggers.length === 0) {
      throw new SubmissionError({
        _error: translation.t('rule_form.trigger_step_required')
      })
    }
    if (action.actionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START) {
      const annaNumberInTriggers = triggers.map(trigger => {
        return trigger.triggerSteps.filter(step => {
          return step.triggerComparable === "ANAA" && step.triggerOperator === "LESS_OR_EQUAL"
        }).map(step => {
          return step.boundaryValue
        })
      }).flatten();
      const wrongVariableAnaa = annaNumberInTriggers.filter(anaa => {
        return parseInt(anaa) > parseInt(action.actionNumberParameter)
      });
      if (wrongVariableAnaa.length > 0) {
        throw new SubmissionError({
          _error: translation.t("rule_form.ctr_ad_start_anaa_trigger_number_too_large")
        })
      }
    }
    if (location.hostname.match('mock-p4x')) {
      throw new SubmissionError({
        _error: ""
      })
    }

    let data = {
      id: this.props.operationRule.id ? this.props.operationRule.id : 0,
      operationName: values.operationName,
      accountId: this.props.account.selectedAccountId,
      action: action,
      searchScopes: searchScopes.map(searchScope =>
        Object.assign({}, {
          id: searchScope.id,
          filterType: searchScope.filterType,
          filterLevel: searchScope.filterLevel,
          filterObject: searchScope.filterObject,
          filterValue: searchScope.filterValue,
          updatedAt: searchScope.updatedAt
        })),
      trigger: triggers,
      ruleSchedule: ruleSchedule,
      budgetAdjuster: budgetAdjuster,
      status: status,
      extension: extension,
      updatedAt: values.updatedAt
    };

    if (_.isEqual(data['extension'], {}) === true)
      delete data['extension'];
    if (data.budgetAdjuster.length === 0)
      delete data['budgetAdjuster'];

    return data
  }

  getRuleSchedule(ruleSchedule, actionType, formSchedule) {
    let schedule = [];
    if (operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(actionType)) {
      let scheduleValue = formSchedule && formSchedule.executionDate ? formSchedule.executionDate : moment().add(1, 'M').startOf('M').format("YYYY/MM/DD");
      let executionDate = typeof scheduleValue === "string" ? moment(scheduleValue) : scheduleValue;
      schedule = [
        {
          executionDate: executionDate.format("YYYY/MM/DD"),
          onHours: [],
          dayOfWeek: DateUtil.getDayOfWeekFromIsoNum(executionDate.isoWeekday())
        }
      ]
    } else if (actionType === operationRuleConstant.ACTION_TYPE_ON_OFF) {
      schedule = ruleSchedule.campaignOnOffSchedule.length > 0 ? ruleSchedule.campaignOnOffSchedule : getDefaultSchedule()
    } else {
      schedule = ruleSchedule.actionEnableSchedule.length > 0 ? ruleSchedule.actionEnableSchedule : getDefaultSchedule()
    }
    return schedule
  }

  changeTriggers(triggerSteps) {
    let self = this;
    return triggerSteps.map(function (triggerStep) {
      if (triggerConstant.TRIGGER_BUDGET_SHORT_STATUS.indexOf(triggerStep.boundaryValue) !== -1) {
        let triggerOperatorValue = "LESS";
        if (triggerStep.triggerOperator === triggerConstant.TRIGGER_OPERATOR_EQUAL)
          triggerOperatorValue = "GREATER_OR_EQUAL";
        if (triggerStep.boundaryValue === triggerConstant.TRIGGER_BUDGET_SHORT_DAILY_STATUS)
          return Object.assign({}, triggerStep, {
            boundaryValue: undefined,
            timeRange: "TODAY",
            triggerComparable: "COST",
            boundaryVariable: {
              variable: "DailyBudget",
              rate: triggerStep.costRateParam / 100
            },
            triggerOperator: triggerOperatorValue
          });
        else return Object.assign({}, triggerStep, {
          boundaryValue: undefined,
          timeRange: "CURRENTMONTH",
          triggerComparable: "COST",
          boundaryVariable: {
            variable: "MonthlyBudget",
            rate: triggerStep.costRateParam / 100
          },
          triggerOperator: triggerOperatorValue
        })
      } else {
        let newBoundaryValue = self.formatBoundaryValue(triggerStep.boundaryValue.trim());
        return Object.assign({}, triggerStep, {
            boundaryVariable: undefined,
            boundaryValue: newBoundaryValue
          }
        )
      }
    })
  }


  formatYahooTrigger(triggerSteps) {
    let newTriggerSteps = [...triggerSteps];
    newTriggerSteps[0] = Object.assign({}, newTriggerSteps[0], {boundaryValue: this.formatBoundaryValue(newTriggerSteps[0].boundaryValue.trim())});
    return newTriggerSteps
  }

  formatBoundaryValue(boundaryValue) {
    if (boundaryValue.replace("0", "") === "") {
      return "0"
    }
    // delete starting 0s
    let count = 0;
    while (boundaryValue[count] === "0")
      count++;
    boundaryValue = boundaryValue.substring(count, boundaryValue.length);

    //delete 0s at the end after the point
    if (boundaryValue.indexOf(".") > -1) {
      let endOfValue = boundaryValue.length - 1;
      while (boundaryValue[endOfValue] === "0")
        endOfValue--;
      boundaryValue = boundaryValue.substring(0, endOfValue + 1)
    }

    // insert 0 if number is , for example .23,.34
    if (boundaryValue.indexOf(".") === 0) {
      boundaryValue = "0".concat(boundaryValue)
    }
    return boundaryValue
  }

  getTriggers(triggerList) {
    const mediaYahoo = this.props.account.selectedAccount.media === operationRuleConstant.MEDIA_LIST.YAHOO ||
      this.props.account.selectedAccount.media === operationRuleConstant.MEDIA_LIST.FACEBOOK;
    let trigger = triggerList.map(value => {
        return {
          id: value.id ? value.id : 0,
          triggerSteps: mediaYahoo ? this.formatYahooTrigger(value.triggerSteps) : this.changeTriggers(value.triggerSteps),
          joinCondition: "OR",
          status: value.status,
          updatedAt: value.updatedAt,

        }
      }
    );
    return trigger
  }

  getSearchScopeForCampaign(campaignSearchScopes, media) {
    if (campaignSearchScopes.length === 0 || !campaignSearchScopes[0].filterValue)
      return [];
    else return [{
      id: campaignSearchScopes[0].id ? campaignSearchScopes[0].id : 0,
      filterLevel: "CAMPAIGN",
      filterObject: "CAMPAIGN_NAME",
      filterType: campaignSearchScopes[0].filterType ? campaignSearchScopes[0].filterType : operationRuleConstant.FILTER_TYPE_LIST[media][0].value,
      filterValue: campaignSearchScopes[0].filterValue,
      updatedAt: campaignSearchScopes[0].updatedAt ? campaignSearchScopes[0].updatedAt : undefined
    }]
  }

  getSearchScopeForIncreaseDecreaseAdBid(searchScopes, media) {
    if (searchScopes.length === 0 || !searchScopes[0].filterValue)
      return [];
    else {
      let objectValue = searchScopes[0].selectedFilterLevel ? searchScopes[0].selectedFilterLevel : "CAMPAIGN_NAME";
      let levelValue = objectValue === "CAMPAIGN_NAME" ? "CAMPAIGN" : "ADGROUP";
      return [{
        id: searchScopes[0].id ? searchScopes[0].id : 0,
        filterObject: objectValue,
        filterLevel: levelValue,
        filterType: searchScopes[0].filterType ? searchScopes[0].filterType : operationRuleConstant.FILTER_TYPE_LIST[media][0].value,
        filterValue: searchScopes[0].filterValue,
        updatedAt: searchScopes[0].updatedAt ? searchScopes[0].updatedAt : undefined
      }]
    }

  }

  getSearchScopesAll(searchScopesForCampaign, searchScopes, actionType, media) {
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.YAHOO:
        switch (actionType) {
          case operationRuleConstant.ACTION_TYPE_INCREASE_AD_BID:
          case operationRuleConstant.ACTION_TYPE_DECREASE_AD_BID:
          case operationRuleConstant.ACTION_TYPE_CAMPAIGN_ON:
          case operationRuleConstant.ACTION_TYPE_CAMPAIGN_OFF:
          case operationRuleConstant.ACTION_TYPE_ACCOUNT_ON:
          case operationRuleConstant.ACTION_TYPE_ACCOUNT_OFF:
          case operationRuleConstant.ACTION_TYPE_AD_GROUP_ON:
          case operationRuleConstant.ACTION_TYPE_AD_GROUP_OFF:
          case operationRuleConstant.ACTION_TYPE_AD_ON:
            return this.getSearchScopeForIncreaseDecreaseAdBid(searchScopes, media);
          case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
            return [];
          default:
            return this.getSearchScopeForCampaign(searchScopesForCampaign, media)
        }
      case operationRuleConstant.MEDIA_LIST.NEWLINE:
        return hasOnlySearchScopeForCampaign(this.props.account.selectedAccount.media, actionType) ?
          this.getSearchScopeForCampaign(searchScopesForCampaign, media) : this.getSearchScopes(searchScopes, actionType);
      case operationRuleConstant.MEDIA_LIST.FACEBOOK:
        if (operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(actionType)) {
          return []
        } else {
          return this.getSearchScopes(searchScopes, actionType)
        }
    }
  }

  getSearchScopes(lineSearchScopes, actionType) {
    return lineSearchScopes.filter(line => line.filterValue !== undefined && line.filterValue.length > 0).map(line => {
      let filterType = line.filterType;
      if (isShowExcludeSearchScope(this.props.account.selectedAccount.media, actionType) &&
        line.optionType.selectedOption === "EXCLUDE" && filterType.indexOf('_EXCLUDE') < 0) {
        filterType = line.filterType + '_EXCLUDE'
      }
      return {
        id: line.id ? line.id : 0,
        filterType: filterType,
        filterLevel: line.filterLevelVal,
        filterObject: line.selectedFilterLevel,
        filterValue: line.filterValue,
        updatedAt: line.updatedAt,
      }
    })
  }

  getAction(ruleValue) {
    const actionOfRule = ruleValue.action;
    const media = this.props.account.selectedAccount.media;
    const action = operationRuleConstant.ACTION_TYPE[media].find(actionType => actionType.value == actionOfRule.actionType);
    let actionData = {
      actionType: actionOfRule.actionType,
      actionObject: action.actionObject
    };
    const currency = this.props.account.selectedAccount && this.props.account.selectedAccount.currency ? this.props.account.selectedAccount.currency : 'JPY';
    if (actionOfRule.actionType !== "SET_CPN_SPEND_CAP") {
      const actionConfig = getActionConfig(actionOfRule.actionType);
      if (actionConfig.isVisibleNumberParameter) {
        if (actionOfRule.actionNumberParameter === undefined)
          actionData.actionNumberParameter = "";
        else actionData.actionNumberParameter = actionOfRule.actionNumberParameter.toString().trim()
      }
      if (actionConfig.isVisibleUnitParameter) {
        const actionUnitParameterOptions = getActionUnitParameterOptions(actionOfRule, currency);
        actionData.actionUnitParameter = (actionOfRule.actionUnitParameter && !operationRuleConstant.ACTION.INDICATE_BUDGET.includes(actionOfRule.actionType))
          ? actionOfRule.actionUnitParameter : actionUnitParameterOptions[0].value
      }
    } else {
      const targetCampaign = ruleValue.extension.targetCampaign;
      const cost = targetCampaign.costUntilClosedDate ? (parseFloat(targetCampaign.costUntilClosedDate) + parseFloat(targetCampaign.currentMonthCost)) : parseInt(targetCampaign.currentMonthCost);
      actionData = Object.assign({}, actionData, {
        actionNumberParameter: (cost * CurrencyUtil.getOffsetByCode(currency)).toString(),
        actionUnitParameter: "NUMBER"
      })
    }

    return actionData
  }

  getYahooStdRuleData(actionType) {
    let ruleSettingData = JSON.parse(JSON.stringify(this.props.settingRules))
    let adGroupParameters = []
    if (ruleSettingData.length < 1) {
      adGroupParameters.push({})
    } else {
      if(operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(actionType)) {
        ruleSettingData.map(setting => {
          if(isNumberType(setting.targetCPA)
            || isNumberType(setting.upperLimit)
            || isNumberType(setting.minimumLimit)
            || setting.referenceDay !== "notSet") {
            let adGroupSetting = {
              adGroupId: parseInt(setting.adGroupId, 10)
            }
            if(isNumberType(setting.targetCPA)){
              adGroupSetting.targetCpa = setting.targetCPA
            }
            if(isNumberType(setting.upperLimit)){
              adGroupSetting.upperLimit = setting.upperLimit
            }
            if(isNumberType(setting.minimumLimit)) {
              adGroupSetting.minimumLimit = setting.minimumLimit
            }
            if(setting.referenceDay !== "notSet"){
              adGroupSetting.referenceDay = setting.referenceDay
            }
            adGroupParameters.push(adGroupSetting)
          }
        })
      } else {
        ruleSettingData.map(setting => {
          if(isNumberType(setting.targetCPA)
            || isNumberType(setting.minimumLimit)
            || setting.referenceDay !== "notSet") {
            let adGroupSetting = {
              adGroupId: parseInt(setting.adGroupId, 10)
            }
            if(isNumberType(setting.targetCPA)){
              adGroupSetting.targetCpa = parseInt(setting.targetCPA, 10)
            }
            if(isNumberType(setting.minimumLimit)) {
              adGroupSetting.minimumLimit = parseInt(setting.minimumLimit, 10)
            }
            if(setting.referenceDay !== "notSet"){
              adGroupSetting.referenceDay = setting.referenceDay
            }
            adGroupParameters.push(adGroupSetting)
          }
        })
      }
    }

    return adGroupParameters
  }

  getExtension(extensionValue, actionType) {
    const extensionObj = {};
    if (operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(actionType)) {
      let campaignId = typeof extensionValue.targetCampaign.campaignId == "string" ? extensionValue.targetCampaign.campaignId : extensionValue.targetCampaign.campaignId.value;
      extensionObj.targetCampaign = {
        campaignId: campaignId
      };
      if (actionType === "SET_CPN_SPEND_CAP") {
        let currentMonthCost = extensionValue.targetCampaign.currentMonthCost;
        extensionObj.targetCampaign.startDate = typeof extensionValue.targetCampaign.startDate == "string" ? extensionValue.targetCampaign.startDate : extensionValue.targetCampaign.startDate.format("YYYY/MM/DD");
        extensionObj.targetCampaign.previousClosedDate = DateUtil.getValueFromDatePicker(extensionValue.targetCampaign.previousClosedDate);
        extensionObj.targetCampaign.currentMonthCost = currentMonthCost === '' ? '' : parseInt(currentMonthCost)
      }
    }
    if (operationRuleConstant.AD_ACTION_LIMIT.includes(actionType)) {
      const actionLimit = (typeof extensionValue === 'undefined' || typeof extensionValue.action === 'undefined') ? undefined : extensionValue.action.actionLimit;
      if (actionLimit === undefined)
        return undefined; //Fix: warning when actionLimit doesn't define
      else
        return Object.assign({}, extensionObj, {action: {actionLimit: actionLimit}})
    } else if (actionType === 'ACCOUNT_BUDGET_MONITOR') {
      return Object.assign({}, extensionObj, {action: {accountReactive: extensionValue.action.accountReactive}})
    } else {
      return extensionObj
    }
  }

  handleSaveTrigger(value) {
    if (value.triggerSteps.length === 0) {
      throw new SubmissionError({
        _error: translation.t('rule_form.trigger_step_required')
      })
    }
    if (value.index < 0) {
      this.props.addNewTrigger(Object.assign({}, value, {index: 0}))
    } else {
      this.props.updateTrigger(Object.assign({}, value), value.index)
    }
    this.props.setShowTriggerForm(false)
  }

  renderForm(formName) {
    return (
      <div>
        <StdRuleForm className={formName === operationRuleConstant.FORM_NAME.STD_RULE_FORM ? "" : "hiding"}/>
        <OperationRuleForm onSubmit={this.handleSubmit} getPreviewResultTarget={this.getPreviewResultTarget}
                           getPreviewTargetActionPath={this.getPreviewTargetActionPath.bind(this)}
                           companyCode={this.props.account.companyCode}
                           className={formName === operationRuleConstant.FORM_NAME.SIMPLE_RULE_FORM ? "" : "hiding"}/>
      </div>
    )
  }

  render() {
    return (
      <div class="operation-rule-page">
        <div class="row">
          <div class="col-md-3 left-menu">
            <AccountSelector media={this.props.match.params.media}
                             mediaAccountId={this.props.match.params.mediaAccountId}
                             ruleId={this.props.match.params.ruleId} companyCode={this.props.account.companyCode}/>
            <RuleList/>
          </div>
          <div class="col-md-9 main-page">
            <div className={this.props.ruleInputInterface.isShowForm ? "" : "hiding"}>
              {this.renderForm(this.props.ruleInputInterface.formName)}
            </div>
            <div class="json-text">{this.props.operationRule.jsonText}</div>
          </div>
        </div>
        {this.props.triggerData.isShowTriggerForm ? <TriggerForm onSubmit={this.handleSaveTrigger.bind(this)}/> : null}
        {this.props.ruleSchedule.isVisibleSchedule ?
          <RuleSchedule selectedAccount={this.props.account.selectedAccount}/> : null}
        {this.props.adjustmentRuleSchedule.isVisibleSchedule ? <AdjustmentRuleSchedule/> : null}
        <ModalConfirm/>
        <ModalMessage/>
        <NotificationContainer/>

      </div>
    )
  }
}

OperationRulePage.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    operationRule: state.operationRule,
    triggerData: state.triggerData,
    account: state.account,
    ruleSchedule: state.ruleSchedule,
    adjustmentRuleSchedule: state.adjustmentRuleSchedule,
    ruleInputInterface: state.ruleInputInterface,
    searchScopePath: state.searchScopePath,
    modal: state.modal,
    ruleList: state.ruleList,
    settingRules: state.p4YahooStdRule.settingRules,
    reports: state.p4YahooStdRule.reports,
    adSet: state.p4fCampaignData.adSet,
    spendCapLowerLimit: state.p4fCampaignData.spendCapLowerLimit,
    selectedAccount: state.account.selectedAccount,
    rowCopied: state.stdRule.rowCopied,
  }
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    createOperationRule: operationRuleAction.createOperationRule,
    addNewTrigger: triggerAction.addNewTrigger,
    updateTrigger: triggerAction.updateTrigger,
    setShowTriggerForm: triggerAction.setShowTriggerForm,
    editRule: operationRuleAction.updateOperationRule,
    updateYahooStdRule: operationRuleAction.updateYahooStdRule,
    getLineTargetActionPath: operationRuleAction.getLineTargetActionPath,
    showPreviewRulePopup: showPreviewRulePopup,
    setSelectedRuleIndex: setSelectedRuleIndex,
    showJsonText: operationRuleAction.showJsonText,
    showWarningMsg: modalAction.showWarningNotSave,
    showWarningDuplicateCpnAndDate: modalAction.showWarningDuplicateCpnAndDate,
    showConfirm: modalAction.showConfirm,
    setIsEdit: setIsEdit,
    showErrorMsg: showErrorMsg,
    refreshCopyPaste: refreshCopyPaste,
    resetSearchText: resetSearchText
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(OperationRulePage)
