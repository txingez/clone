import {combineReducers} from 'redux'
import operationRule from './app/ui/operationRule/operationRuleReducer'
import ruleSchedule from './app/ui/operationRule/ruleSchedule/ruleScheduleReducer'
import searchScopePath from './app/ui/operationRule/form/searchScopeReducer'
import account from './app/ui/operationRule/account/accountReducer'
import ruleList from './app/ui/operationRule/ruleList/ruleListReducer'
import triggerData from './app/ui/operationRule/trigger/triggerReducer'
import ruleInputInterface from './app/ui/operationRule/ruleInputInterfaceReducer'
import modal from './app/ui/modal/modalReducer'
import adjustmentRuleSchedule from './app/ui/operationRule/budgetAdjustment/adjustmentRuleScheduleReducer'
import previewRuleTarget from './app/ui/operationRule/previewRuleTarget/previewRuleTargetReducer'
import p4fCampaignData from './app/ui/operationRule/form/p4Facebook/p4fCampaignReducer'
import p4YahooStdRule from './app/ui/operationRule/form/p4Yahoo/p4YahooStdRuleReducer'
import stdRule from './app/ui/operationRule/form/stdRuleReducer'
import { reducer as formReducer } from 'redux-form'
import {reducer as notifications} from 'react-notification-system-redux'

const rootReducer = combineReducers({
  operationRule,
  modal,
  account,
  ruleList,
  triggerData,
  ruleSchedule,
  adjustmentRuleSchedule,
  ruleInputInterface,
  searchScopePath,
  previewRuleTarget,
  p4fCampaignData,
  p4YahooStdRule,
  stdRule,
  form: formReducer,
  notifications
})

export default rootReducer
