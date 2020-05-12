import accountConstant from '../../../constants/account'
import operationRuleAjax from '../../../ajax/operationRule'
import apiResult from '../../../util/apiResult'
import { updateRuleList, showRuleList, setSelectedRuleIndex } from '../ruleList/ruleListAction'
import accountAjax from '../../../ajax/account'
import {showErrorMsg} from '../../notification/notificationAction'
import {convertMedia} from "../../../util/url"
import * as ruleInputInterfaceAction from '../ruleInputInterfaceAction'
import * as triggerAction from '../trigger/triggerAction'
import { resetAction } from '../operationRuleAction'
import translation from '../../../util/translation'

export function selectAccount(accountId) {
  return { type: accountConstant.SELECT_ACCOUNT, accountId }
}

export function selectAccountToCopyRule(accountId) {
  return { type: accountConstant.SELECT_ACCOUNT_TO_COPY_RULE, accountId }
}

export function loadAccounts(response) {
  return { type: accountConstant.LOAD_ACCOUNTS, response}
}

export function changeAccount(accountId) {
  return function (dispatch) {
    if (accountId) {
      operationRuleAjax.list(accountId)
        .then(apiResponse => {
          const response = (apiResult.success(apiResponse))
          dispatch(ruleInputInterfaceAction.setShowRuleForm(false))
          dispatch(setSelectedRuleIndex(-1))
          dispatch(triggerAction.resetTrigger())

          dispatch(resetAction())
          dispatch(selectAccount(accountId))
          dispatch(showRuleList())
          dispatch(updateRuleList(response))
        })
        .catch((errors) => {
          showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
        })
    } else { showErrorMsg(translation.t("error_access_resource"))(dispatch) }
  }
}

export function loadRuleList(accountId) {
  return function (dispatch) {
    if (accountId) {
      operationRuleAjax.list(accountId)
        .then(apiResponse => {
          const response = (apiResult.success(apiResponse))
          dispatch(setSelectedRuleIndex(-1))
          dispatch(showRuleList())
          dispatch(updateRuleList(response))
        })
        .catch((errors) => {
          showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
        })
    }
  }
}

export function getAccounts() {
  return function (dispatch) {

    accountAjax.list()
      .then(apiResponse => {
        const response = apiResult.success(apiResponse)
        dispatch(loadAccounts(response))
      })
      .catch((errors) => {
        showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
      })
  }
}

export function updateFilterMedias(medias) {
  return {type: accountConstant.UPDATE_FILTER_MEDIAS, medias}
}

export function getDataForAccUrl(media, mediaAccountId) {
  return function (dispatch) {
    if (media && mediaAccountId) {
      accountAjax.list()
        .then(apiResponse => {
          const accListResponse = apiResult.success(apiResponse)
          dispatch(loadAccounts(accListResponse))

          let selectedAcc = accListResponse.accounts.find(acc => convertMedia(acc.media) === media && acc.mediaAccountId === mediaAccountId)
          dispatch(changeAccount(selectedAcc ? selectedAcc.id : undefined))
        })
    }
  }
}

