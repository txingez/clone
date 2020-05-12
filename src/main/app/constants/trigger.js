import translation from '../util/translation'

const triggerConstant = {
  SELECT_TRIGGER: 'SELECT_TRIGGER',
  ADD_NEW_TRIGGER: 'ADD_NEW_TRIGGER',
  UPDATE_TRIGGER: 'UPDATE_TRIGGER',
  REMOVE_TRIGGER: 'REMOVE_TRIGGER',
  SET_SHOW_TRIGGER_FORM: 'SET_SHOW_TRIGGER_FORM',
  SHOW_TRIGGER: 'SHOW_TRIGGER',
  APPLY_ACTION_ONLY: 'APPLY_ACTION_ONLY',
  RESET_TRIGGER: 'RESET_TRIGGER',
  UPDATE_VALID_TRIGGERS: 'UPDATE_VALID_TRIGGERS',
  TIME_RANGE_OPTIONS: {
    'LINE': [
      {key: 'TODAY', value: 'TODAY', text: translation.t('trigger.time_range.today')},
      {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday')},
      {key: 'LAST2DAYS', value: 'LAST2DAYS', text: translation.t('trigger.time_range.last2days')},
      {key: 'LAST3DAYS', value: 'LAST3DAYS', text: translation.t('trigger.time_range.last3days')},
      {key: 'LAST7DAYS', value: 'LAST7DAYS', text: translation.t('trigger.time_range.last7days')},
      {key: 'LAST10DAYS', value: 'LAST10DAYS', text: translation.t('trigger.time_range.last10days')},
      {key: 'LAST15DAYS', value: 'LAST15DAYS', text: translation.t('trigger.time_range.last15days')},
      {key: 'LAST30DAYS', value: 'LAST30DAYS', text: translation.t('trigger.time_range.last30days')},
      {key: 'NONE', value: 'NONE', text: translation.t('trigger.time_range.none')}
    ],
    'YAHOO': [
      {key: 'TODAY', value: 'TODAY', text: translation.t('trigger.time_range.today')},
      {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday')},
      {key: 'LAST2DAYS', value: 'LAST2DAYS', text: translation.t('trigger.time_range.last2days')},
      {key: 'LAST3DAYS', value: 'LAST3DAYS', text: translation.t('trigger.time_range.last3days')},
      {key: 'LAST7DAYS', value: 'LAST7DAYS', text: translation.t('trigger.time_range.last7days')},
      {key: 'LAST10DAYS', value: 'LAST10DAYS', text: translation.t('trigger.time_range.last10days')},
      {key: 'LAST15DAYS', value: 'LAST15DAYS', text: translation.t('trigger.time_range.last15days')},
      {key: 'LAST30DAYS', value: 'LAST30DAYS', text: translation.t('trigger.time_range.last30days')},
      {key: 'NONE', value: 'NONE', text: translation.t('trigger.time_range.none')}
    ]
  },
  AD_OBJECT_OPTIONS: {
    'LINE': [
      {key: 'AD', value: 'AD', text: translation.t('trigger.ad_object.ad')},
      {key: 'ADGROUP', value: 'ADGROUP', text: translation.t('trigger.ad_object.ad_group')},
      {key: 'CAMPAIGN', value: 'CAMPAIGN', text: translation.t('trigger.ad_object.campaign')},
      {key: 'ACCOUNT', value: 'ACCOUNT', text: translation.t('trigger.ad_object.account')}
    ],
    'INCREASE_DECREASE_YAHOO_AD_OBJECT': [
      {key: 'AD', value: 'AD', text: translation.t('trigger.ad_object.ad')},
      {key: 'ADGROUP', value: 'ADGROUP', text: translation.t('trigger.ad_object.ad_group')},
      {key: 'CAMPAIGN', value: 'CAMPAIGN', text: translation.t('trigger.ad_object.campaign')},
      {key: 'ACCOUNT', value: 'ACCOUNT', text: translation.t('trigger.ad_object.account')}
    ],
    'YAHOO': [
      {key: 'AD', value: 'AD', text: translation.t('trigger.yahoo.ad')},
      {key: 'ADGROUP', value: 'ADGROUP', text: translation.t('trigger.yahoo.ad_group')},
      {key: 'ACCOUNT', value: 'ACCOUNT', text: translation.t('trigger.ad_object.account')}
    ]
  },
  AD_PERFORMANCE_OPTIONS: {
    'LINE': [
      {key: 'COST', value: 'COST', text: translation.t('trigger.comparable.cost')},
      {key: 'IMPRESSION', value: 'IMPRESSION', text: translation.t('trigger.comparable.imp')},
      {key: 'CLICK', value: 'CLICK', text: translation.t('trigger.comparable.click')},
      {key: 'CV', value: 'CV', text: translation.t('trigger.comparable.cv')},
      {key: 'CTR', value: 'CTR', text: translation.t('trigger.comparable.ctr')},
      {key: 'CVR', value: 'CVR', text: translation.t('trigger.comparable.cvr')},
      {key: 'CPA', value: 'CPA', text: translation.t('trigger.comparable.cpa')},
      {key: 'CPC', value: 'CPC', text: translation.t('trigger.comparable.cpc')},
      {key: 'CPM', value: 'CPM', text: translation.t('trigger.comparable.cpm')}
    ],
    'YAHOO':[
      {key: 'COST', value: 'COST', text: translation.t('trigger.comparable.cost')},
      {key: 'IMPRESSION', value: 'IMPRESSION', text: translation.t('trigger.comparable.imp')},
      {key: 'CLICK', value: 'CLICK', text: translation.t('trigger.comparable.click')},
      {key: 'CV', value: 'CV', text: translation.t('trigger.comparable.cv')},
      {key: 'CTR', value: 'CTR', text: translation.t('trigger.comparable.ctr')},
      {key: 'CVR', value: 'CVR', text: translation.t('trigger.comparable.cvr')},
      {key: 'CPA', value: 'CPA', text: translation.t('trigger.comparable.cpa')},
      {key: 'CPC', value: 'CPC', text: translation.t('trigger.comparable.cpc')},
      {key: 'CPM', value: 'CPM', text: translation.t('trigger.comparable.cpm')}
    ]
  },
  TRIGGER_OPERATOR_YAHOO_OPTION:[
    {key: 'GREATER', value: 'GREATER', text: '>'},
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL',value: 'LESS_OR_EQUAL', text: '<='}
  ],
  TRIGGER_OTHER_COMPARABLE_OPTIONS: [
    {key: 'STATUS', value: 'STATUS', text: translation.t('trigger.comparable.status')}
  ],
  TRIGGER_COMPARABLE_LINE_ANAA: {key: 'ANAA', value: 'ANAA', text: translation.t('trigger.comparable.anaa')},
  TRIGGER_COMPARABLE_YAHOO_ANAA: {key: 'ANAA', value: 'ANAA', text: translation.t('trigger.yahoo.anaa')},
  TRIGGER_COMPARABLE_YAHOO_AVERAGE_DELIVER_RANK: {key: 'AVERAGE_DELIVER_RANK', value: 'AVERAGE_DELIVER_RANK', text: translation.t('trigger.comparable.AVERAGE_DELIVER_RANK')},
  TRIGGER_NOT_STATUS_OPERATOR_OPTIONS: [
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL', value: 'LESS_OR_EQUAL', text: '<='}
  ],
  TRIGGER_STATUS_OPERATOR_OPTIONS: [
    {key: 'EQUAL', value: 'EQUAL', text: '='},
    {key: 'NOT_EQUAL',value: 'NOT_EQUAL',text:'<>'}
  ],
  TRIGGER_STATUS_OPERATOR_OPTIONS_NOT_CAMPAIGN: [
    {key: 'EQUAL', value: 'EQUAL', text: '='},
  ],
  TRIGGER_STATUS_OPTIONS: [
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'},
    {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
    {key: 'MONTHLY_BUDGET_SHORT',value:'MONTHLY_BUDGET_SHORT',text:translation.t('trigger.boundary.monthly_budget_short')}
  ],
  TRIGGER_STATUS_CAMPAIGN_DAILY_EQUAL: [
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'},
    {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
  ],
  TRIGGER_STATUS_CAMPAIGN_DAILY_NOT_EQUAL: [
    {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
  ],
  TRIGGER_STATUS_OPTIONS_NOT_CAMPAIGN:[
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'}
  ],
  TRIGGER_STATUS_OPTIONS_NOT_EQUAL:[
    {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
    {key: 'MONTHLY_BUDGET_SHORT',value:'MONTHLY_BUDGET_SHORT',text:translation.t('trigger.boundary.monthly_budget_short')}
  ],
  NEW_TRIGGER: {
    'LINE': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'TODAY',
          triggerComparable: 'COST',
          triggerOperator: 'GREATER_OR_EQUAL',
          boundaryValue: '',
          joinCondition: 'AND'
        }
      ],
      status: 'ENABLED'
    },
    'LINE_AD_REMOVE': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'ACCOUNT',
          timeRange: 'NONE',
          triggerComparable: 'DELIVERY_STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'ACTIVE',
          joinCondition: 'AND'
        },
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'NONE',
          triggerComparable: 'STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'OFF',
          joinCondition: 'AND'
        },
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'LAST30DAYS',
          triggerComparable: 'COST',
          triggerOperator: 'LESS_OR_EQUAL',
          boundaryValue: '50000',
          joinCondition: 'AND'
        },
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'LAST14DAYS',
          triggerComparable: 'IMPRESSION',
          triggerOperator: 'GREATER_OR_EQUAL',
          boundaryValue: '1',
          joinCondition: 'AND'
        }
      ],
      status: 'ENABLED'
    },
    'LINE_AD_REMOVE_SECOND': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'ACCOUNT',
          timeRange: 'NONE',
          triggerComparable: 'DELIVERY_STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'NOT_DELIVERING',
          joinCondition: 'AND'
        }
      ],
      status: 'ENABLED'
    },
    'LINE_CTR_AD_START_SECOND': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'NONE',
          triggerComparable: 'STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'OFF',
          joinCondition: 'AND',
          costRateParam: 95
        }
      ],
      status: 'ENABLED'
    },
    'LINE_CTR_AD_START': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'LAST30DAYS',
          triggerComparable: 'IMPRESSION',
          triggerOperator: 'EQUAL',
          boundaryValue: '0',
          joinCondition: 'AND',
          costRateParam: 95
        },
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'LAST30DAYS',
          triggerComparable: 'COST',
          triggerOperator: 'EQUAL',
          boundaryValue: '0',
          joinCondition: 'AND',
          costRateParam: 95
        },
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'NONE',
          triggerComparable: 'STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'OFF',
          joinCondition: 'AND',
          costRateParam: 95
        },
        {
          id: 0,
          adObject: 'ADGROUP',
          timeRange: 'NONE',
          triggerComparable: 'ANAA',
          triggerOperator: 'LESS_OR_EQUAL',
          boundaryValue: '',
          joinCondition: 'AND',
          costRateParam: 95
        },
        {
          id: 0,
          adObject: 'ADGROUP',
          timeRange: 'NONE',
          triggerComparable: 'STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'ON',
          joinCondition: 'AND',
          costRateParam: 95
        },
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'NONE',
          triggerComparable: 'DELIVERY_STATUS',
          triggerOperator: 'EQUAL',
          boundaryValue: 'PAUSED',
          joinCondition: 'AND',
          costRateParam: 95
        }
      ],
      status: 'ENABLED'
    },
    'YAHOO_INCREASE_DECREASE_AD_BID': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'AD',
          timeRange: 'YESTERDAY',
          triggerComparable: 'COST',
          triggerOperator: 'GREATER_OR_EQUAL',
          boundaryValue: '',
          joinCondition: 'AND'
        }
      ],
      status: 'ENABLED'
    },
    'YAHOO_AD_OFF': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'ADGROUP',
          timeRange: 'NONE',
          triggerComparable: 'ANAA',
          triggerOperator: 'GREATER',
          boundaryValue: '',
          joinCondition: 'AND',
        }
      ],
      status: 'ENABLED'
      },
    'YAHOO_ACOUNT_BUDDET_MONITOR': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'ACCOUNT',
          timeRange: 'TODAY',
          triggerComparable: 'COST',
          triggerOperator: 'GREATER_OR_EQUAL',
          boundaryValue: '',
          joinCondition: 'AND',
        },
      ],
      status: 'ENABLED'
    },
    'LINE_ACOUNT_BUDDET_MONITOR': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'ACCOUNT',
          timeRange: 'TODAY',
          triggerComparable: 'COST',
          triggerOperator: 'GREATER_OR_EQUAL',
          boundaryValue: '',
          joinCondition: 'AND',
        },
      ],
      status: 'ENABLED'
    },
    'FACEBOOK_CAMPAIGN_ONLY': {
      triggerId: 0,
      triggerSteps: [
        {
          id: 0,
          adObject: 'CAMPAIGN',
          timeRange: 'TODAY',
          triggerComparable: 'COST',
          triggerOperator: 'GREATER_OR_EQUAL',
          boundaryValue: '',
          joinCondition: 'AND',
        },
      ],
      status: 'ENABLED'
    }
  },
  NEW_TRIGGER_STEP: {
    id: 0,
    adObject: 'AD',
    timeRange: 'TODAY',
    triggerComparable: 'COST',
    triggerOperator: 'GREATER_OR_EQUAL',
    boundaryValue: '',
    joinCondition: 'AND'
  },

  NEW_YAHOO_INCREASE_DECREASE_AD_BID_TRIGGER_STEP: {
    id: 0,
    adObject: 'AD',
    timeRange: 'YESTERDAY',
    triggerComparable: 'COST',
    triggerOperator: 'GREATER_OR_EQUAL',
    boundaryValue: '',
    joinCondition: 'AND'
  },
  MONEY_BOUNDARY_VALUE: [
    'COST', 'CPA', 'CPC'
  ],
  TIME_RANGE_NONE: 'NONE',
  TRIGGER_COMPARABLE_STATUS: 'STATUS',
  TRIGGER_COMPARABLE_AVERAGE_DELIVER_RANK: 'AVERAGE_DELIVER_RANK',
  TRIGGER_BUDGET_SHORT_STATUS: ['DAILY_BUDGET_SHORT','MONTHLY_BUDGET_SHORT'],
  TRIGGER_BUDGET_SHORT_MONTHLY_STATUS: 'MONTHLY_BUDGET_SHORT',
  TRIGGER_BUDGET_SHORT_DAILY_STATUS: 'DAILY_BUDGET_SHORT',
  TRIGGER_COMPARABLE_ANAA: 'ANAA',
  TRIGGER_OPERATOR_EQUAL: 'EQUAL',
  TRIGGER_OPERATOR_NOT_EQUAL: 'NOT_EQUAL',
  ADOBJECT_CAMPAIGN: 'CAMPAIGN',
  ADOBJECT_ADGROUP: 'ADGROUP',
  ADOBJECT_AD: 'AD',
  MAX_TRIGGER_NUMBER:
    {
      'LINE': 7,
      'LINE_BUDGET_MONITOR': 1,
      'YAHOO': 1,
      'YAHOO_INCREASE_DECREASE_AD_BID': 7,
      'FACEBBOOK':7
    },
  TRIGGER_OPERATOR_NOT_CAMPAIGN:'EQUAL,NOT_EQUAL',
  COST: translation.t('trigger.boundary.cost'),
  TODAY:"TODAY",
  TRIGGER_OPERATOR_GREATER_OR_EQUAL: 'GREATER_OR_EQUAL',
  BOUNDARY_VALUE_BUDGET_SHORT: ['DailyBudget','MonthlyBudget'],
  BOUNDARY_VALUE_ON: 'ON'
}

export default triggerConstant
