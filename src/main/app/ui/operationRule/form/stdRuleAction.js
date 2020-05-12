import stdRuleConstant from "./stdRuleConstant"
import portFaceBook from "../../../ajax/portFaceBook";
import operationRuleAjax from "../../../ajax/operationRule";
import {getTableData, handleTriggersForChangingActionType} from "./operationRuleUtil"
import {showErrorMsg} from "../../notification/notificationAction"
import translation from "../../../util/translation";
import {showWarning} from "../../modal/modalAction"
import {setShowSTDCreatForm} from "../ruleInputInterfaceAction";
import portTwitter from "../../../ajax/portTwitter";
import {groupByKey} from "../form/operationRuleUtil"
import operationRuleConstant from "../../../constants/operationRule";
import portNewLine from "../../../ajax/portNewLine";
export function updateTableData(tableData) {
  return {type: stdRuleConstant.UPDATE_TABLE_DATA, data: tableData}
}

export function resetTableData() {
  return {type: stdRuleConstant.RESET_TABLE_DATA}
}

export function updateActionType(actionType) {
  return {type: stdRuleConstant.UPDATE_ACTION_TYPE, data: actionType}
}

export function updateStdRuleName(stdRuleName) {
  return {type: stdRuleConstant.UPDATE_STD_RULE_NAME, data: stdRuleName}
}

export function updateCellData(identify, updatedValue, media, actionType) {
  return {type: stdRuleConstant.UPDATE_CELL_DATA, identify: identify, updatedValue, media, actionType}
}

export function updateChangeActionToStdRule(isEdit, mediaAccountId, ruleId, media, timeRange, actionType, tmpTrigger = []) {
  return function (dispatch) {
    if (isEdit) {
      operationRuleAjax.detail(ruleId).then(response => {
        const trigger = response.data.result.trigger
        dispatch(handleCallGetReportsOrStructure(mediaAccountId, media, timeRange, trigger, actionType))
      })
    } else {
      if (ruleId !== 0) {
        operationRuleAjax.detail(ruleId).then(response => {
          const commonColumns = stdRuleConstant.STD_TRIGGER_MAPPING[media].COMMON_TRIGGER.concat(
            stdRuleConstant.STD_TRIGGER_MAPPING[media].MAPPING_TRIGGER
          )
          const triggerExisted = response.data.result.trigger
          const triggerHandled = triggerExisted.map(trigger => {
            let tmpTriggerStep = trigger.triggerSteps.filter(ts =>
              ts !== undefined && commonColumns.indexOf(ts.triggerComparable) >= 0)
              .map(triggerStep => {
                if (stdRuleConstant.STD_TRIGGER_MAPPING[media].MAPPING_TRIGGER.includes(triggerStep.triggerComparable)) {
                  triggerStep.id = 0
                  triggerStep.singleTriggerId = 0
                }
                return triggerStep
              })
            return Object.assign({}, trigger, {triggerSteps: tmpTriggerStep})
          })
          dispatch(handleCallGetReportsOrStructure(mediaAccountId, media, timeRange, triggerHandled, actionType))
        })
      } else {
        dispatch(handleCallGetReportsOrStructure(mediaAccountId, media, timeRange, tmpTrigger, actionType))
      }
    }
  }
}

function handleCallGetReportsOrStructure(mediaAccountId, media, timeRange, trigger, actionType) {
  return function (dispatch) {
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.FACEBOOK:
        dispatch(callGetAdSetsFB(mediaAccountId, trigger, media, actionType))
        break
      case operationRuleConstant.MEDIA_LIST.NEWLINE:
      case operationRuleConstant.MEDIA_LIST.TWITTER:
        dispatch(callGetReports(mediaAccountId, trigger, timeRange, media, actionType))
        break
    }
  }
}

