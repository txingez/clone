import p4fCampaignDataConstant from "../../../../constants/p4fCampaignData"
import portFacebook from "../../../../ajax/portFaceBook"
import {showErrorMsg} from "../../../notification/notificationAction"
import apiResult from "../../../../util/apiResult"
import {change} from 'redux-form'
import moment from "moment"
import DateUtil from "../../../../util/date";


export function updateCampaignList(campaigns) {
  return {type: p4fCampaignDataConstant.UPDATE_FB_CAMPAIGNS, data: campaigns}
}
export function updateCostToday(costToday,currency) {
  return {type: p4fCampaignDataConstant.UPDATE_COST_TODAY, data: costToday, currency: currency}
}

export function updateTotalMinCost(adSet) {
  return {type: p4fCampaignDataConstant.UPDATE_FB_TOTAL_MIN_COST, data: adSet}
}

export function resetCostToday() {
  return {type: p4fCampaignDataConstant.RESET_COST_TODAY}
}

export function resetTotalMinCost() {
  return {type: p4fCampaignDataConstant.RESET_FB_TOTAL_MIN_COST}
}

export function getCampaigns(accountId) {
  return function (dispatch) {
    portFacebook.getCampaigns(accountId)
      .then(function (response) {
        const result = response.data.result
        const campaigns = result.campaigns.map(
          (campaign) => {
            return Object.assign({}, campaign, {startDate: moment(campaign.startDate).format("YYYY/MM/DD")})
          })
        dispatch(updateCampaignList(campaigns))
      }, function (errors) {
        showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
      })
  }
}

export function updatePreviousCost(campaignId, startDate, previousClosedDate) {
  return function (dispatch) {
    if (!previousClosedDate) {
      dispatch(
        change(
          'operationRuleForm',
          'extension.targetCampaign.costUntilClosedDate',
          0
        )
      )
    } else {
      const targetCampaignId = typeof campaignId === "string" ? campaignId : campaignId.value
      const startDateStr = DateUtil.convertDateByFormat(startDate, "YYYY-MM-DD")
      const previousClosedDateStr = DateUtil.convertDateByFormat(previousClosedDate, "YYYY-MM-DD")
      portFacebook.getCampaignCost(targetCampaignId, startDateStr, previousClosedDateStr)
        .then(function (response) {
          let result = response.data.result
          dispatch(
            change(
              'operationRuleForm',
              'extension.targetCampaign.costUntilClosedDate',
              result.cost >= 0 ? result.cost : 0
            )
          )
        }, function (errors) {
          showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
        })
    }
  }
}

export function getCostToday(campaignId, startDate, currency) {
  return function (dispatch) {
    const targetCampaignId = typeof campaignId === "string" ? campaignId : campaignId.value
    const startDateStr = DateUtil.convertDateByFormat(startDate, "YYYY-MM-DD")
    const todayStr = DateUtil.getToday("YYYY-MM-DD")
    portFacebook.getCampaignCost(targetCampaignId, startDateStr, todayStr)
      .then(function (response) {
        let result = response.data.result
        result.cost >= 0 ? dispatch(updateCostToday(result.cost,currency)) : dispatch(updateCostToday(0))
      }, function (errors) {
        showErrorMsg(apiResult.error(errors).join(" "))(dispatch)
      })
  }
}

export function updateSelectedCampaignId(campaignId) {
  return (dispatch) => {
    dispatch(change('operationRuleForm', 'extension.targetCampaign.campaignId', campaignId))
    dispatch(getTotalMinCost(campaignId))
  }
}

export function updateRuleNameWithCampaignId(name) {
  return (dispatch) => {
    dispatch(change('operationRuleForm', 'operationName', name))
  }
}

export function updateTargetCampaign(targetCampaign) {
  return (dispatch) => {
    dispatch(change('operationRuleForm', 'extension.targetCampaign', targetCampaign))
  }
}

export function getTotalMinCost(campaignId) {
  return function (dispatch) {
    portFacebook.getTotalMinCost(campaignId)
      .then(function (response) {
        let result = response.data.result
        dispatch(updateTotalMinCost(result))
      }, function (errors) {
        showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
      })
  }
}
