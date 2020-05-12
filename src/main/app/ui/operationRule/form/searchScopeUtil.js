import operationRuleConstant from '../../../constants/operationRule'
import { change } from 'redux-form'
import * as searchScopeAction from './searchScopeAction'
import portNewLine from "../../../ajax/portNewLine";

export function getDefaultFilterLevel(media) {
  switch (media) {
    case 'NEW LINE':
      return operationRuleConstant.DEFAULT_FILTER_LEVEL_NEW_LINE;
    case 'FACEBOOK':
      return operationRuleConstant.DEFAULT_FILTER_LEVEL_FACEBOOK
    default:
      return operationRuleConstant.DEFAULT_FILTER_LEVEL
  }
}
/*
When create new line in searchscope. We need actions:
+ Get value which is showed in selectbox
+ Delete that value from selectboxes in exist lines
 */
export function judgeSearchScope (searchScope) {
  return (
    searchScope !== undefined &&
    searchScope.length !== 0 &&
    searchScope.every(
      (val) => {return val.filterValue && val.filterValue.trim().length !== 0})
  )

}
export function createLine (dispatch, lineSearchScope, searchScope, media,actionType) {
  let defaultFilterLevel = getDefaultFilterLevel(media)
  if (media === operationRuleConstant.MEDIA_LIST.FACEBOOK && actionType !== operationRuleConstant.ACTION_TYPE_AD_REMOVE){
    defaultFilterLevel = operationRuleConstant.DEFAULT_FILTER_LEVEL_FACEBOOK.filter(level => level.value === "CAMPAIGN_NAME")
  }
  const element = {
    filterLevel: [],
    filterValue: '',
    selectedFilterLevel : '',
    filterLevelVal: '',
    filterType: operationRuleConstant.FILTER_TYPE_LIST["NEW LINE"][0].key
  }

  let newSearchScope = []
  if (searchScope != undefined) {
    const usedFilterLevelList = searchScope.map(usedValue => usedValue.selectedFilterLevel)
    element.filterLevel = defaultFilterLevel.filter(filterLevel => !usedFilterLevelList.includes(filterLevel.value))

    let copyOfSearchScope = JSON.parse(JSON.stringify(searchScope))
    newSearchScope = copyOfSearchScope.map(line => Object.assign({}, line, {
      filterLevel: line.filterLevel.filter(filterLevel => filterLevel.value != element.filterLevel[0].value)
    }))
  } else {
    element.filterLevel = defaultFilterLevel
  }
  element.filterLevelVal = element.filterLevel[0].key
  element.selectedFilterLevel = element.filterLevel[0].value
  newSearchScope.push(element)
  dispatch(change('operationRuleForm', 'searchScope', newSearchScope))
}

/*
When delete a line in search scope. We need actions:
+ Delete that line
+ Add value which is showed in selectbox of deleted line to  selectbox of another lines
 */
export function deleteLine(dispatch, searchScope, selectedIndex, media) {
  const defaultFilterLevel = getDefaultFilterLevel(media)

  const oldSelectedFilterLevel = searchScope[selectedIndex].selectedFilterLevel
  const oldSelectedObject = defaultFilterLevel.find(filterLevel => filterLevel.value === oldSelectedFilterLevel)

  let newSearchScope = JSON.parse(JSON.stringify(searchScope))
  newSearchScope.splice(selectedIndex, 1)
  newSearchScope = newSearchScope.map(line => {
    return Object.assign({}, line, {filterLevel: [...line.filterLevel, oldSelectedObject]})
  })
  dispatch(change('operationRuleForm', 'searchScope', newSearchScope))
}

/*
When change value in selectbox. We need actions:
+ add old value which is showed previous to selectbox of another lines if line <= maxLine
+ new value which is showed current, it removes from selectbox of another lines if line <= maxLine
 */
export function changeFilterLevel(dispatch, searchScope, selectedIndex, newFilterLevel, media) {
  const defaultFilterLevel = getDefaultFilterLevel(media)

  const oldSelectedFilterLevel = searchScope[selectedIndex].selectedFilterLevel
  const oldSelectedObject = defaultFilterLevel.find(filter => filter.value === oldSelectedFilterLevel)
  const newFilterLevelObject = defaultFilterLevel.find(filter => filter.value === newFilterLevel)
  const copyOfSearchScope = JSON.parse(JSON.stringify(searchScope))
  let newSearchScope = copyOfSearchScope.map((line, index) => {
    let newLine = Object.assign({}, line)
    if (index != selectedIndex) {
      let newValueIndex = line.filterLevel.findIndex(filterLevel => filterLevel.value === newFilterLevel)
      newLine.filterLevel[newValueIndex] = oldSelectedObject
    } else {
      newLine.selectedFilterLevel = newFilterLevelObject.value
      newLine.filterLevelVal = newFilterLevelObject.key
    }
    return newLine
  })
  dispatch(change('operationRuleForm', 'searchScope', newSearchScope))
}

