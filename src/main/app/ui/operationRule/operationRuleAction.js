import operationRuleConstant from '../../constants/operationRule'
import operationRuleAjax from '../../ajax/operationRule'
import yahooStdReportsAjax from '../../ajax/yahooStdRule'
import facebookAjax from '../../ajax/portFaceBook'
import portTwitter from '../../ajax/portTwitter'
import apiResult from '../../util/apiResult'
import {changeAccount} from "./account/accountAction"
import {showErrorMsg, showSuccessMsg} from '../notification/notificationAction'
import {resetSchedule, saveSchedule} from '../operationRule/ruleSchedule/ruleScheduleAction'
import {resetScheduleAdjustment, saveScheduleAdjustment} from './budgetAdjustment/adjustmentRuleScheduleAction'
import translation from '../../util/translation'
import {setDataToView} from './form/operationRuleUtil'
import {resetTrigger, showTrigger} from './trigger/triggerAction'
import {change, reset, submit} from 'redux-form'
import portNewLine from '../../ajax/portNewLine'
import {changeTriggerSteps} from "./trigger/triggerForm/p4Line/p4LineTriggerStepUtil"
import {setIsEdit, setShowRuleForm, setForm} from './ruleInputInterfaceAction'
import {addAction, showWarning} from '../../ui/modal/modalAction'
import {
  getCampaigns, getCostToday,
  getTotalMinCost,
  resetCostToday, resetTotalMinCost
} from "../../ui/operationRule/form/p4Facebook/p4fCampaignDataAction"
import {updatePreviousCost} from "./form/p4Facebook/p4fCampaignDataAction"
import DateUtil from "../../util/date";
import {blockUI, sleep} from "../../util/form";
import {resetEditedCell, resetSettingRule, updateReports, refreshSettingRule, resetReportPeriod} from "./form/p4Yahoo/p4YahooStdRuleAction";
import {getTableData} from "./form/operationRuleUtil"
import {
  updateActionType,
  updateTableData,
  updateStdRuleName,
  splitAndSaveReportsByTimeRange,
  changeConversionType
} from "./form/stdRuleAction"
import stdRuleConstant from "./form/stdRuleConstant";
import stdRule from "../../constants/standardRule";

export function remoteSubmitOperationRuleForm(additionAction) {
  return function (dispatch) {
    blockUI()
    sleep(100).then(() => {
      dispathPromise(setSpendCapFlag(true), dispatch).then(() => {
        dispatch(addAction(additionAction))
        dispatch(submit('operationRuleForm'))
        dispatch(setSpendCapFlag(false))
        $.unblockUI();
      })
    })
  }
}

export function checkChangeRule(rule, formName, func) {
  return function () {
    if (rule !== null && formName === operationRuleConstant.FORM_NAME.SIMPLE_RULE_FORM) {
      remoteSubmitOperationRuleForm(func())
    } else
      func()
  }
}

const dispathPromise = (action, dispatch) => new Promise((resolve, reject) => {
  dispatch(action)
  resolve();
})

