import operationRuleConstant from '../../../constants/operationRule'
import {change} from 'redux-form'
import translation from '../../../util/translation'
import {getDefaultFilterLevel, updateOptionTypeStatus} from '../form/searchScopeUtil'
import moment from 'moment'
import stdRuleConstant from "./stdRuleConstant";
import CurrencyUtil from '../../../util/currency'

export const changeOperationName = (key, value, action, media, currency) => {
  return (dispatch) => {
    let actionType = action.actionType
    let actionNumberParameter = (action.actionNumberParameter) ? action.actionNumberParameter : ""
    let actionUnitParameter = (action.actionUnitParameter) ? action.actionUnitParameter : operationRuleConstant.ACTION.UNIT_PERCENT

    switch (key) {
      case operationRuleConstant.ACTION.ACTION_TYPE:
        actionType = value
         actionUnitParameter = (operationRuleConstant.ACTION.INDICATE_BUDGET.includes(value)) ? operationRuleConstant.ACTION.UNIT_NUMBER
           : actionUnitParameter
        break
      case operationRuleConstant.ACTION.NUMBER_PARAMETER:
        actionNumberParameter = value
        actionUnitParameter = (operationRuleConstant.ACTION.INDICATE_BUDGET.includes(actionType)) ? operationRuleConstant.ACTION.UNIT_NUMBER
          : actionUnitParameter
        break
      case operationRuleConstant.ACTION.UNIT_PARAMETER:
        actionUnitParameter = value
        break
    }
    const actionConfig = getActionConfig(actionType)
    let name = operationRuleConstant.ACTION_TYPE[media].find(actionTypeConst => actionTypeConst.value === actionType).text
    if(!operationRuleConstant.FACEBOOK_ACTION_SELECT_CAMPAIGN.includes(actionType)){
      if (actionConfig.isVisibleNumberParameter) {
        name += '_' + actionNumberParameter.toString().trim()
      }
      if (actionConfig.isVisibleUnitParameter) {
        name += '_' + operationRuleConstant.ACTION_UNIT_PARAMETER[currency].find(unitParam => unitParam.value === actionUnitParameter).text
      }
      if (actionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START) {
        name += '_' + translation.t('action.ctr_ad_unit')
      }
    }
    dispatch(change('operationRuleForm', 'operationName', name))
  }
}

export const setDefaultExecutionDate = (actionType) => {
  return (dispatch) => {
    const defaultExecutionDate = (actionType === "SET_CPN_SPEND_CAP") ? moment().add(1, 'd') : moment().add(1, 'M').startOf('M')
    dispatch(change(
      'operationRuleForm',
      'schedule.executionDate',
      defaultExecutionDate.format("YYYY/MM/DD")
    ))
  }
}

export function setDataToView(data, media) {
  const searchScope = processSearchScope(data.searchScopes, media, data.action.actionType)
  return {
    operationName: data.operationName,
    id: data.id,
    action:{
      actionType: data.action.actionType,
      actionNumberParameter: data.action.actionNumberParameter,
      actionUnitParameter: data.action.actionUnitParameter,
      adObject: data.action.adObject
    },
    searchScope: hasOnlySearchScopeForCampaign(media, data.action.actionType) ? [] : searchScope,
    searchScopeForCampaign: hasOnlySearchScopeForCampaign(media, data.action.actionType) ? searchScope : [],
    schedule: data.ruleSchedule.length === 1 ? data.ruleSchedule[0] : {},
    updatedAt: data.updatedAt,
    extension: data.extension,
    statusEnabled: data.status === operationRuleConstant.STATUS_ENABLED
  }
}

function processSearchScope(data, media, actionType) {
  let searchScope = []
  data.map(val => {
    let optionType = prepareOptionType(val)
    const ele = {
      id: val.id,
      filterLevel: processSelectBoxInSearchScope(
        data.filter(searchScope => searchScope.filterType.split('_').pop() === val.filterType.split('_').pop()),
        val.filterObject,
        media,actionType),
      filterValue: val.filterValue,
      selectedFilterLevel: val.filterObject,
      filterLevelVal: val.filterLevel,
      filterType: optionType.selectedOption === "INCLUDE" ? val.filterType: val.filterType.substring(0, val.filterType.indexOf("_EXCLUDE")),
      updatedAt: val.updatedAt,
      optionType: optionType
    }
    searchScope.push(ele)
  })

  let excludeActionDefault = [
    {media: operationRuleConstant.MEDIA_LIST.FACEBOOK, actionType: operationRuleConstant.ACTION_TYPE_AD_REMOVE},
    {media: operationRuleConstant.MEDIA_LIST.NEWLINE, actionType: operationRuleConstant.ACTION_TYPE_CTR_AD_START}
  ]

  if(excludeActionDefault.filter(element => element.media === media && actionType === element.actionType).length > 0)
    searchScope = updateOptionTypeStatus(searchScope)

  return searchScope
}