function callGetAdSetsFB(mediaAccountId, trigger, media, actionType) {
  return function (dispatch) {
    portFaceBook.getAdSets(mediaAccountId).then(response => {
      const adSetList = response.data.result.adSetList
      if (adSetList.length < 1) {
        dispatch(showWarning(translation.t('warning_can_not_save_or_create_rule')))
      } else {
        const tableData = getTableData(trigger, adSetList, media, actionType)
        dispatch(updateTableData(tableData))
      }
    }, error => {
      dispatch(showErrorMsg("Can't get ad Set: " + error))
    })
  }
}

function getPortByMedia(media) {
  switch (media) {
    case operationRuleConstant.MEDIA_LIST.TWITTER:
      return portTwitter
    case operationRuleConstant.MEDIA_LIST.NEWLINE:
      return portNewLine
  }
}

function callGetReports(mediaAccountId, trigger, timeRange, media, actionType) {
  return function (dispatch) {
    const port = getPortByMedia(media)
    port.getReports(mediaAccountId).then(response => {
      let reports = []
      const allReports = response.data.result
      if (allReports.length < 1) {
        dispatch(showWarning(translation.t('warning_can_not_save_or_create_rule')))
      } else {
        splitAndSaveReportsByTimeRange(allReports)
        const key = "reports_" + timeRange
        reports = JSON.parse(localStorage.getItem("reports"))[key]
      }
      const tableData = getTableData(trigger, reports, media, actionType)
      dispatch(updateTableData(tableData))
    }, error => {
      dispatch(showErrorMsg("Can't get reports: " + error))
    })
  }
}

export function splitAndSaveReportsByTimeRange(allReports) {
  const reports = groupByKey(allReports, "timeRange")
  const sortedReports = Object.keys(reports).reduce((result, key) => ({...result, [key]: reports[key]}),{})
  localStorage.setItem('reports', JSON.stringify(sortedReports))
}

export function getReportsByTimeRange(timeRange) {
  const key = "reports_" + timeRange
  const reports = JSON.parse(localStorage.getItem("reports"))[key]
  return reports
}

export function updateRowCopied(newRowCopied) {
  return {type: stdRuleConstant.UPDATE_ROW_COPIED, rowCopied: newRowCopied}
}

export function updateDataCopied(dataCopied) {
  return {type: stdRuleConstant.UPDATE_DATA_COPIED, dataCopied: dataCopied}
}

export function updateArrToPaste(idToPaste) {
  return {type: stdRuleConstant.UPDATE_ARR_TO_PASTE, idToPaste}
}

export function updateMultiArrToPaste(idsAfterFilter) {
  return {type: stdRuleConstant.UPDATE_MULTI_ARR_TO_PASTE, idsAfterFilter}
}

export function pasteToRows(dataCopied, arrToPaste, media, actionType) {
  return {type: stdRuleConstant.PASTE_TO_ROWS, dataCopied, arrToPaste, media, actionType: actionType}
}

export function resetCopyPaste() {
  return {type: stdRuleConstant.RESET_COPY_PASTE}
}

export function createNewStdRule(actionType, defaultRuleName) {
  return function (dispatch) {
    dispatch(setShowSTDCreatForm())
    dispatch(updateActionType(actionType))
    dispatch(updateStdRuleName(defaultRuleName))
  }
}

export function updateTableByReportPeriod(reports, media) {
  return {type: stdRuleConstant.UPDATE_TABLE_BY_REPORT_PERIOD, reports, media}
}

export function changeReportPeriod(reportPeriod) {
  return {type: stdRuleConstant.CHANGE_REPORT_PERIOD, reportPeriod}
}

export function changeConversionType(conversionType) {
  return {type: stdRuleConstant.CHANGE_CONVERSION_TYPE, conversionType}
}

export function resetConversionTypeDefault() {
  return {type: stdRuleConstant.RESET_CONVERSION_TYPE_DEFAULT}
}

export function updateSearchText(searchText) {
  return {type: stdRuleConstant.UPDATE_SEARCH_TEXT, searchText}
}

export function resetSearchText() {
  return {type: stdRuleConstant.RESET_SEARCH_TEXT}
}
