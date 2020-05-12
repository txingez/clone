import translation from '../../../../../../util/translation'


const triggerConstant = {
  SPECIAL_TRIGGER_STEP_CTR_AD_START: {
    adObject: 'AD',
    timeRange: 'NONE',
    triggerComparable: 'STATUS',
    triggerOperator: 'EQUAL',
    boundaryValue: 'OFF',
    joinCondition: 'AND'
  },
  TIME_RANGE_OPTIONS: [
      {key: 'TODAY', value: 'TODAY', text: translation.t('trigger.time_range.today')},
      {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday') + translation.t('trigger.time_range.yesterday_tag')},
      {key: 'LAST2DAYS', value: 'LAST2DAYS', text: translation.t('trigger.time_range.last2days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'LAST3DAYS', value: 'LAST3DAYS', text: translation.t('trigger.time_range.last3days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'LAST7DAYS', value: 'LAST7DAYS', text: translation.t('trigger.time_range.last7days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'LAST10DAYS', value: 'LAST10DAYS', text: translation.t('trigger.time_range.last10days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'LAST14DAYS', value: 'LAST14DAYS', text: translation.t('trigger.time_range.last14days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'LAST15DAYS', value: 'LAST15DAYS', text: translation.t('trigger.time_range.last15days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'LAST30DAYS', value: 'LAST30DAYS', text: translation.t('trigger.time_range.last30days') + translation.t('trigger.time_range.include_today_tag')},
      {key: 'NONE', value: 'NONE', text: translation.t('trigger.time_range.none')}
    ],
  TIME_RANGE_WITHOUT_14_DAYS_OPTION : [
    {key: 'TODAY', value: 'TODAY', text: translation.t('trigger.time_range.today')},
    {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday') + translation.t('trigger.time_range.yesterday_tag')},
    {key: 'LAST2DAYS', value: 'LAST2DAYS', text: translation.t('trigger.time_range.last2days') + translation.t('trigger.time_range.include_today_tag')},
    {key: 'LAST3DAYS', value: 'LAST3DAYS', text: translation.t('trigger.time_range.last3days') + translation.t('trigger.time_range.include_today_tag')},
    {key: 'LAST7DAYS', value: 'LAST7DAYS', text: translation.t('trigger.time_range.last7days') + translation.t('trigger.time_range.include_today_tag')},
    {key: 'LAST10DAYS', value: 'LAST10DAYS', text: translation.t('trigger.time_range.last10days') + translation.t('trigger.time_range.include_today_tag')},
    {key: 'LAST15DAYS', value: 'LAST15DAYS', text: translation.t('trigger.time_range.last15days') + translation.t('trigger.time_range.include_today_tag')},
    {key: 'LAST30DAYS', value: 'LAST30DAYS', text: translation.t('trigger.time_range.last30days') + translation.t('trigger.time_range.include_today_tag')},
    {key: 'NONE', value: 'NONE', text: translation.t('trigger.time_range.none')}
  ],

  AD_OBJECT_OPTIONS: [
      {key: 'AD', value: 'AD', text: translation.t('trigger.ad_object.ad')},
      {key: 'ADGROUP', value: 'ADGROUP', text: "Ad Group"},
      {key: 'CAMPAIGN', value: 'CAMPAIGN', text: "Campaign"},
      {key: 'ACCOUNT', value: 'ACCOUNT', text: "Account"}
    ],

  AD_PERFORMANCE_OPTIONS: [
    {key: 'COST', value: 'COST', text: translation.t('trigger.comparable.cost')},
    {key: 'IMPRESSION', value: 'IMPRESSION', text: translation.t('trigger.comparable.imp')},
    {key: 'CLICK', value: 'CLICK', text: translation.t('trigger.comparable.click')},
    {key: 'CV', value: 'CV', text: translation.t('trigger.comparable.cv')},
    {key: 'INSTALL', value: 'INSTALL', text: translation.t('trigger.comparable.install')},
    {key: 'CTR', value: 'CTR', text: translation.t('trigger.comparable.ctr')},
    {key: 'CVR', value: 'CVR', text: translation.t('trigger.comparable.cvr')},
    {key: 'CPA', value: 'CPA', text: translation.t('trigger.comparable.cpa')},
    {key: 'COST_PER_INSTALL', value: 'COST_PER_INSTALL', text: translation.t('trigger.comparable.cost_per_install')},
    {key: 'CPC', value: 'CPC', text: translation.t('trigger.comparable.cpc')},
    {key: 'CPM', value: 'CPM', text: translation.t('trigger.comparable.cpm')}
    // {key: 'OPEN', value: 'OPEN', text: translation.t('trigger.comparable.open')},
    // {key: 'COST_PER_OPEN', value: 'COST_PER_OPEN', text: translation.t('trigger.comparable.cost_per_open')},
    // {key: 'VIEW_HOME', value: 'VIEW_HOME', text: translation.t('trigger.comparable.view_home')},
    // {key: 'COST_PER_VIEW_HOME', value: 'COST_PER_VIEW_HOME', text: translation.t('trigger.comparable.cost_per_view_home')},
    // {key: 'SEARCH', value: 'SEARCH', text: translation.t('trigger.comparable.search')},
    // {key: 'COST_PER_SEARCH', value: 'COST_PER_SEARCH', text: translation.t('trigger.comparable.cost_per_search')},
    // {key: 'ADD_TO_CART', value: 'ADD_TO_CART', text: translation.t('trigger.comparable.add_to_cart')},
    // {key: 'COST_PER_ADD_TO_CART', value: 'COST_PER_ADD_TO_CART', text: translation.t('trigger.comparable.cost_per_add_to_cart')}
  ],
  TRIGGER_COMPARABLE_LINE_ANAA: {key: 'ANAA', value: 'ANAA', text: translation.t('trigger.comparable.anaa')},
  TRIGGER_COMPARABLE_AD_GROUP_NEW_LINE: [
    {key: 'ANAA', value: 'ANAA', text: translation.t('trigger.comparable.anaa')}
  ],
  TRIGGER_COMPARABLE_CAMPAIGN_NEW_LINE: [
  ],
  TRIGGER_OTHER_COMPARABLE_OPTIONS: [
    {key: 'STATUS', value: 'STATUS', text: translation.t('trigger.comparable.status')},
    {key: 'DELIVERY_STATUS', value: 'DELIVERY_STATUS', text: translation.t('trigger.comparable.delivery_status')}
  ],
  TRIGGER_OTHER_COMPARABLE_OPTIONS_FOR_ACCOUNT: [
    {key: 'DELIVERY_STATUS', value: 'DELIVERY_STATUS', text: translation.t('trigger.comparable.delivery_status')}
  ],

  TRIGGER_OPERATOR_OPTION:[
    {key: 'GREATER', value: 'GREATER', text: '>'},
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL',value: 'LESS_OR_EQUAL', text: '<='}
  ],
  TRIGGER_STATUS_OPERATOR_OPTIONS: [
    {key: 'EQUAL', value: 'EQUAL', text: '='}
    // {key: 'NOT_EQUAL',value: 'NOT_EQUAL',text:'<>'}
  ],

  TRIGGER_NOT_STATUS_OPERATOR_OPTIONS: [
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL', value: 'LESS_OR_EQUAL', text: '<='}
  ],

  TRIGGER_STATUS_OPERATOR_OPTIONS_NOT_CAMPAIGN: [
    {key: 'EQUAL', value: 'EQUAL', text: '='},
  ],

  TRIGGER_EQUAL_OPERATOR: {key: 'EQUAL', value: 'EQUAL', text: '='},

  TRIGGER_STATUS_OPTIONS: [
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'}
  ],
  TRIGGER_DELIVERY_STATUS_OPTIONS: [
    {key: 'NOT_DELIVERING', value: 'NOT_DELIVERING', text: translation.t('trigger.boundary_delivery_status.not_delivering')},
    {key: 'ACTIVE', value: 'ACTIVE', text: translation.t('trigger.boundary_delivery_status.active')},
    {key: 'PAUSED', value: 'PAUSED', text: translation.t('trigger.boundary_delivery_status.paused')},
    {key: 'NOT_APPROVED', value: 'NOT_APPROVED', text: translation.t('trigger.boundary_delivery_status.not_approved')}
  ],

  TRIGGER_STATUS_CAMPAIGN_DAILY_EQUAL: [
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'},
    // {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
  ],
  TRIGGER_STATUS_CAMPAIGN_DAILY_NOT_EQUAL: [
    // {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
  ],
  TRIGGER_STATUS_OPTIONS_NOT_CAMPAIGN:[
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'}
  ],
  TRIGGER_STATUS_OPTIONS_NOT_EQUAL:[
    // {key: 'DAILY_BUDGET_SHORT',value:'DAILY_BUDGET_SHORT',text:translation.t('trigger.boundary.daily_budget_short')},
    // {key: 'MONTHLY_BUDGET_SHORT',value:'MONTHLY_BUDGET_SHORT',text:translation.t('trigger.boundary.monthly_budget_short')}
  ],
  NEW_TRIGGER_STEP: {
    id: 0,
    adObject: 'AD',
    timeRange: 'TODAY',
    triggerComparable: 'COST',
    triggerOperator: 'GREATER_OR_EQUAL',
    boundaryValue: '',
    joinCondition: 'AND'
  },
  MONEY_BOUNDARY_VALUE: [
    'COST', 'CPA', 'CPC', 'COST_PER_INSTALL', 'CPM'
  ],
  PERCENT_BOUNDARY_VALUE: ['CTR', 'CVR'],
  TIME_RANGE_NONE: 'NONE',
  TRIGGER_COMPARABLE_STATUS: 'STATUS',
  TRIGGER_COMPARABLE_DELIVERY_STATUS: 'DELIVERY_STATUS',
  TRIGGER_COMPARABLE_AVERAGE_DELIVER_RANK: 'AVERAGE_DELIVER_RANK',
  TRIGGER_BUDGET_SHORT_STATUS: ['DAILY_BUDGET_SHORT','MONTHLY_BUDGET_SHORT'],
  TRIGGER_BUDGET_SHORT_MONTHLY_STATUS: 'MONTHLY_BUDGET_SHORT',
  TRIGGER_BUDGET_SHORT_DAILY_STATUS: 'DAILY_BUDGET_SHORT',
  TRIGGER_COMPARABLE_ANAA: 'ANAA',
  TRIGGER_COMPARABLE_IMP: 'IMPRESSION',
  TRIGGER_COMPARABLE_COST: 'COST',
  TRIGGER_OPERATOR_EQUAL: 'EQUAL',
  TRIGGER_OPERATOR_NOT_EQUAL: 'NOT_EQUAL',
  TRIGGER_OPERATOR_GREATER_OR_EQUAL: 'GREATER_OR_EQUAL',
  ADOBJECT_ADGROUP: 'ADGROUP',
  ADOBJECT_CAMPAIGN: 'CAMPAIGN',
  ADOBJECT_ACCOUNT: 'ACCOUNT',
  ADOBJECT_AD: 'AD',
  ACTION_TYPE_AD_REMOVE: 'AD_REMOVE',
  MAX_TRIGGER_NUMBER: 7,
  MAX_TRIGGER_NUMBER_BUDGE_MONITOR: 1,
  COST: translation.t('trigger.boundary.cost'),
  BOUNDARY_VALUE_ON: 'ON',
  BOUNDARY_VALUE_OFF: 'OFF'
}

export default triggerConstant