function prepareOptionType(lineSearchScope) {
  return {
    selectedOption: lineSearchScope.filterType.split("_").length < 3 ? "INCLUDE" : "EXCLUDE",
    options: operationRuleConstant.OPTION_TYPE_GROUP.ONE
  }
}

function processSelectBoxInSearchScope(data, selectedFilterVal, media,actionType) {
  let filterLevel = getDefaultFilterLevel(media)
  if (media === operationRuleConstant.MEDIA_LIST.FACEBOOK && actionType !== operationRuleConstant.ACTION_TYPE_AD_REMOVE){
    filterLevel = operationRuleConstant.DEFAULT_FILTER_LEVEL_FACEBOOK.filter(level => level.value === "CAMPAIGN_NAME")
  }
  const usedFilterLevel = data.map(val => val.filterObject)
  usedFilterLevel.map(usedFl => filterLevel = filterLevel.filter(val => val.value != usedFl))

  const selectedFilterObject = getDefaultFilterLevel(media).filter(filterVal => filterVal.value == selectedFilterVal)[0]
  filterLevel.push(selectedFilterObject)
  return filterLevel
}

export function processTriggers(data) {
  let triggers = []

  data.map(trigger => {
    let triggerStep = []
    trigger.triggerSteps.map(trStep => {
      triggerStep.push(Object.assign({}, trStep, {joinCondition: 'AND' }))
    })
    const element = {
      id: trigger.id,
      joinCondition: trigger.joinCondition,
      operationRuleId: trigger.operationRuleId,
      status: trigger.status,
      updatedAt: trigger.updatedAt,
      triggerSteps: triggerStep
    }
    triggers.push(element)
  })

  return {
    isShowTriggerForm: false,
    triggers: triggers,
    selectedTrigger: {
      triggerSteps: []
    }
  }
}

export function getActionConfig(actionType) {
  let actionConfig =  operationRuleConstant.ACTION_TYPE_CONFIG.find (act => act.key === actionType)
  return actionConfig.value
}

export function getActionLimitLabel(actionType){
  if (actionType === operationRuleConstant.ACTION.INCREASE || actionType === operationRuleConstant.ACTION.INCREASE_AD_GROUP_BID_AMOUNT)
    return translation.t('action.action_upper_limit')
  else if (actionType === operationRuleConstant.ACTION.DECREASE || actionType === operationRuleConstant.ACTION.DECREASE_AD_GROUP_BID_AMOUNT)
    return translation.t('action.action_lower_limit')
  else if (operationRuleConstant.ACTION.INCREASE_DAILY_BUDGET.includes(actionType))
    return translation.t('action.daily_budget_upper_limit')
  else return translation.t('action.daily_budget_lower_limit')
}

export function hasOnlySearchScopeForCampaign(media, action) {
  return operationRuleConstant.ONLY_SEARCH_SCOPE_FOR_CAMPAIGN_ACTION[media].includes(action)
}

export function getActionUnitParameterOptions(action, currency) {
  return (operationRuleConstant.ACTION.INDICATE_BUDGET.includes(action.actionType)) ? operationRuleConstant.ACTION_UNIT_INDICATE[currency]
    : operationRuleConstant.ACTION_UNIT_PARAMETER[currency]
}

export function getCurrencySymbol (account) {
  const currencyCode = account && account.currency ? account.currency: 'JPY';
  return CurrencyUtil.getSymbolByCode(currencyCode)
}

export function isNumberType(value) {
  return (typeof value === "number")
}

export function isDefined(value) {
  return (value != undefined)
}

export const changeActionType = (actionType) => {
  return (dispatch) => {
    dispatch(change(
      'operationRuleForm',
      'action.actionType',
      actionType
    ))
  }
}

export function getTableData(triggers, leftSideTableData, media, actionType) {
  const mappingColToComparable = stdRuleConstant.mappingColToComparable[media]
  let triggerData = triggers.map(singleTrigger => {
    let triggerValue = {
      triggerId: singleTrigger.id,
      triggerUpdatedDate: singleTrigger.updatedAt
    }
    singleTrigger.triggerSteps.forEach(triggerStep => {
      let comparableToCol = mappingColToComparable.mappingCol[actionType.value].find(mapValue => {
        return mapValue.triggerComparable == triggerStep.triggerComparable
      })
      if(comparableToCol != undefined) {
        triggerValue[comparableToCol.col] = triggerStep.boundaryValue
      }
      triggerValue[triggerStep.triggerComparable + "_TRIGGER_STEP_ID"] = triggerStep.id,
      triggerValue[triggerStep.triggerComparable + "_UPDATED_AT"] = triggerStep.updatedAt
    })
    return triggerValue
  })
  return makeTableData(leftSideTableData, triggerData, mappingColToComparable, media, actionType)
}

