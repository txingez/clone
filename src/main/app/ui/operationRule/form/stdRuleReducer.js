import initialState from '../../../../initialState'
import stdRuleConstant from "./stdRuleConstant"
import {validateRow} from "./operationRuleUtil"
import operationRuleConstant from "../../../constants/operationRule";

export default function stdRuleReducer(stdRule = initialState.stdRule, action) {
  switch (action.type) {
    case stdRuleConstant.UPDATE_TABLE_DATA:
      return Object.assign({}, stdRule, {tableData: action.data})
    case stdRuleConstant.UPDATE_ACTION_TYPE:
      return Object.assign({}, stdRule, {actionType: action.data})
    case stdRuleConstant.UPDATE_STD_RULE_NAME:
      return Object.assign({}, stdRule, {stdRuleName: action.data})
    case stdRuleConstant.UPDATE_CELL_DATA:
      return Object.assign({}, stdRule, {
        tableData: stdRule.tableData.map(row => {
          const mappingColToComparable = stdRuleConstant.mappingColToComparable[action.media]
          if (row[mappingColToComparable.mappingInfo.field] === action.identify) {
            let updateRow = Object.assign({}, row ,action.updatedValue)
            updateRow.isValidate = validateRow(updateRow, action.actionType, action.media)
            return  Object.assign({}, row, updateRow)
          }
          return row
        })
      })
    case stdRuleConstant.UPDATE_ROW_COPIED:
      return Object.assign({}, stdRule,{rowCopied: action.rowCopied})
    case stdRuleConstant.UPDATE_DATA_COPIED:
      return Object.assign({}, stdRule,{dataCopied: action.dataCopied})
    case stdRuleConstant.UPDATE_ARR_TO_PASTE: {
      let arrayRowToPaste = [...stdRule.arrayRowToPaste]
      let indexOfRowChosen = arrayRowToPaste.indexOf(action.idToPaste)
      if (indexOfRowChosen > -1) {
        arrayRowToPaste.splice(indexOfRowChosen, 1)
      } else {
        arrayRowToPaste.push(action.idToPaste)
      }
      return Object.assign({}, stdRule, {arrayRowToPaste: arrayRowToPaste})
    }
    case stdRuleConstant.PASTE_TO_ROWS:
      return Object.assign({}, stdRule,{
        tableData: stdRule.tableData.map(row => {
          const mappingColToComparable = stdRuleConstant.mappingColToComparable[action.media]
          if (action.arrToPaste.includes(row[mappingColToComparable.mappingInfo.field])) {
            let updateRow = Object.assign({}, row ,action.dataCopied)
            updateRow.isValidate = validateRow(updateRow, action.actionType, action.media)
            updateRow.editedCell = Object.keys(action.dataCopied)
            return Object.assign({}, row, updateRow)
          }
          return row
        })
      })
    case stdRuleConstant.RESET_COPY_PASTE: {
      const rowCopiedReset = {
        identifier: -1,
        isCopied: false
      }
      return Object.assign({}, stdRule, {
        rowCopied: rowCopiedReset,
        arrayRowToPaste: [],
        dataCopied: {}
        })
    }
    case stdRuleConstant.UPDATE_TABLE_BY_REPORT_PERIOD: {
      const mappingColToComparable = stdRuleConstant.mappingColToComparable[action.media]
      return Object.assign({}, stdRule, {
        tableData: stdRule.tableData.map(row => {
          const report = action.reports.find(report => {
            return row[mappingColToComparable.mappingInfo.field] === report[mappingColToComparable.mappingInfo.field]
          })
          const keysObjCpa = action.media === operationRuleConstant.MEDIA_LIST.NEWLINE
            ? ["cost", "cpaInstall", "cpaCV"] : ["cost", "cpa"]
          let objectCPA = {}
          keysObjCpa.map(key => {
            objectCPA[key] = report && report[key] !== undefined ? report[key] : ""
          })
          return Object.assign({}, row, objectCPA)
        })
      })
    }
    case stdRuleConstant.CHANGE_REPORT_PERIOD:
      return Object.assign({}, stdRule, {reportPeriod: action.reportPeriod})
    case stdRuleConstant.CHANGE_CONVERSION_TYPE:
      return Object.assign({}, stdRule, {conversionType: action.conversionType})
    case stdRuleConstant.UPDATE_SEARCH_TEXT:
      return Object.assign({}, stdRule, {searchText: action.searchText})
    case stdRuleConstant.RESET_CONVERSION_TYPE_DEFAULT:
      return Object.assign({}, stdRule, {conversionType: "Install"})
    case stdRuleConstant.RESET_SEARCH_TEXT:
      return Object.assign({}, stdRule, {searchText: ""})
    case stdRuleConstant.RESET_TABLE_DATA:
      return Object.assign({},stdRule, {tableData: []})
    case stdRuleConstant.UPDATE_MULTI_ARR_TO_PASTE:
      return Object.assign({}, stdRule, {arrayRowToPaste: action.idsAfterFilter})
    default:
      return stdRule
  }
}
