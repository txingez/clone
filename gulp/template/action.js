import StringUtil from '../StringUtil'
import _ from 'lodash'

const action = (name) => {
  return `import ${name}Constant from '../../constants/${name}'
import pagingConstant from '../../constants/paging'
import filterConstant from '../../constants/filter'
import tabConstant from '../../constants/tab'
import modalConstant from '../../constants/modal'
import ${name}Ajax from '../../ajax/${name}'
import apiResult from '../../util/apiResult'

export function create${StringUtil.capitalizeFirstLetter(name)}(${name}) {
  return { type: ${name}Constant.CREATE_${_.snakeCase(name).toUpperCase()}, ${name} }
}

export function remove${StringUtil.capitalizeFirstLetter(name)}(${name}Id) {
  return { type: ${name}Constant.REMOVE_${_.snakeCase(name).toUpperCase()}, ${name}Id }
}

export function load${StringUtil.capitalizeFirstLetter(name)}sSuccess (${name}s) {
  return { type: ${name}Constant.LOAD_${_.snakeCase(name).toUpperCase()}S_SUCCESS, ${name}s }
}

export function get${StringUtil.capitalizeFirstLetter(name)}Detail (${name}) {
  return { type: ${name}Constant.GET_${_.snakeCase(name).toUpperCase()}_DETAIL, ${name} }
}

export function updatePageNumber(pageNumber) {
  return { type: pagingConstant.UPDATE_PAGE_NUMBER, pageNumber }
}

export function updateFilter(filter) {
  return { type: filterConstant.UPDATE_FILTER, filter }
}

export function changeTab(tab) {
  return { type: tabConstant.CHANGE_TAB, tab }
}

export function updateSelectAll(isChecked) {
  return { type: ${name}Constant.UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ALL, isChecked }
}

export function updateSelectOne(row) {
  return { type: ${name}Constant.UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ONE, row }
}

export function showErrorPopup(errors) {
  return { type: modalConstant.SHOW_ERROR_POPUP, errors }
}

export function get${StringUtil.capitalizeFirstLetter(name)}List () {
  return function (dispatch) {
    ${name}Ajax.list()
      .then(apiResponse => {
        dispatch(load${StringUtil.capitalizeFirstLetter(name)}sSuccess(apiResult.success(apiResponse)))
      })
      .catch((errors) => {
        dispatch(showErrorPopup(apiResult.errors(errors)))
      })
  }
}
`
}

export default action
