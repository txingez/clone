import translation from '../util/translation'

const operationRuleConstant = {
  // redux actions
  LOAD_OPERATION_RULES_SUCCESS: 'LOAD_OPERATION_RULES_SUCCESS',
  LOAD_OPERATION_RULE_SUCCESS: 'LOAD_OPERATION_RULE_SUCCESS',
  GET_OPERATION_RULE_DETAIL: 'GET_OPERATION_RULE_DETAIL',
  REMOVE_OPERATION_RULE: 'REMOVE_OPERATION_RULE',
  UPDATE_OPERATION_RULE_SELECT_ALL: 'UPDATE_OPERATION_RULE_SELECT_ALL',
  UPDATE_OPERATION_RULE_SELECT_ONE: 'UPDATE_OPERATION_RULE_SELECT_ONE',
  SHOW_OPERATION_RULE_DETAIL: 'SHOW_OPERATION_RULE_DETAIL',
  SET_OPERATION_RULE_ID: 'SET_OPERATION_RULE_ID',

  DELETE_LINE_SEARCH_SCOPE: 'DELETE_LINE_SEARCH_SCOPE',
  CHANGE_FILTER_VALUE: 'CHANGE_FILTER_VALUE',
  CREATE_LINE_SEARCH_SCOPE: 'CREATE_LINE_SEARCH_SCOPE',
  CHANGE_INPUT_VALUE_IN_LINE: 'CHANGE_INPUT_VALUE_IN_LINE',

  SET_SHOW_RULE_FORM: 'SET_SHOW_RULE_FORM',
  CREATE_NEW_RULE: 'CREATE_NEW_RULE',
  RESET_ACTION: 'RESET_ACTION',
  SUBMIT_OPERATION_RULE: 'SUBMIT_OPERATION_RULE',
  SHOW_TARGET_ACTION_PATH_FROM_LINE: 'SHOW_TARGET_ACTION_PATH_FROM_LINE',
  SET_VISIBLE_NUMBER_PARAMETER: 'SET_VISIBLE_NUMBER_PARAMETER',
  COPY_OPERATION_RULE: 'COPY_OPERATION_RULE',
  COPY_OPERATION_RULE_TO_OTHER_ACCOUNT: 'COPY_OPERATION_RULE_TO_OTHER_ACCOUNT',

  // running constants
  INSTRUCTION_LINE_URL: 'https://docs.google.com/presentation/d/1kQmXabSUvflQh41nhT9FSS2cuSjXn9rwDOgGvIaQJj8/edit#slide=id.g58dc9d6ebe_0_0',
  INSTRUCTION_FACEBOOK_URL: 'https://docs.google.com/presentation/d/11kc_mxJEWETJ6zSvNep9KDSvn8JASSSgmX1rt5QaMY8/edit#slide=id.p',
  MAX_LENGTH_RULE_NAME: 100,
  SET_DEFAULT_FOR_SEARCH_SCOPE: 'SET_DEFAULT_FOR_SEARCH_SCOPE',
  SET_SPEND_CAP_FLAG: 'SET_SPEND_CAP_FLAG',
  SHOW_JSON_TEXT: "SHOW_JSON_TEXT",
  ACTION: {
    UNIT_PERCENT : 'PERCENT',
    UNIT_NUMBER : 'NUMBER',
    INCREASE: 'INCREASE_AD_BID',
    DECREASE: 'DECREASE_AD_BID',
    INCREASE_AD_GROUP_BID_AMOUNT: 'INCREASE_AD_GROUP_BID_AMOUNT',
    DECREASE_AD_GROUP_BID_AMOUNT: 'DECREASE_AD_GROUP_BID_AMOUNT',
    INDICATE_BUDGET: ["INDICATE_CAMPAIGN_BUDGET","INDICATE_AD_GROUP_DAILY_BUDGET","INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY",
      "INDICATE_CAMPAIGN_DAILY_BUDGET", "INDICATE_CPN_DAILY_BUDGET_BY_DATE"],
    INCREASE_DAILY_BUDGET: ["INCREASE_CAMPAIGN_DAILY_BUDGET", "INCREASE_AD_GROUP_DAILY_BUDGET", "INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY"],
    DECREASE_DAILY_BUDGET: "DECREASE_CAMPAIGN_DAILY_BUDGET",
    ACTION_TYPE: 1,
    NUMBER_PARAMETER: 2,
    UNIT_PARAMETER: 3,
    OTHER_KEY: 4
  },
  AD_BID_ACTIONS : ["INCREASE_AD_BID", "DECREASE_AD_BID"],
  AD_ACTION_LIMIT: ["INCREASE_AD_BID", "DECREASE_AD_BID","INCREASE_CAMPAIGN_DAILY_BUDGET",
    "DECREASE_CAMPAIGN_DAILY_BUDGET", "INCREASE_AD_GROUP_BID_AMOUNT", "DECREASE_AD_GROUP_BID_AMOUNT", "INCREASE_AD_GROUP_DAILY_BUDGET", "DECREASE_AD_GROUP_DAILY_BUDGET",
    "INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY","DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY"],
  ACTION_SHOW_PREVIEW_BUTTON:["AD_REMOVE"],
  FACEBOOK_ACTION_HIDE_PREVIEW_BUTTON: ["SET_CPN_SPEND_CAP", "REMOVE_CPN_SPEND_CAP", "INDICATE_CPN_DAILY_BUDGET_BY_DATE"],
  FACEBOOK_ACTION_HIDE_COPY_BUTTON: ["SET_CPN_SPEND_CAP", "REMOVE_CPN_SPEND_CAP", "INDICATE_CPN_DAILY_BUDGET_BY_DATE"],
  FACEBOOK_ACTION_SELECT_CAMPAIGN: ["SET_CPN_SPEND_CAP", "REMOVE_CPN_SPEND_CAP", "INDICATE_CPN_DAILY_BUDGET_BY_DATE"],
  DEFAULT_ACTION_OBJECT: 'AD',
  ACTION_TYPE_ON_OFF: 'CAMPAIGN_ON_OFF',
  ACTION_TYPE_CAMPAIGN_BUDGET: 'CAMPAIGN_BUDGET_ADJUSTMENT',
  ACTION_TYPE_AD_OFF: 'AD_OFF',
  ACTION_TYPE_STD_AD_OFF: "STD_AD_OFF",
  ACTION_TYPE_AD_REMOVE: 'AD_REMOVE',
  ACTION_TYPE_CTR_AD_START: 'CTR_AD_START',
  ACTION_TYPE_SET_SPEND_CAP: 'SET_CPN_SPEND_CAP',
  ACTION_TYPE_REMOVE_SPEND_CAP: 'REMOVE_CPN_SPEND_CAP',
  ACTION_TYPE_SEARCHSCOPE_CAMPAIGN: ['AD_OFF','CAMPAIGN_ON_OFF', 'CAMPAIGN_BUDGET_ADJUSTMENT'],
  ACTION_TYPE_NONE_RULE_SCHEDULE: ['ACCOUNT_BUDGET_MONITOR','CAMPAIGN_BUDGET_ADJUSTMENT'],
  ACTION_TYPE_ACCOUNT_BUDGET_MONITOR: 'ACCOUNT_BUDGET_MONITOR',
  ACTION_TYPE_INCREASE_AD_BID: 'INCREASE_AD_BID',
  ACTION_TYPE_DECREASE_AD_BID: 'DECREASE_AD_BID',
  ACTION_TYPE_ACCOUNT_ON: 'ACCOUNT_ON',
  ACTION_TYPE_ACCOUNT_OFF:'ACCOUNT_OFF',
  ACTION_TYPE_AD_GROUP_ON: 'AD_GROUP_ON',
  ACTION_TYPE_AD_GROUP_OFF: 'AD_GROUP_OFF',
  ACTION_TYPE_CAMPAIGN_ON: 'CAMPAIGN_ON',
  ACTION_TYPE_CAMPAIGN_OFF: 'CAMPAIGN_OFF',
  ACTION_TYPE_AD_ON: 'AD_ON',
  ACTION_TYPE_FACEBOOK_NOT_HOURLY:["INCREASE_CAMPAIGN_DAILY_BUDGET","DECREASE_CAMPAIGN_DAILY_BUDGET","INDICATE_CAMPAIGN_DAILY_BUDGET", "AD_REMOVE"],
  ACTION_TYPE_INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY: 'INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY',
  ACTION_TYPE_DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY: 'DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY',
  ACTION_TYPE_INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY: 'INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY',
  ACTION_TYPE_FACEBOOK_HOURLY: ['INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY','DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY','INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY'],
  ACTION_HAS_EXCLUDE_SEARCH_SCOPE_BY_MEDIA: {
    "NEW LINE": ["CTR_AD_START"],
    "FACEBOOK": ["AD_REMOVE"]
  },
  ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE: 'INDICATE_CPN_DAILY_BUDGET_BY_DATE',
  DEFAULT_ACTION_TYPE: 'INCREASE_AD_BID',

  CAMPAIGN_BUDGET_MONITOR: 'CAMPAIGN_BUDGET_MONITOR',
  CAMPAIGN_RE_ACTIVE: 'CAMPAIGN_RE_ACTIVE',

  DEFAULT_FILTER_LEVEL : [
    {key: 'CAMPAIGN', value: 'CAMPAIGN_NAME', text: translation.t('search_scope.campaign_name')},
    {key: 'ADGROUP', value: 'ADGROUP_NAME', text: translation.t('search_scope.ad_group_name')},
    {key: 'AD', value: 'CREATIVE_NAME', text: translation.t('search_scope.creative_name')},
  ],
  DEFAULT_FILTER_LEVEL_NEW_LINE: [
    {key: 'CAMPAIGN', value: 'CAMPAIGN_NAME', text: "Campaign"},
    {key: 'ADGROUP', value: 'ADGROUP_NAME', text: "Ad Group"},
    {key: 'AD', value: 'AD_NAME', text: "Ad"},
  ],
  DEFAULT_FILTER_LEVEL_FACEBOOK: [
    {key: 'CAMPAIGN', value: 'CAMPAIGN_NAME', text: translation.t('search_scope.fb_campaign_name')},
    {key: 'ADSET', value: 'ADSET_NAME', text: translation.t('search_scope.ad_set_name')},
    {key: 'AD', value: 'AD_NAME', text: translation.t('search_scope.fb_ad_name')}
  ],
  MEDIA_LIST: {
    NEWLINE: 'NEW LINE',
    YAHOO: 'YAHOO',
    FACEBOOK: 'FACEBOOK',
    TWITTER: 'TWITTER'
  },
  SEARCH_SCOPE_OPTION_TYPE: {
    value: [
      "INCLUDE", "EXCLUDE"
    ],
    maxQuantity: 3
  },
  OPTION_TYPE_GROUP:{
    ONE: [
      {key: 'INCLUDE', value: 'INCLUDE', disable: false},
      {key: 'EXCLUDE', value: 'EXCLUDE', disable: false}
    ],
    TWO: [
      {key: 'INCLUDE', value: 'INCLUDE', disable: true},
      {key: 'EXCLUDE', value: 'EXCLUDE', disable: false}
    ],
    THREE: [
      {key: 'INCLUDE', value: 'INCLUDE', disable: false},
      {key: 'EXCLUDE', value: 'EXCLUDE', disable: true}
    ]
  },
  MEDIA_NAME_LIST: ['YAHOO', 'NEW LINE','FACEBOOK', 'TWITTER'],
  MANUAL_DOCUMENT_LINK :{
    SEPTENI: {
      'NEW LINE': 'https://docs.google.com/presentation/d/1kQmXabSUvflQh41nhT9FSS2cuSjXn9rwDOgGvIaQJj8/edit#slide=id.g58dc9d6ebe_0_0',
      'FACEBOOK': 'https://docs.google.com/presentation/d/11kc_mxJEWETJ6zSvNep9KDSvn8JASSSgmX1rt5QaMY8/edit#slide=id.p'
    },
  },
  COMPANY_MEDIA_LIST: {
    SEPTENI: ['YAHOO', 'NEW LINE','FACEBOOK', 'TWITTER'],
    DENTSU : ['NEW LINE'],
  },
  ACTION_TYPE_CONFIG : [
    {key: 'INCREASE_AD_BID', value: {
      isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'DECREASE_AD_BID', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'CAMPAIGN_ON', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'CAMPAIGN_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'CAMPAIGN_ON_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'INCREASE_CAMPAIGN_DAILY_BUDGET', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'DECREASE_CAMPAIGN_DAILY_BUDGET', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'INDICATE_CAMPAIGN_BUDGET', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: false
      }},
    {key: 'INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: false
      }},
    {key: 'AD_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'AD_REMOVE', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'CAMPAIGN_BUDGET_ADJUSTMENT', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false,isVisibleActionLimit: false
      }},
    {key: 'AD_ON', value: {
      isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
    }},
    {key: 'ACCOUNT_BUDGET_MONITOR', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false,isVisibleActionLimit: false
      }},
    // {key: 'CAMPAIGN_BUDGET_MONITOR', value: {
    //     isVisibleNumberParameter: false, isVisibleUnitParameter: false,isVisibleActionLimit: false
    //   }},
    // {key: 'CAMPAIGN_RE_ACTIVE', value: {
    //     isVisibleNumberParameter: false, isVisibleUnitParameter: false,isVisibleActionLimit: false
    //   }},
    {key: 'INCREASE_AD_GROUP_BID_AMOUNT', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
    {key: 'DECREASE_AD_GROUP_BID_AMOUNT', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
      }},
     {key: 'INCREASE_AD_GROUP_DAILY_BUDGET', value: {
         isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
       }},
     {key: 'DECREASE_AD_GROUP_DAILY_BUDGET', value: {
         isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: true
       }},
     {key: 'INDICATE_AD_GROUP_DAILY_BUDGET', value: {
         isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: false
       }},
    {key: 'ACCOUNT_ON', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'ACCOUNT_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'AD_GROUP_ON', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'AD_GROUP_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'INDICATE_CAMPAIGN_DAILY_BUDGET', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: false
      }},
    {key: 'SET_CPN_SPEND_CAP', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "P4FCampaignSpendCap"
      }},
    {key: 'REMOVE_CPN_SPEND_CAP', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "P4FCampaignSpendCap"
      }},
    {key: 'INDICATE_CPN_DAILY_BUDGET_BY_DATE', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: true, isVisibleActionLimit: false,
        customForm: "P4FCampaignSpendCap"
      }},
    {key: 'CTR_AD_START', value: {
        isVisibleNumberParameter: true, isVisibleUnitParameter: false, isVisibleActionLimit: false
      }},
    {key: 'STD_CVR_AD_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "YahooSTDRule"
      }},
    {key: 'STD_AD_ON', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "YahooSTDRule"
      }},
    {key: 'STD_AD_BID', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "YahooSTDRule"
      }},
    {key: 'STD_ADFMT_BID', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "YahooSTDRule"
      }},
    {key: 'STD_AD_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "FacebookSTDRule"
      }},
    {key: 'STD_ADFMT_BID', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "TwitterSTDRule"
      }},
    {key: 'STD_AD_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "TwitterSTDRule"
      }},
    {key: 'STD_AD_OFF', value: {
        isVisibleNumberParameter: false, isVisibleUnitParameter: false, isVisibleActionLimit: false,
        customForm: "NewLineSTDRule"
      }}
  ],
  ACTION_TYPE : {
    'YAHOO': [
      {key: 'INCREASE_AD_BID', value: 'INCREASE_AD_BID', text: translation.t('action.increase_ad_bid'), actionObject: 'AD', company:['SEPTENI']},
      {key: 'DECREASE_AD_BID', value: 'DECREASE_AD_BID', text: translation.t('action.decrease_ad_bid'), actionObject: 'AD', company:['SEPTENI']},
      {key: 'ACCOUNT_ON', value: 'ACCOUNT_ON', text: translation.t('action.account_on'), actionObject: 'ACCOUNT', company:['SEPTENI']},
      {key: 'ACCOUNT_OFF', value: 'ACCOUNT_OFF', text: translation.t('action.account_off'), actionObject: 'ACCOUNT', company:['SEPTENI']},
      {key: 'CAMPAIGN_ON', value: 'CAMPAIGN_ON', text: translation.t('action.campaign_on'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'CAMPAIGN_OFF', value: 'CAMPAIGN_OFF', text: translation.t('action.campaign_off'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'AD_GROUP_ON', value: 'AD_GROUP_ON', text: translation.t('action.ad_group_on'), actionObject: 'ADGROUP', company:['SEPTENI']},
      {key: 'AD_GROUP_OFF', value: 'AD_GROUP_OFF', text: translation.t('action.ad_group_off'), actionObject: 'ADGROUP', company:['SEPTENI']},
      {key: 'AD_ON', value: 'AD_ON', text: translation.t('action.ad_on'), actionObject: 'AD', company:['SEPTENI']},
      {key: 'CAMPAIGN_BUDGET_ADJUSTMENT', value: 'CAMPAIGN_BUDGET_ADJUSTMENT', text: translation.t('action.cpn_budget_adjustment'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'ACCOUNT_BUDGET_MONITOR', value: 'ACCOUNT_BUDGET_MONITOR', text: translation.t('action.account_budget_monitor'), actionObject: 'ACCOUNT', company:['SEPTENI']},
      {key: 'STD_CVR_AD_OFF', value: 'STD_CVR_AD_OFF', text: translation.t('action.std_ad_off'), actionObject: 'ADGROUP', company:['SEPTENI']},
      {key: 'STD_AD_ON', value: 'STD_AD_ON', text: translation.t('action.std_ad_on'), actionObject: 'ADGROUP', company:['SEPTENI']},
      {key: 'STD_ADFMT_BID', value: 'STD_ADFMT_BID', text: translation.t('action.std_adfmt_bid'), actionObject: 'ADGROUP', company:['SEPTENI']}
    ],
    'NEW LINE': [
      {key: 'INCREASE_AD_GROUP_BID_AMOUNT', value: 'INCREASE_AD_GROUP_BID_AMOUNT', text: translation.t('action.increase_ad_group_bid_amount_new_line'), actionObject: 'ADGROUP', company:['SEPTENI', 'DENTSU']},
      {key: 'DECREASE_AD_GROUP_BID_AMOUNT', value: 'DECREASE_AD_GROUP_BID_AMOUNT', text: translation.t('action.decrease_ad_group_bid_amount_new_line'), actionObject: 'ADGROUP', company:['SEPTENI', 'DENTSU']},
      {key: 'AD_OFF', value: 'AD_OFF', text: translation.t('action.ad_off_new_line'), actionObject: 'AD', company:['SEPTENI', 'DENTSU']},
      {key: 'AD_REMOVE', value: 'AD_REMOVE', text: translation.t('action.ad_remove_new_line'), actionObject: 'AD', company:['SEPTENI', 'DENTSU']},
      {key: 'CAMPAIGN_ON_OFF', value: 'CAMPAIGN_ON_OFF', text: translation.t('action.campaign_on_off_new_line'), actionObject: 'CAMPAIGN', company:['SEPTENI', 'DENTSU']},
      {key: 'INCREASE_AD_GROUP_DAILY_BUDGET', value: 'INCREASE_AD_GROUP_DAILY_BUDGET', text: translation.t('action.increase_ad_group_daily_budget_new_line'), actionObject: 'ADGROUP', company:['SEPTENI', 'DENTSU']},
      {key: 'DECREASE_AD_GROUP_DAILY_BUDGET', value: 'DECREASE_AD_GROUP_DAILY_BUDGET', text: translation.t('action.decrease_ad_group_daily_budget_new_line'), actionObject: 'ADGROUP', company:['SEPTENI', 'DENTSU']},
      {key: 'INDICATE_AD_GROUP_DAILY_BUDGET', value: 'INDICATE_AD_GROUP_DAILY_BUDGET', text: translation.t('action.indicate_ad_group_daily_budget_new_line'), actionObject: 'ADGROUP', company:['SEPTENI', 'DENTSU']},
      {key: 'ACCOUNT_BUDGET_MONITOR', value: 'ACCOUNT_BUDGET_MONITOR', text: translation.t('action.account_budget_monitor_new_line'), actionObject: 'ACCOUNT', company:['SEPTENI', 'DENTSU']},
      {key: 'CTR_AD_START', value: 'CTR_AD_START', text: translation.t('action.ctr_ad_start_new_line'), actionObject: 'AD', company:['SEPTENI']},
      {key: 'STD_AD_OFF', value: 'STD_AD_OFF', text: translation.t('action.std_ad_off'), actionObject: 'AD', company: ['SEPTENI']}
    ],
    'FACEBOOK': [
      // {key: 'INCREASE_CAMPAIGN_DAILY_BUDGET', value: 'INCREASE_CAMPAIGN_DAILY_BUDGET', text: translation.t('action.increase_campaign_daily_budget'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      // {key: 'DECREASE_CAMPAIGN_DAILY_BUDGET', value: 'DECREASE_CAMPAIGN_DAILY_BUDGET', text: translation.t('action.decrease_campaign_daily_budget'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      // {key: 'INDICATE_CAMPAIGN_DAILY_BUDGET', value: 'INDICATE_CAMPAIGN_DAILY_BUDGET', text: translation.t('action.indicate_campaign_budget'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: 'INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', text: translation.t('action.increase_campaign_daily_budget_hourly') , actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: 'DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', text: translation.t('action.decrease_campaign_daily_budget_hourly') , actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: 'INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY', text: translation.t('action.indicate_campaign_daily_budget_hourly') , actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'AD_REMOVE', value: 'AD_REMOVE', text: translation.t('action.ad_remove'), actionObject: 'AD', company:['SEPTENI']},
      {key: 'SET_CPN_SPEND_CAP', value: 'SET_CPN_SPEND_CAP', text: translation.t('action.set_cpn_spend_cap'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'REMOVE_CPN_SPEND_CAP', value: 'REMOVE_CPN_SPEND_CAP', text: translation.t('action.remove_cpn_spend_cap'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'INDICATE_CPN_DAILY_BUDGET_BY_DATE', value: 'INDICATE_CPN_DAILY_BUDGET_BY_DATE', text: translation.t('action.indicate_cpn_daily_budget_by_date'), actionObject: 'CAMPAIGN', company:['SEPTENI']},
      {key: 'STD_AD_OFF', value: 'STD_AD_OFF', text: translation.t('action.std_ad_off'), actionObject: 'AD', company:['SEPTENI']}
    ],
    'TWITTER': [
      {key: 'STD_ADFMT_BID', value: 'STD_ADFMT_BID', text: translation.t('action.std_adgroupfmt_bid'), actionObject: 'ADGROUP', company:['SEPTENI']},
      {key: 'STD_AD_OFF', value: 'STD_AD_OFF', text: translation.t('action.std_ad_off'), actionObject: 'AD', company: ['SEPTENI']}
    ]
  },
  ONLY_SEARCH_SCOPE_FOR_CAMPAIGN_ACTION: {
    'LINE': ['CAMPAIGN_ON_OFF'],
    'YAHOO': ['CAMPAIGN_BUDGET_ADJUSTMENT'],
    'NEW LINE': ['CAMPAIGN_ON_OFF'],
    'FACEBOOK':[],
    'TWITTER': []
  },
  ACTION_UNIT_PARAMETER:{
    'USD': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.usd_currency_symbol')}
    ],
    'JPY': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.unit_param_number')}
    ],
    'TWD': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.taiwan_currency_symbol')}
    ],
    'THB': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.thailand_currency_symbol')}
    ],
    'VND': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.vietnam_currency_symbol')}
    ],
    'KRW': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.korean_currency_symbol')}
    ],
    'EUR': [
      {key: 'PERCENT', value: 'PERCENT', text: translation.t('action.unit_param_percent')},
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.europe_currency_symbol')}
    ]
  },
  ACTION_UNIT_INDICATE : {
    'USD': [
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.usd_currency_symbol')}
    ],
    'JPY': [
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.unit_param_number')}
    ],
    'TWD': [
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.taiwan_currency_symbol')}
    ],
    'THB': [
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.thailand_currency_symbol')}
    ],
    'KRW': [
      {key: 'NUMBER', value: 'NUMBER', text: translation.t('action.korean_currency_symbol')}
    ]
  },
  MAX_LINE_IN_SEARCH_SCOPE_DEFAULT_CONFIG: {key: 'DEFAULT', value: 3},
  MAX_LINE_IN_SEARCH_SCOPE_FOR_FACEBOOK: [
    {key: 'INCREASE_CAMPAIGN_DAILY_BUDGET', value: 1},
    {key: 'DECREASE_CAMPAIGN_DAILY_BUDGET', value: 1},
    {key: 'INDICATE_CAMPAIGN_DAILY_BUDGET', value: 1},
    {key: 'INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: 1},
    {key: 'DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: 1},
    {key: 'INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY', value: 1},
    {key: 'AD_REMOVE', value: 6}
  ],
  MAX_LINE_IN_SEARCH_SCOPE_FOR_NEWLINE: [
    {key: 'INCREASE_AD_GROUP_BID_AMOUNT', value: 3},
    {key: 'DECREASE_AD_GROUP_BID_AMOUNT', value: 3},
    {key: 'AD_OFF', value: 3},
    {key: 'AD_REMOVE', value: 3},
    {key: 'CAMPAIGN_ON_OFF', value: 1},
    {key: 'INCREASE_AD_GROUP_DAILY_BUDGET', value: 3},
    {key: 'DECREASE_AD_GROUP_DAILY_BUDGET', value: 3},
    {key: 'INDICATE_AD_GROUP_DAILY_BUDGET', value: 3},
    {key: 'ACCOUNT_BUDGET_MONITOR', value: 0},
    {key: 'CTR_AD_START', value: 6}
  ],
  STATUS_ENABLED: 'ENABLED',
  STATUS_DISABLED: 'DISABLED',
  DEFAULT_TRIGGER_DATA: {
    isShowTriggerForm: false,
    triggers: [],
    selectedTrigger: {
      triggerSteps: []
    }
  },
  DEFAULT_OPERATION_NAME: {
    'YAHOO': translation.t('action.increase_ad_bid') + '_ _' + translation.t('action.unit_param_percent'),
    'NEW LINE': translation.t('action.increase_ad_group_bid_amount_new_line') + '_ _' + translation.t('action.unit_param_percent'),
    'FACEBOOK': translation.t('action.increase_campaign_daily_budget_hourly') + '_ _' + translation.t('action.unit_param_percent'),
    'TWITTER': translation.t('action.std_adgroupfmt_bid')
  },
  YAHOO_STD_ACTION: ["STD_CVR_AD_OFF", "STD_AD_ON", "STD_AD_BID", "STD_ADFMT_BID"],
  YAHOO_AD_BID_ADJUSTMENT: ["STD_AD_BID", "STD_ADFMT_BID"],
  FILTER_TYPE_LIST: {
    'YAHOO': [
      {key: 'EXACT_MATCH', value: 'EXACT_MATCH', text: translation.t('search_scope.exact_match')},
      {key: 'PARTIAL_MATCH', value: 'PARTIAL_MATCH', text: translation.t('search_scope.partial_match')}
    ],
    'NEW LINE': [
      {key: 'EXACT_MATCH', value: 'EXACT_MATCH', text: translation.t('search_scope.exact_match')},
      {key: 'PARTIAL_MATCH', value: 'PARTIAL_MATCH', text: translation.t('search_scope.partial_match')}
    ]
  },
  DEFAULT_COST_RATE: 95,
  FB_AD_REMOVE_BASE_TRIGGER: {
    index: 0,
    status: "ENABLED",
    triggerId: 0,
    triggerSteps: [
      {adObject: "ACCOUNT", boundaryValue: "1", id: 0, joinCondition: "AND", timeRange: "YESTERDAY", triggerComparable: "IMPRESSION", triggerOperator: "GREATER_OR_EQUAL"},
      {adObject: "AD", boundaryValue: "OFF", id: 0, joinCondition: "AND", timeRange: "NONE", triggerComparable: "STATUS", triggerOperator: "EQUAL"},
      {adObject: "AD", boundaryValue: "50000", id: 0, joinCondition: "AND", timeRange: "LAST30DAYS", triggerComparable: "COST", triggerOperator: "LESS_OR_EQUAL"},
      {adObject: "AD", boundaryValue: "1", id: 0, joinCondition: "AND", timeRange: "LAST14DAYS", triggerComparable: "IMPRESSION", triggerOperator: "GREATER_OR_EQUAL"}
    ]
  },
  REPORT_PERIOD_LIST: [
    {key: '3DAY', value: '3DAY', text: translation.t('report_period.last3Day')},
    {key: '4DAY', value: '4DAY', text: translation.t('report_period.last4Day')},
    {key: '5DAY', value: '5DAY', text: translation.t('report_period.last5Day')},
    {key: '6DAY', value: '6DAY', text: translation.t('report_period.last6Day')},
    {key: '7DAY', value: '7DAY', text: translation.t('report_period.last7Day')},
    {key: '8DAY', value: '8DAY', text: translation.t('report_period.last8Day')},
    {key: '9DAY', value: '9DAY', text: translation.t('report_period.last9Day')},
    {key: '10DAY', value: '10DAY', text: translation.t('report_period.last10Day')},
    {key: '11DAY', value: '11DAY', text: translation.t('report_period.last11Day')},
    {key: '12DAY', value: '12DAY', text: translation.t('report_period.last12Day')},
    {key: '13DAY', value: '13DAY', text: translation.t('report_period.last13Day')},
    {key: '14DAY', value: '14DAY', text: translation.t('report_period.last14Day')},
    {key: '15DAY', value: '15DAY', text: translation.t('report_period.last15Day')},
    {key: '16DAY', value: '16DAY', text: translation.t('report_period.last16Day')},
    {key: '17DAY', value: '17DAY', text: translation.t('report_period.last17Day')},
    {key: '18DAY', value: '18DAY', text: translation.t('report_period.last18Day')},
    {key: '19DAY', value: '19DAY', text: translation.t('report_period.last19Day')},
    {key: '20DAY', value: '20DAY', text: translation.t('report_period.last20Day')},
    {key: '21DAY', value: '21DAY', text: translation.t('report_period.last21Day')},
    {key: '22DAY', value: '22DAY', text: translation.t('report_period.last22Day')},
    {key: '23DAY', value: '23DAY', text: translation.t('report_period.last23Day')},
    {key: '24DAY', value: '24DAY', text: translation.t('report_period.last24Day')},
    {key: '25DAY', value: '25DAY', text: translation.t('report_period.last25Day')},
    {key: '26DAY', value: '26DAY', text: translation.t('report_period.last26Day')},
    {key: '27DAY', value: '27DAY', text: translation.t('report_period.last27Day')},
    {key: '28DAY', value: '28DAY', text: translation.t('report_period.last28Day')},
    {key: '29DAY', value: '29DAY', text: translation.t('report_period.last29Day')},
    {key: '30DAY', value: '30DAY', text: translation.t('report_period.last30Day')}
  ],

  YAHOO_STD_RULE_SETTING_TABLE_COLUMNS: [
    { key: "AD_GROUP_NAME", name: "ADG名", editable: false },
    { key: "COST", name: "COST", editable: false },
    { key: "CPA", name: "CPA", editable: false },
    { key: "REFERENCE_PERIOD", name: "参照期間"},
    { key: "REFERENCE_DAY", name: "期間"},
    { key: "TARGET_CPA", name: "目標CPA"},
    { key: "UPPER_LIMIT", name: "入札上限"},
    { key: "MINIMUM_LIMIT", name: "入札下限"},
    { key: "MINIMUM_LIMIT_CPC", name: "下限稼働本数"}
  ],
  YAHOO_AD_BID_ADJUSTMENT_COLUMNS: ["UPPER_LIMIT", "MINIMUM_LIMIT"],
  YAHOO_AD_ON_OFF_COLUMNS: [ "MINIMUM_LIMIT_CPC"],
  YAHOO_FIXED_COLUMNS: ["AD_GROUP_NAME", "COST", "CPA", "REFERENCE_PERIOD", "REFERENCE_DAY", "TARGET_CPA"],
  YAHOO_REFERENCE_DAY: [
    { value: "strong", text: "期間長め" },
    { value: "medium", text: "期間普通" },
    { value: "weak", text: "期間短め" },
    { value: "notSet", text: "未設定" }
  ],

  ACTION_DOCUMENT_LINK: [
    {
      MEDIA: "NEW LINE",
      ACTION: "AD_OFF" ,
      LINK: "https://docs.google.com/presentation/d/1kQmXabSUvflQh41nhT9FSS2cuSjXn9rwDOgGvIaQJj8/edit#slide=id.g58dc9d6ebe_0_256"
    },
    {
      MEDIA: "NEW LINE",
      ACTION: "CTR_AD_START" ,
      LINK: "https://docs.google.com/presentation/d/1kQmXabSUvflQh41nhT9FSS2cuSjXn9rwDOgGvIaQJj8/edit#slide=id.g5a5473bd8f_0_3"
    },
    {
      MEDIA: "NEW LINE",
      ACTION: "INCREASE_AD_GROUP_BID_AMOUNT" ,
      LINK: "https://docs.google.com/presentation/d/1kQmXabSUvflQh41nhT9FSS2cuSjXn9rwDOgGvIaQJj8/edit#slide=id.g58dc9d6ebe_0_158"
    },
    {
      MEDIA: "NEW LINE",
      ACTION: "DECREASE_AD_GROUP_BID_AMOUNT" ,
      LINK: "https://docs.google.com/presentation/d/1kQmXabSUvflQh41nhT9FSS2cuSjXn9rwDOgGvIaQJj8/edit#slide=id.g58dc9d6ebe_0_158"
    },
    {
      MEDIA: "YAHOO",
      ACTION: "STD_ADFMT_BID" ,
      LINK: "https://sites.google.com/septeni.co.jp/mediaproject/Rules/ydnpx/%E9%81%8B%E7%94%A8%E8%80%85%E7%94%A8px-y_%E5%85%A5%E6%9C%AD%E3%83%AB%E3%83%BC%E3%83%AB?authuser=0"
    },
    {
      MEDIA: "YAHOO",
      ACTION: "STD_CVR_AD_OFF" ,
      LINK: "https://sites.google.com/septeni.co.jp/mediaproject/Rules/ydnpx/%E9%81%8B%E7%94%A8%E8%80%85%E7%94%A8px-y_ad%E5%81%9C%E6%AD%A2ad%E5%88%A5%E6%A8%99%E6%BA%96%E5%8C%96?authuser=0"
    },
    {
      MEDIA: "YAHOO",
      ACTION: "STD_AD_ON" ,
      LINK: "https://sites.google.com/septeni.co.jp/mediaproject/Rules/ydnpx/%E9%81%8B%E7%94%A8%E8%80%85%E7%94%A8px-y_ad%E9%96%8B%E5%A7%8Bad%E5%88%A5%E6%A8%99%E6%BA%96%E5%8C%96?authuser=0"
    },
    {
      MEDIA: "YAHOO",
      ACTION: "ACCOUNT_BUDGET_MONITOR" ,
      LINK: "https://sites.google.com/septeni.co.jp/mediaproject/Rules/ydnpx/%E9%81%8B%E7%94%A8%E8%80%85%E7%94%A8px-y_%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E4%BA%88%E7%AE%97%E7%9B%A3%E8%A6%96?authuser=0"
    },
    {
      MEDIA: "FACEBOOK",
      ACTION: "STD_AD_OFF",
      LINK: "https://docs.google.com/presentation/d/1hTyVWw8DaYuKmGr7o1V8tpdOzkUigVeREjvi7AJ0wUg/edit#slide=id.g4dd8778d9e_0_0"
    },
    {
      MEDIA: "TWITTER",
      ACTION: "STD_ADFMT_BID",
      LINK: "https://sites.google.com/septeni.co.jp/mediaproject/Rules/twapx/twa_%E5%85%A5%E6%9C%AD"
    },
    {
      MEDIA: "TWITTER",
      ACTION: "STD_AD_OFF",
      LINK: "https://sites.google.com/septeni.co.jp/mediaproject/Rules/twapx/twa_ad%E5%81%9C%E6%AD%A2%E3%83%AB%E3%83%BC%E3%83%AB"
    },
    {
      MEDIA: "NEW LINE",
      ACTION: "STD_AD_OFF",
      LINK: "https://docs.google.com/presentation/d/1LuUbGuJ1K2Vy1yVSupJGAnOOCBA-BHaas94kio03VEc/edit#slide=id.g7bdbb2643e_0_15"
    }
  ],

  MEDIAS_USE_STD_RULE_FORM: ['NEW LINE', 'FACEBOOK', 'TWITTER'],
  RULES_USE_STD_RULE_FORM: ["STD_ADFMT_BID", "STD_AD_OFF"],
  AD_OFF_IS_CONVERSION: [
    {value: "1", text: "20件"},
    {value: "0", text: "適用しない"},
    {value: "", text: "未設定"}
  ],
  AD_OFF_CONVERSION_TYPE: [
    {value: "conversion", text: "conversion"},
    {value: "optimize_conversion", text: "optimize_conversion"},
    {value: "", text: "未設定"}
  ],
  CUSTOM_FORM_DUPLICATE_BUTTON: ["YahooSTDRule", "FacebookSTDRule", "TwitterSTDRule", "NewLineSTDRule"],
  FORM_NAME: {
    STD_RULE_FORM: "STD_RULE_FORM",
    SIMPLE_RULE_FORM: "SIMPLE_RULE_FORM"
  },

  TWITTER_STD_ACTION: ['STD_AD_OFF', 'STD_ADFMT_BID'],

  LOGIC_VERSION: {
    FACEBOOK: "v0"
  },

  NEWLINE_STD_ACTION: ['STD_AD_OFF']
}

export default operationRuleConstant