export function showValidPath (dispatch,searchScopeVal,accountId,media,action)
{
  let port = portNewLine
  let searchScopeSet = getSearchScopes(searchScopeVal,action.actionType,media)
  let data = {
    accountId: accountId,
    searchScopes: searchScopeSet
  }
  searchScopeAction.showPath(data,searchScopeSet,port,dispatch)
}


export function getSearchScopes(lineSearchScopes, actionType,media){
  if (actionType === operationRuleConstant.ACTION_TYPE_ON_OFF)
    return [{
      filterLevel: "CAMPAIGN",
      filterObject: "CAMPAIGN_NAME",
      filterType: lineSearchScopes[0].filterType ? lineSearchScopes[0].filterType : operationRuleConstant.FILTER_TYPE_LIST[media][0].value ,
      filterValue: lineSearchScopes[0].filterValue
    }]
  else return lineSearchScopes.map(line => {
    let filterType = line.filterType
    if(isShowExcludeSearchScope(media, actionType) &&
      line.optionType.selectedOption === "EXCLUDE" && filterType.indexOf('_EXCLUDE') < 0){
      filterType = line.filterType + '_EXCLUDE'
    }
    return {
      filterType: filterType,
      filterLevel: line.filterLevelVal,
      filterObject: line.selectedFilterLevel,
      filterValue: line.filterValue,
    }
  })
}

export function isShowExcludeSearchScope(media, actionType) {
  return operationRuleConstant.ACTION_HAS_EXCLUDE_SEARCH_SCOPE_BY_MEDIA[media].includes(actionType)
}

/**
 * FACEBOOK_AD_REMOVE_ACTION
 */

function countByOptionType(searchScope){
  let optionTypeList = operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value.map(option => {
    return {
      value: searchScope.filter(element => element.optionType.selectedOption === option).length,
      selectedFilterLevelList: searchScope.filter(element => element.optionType.selectedOption === option).map(element => element.selectedFilterLevel)
    }
  })

  return {
    includeType: optionTypeList[0],
    excludeType: optionTypeList[1]
  }
}

export function updateOptionTypeStatus(searchScope){
  let countedOptionType = countByOptionType(searchScope)
  let newSearchScope = JSON.parse(JSON.stringify(searchScope))

  if(countedOptionType.includeType.value === operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.maxQuantity){
    newSearchScope = updateByOptionType(operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[1], true, newSearchScope)
  }else{
    newSearchScope= updateByOptionType(operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[1], false, newSearchScope)
  }

  if(countedOptionType.excludeType.value === operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.maxQuantity){
    newSearchScope = updateByOptionType(operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[0], true, newSearchScope)
  }else{
    newSearchScope = updateByOptionType(operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[0], false, newSearchScope)
  }

  return newSearchScope
}

function updateOptionTypeOneLine(flag, optionType) {
  let optionGroup = operationRuleConstant.OPTION_TYPE_GROUP.ONE.map(element => {
    const optionsc = {
      key: element.key,
      value: element.value,
      disable: element.key !== optionType ? flag : element.disable
    }
    return optionsc
  })

  return Object.assign([], optionGroup)
}

function updateByOptionType(optionType, flag, searchScope){
  let newSearchScope = JSON.parse(JSON.stringify(searchScope))
  newSearchScope =  newSearchScope.map(line => {
    if(line.optionType.selectedOption === optionType){
      let option = {
        selectedOption: line.optionType.selectedOption,
        options: updateOptionTypeOneLine(flag, optionType)
      }

      return Object.assign({}, line, {optionType: option})
    } else {
      return line
    }
  })

  return newSearchScope
}

function generateOptionType(countedOptionType){
  let selectedOptionType = countedOptionType.includeType.value < operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.maxQuantity ?
    operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[0]: operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[1]

  return {
    selectedOption: selectedOptionType,
    options: operationRuleConstant.OPTION_TYPE_GROUP.ONE
  }
}

export function createLineWithExclude(dispatch, searchScope, media) {
  const defaultFilterLevel = getDefaultFilterLevel(media)
  const countedOptionType = countByOptionType(searchScope)

  const element = {
    filterLevel: [],
    filterValue: '',
    selectedFilterLevel : '',
    filterLevelVal: '',
    filterType: operationRuleConstant.FILTER_TYPE_LIST["NEW LINE"][0].key,
    optionType:generateOptionType(countedOptionType)
  }

  let newSearchScope = JSON.parse(JSON.stringify(searchScope))
  if (searchScope){
    //Get filterLevel by OptionType
    if(countedOptionType.includeType.value < operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.maxQuantity){
      element.filterLevel = defaultFilterLevel.filter(defaultValue => !countedOptionType.includeType.selectedFilterLevelList.includes(defaultValue.value))
    } else {
      element.filterLevel = defaultFilterLevel.filter(defaultValue => !countedOptionType.excludeType.selectedFilterLevelList.includes(defaultValue.value))
    }

    //Remove value in filterLeve that have optionType
    newSearchScope = newSearchScope.map(line => Object.assign({}, line, {
      filterLevel: line.optionType.selectedOption === element.optionType.selectedOption ?
        line.filterLevel.filter(filterLevel => filterLevel.value != element.filterLevel[0].value): line.filterLevel
    }))
  } else {
    element.filterLevel = defaultFilterLevel
  }

  element.filterLevelVal = element.filterLevel[0].key
  element.selectedFilterLevel = element.filterLevel[0].value
  newSearchScope.push(element)

  //Update optinType status
  newSearchScope = updateOptionTypeStatus(newSearchScope)
  dispatch(change('operationRuleForm', 'searchScope', newSearchScope))
}

