import searchScopeConstant from '../../../constants/searchScopePath'
import {showErrorMsg} from "../../notification/notificationAction";
import apiResult from "../../../util/apiResult";

export function setVisibleSearchScopePath (isVisible) {
  return { type: searchScopeConstant.SET_SHOW_PATH, value: isVisible }
}

export function showSearchScopePath (data) {
  return {type: searchScopeConstant.SAVE_PATH, data}
}

export function showPath(data,searchScopeSet,port,dispatch){
  port.showValidTargetPath(data).then(function (response) {
    let result = response.data.result
    result.map(searchScopeValid => searchScopeValid.index = result.indexOf(searchScopeValid) + 1)
    dispatch(showSearchScopePath(result))
    dispatch(setVisibleSearchScopePath(true))
  }, function (errors) {
    showErrorMsg(apiResult.errors(errors).join(" "))(dispatch)
  })
}
