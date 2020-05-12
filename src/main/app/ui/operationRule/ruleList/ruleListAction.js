import ruleListConstant from '../../../constants/ruleList'
import accountAjax from '../../../ajax/account'
import apiResult from "../../../util/apiResult";
import {convertMedia} from "../../../util/url";
import * as accountAction from "../account/accountAction";
import {loadAccounts} from "../account/accountAction";
import operationRuleAjax from '../../../ajax/operationRule'
import * as operationRuleAction from "../operationRuleAction"
import * as ruleInputInterfaceAction from "../ruleInputInterfaceAction";
import * as triggerAction from "../trigger/triggerAction";
import {showErrorMsg} from "../../notification/notificationAction";
import translation from '../../../util/translation'

export function updateRuleList(rules) {
  return {type: ruleListConstant.UPDATE_RULE_LIST, rules}
}

export function showRuleList() {
  return {type: ruleListConstant.SHOW_RULE_LIST}
}

export function setSelectedRuleIndex(index) {
  return {type: ruleListConstant.SET_SELECTED_RULE_INDEX, index}
}

export function changeRuleStatus(index) {
  return {type: ruleListConstant.CHANGE_RULE_STATUS, index}
}


export function callAjaxChangeStatus(index, operationRuleId, status) {
  return function (dispatch) {
    const constantStat = ruleListConstant.STATUS
    const newStatus = status === constantStat.ENABLED ? constantStat.DISABLED : constantStat.ENABLED
    operationRuleAjax.updateStatus(operationRuleId, newStatus).then(res => {
      dispatch(changeRuleStatus(index))
      dispatch(operationRuleAction.updateOperationRuleFieldValue("statusEnabled",newStatus === constantStat.ENABLED))
      dispatch(operationRuleAction.updateOperationRuleFieldValue("updatedAt",res.data.result.updatedAt))
    }).catch(errors => {
      showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
    })
  }
}

export function getDataForRuleUrl(media, mediaAccountId, ruleId) {
  return function (dispatch) {
    if (media && mediaAccountId && ruleId) {
      accountAjax.list()
        .then(apiResponse => {
          const accListResponse = apiResult.success(apiResponse)
          dispatch(loadAccounts(accListResponse))

          let selectedAcc = accListResponse.accounts.find(acc => convertMedia(acc.media) === media && acc.mediaAccountId === mediaAccountId)

          if (selectedAcc) {
            operationRuleAjax.list(selectedAcc.id)
              .then(apiResponse => {
                const response = (apiResult.success(apiResponse))
                dispatch(accountAction.selectAccount(selectedAcc.id))
                dispatch(showRuleList())
                dispatch(updateRuleList(response))

                let selectedRule = response.find(rule => rule.id.toString() === ruleId)
                if (selectedRule) {
                  const index = response.indexOf(selectedRule)
                  dispatch(setSelectedRuleIndex(index))
                  dispatch(operationRuleAction.loadOperationRule(ruleId, index, selectedAcc))
                  dispatch(ruleInputInterfaceAction.setShowRuleForm(true))
                  dispatch(triggerAction.resetTrigger())
                }
              })
          } else { showErrorMsg(translation.t("error_access_resource"))(dispatch) }
        })
    }
  }
}