export function deleteLineWithExclude(dispatch, searchScope, selectedIndex, media) {
  const defaultFilterLevel = getDefaultFilterLevel(media)
  let newSearchScope = JSON.parse(JSON.stringify(searchScope))
  let selectedOption = searchScope[selectedIndex].optionType.selectedOption

  const oldSelectedFilterLevel = searchScope[selectedIndex].selectedFilterLevel
  const oldSelectedObject = defaultFilterLevel.find(filterLevel => filterLevel.value === oldSelectedFilterLevel)

  newSearchScope.splice(selectedIndex, 1)
  newSearchScope = newSearchScope.map(line => {
    return line.optionType.selectedOption === selectedOption ? Object.assign({}, line, {filterLevel: [...line.filterLevel, oldSelectedObject]}): line
  })
  newSearchScope = updateOptionTypeStatus(newSearchScope)
  dispatch(change('operationRuleForm', 'searchScope', newSearchScope))

}

export function handleChangeFilterLevel(dispatch, searchScope, newFilterLevel, selectedIndex, media) {
  const defaultFilterLevel = getDefaultFilterLevel(media)
  const oldSelectedFilterLevel = searchScope[selectedIndex].selectedFilterLevel
  const oldSelectedObject = defaultFilterLevel.find(filter => filter.value === oldSelectedFilterLevel)
  const newFilterLevelObject = defaultFilterLevel.find(filter => filter.value === newFilterLevel)
  const selectedOptionType = searchScope[selectedIndex].optionType.selectedOption

  let newSearchScope = JSON.parse(JSON.stringify(searchScope))

  newSearchScope = newSearchScope.map((line, index) => {
    if (index != selectedIndex && line.optionType.selectedOption === selectedOptionType) {
      let newValueIndex = line.filterLevel.findIndex(filterLevel => filterLevel.value === newFilterLevel)
      line.filterLevel[newValueIndex] = oldSelectedObject
    } else if(index === selectedIndex){
      line.selectedFilterLevel = newFilterLevelObject.value
      line.filterLevelVal = newFilterLevelObject.key
    }
    return line
  })
  dispatch(change('operationRuleForm', 'searchScope', newSearchScope))
}

export function handleChangeOptionType(dispatch, searchScope, newOptionType, selectedIndex, media){
  if(searchScope[selectedIndex].optionType.selectedOption !== newOptionType){
    const defaultFilterLevel = getDefaultFilterLevel(media)
    const countedOptionType = countByOptionType(searchScope)
    let newSearchScope = JSON.parse(JSON.stringify(searchScope))

    let filterLevels = []
    if(newOptionType === operationRuleConstant.SEARCH_SCOPE_OPTION_TYPE.value[0]){
      filterLevels = defaultFilterLevel.filter(defaultValue => !countedOptionType.includeType.selectedFilterLevelList.includes(defaultValue.value))
    } else {
      filterLevels = defaultFilterLevel.filter(defaultValue => !countedOptionType.excludeType.selectedFilterLevelList.includes(defaultValue.value))
    }
    let tmp = searchScope[selectedIndex].selectedFilterLevel
    let obj = defaultFilterLevel.filter(val => val.value === tmp)[0]

    let isSameFilterValue = filterLevels.filter(defaultValue => defaultValue.value === tmp).length > 0
    let newSelectedFilterLevel = isSameFilterValue ? tmp: filterLevels[0].value
    let newFilterLevelVal = isSameFilterValue ? searchScope[selectedIndex].filterLevelVal: filterLevels[0].key

    newSearchScope = newSearchScope.map((line, index) =>{
      if(index === selectedIndex){
        let element = {
          filterLevel: filterLevels,
          filterValue: line.filterValue ? line.filterValue.trim(): "",
          selectedFilterLevel : newSelectedFilterLevel,
          filterLevelVal: newFilterLevelVal,
          filterType: operationRuleConstant.FILTER_TYPE_LIST["NEW LINE"][0].key,
          optionType: {
            selectedOption: newOptionType,
            options: line.optionType.options
          },
          isHighlight: !isSameFilterValue
        }

        return Object.assign({}, line, element)
      } else if(line.optionType.selectedOption === newOptionType){
        return Object.assign({}, line, {
          filterLevel: line.filterLevel.filter(filterLevel => filterLevel.key != newFilterLevelVal)
        })
      } else {
        let filterLv = Object.assign([], line.filterLevel)
        if (line.filterLevel.filter(lv => lv.value === tmp).length == 0)
          filterLv.push(obj)

        return Object.assign({}, line, {
          filterLevel: filterLv
        })
      }
    })

    newSearchScope = updateOptionTypeStatus(newSearchScope)
    dispatch(change('operationRuleForm', 'searchScope', newSearchScope))
  }
}
