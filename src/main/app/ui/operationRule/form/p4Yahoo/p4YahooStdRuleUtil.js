import React from "react";
import operationRuleConstant from '../../../../constants/operationRule';
import {isNumberType} from "../operationRuleUtil";

export function validateData(action, rowData) {
  const targetCPACheck = isNumberType(rowData.targetCPA)
  const referenceDayCheck = rowData.referenceDay != undefined ? rowData.referenceDay != "notSet": false
  if (operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType)) {
    return (targetCPACheck && referenceDayCheck)
  } else {
    return (isNumberType(rowData.minimumLimitCPC) && targetCPACheck && referenceDayCheck)
  }
}

export function getErrorSettingRule(action, rows) {
  let errorRows = []
  rows.forEach(rowData => {
    if(!validateData(action, rowData)){
      errorRows.push(rowData.adGroupId)
    }
  })
  return errorRows
}