//todo refactor
function makeTableData(leftSideTableData, triggerData, mappingColToComparable, media, actionType) {
  const identifyCol = mappingColToComparable.mappingInfo.field
  const mappingId = mappingColToComparable.mappingInfo.mappingField
  return leftSideTableData.map(adGroup => {
    const trigger = triggerData.find(triggerValue => {
      return triggerValue[identifyCol] === adGroup[mappingId]
    })

    let rowData
    if (trigger !== undefined) {
      rowData = JSON.parse(JSON.stringify(trigger))
      rowData[identifyCol] = adGroup[mappingId]
      mappingColToComparable.leftSideTableCols.map(col => {
        rowData[col.field] = adGroup[col.mappingField]
      })
    } else {
      rowData = {[identifyCol]: adGroup[mappingId]}
      mappingColToComparable.leftSideTableCols.map(col => {
        rowData[col.field] = adGroup[col.mappingField]
      })
    }
    if (media === operationRuleConstant.MEDIA_LIST.FACEBOOK) {
      if (typeof rowData.referenceDay === "undefined") {
        rowData.referenceDay = 7
      }
    }

    if (media === operationRuleConstant.MEDIA_LIST.NEWLINE) {
      rowData.minimumAdNumber = 1
    }

    rowData.isValidate = validateRow(rowData, actionType, media)
    return rowData
  })
}

export function checkData(rowData, mappingColToComparable, actionType) {
  return mappingColToComparable.mappingCol[actionType].findIndex(mapValue => {
    return (rowData[mapValue.col] != undefined && mapValue.col != mappingColToComparable.mappingInfo.field)
  }) > -1
}

export function validateRow(rowData, actionType, media) {
  return stdRuleConstant.ACTIONS[media][actionType.value].REQUIRE_COLS.filter(col => {
    return rowData[col] == undefined || rowData[col] == ""
  }).length <= 0
}

export function getTriggerDataFromTable(tableData, media, actionType, actionObject) {
  return tableData.map (row => {
    const mappingColToComparable = stdRuleConstant.mappingColToComparable[media]
    let rowCheck = checkData(row, mappingColToComparable, actionType)
    if(rowCheck){
      let triggerId = row.triggerId ? row.triggerId: 0
      let valueMapInfo = mappingColToComparable.mappingCol[actionType].filter(mapInfo =>
        row[mapInfo.col] !== undefined && row[mapInfo.col].toString().length > 0)
      if (!isTriggerDefault(media, triggerId, valueMapInfo, row)){
        return {
          id: triggerId,
          triggerSteps: valueMapInfo.map (mapInfo => {
            return {
              id: row[mapInfo.triggerComparable + "_TRIGGER_STEP_ID"] ? row[mapInfo.triggerComparable + "_TRIGGER_STEP_ID"] : 0,
              adObject: actionObject,
              timeRange: "NONE",
              triggerComparable: mapInfo.triggerComparable,
              triggerOperator: "EQUAL",
              boundaryValue: row[mapInfo.col],
              joinCondition: "AND",
              singleTriggerId: triggerId,
              updatedAt: row[mapInfo.triggerComparable + "_UPDATED_AT"]
            }
            }),
          joinCondition: "OR",
          status: "ENABLED",
          updatedAt: row.triggerUpdatedDate
        }
      }
    }
  }).filter(trigger => {return trigger !== undefined && trigger.triggerSteps.length > 1})
}

export function groupByKey(arr, criteria) {
  return arr.reduce((obj, item) => {
    let key = typeof criteria === 'function' ? criteria(item) : "reports_" + item[criteria] + "DAY"
    if (!obj.hasOwnProperty(key)) {
      obj[key] = []
    }
    obj[key].push(item)
    return obj
  }, {})
}

export function handleTriggersForChangingActionType(triggers, actionType, media) {
  return triggers.map(trigger => {
    let tmps = trigger.triggerSteps.filter(ts => ts !== undefined && stdRuleConstant.ACTIONS[media][actionType].COLUMNS.indexOf(ts.triggerComparable) >= 0)
    return Object.assign({}, trigger, {triggerSteps: tmps})
  })
}

function isTriggerDefault(media, triggerId, valueMapInfo, row) {
  switch (media) {
    case operationRuleConstant.MEDIA_LIST.FACEBOOK:
      return (triggerId === 0 && valueMapInfo.length <= 2 && (row.editedCell === undefined || !row.editedCell.includes("referenceDay")))
    case operationRuleConstant.MEDIA_LIST.NEWLINE:
      return valueMapInfo.length <= 2
    default:
      return false
  }
}