export function createOperationRule(operationRule, accountId) {
  return function (dispatch) {
    operationRuleAjax.create(operationRule, accountId).then(function (response) {
      dispatch(resetTrigger())
      dispatch(setShowRuleForm(false))
      dispatch(changeAccount(accountId))
      dispatch(resetSchedule())
      dispatch(resetScheduleAdjustment())
      dispatch(resetCostToday())
      dispatch(resetTotalMinCost())
      showSuccessMsg(translation.t('rule_form.created_success'))(dispatch)
      dispatch(setIsEdit(true))
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function resetOperationRuleForm() {
  return function (dispatch) {
    dispatch(reset('operationRuleForm'))
  }
}

export function removeOperationRule(operationRuleId, accountId) {
  return function (dispatch) {
    operationRuleAjax.delete(operationRuleId).then(function (response) {
      dispatch(setShowRuleForm(false))
      dispatch(changeAccount(accountId))
      showSuccessMsg(translation.t('rule_form.delete_success'))(dispatch)
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function removeYahooStdRule(operationRuleId, accountId) {
  return function (dispatch) {
    operationRuleAjax.deleteYahooStdRule(operationRuleId).then(function (response) {
      dispatch(setShowRuleForm(false))
      dispatch(changeAccount(accountId))
      showSuccessMsg(translation.t('rule_form.delete_success'))(dispatch)
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function updateOperationRule(operationRuleId, data, accountId) {
  return function (dispatch) {
    operationRuleAjax.update(operationRuleId, data).then(function (response) {
      dispatch(resetTrigger())
      dispatch(setShowRuleForm(false))
      dispatch(setDefaultForSearchScope())
      dispatch(changeAccount(accountId))
      dispatch(resetSchedule())
      showSuccessMsg(translation.t('rule_form.updated_success'))(dispatch)
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function updateYahooStdRule(operationRuleId, data, accountId) {
  return function (dispatch) {
    operationRuleAjax.updateYahooStdRule(data).then(function (response) {
      dispatch(resetTrigger())
      dispatch(setShowRuleForm(false))
      dispatch(setDefaultForSearchScope())
      dispatch(changeAccount(accountId))
      dispatch(resetSchedule())
      dispatch(resetEditedCell())
      dispatch(resetSettingRule())
      showSuccessMsg(translation.t('rule_form.updated_success'))(dispatch)
      dispatch(setIsEdit(true))
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function loadOperationRule(operationRuleId, index, selectedAccount) {
  return function (dispatch) {
    operationRuleAjax.detail(operationRuleId).then(function (response) {
      //Use for warning when user edit not save
      localStorage.removeItem('rule')
      const media = (selectedAccount) ? selectedAccount.media : ""
      const operationRule = setDataToView(response.data.result, media)
      const trigger = response.data.result.trigger
      const extension = response.data.result.extension
      const actionType = operationRuleConstant.ACTION_TYPE[media].find(action => {
        return action.key === operationRule.action.actionType})
      dispatch(resetOperationRuleForm())
      dispatch(resetTrigger())
      dispatch(resetSchedule())
      dispatch(resetScheduleAdjustment())
      dispatch(resetEditedCell())
      dispatch(resetSettingRule())
      dispatch(resetReportPeriod())
      dispatch(change('operationRuleForm', 'searchScopeForCampaign', operationRule.searchScopeForCampaign))
      dispatch(change('operationRuleForm', 'searchScope', operationRule.searchScope))
      dispatch(showOperationRule(operationRule, index))
      dispatch(saveSchedule(response.data.result.ruleSchedule, operationRule.action.actionType))

      if (response.data.result.budgetAdjuster && operationRule.action.actionType === operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET)
        dispatch(saveScheduleAdjustment(response.data.result.budgetAdjuster))

      if (operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(operationRule.action.actionType)) {
        dispatch(getCampaigns(selectedAccount.mediaAccountId))
      }

      if (operationRule.action.actionType === operationRuleConstant.ACTION_TYPE_SET_SPEND_CAP) {
        dispatch(loadSetCPNSpendCap(operationRule, selectedAccount))
      }

      if(operationRule.action.actionType === operationRuleConstant.ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE){
        const targetCampaign = operationRule.extension.targetCampaign
        dispatch(getTotalMinCost(targetCampaign.campaignId))
      }

      if (!stdRuleConstant.STD_RULE_ACTIONS.includes(operationRule.action.actionType)) {
        localStorage.setItem('rule', JSON.stringify(transformWithSetSpendCapAction(response.data.result)))
        dispatch(showTrigger(changeTriggerSteps(response.data.result.trigger)))
      }

      if (stdRuleConstant.STD_RULE_ACTIONS.includes(operationRule.action.actionType)) {
        switch (media) {
          case operationRuleConstant.MEDIA_LIST.FACEBOOK:
            dispatch(loadStructureSTDRule(media, selectedAccount, operationRule, trigger, actionType))
            break
          case operationRuleConstant.MEDIA_LIST.TWITTER:
            dispatch(loadReportSTDRule(portTwitter, media, selectedAccount, operationRule, trigger, actionType))
            break
          case operationRuleConstant.MEDIA_LIST.NEWLINE:
            dispatch(loadReportSTDRule(portNewLine, media, selectedAccount, operationRule, trigger, actionType, extension))
            break
          case operationRuleConstant.MEDIA_LIST.YAHOO:
            dispatch(loadReportYhSTDRule(operationRule, selectedAccount))
            break
        }
      }
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

function transformWithSetSpendCapAction(data) {
  if (data.action.actionType === 'SET_CPN_SPEND_CAP') {
    let isLessThanOrEqualCurrentDate = new Date() >= new Date(data.ruleSchedule[0].executionDate)
    if (isLessThanOrEqualCurrentDate === true) {
      let targetCampaign = Object.assign({}, data.extension.targetCampaign, {currentMonthCost: ''})
      let newData = Object.assign({}, data, {
        action: Object.assign({}, data.action, {actionNumberParameter: 'NaN'}),
        extension: Object.assign({}, data.extension, {targetCampaign: targetCampaign})
      })
      return newData
    }
  }
  return Object.assign({}, data)
}

export function resetAndCreateNewRule(defaultOperationRuleName, defaultAction) {
  return function (dispatch) {
    dispatch(resetOperationRuleForm())
    dispatch(resetTotalMinCost())
    dispatch(resetCostToday())
    dispatch(createNewRule(defaultOperationRuleName, defaultAction))
  }
}

export function resetAction() {
  return {type: operationRuleConstant.RESET_ACTION}
}

export function showOperationRule(operationRule, index) {
  return {type: operationRuleConstant.SHOW_OPERATION_RULE_DETAIL, operationRule, index}
}

export function createNewRule(defaultOperationRuleName, defaultAction) {
  return {
    type: operationRuleConstant.CREATE_NEW_RULE,
    isVisibleNumber: defaultAction.isVisibleNumber,
    isVisibleParameter: defaultAction.isVisibleParameter,
    isVisibleActionLimit: defaultAction.isVisibleActionLimit,
    defaultOperationRuleName: defaultOperationRuleName,
    defaultAction: defaultAction
  }
}

export function updateOperationRuleFieldValue(fieldName, fieldValue) {
  return function (dispatch) {
    dispatch(change("operationRuleForm", fieldName, fieldValue))
  }
}

export function setOperationRuleId(id) {
  return {type: operationRuleConstant.SET_OPERATION_RULE_ID, id}
}

export function copyOperationRule(oldOperationName) {
  return function (dispatch) {
    dispathPromise(setOperationRuleId(0), dispatch).then(() => {
      dispatch(change("operationRuleForm", "operationName", 'Copy of ' + oldOperationName))
      dispatch(setIsEdit(false))
      dispatch(setShowRuleForm(true))
    })
  }
}

export function copyOperationRuleToOtherAccount(oldOperationName) {
  return function (dispatch) {
    dispathPromise(setOperationRuleId(0), dispatch).then(() => {
      dispatch(change("operationRuleForm", "operationName", 'Copy of ' + oldOperationName))
      dispatch(setIsEdit(false))
      dispatch(setShowRuleForm(true))
    })
  }
}

export function changeNextDayActivateStatus(accountReactive) {
  return function (dispatch) {
    dispatch(change("operationRuleForm", "extension.action.accountReactive", !accountReactive))
  }
}

//todo: remove after test
export function getLineTargetActionPath(data, media) {

  let port = portNewLine;

  return function (dispatch) {
    port.targetActionPath(data).then(function (response) {
      dispatch(showTargetActionPathFromLine(response.data.result))
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function showJsonText(text) {
  return {type: operationRuleConstant.SHOW_JSON_TEXT, text}
}

//todo: remove after test
export function showTargetActionPathFromLine(data) {
  return {type: operationRuleConstant.SHOW_TARGET_ACTION_PATH_FROM_LINE, data}
}

export function setDefaultForSearchScope() {
  return {type: operationRuleConstant.SET_DEFAULT_FOR_SEARCH_SCOPE}
}

export function resetSearchScopes() {
  return function (dispatch) {
    dispatch(change('operationRuleForm', 'searchScope', []))
    dispatch(change('operationRuleForm', 'searchScopeForCampaign', []))
  }
}

export function showJson(id) {
  return function (dispatch) {
    operationRuleAjax.showJson(id).then(function (response) {
      dispatch(showJsonText(JSON.stringify(response.data.result.operationRuleDTO)))
    }, function (errors) {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function setSpendCapFlag(flag) {
  return {type: operationRuleConstant.SET_SPEND_CAP_FLAG, flag}
}

function loadSetCPNSpendCap(operationRule, selectedAccount) {
  return function (dispatch) {
    const targetCampaign = operationRule.extension.targetCampaign
    const executionDate = operationRule.schedule.executionDate
    if (executionDate <= DateUtil.getToday("YYYY/MM/DD")) {
      dispatch(change('operationRuleForm', 'extension.targetCampaign.currentMonthCost', ''))
    }
    dispatch(updatePreviousCost(
      targetCampaign.campaignId,
      targetCampaign.startDate,
      targetCampaign.previousClosedDate
    ))
    dispatch(getCostToday(
      targetCampaign.campaignId,
      targetCampaign.startDate,
      selectedAccount.currency
    ))
  }
}

function loadStructureSTDRule(media, selectedAccount, operationRule, trigger, actionType) {
  return function (dispatch) {
    facebookAjax.getAdSets(selectedAccount.mediaAccountId).then(function (response) {
      let adOffTableData = getTableData(trigger, response.data.result.adSetList, media, actionType)
      dispatch(updateTableData(adOffTableData))
      dispatch(setForm(operationRule.action.actionType))
      dispatch(updateActionType(actionType))
      dispatch(updateStdRuleName(operationRule.operationName))
    }, function (errors) {
      showErrorMsg("Can't get ad Set: " + errors)
    })
  }
}

function loadReportYhSTDRule(operationRule, selectedAccount) {
  return function (dispatch) {
    yahooStdReportsAjax.getReports(selectedAccount.id).then(function (response) {
      let validSetting = operationRule.extension.adGroupParameters.filter(setting => {
        return response.data.result.periodReports[0].reportParameters.find(report => {
          return report.adGroupId === setting.adGroupId}) !== undefined
      })
      dispatch(refreshSettingRule(validSetting))
      dispatch(updateReports(response.data.result.periodReports))
      if(operationRule.extension.checkDiff){
        dispatch(showWarning([translation.t('p4YahooDifferenceSettingWarning')]))
      }
    }, function (errors) {
      showErrorMsg("Can't get report: " + errors)
    })
  }
}

function loadReportSTDRule(portAjax, media, selectedAccount, operationRule, trigger, actionType, extension) {
  return function (dispatch) {
    const conversion = media === operationRuleConstant.MEDIA_LIST.NEWLINE
      ? getConversionForNewLine(extension) : stdRule.CONVERSION_NEW_LINE_DEFAULT
    portAjax.getReports(selectedAccount.mediaAccountId).then(response => {
      splitAndSaveReportsByTimeRange(response.data.result)
      dispatch(changeConversionType(conversion))
      const key = "reports_30DAY"
      const reports = JSON.parse(localStorage.getItem("reports"))[key]
      let tableData = getTableData(trigger, reports, media, actionType)
      dispatch(updateTableData(tableData))
      dispatch(setForm(operationRule.action.actionType))
      dispatch(updateActionType(actionType))
      dispatch(updateStdRuleName(operationRule.operationName))
    }, error => {
      showErrorMsg("Can't get report: " + error)
    })
  }
}

function getConversionForNewLine(extension) {
  const mapConversion = stdRule.MAP_CONVERSION_NEW_LINE
  const conversionInExtension = extension.action.conversion
  return mapConversion.hasOwnProperty(conversionInExtension)
    ? mapConversion[conversionInExtension]
    : stdRule.CONVERSION_NEW_LINE_DEFAULT
}
