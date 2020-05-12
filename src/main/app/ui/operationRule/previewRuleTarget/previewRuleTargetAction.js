import previewRuleTargetConstant from '../../../constants/previewRuleTarget'
import {showErrorMsg} from "../../notification/notificationAction"
import apiResult from "../../../util/apiResult"
import portNewLine from "../../../ajax/portNewLine"
import portFaceBook from "../../../ajax/portFaceBook"
import {sortByCampaignName,deleteDuplicateEvaluatedValue} from "./previewRuleTargetUtil"
import operationRuleConstant from "../../../constants/operationRule";

export function setVisiblePreviewRuleTarget (isVisible) {
  return { type: previewRuleTargetConstant.SET_SHOW_RULE_TARGET, value: isVisible }
}

export function updateListPreviewRuleTarget (data) {
  return {type: previewRuleTargetConstant.SAVE_RULE_TARGET, data}
}

export function showPreviewRulePopup(data) {
  switch (data.media) {
    case operationRuleConstant.MEDIA_LIST.NEWLINE: {
      return function (dispatch) {
        let port = portNewLine
        port.previewTarget(data).then(function (response) {
          let result = response.data.result.filter((path) => {
            switch (data.action.actionObject) {
              case "AD":
                return path.adId !== undefined
              case "ADGROUP":
                return path.adGroupId !== undefined
              case "CAMPAIGN":
                return path.campaignId !== undefined
            }
          }).map((targetPath, idx) => Object.assign(targetPath, {index: idx + 1}))

          dispatch(updateListPreviewRuleTarget(result))
          dispatch(setVisiblePreviewRuleTarget(true))
        }, function (errors) {
          showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
        })
      }
    }
    case operationRuleConstant.MEDIA_LIST.FACEBOOK: {
      return function (dispatch) {
        switch (data.action.actionType)
        {
          case operationRuleConstant.ACTION_TYPE_INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY:
          {data.action.actionType = operationRuleConstant.ACTION_TYPE_FACEBOOK_NOT_HOURLY[0]
            data.trigger = []
            break;

          }
          case operationRuleConstant.ACTION_TYPE_DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY: {
            data.action.actionType = operationRuleConstant.ACTION_TYPE_FACEBOOK_NOT_HOURLY[1]
            data.trigger = []
            break;
          }
          case operationRuleConstant.ACTION_TYPE_INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY: {
            data.action.actionType = operationRuleConstant.ACTION_TYPE_FACEBOOK_NOT_HOURLY[2]
            data.trigger = []
            break;
          }
        }
        let port = portFaceBook
        port.targetActionPath(data).then(function (response) {
          let result = response.data.result
          if (data.action.actionObject === "CAMPAIGN")
          {
            result = sortByCampaignName(result)
            result = deleteDuplicateEvaluatedValue(result)
          }
          result = result.map((targetPath, idx) => Object.assign(targetPath, {index: idx + 1}))
          dispatch(updateListPreviewRuleTarget(result))
          dispatch(setVisiblePreviewRuleTarget(true))
        }, function (errors) {
          showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
        })
      }
    }
  }
}
