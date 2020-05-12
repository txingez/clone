import searchScopeConstant from '../../../constants/searchScopePath'
import initialState from '../../../../initialState'

export default function searchScopeReducer(searchScopePath = initialState.searchScopePath, action) {
  switch (action.type) {
    case searchScopeConstant.SET_SHOW_PATH:
      return Object.assign({}, searchScopePath, {isVisibleResult: action.value})
    case searchScopeConstant.SAVE_PATH:
      return Object.assign({}, searchScopePath, {validPath: action.data})
    default:
      return searchScopePath
  }
}
