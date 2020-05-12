import operationConstant from './app/constants/operationRule'
import translation from './app/util/translation'
import p4fCampaignDataConstant from "./app/constants/p4fCampaignData"

export default {
  users: [],
  user: {},
  userAuth: {},
  ruleList: {
    rules: [],
    isDisplayRuleList: false,
    selectedRuleIndex: -1
  },
  operationRule: {
    id: 0,
    operationName: '',    //it depend on the media.
    action: {
      actionType: '',     //it depend on the media.
      actionNumberParameter: '',
      actionUnitParameter: operationConstant.ACTION_UNIT_PARAMETER['JPY'][0].key,
      actionObject: ''
    },
    showUnitAndNumberParameter: true,
    searchScope: [],
    searchScopeForCampaign: [],
    targetActionPaths: [], //todo: remove after test,
    jsonText: '',
    statusEnabled: true,
    extension: {
      action: {
        actionLimit: "",
        accountReactive: true
      }
    }
  },
  actionData: {
  },
  triggerData: operationConstant.DEFAULT_TRIGGER_DATA,
  modal: {
    isShow: false,
    message: '',
    title: '',
    type: 'error'
  },
  pageNumber: 0,
  tab: 0,
  account: {
    selectedAccountId: 0,
    accountList: [],
    filterMedias: [],
    accountIdCopyRule: 0,
    companyCode: ''
  },
  ruleSchedule: {
    isVisibleSchedule: false,
    label: translation.t('frequency.once_per_hour'),
    campaignOnOffSchedule: [],
    actionEnableSchedule: []
  },
  adjustmentRuleSchedule: {
    isVisibleSchedule: false,
    label: translation.t('frequency.once_per_hour'),
    adjustmentSchedule: []
  },
  ruleInputInterface: {
    formName: "SIMPLE_RULE_FORM",
    isEdit: true,
    isShowForm: false
  },
  searchScopePath: {
    isVisibleResult: false,
    validPath:[]
  },
  previewRuleTarget: {
    isVisible: false,
    results: []
  },
  p4fCampaignData: {
    campaigns: [],
    selectedCampaign: {},
    costToday: 0,
    spendCapLowerLimit: p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT,
    adSet: {
      number: 0,
      totalMinCost:0
    }
  },

  p4YahooStdRule: {
    ruleId: 0,
    reports: [],
    reportPeriod: "30DAY",
    editedCell: [],
    settingRules: []
  },

  stdRule: {
    stdRuleName: "",
    actionType: "",
    tableData: [],
    rowCopied: {
      identifier: -1,
      isCopied: false
    },
    arrayRowToPaste: [],
    dataCopied: {},
    reportPeriod: "30DAY",
    conversionType: "Install",
    searchText: ""
  }
}
