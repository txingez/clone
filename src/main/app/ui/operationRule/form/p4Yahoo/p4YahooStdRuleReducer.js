import initialState from '../../../../../initialState'
import P4YahooStdRuleConstant from './p4YahooStdRuleConstant'


export default function p4YahooStdRuleReducer (p4YahooStdRule = initialState.p4YahooStdRule, action) {
  switch (action.type) {
    case P4YahooStdRuleConstant.RESET_EDITED_CELL:
      return Object.assign({}, p4YahooStdRule, {editedCell: [], reportPeriod: "30DAY"})
    case P4YahooStdRuleConstant.RESET_SETTING_RULE:
      return Object.assign({}, p4YahooStdRule, {settingRules: []})
    case P4YahooStdRuleConstant.RESET_MINIMUM_LIMIT_VALUES: {
      let updatedSettingRule = []
      p4YahooStdRule.settingRules.map(setting => updatedSettingRule.push({
          adGroupId: setting.adGroupId,
          referenceDay: setting.referenceDay,
          targetCPA: setting.targetCPA,
          upperLimit: setting.upperLimit
      })
      )
      return Object.assign({}, p4YahooStdRule, {settingRules: updatedSettingRule})
    }
    case P4YahooStdRuleConstant.UPDATE_EDITED_CELL:
      return Object.assign({}, p4YahooStdRule, {editedCell: action.editedCell})
    case P4YahooStdRuleConstant.UPDATE_SETTING_RULE:
      return Object.assign({}, p4YahooStdRule, {settingRules: action.settingRules})
    case P4YahooStdRuleConstant.UPDATE_REPORTS:
      return Object.assign({}, p4YahooStdRule, {reports: action.reports})
    case P4YahooStdRuleConstant.UPDATE_REPORT_PERIOD:
      return Object.assign({}, p4YahooStdRule, {reportPeriod: action.reportPeriod})
    default:
      return p4YahooStdRule
  }
}
