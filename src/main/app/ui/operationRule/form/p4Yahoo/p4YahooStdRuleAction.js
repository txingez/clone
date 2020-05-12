import P4YahooStdRuleConstants from './p4YahooStdRuleConstant'
import stdRule from "../../../../constants/standardRule";
import {resetCopyPaste} from "../stdRuleAction";

export function resetEditedCell() {
  return { type: P4YahooStdRuleConstants.RESET_EDITED_CELL}
}

export function resetSettingRule() {
  return { type: P4YahooStdRuleConstants.RESET_SETTING_RULE}
}

export function resetMinimumLimitValues() {
  return { type: P4YahooStdRuleConstants.RESET_MINIMUM_LIMIT_VALUES}
}

export function updateReports(reports) {
  return { type: P4YahooStdRuleConstants.UPDATE_REPORTS, reports: reports }
}

export function updateReportPeriod(reportPeriod) {
  return { type: P4YahooStdRuleConstants.UPDATE_REPORT_PERIOD, reportPeriod: reportPeriod }
}

export function resetReportPeriod() {
  return { type: P4YahooStdRuleConstants.UPDATE_REPORT_PERIOD, reportPeriod: P4YahooStdRuleConstants.VALUE_DEFAULT.REPORT_PERIOD_DEFAULT }
}

export function updateEditedCell(updateRows, editedCell) {
  let updateEditedCell = JSON.parse(JSON.stringify(editedCell))
  updateRows.forEach((updateRow) => {
    let row = updateEditedCell.findIndex(row => {
      return row.rowIndex === updateRow.rowIndex
    })
    if( row === -1) {
      updateEditedCell.push({rowIndex: updateRow.rowIndex, cols: updateRow.cols})
    } else {
      const newCols = Array.from(new Set(updateEditedCell[row].cols.concat(updateRow.cols)));
      updateEditedCell[row].cols = newCols
    }
  })
  return { type: P4YahooStdRuleConstants.UPDATE_EDITED_CELL, editedCell: updateEditedCell}
}

export function refreshSettingRule(newSettingRule) {
  return { type: P4YahooStdRuleConstants.UPDATE_SETTING_RULE, settingRules: newSettingRule}
}

export function updateSettingRule(adGroupId, updateData, settingRule) {
  let updateSettingRule = JSON.parse(JSON.stringify(settingRule))
  let adGroupSetting = updateSettingRule.find(adg => {
    return adg.adGroupId === adGroupId
  })
  if(adGroupSetting === undefined) {
    let updateAdGroupSetting = {
      adGroupId: adGroupId,
      referencePeriod: P4YahooStdRuleConstants.VALUE_DEFAULT.REFERENCE_PERIOD_NOT_SET,
      referenceDay: P4YahooStdRuleConstants.VALUE_DEFAULT.REFERENCE_DAY_NOT_SET,
      targetCPA: P4YahooStdRuleConstants.VALUE_DEFAULT.TARGET_CPA_NOT_SET,
      upperLimit: P4YahooStdRuleConstants.VALUE_DEFAULT.UPPER_LIMIT_NOT_SET,
      minimumLimit: P4YahooStdRuleConstants.VALUE_DEFAULT.MINIMUM_LIMIT_NOT_SET
    }
    updateData.map(data => {
      switch(data.field) {
        case stdRule.COLUMN_NAME.REFERENCE_DAY:
          updateAdGroupSetting.referenceDay = data.value
          break;
        case stdRule.COLUMN_NAME.REFERENCE_PERIOD:
          updateAdGroupSetting.referencePeriod = data.value
          break;
        case stdRule.COLUMN_NAME.TARGET_CPA:
          updateAdGroupSetting.targetCPA = data.value
          break;
        case stdRule.COLUMN_NAME.UPPER_LIMIT:
          updateAdGroupSetting.upperLimit = data.value
          break;
        case stdRule.COLUMN_NAME.MINIMUM_LIMIT:
          updateAdGroupSetting.minimumLimit = data.value
          break;
        case stdRule.COLUMN_NAME.MINIMUM_LIMIT_CPC:
          updateAdGroupSetting.minimumLimit = data.value
          break;
      }
    })
    updateSettingRule.push(updateAdGroupSetting)
  } else {
    updateData.map(data => {
      switch(data.field) {
        case stdRule.COLUMN_NAME.REFERENCE_DAY:
          adGroupSetting.referenceDay = data.value
          break;
        case stdRule.COLUMN_NAME.REFERENCE_PERIOD:
          adGroupSetting.referencePeriod = data.value
          break;
        case stdRule.COLUMN_NAME.TARGET_CPA:
          adGroupSetting.targetCPA = data.value
          break;
        case stdRule.COLUMN_NAME.UPPER_LIMIT:
          adGroupSetting.upperLimit = data.value
          break;
        case stdRule.COLUMN_NAME.MINIMUM_LIMIT:
          adGroupSetting.minimumLimit = data.value
          break;
        case stdRule.COLUMN_NAME.MINIMUM_LIMIT_CPC:
          adGroupSetting.minimumLimit = data.value
          break;
      }
    })
  }
  return { type: P4YahooStdRuleConstants.UPDATE_SETTING_RULE, settingRules: updateSettingRule}
}

export function refreshCopyPaste() {
  return (dispatch) => {
    dispatch(resetCopyPaste())
    dispatch(resetEditedCell())
  }
}
