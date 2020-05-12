import previewRuleTargetConstant from '../../../constants/previewRuleTarget'
import initialState from '../../../../initialState'

export default function previewRuleTargetReducer(previewRuleTarget = initialState.previewRuleTarget, action) {
  switch (action.type) {
    case previewRuleTargetConstant.SET_SHOW_RULE_TARGET:
      return Object.assign({}, previewRuleTarget, {isVisible: action.value})
    case previewRuleTargetConstant.SAVE_RULE_TARGET:
      return Object.assign({}, previewRuleTarget, {results: action.data})
    default:
      return previewRuleTarget
  }
}
