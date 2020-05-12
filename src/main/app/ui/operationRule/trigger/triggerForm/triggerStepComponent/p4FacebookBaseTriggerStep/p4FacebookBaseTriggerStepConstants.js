import translation from '../../../../../../util/translation'

const timeRangeAdRemoveOptions = function(){
  const copyOfTimeRangeOptions = Object.assign([], triggerConstant.TIME_RANGE_OPTIONS)
  copyOfTimeRangeOptions.splice(6, 0, {key: 'LAST14DAYS', value: 'LAST14DAYS', text: translation.t('trigger.time_range.last14days')})
  return copyOfTimeRangeOptions
}

const triggerConstant = {
  TIME_RANGE_OPTIONS: [
    {key: 'TODAY', value: 'TODAY', text: translation.t('trigger.time_range.today')},
    {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday')},
    {key: 'LAST2DAYS', value: 'LAST2DAYS', text: translation.t('trigger.time_range.last2days')},
    {key: 'LAST3DAYS', value: 'LAST3DAYS', text: translation.t('trigger.time_range.last3days')},
    {key: 'LAST7DAYS', value: 'LAST7DAYS', text: translation.t('trigger.time_range.last7days')},
    {key: 'LAST10DAYS', value: 'LAST10DAYS', text: translation.t('trigger.time_range.last10days')},
    {key: 'LAST15DAYS', value: 'LAST15DAYS', text: translation.t('trigger.time_range.last15days')},
    {key: 'LAST30DAYS', value: 'LAST30DAYS', text: translation.t('trigger.time_range.last30days')},
    {key: 'LAST2DAYS_EXCLUDE_TODAY', value: 'LAST2DAYS_EXCLUDE_TODAY', text: translation.t('trigger.time_range.last2days_exclude_today')},
    {key: 'LAST3DAYS_EXCLUDE_TODAY', value: 'LAST3DAYS_EXCLUDE_TODAY', text: translation.t('trigger.time_range.last3days_exclude_today')},
    {key: 'LAST7DAYS_EXCLUDE_TODAY', value: 'LAST7DAYS_EXCLUDE_TODAY', text: translation.t('trigger.time_range.last7days_exclude_today')},
    {key: 'LAST10DAYS_EXCLUDE_TODAY', value: 'LAST10DAYS_EXCLUDE_TODAY', text: translation.t('trigger.time_range.last10days_exclude_today')},
    {key: 'LAST15DAYS_EXCLUDE_TODAY', value: 'LAST15DAYS_EXCLUDE_TODAY', text: translation.t('trigger.time_range.last15days_exclude_today')},
    {key: 'LAST30DAYS_EXCLUDE_TODAY', value: 'LAST30DAYS_EXCLUDE_TODAY', text: translation.t('trigger.time_range.last30days_exclude_today')},
    {key: 'NONE', value: 'NONE', text: translation.t('trigger.time_range.none')}
  ],
  TIME_RANGE_AD_REMOVE_OPTIONS: timeRangeAdRemoveOptions,
  AD_OBJECT_OPTIONS: [
    {key: 'CAMPAIGN', value: 'CAMPAIGN', text: translation.t('trigger.ad_object.campaign')},
  ],
  AD_OBJECT_OPTIONS_FULL: [
    {key: 'ACCOUNT', value: 'ACCOUNT', text: "Account"},
    {key: 'CAMPAIGN', value: 'CAMPAIGN', text: "Campaign"},
    {key: 'ADSET', value: 'ADSET', text: "Adset"},
    {key: 'AD', value: 'AD', text: "Ad"},
  ],

  AD_PERFORMANCE_OPTIONS: [
    {key: 'COST', value: 'COST', text: translation.t('trigger.comparable.cost')},
    {key: 'IMPRESSION', value: 'IMPRESSION', text: translation.t('trigger.comparable.imp')},
    {key: 'CLICK', value: 'CLICK', text: translation.t('trigger.comparable.click')},
    {key: 'CTR', value: 'CTR', text: translation.t('trigger.comparable.ctr')},
    {key: 'CPM', value: 'CPM', text: translation.t('trigger.comparable.cpm')},
    {key: 'CPC', value: 'CPC', text: translation.t('trigger.comparable.cpc')},
    {key: 'CV1', value: 'CV1', text: "CV1"},
    {key: 'CVR1', value: 'CVR1', text: "CVR1"},
    {key: 'CPA1', value: 'CPA1', text: "CPA1"},
    {key: 'CV2', value: 'CV2', text: "CV2"},
    {key: 'CVR2', value: 'CVR2', text: "CVR2"},
    {key: 'CPA2', value: 'CPA2', text: "CPA2"}
  ],
  TRIGGER_OTHER_COMPARABLE_OPTIONS: [
    {key: 'STATUS', value: 'STATUS', text: translation.t('trigger.comparable.status')}
  ],
  TRIGGER_AD_REMOVE_STATUS_OPTIONS: [
    {key: 'STATUS', value: 'STATUS', text: translation.t('trigger.comparable.status')},
    {key: 'DELIVERY_STATUS', value: 'DELIVERY_STATUS', text: translation.t('trigger.comparable.delivery_status')}
  ],

  TRIGGER_STATUS_OPTIONS:[
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'}
  ],
  TRIGGER_STATUS_OPERATOR_OPTIONS: [
    {key: 'EQUAL', value: 'EQUAL', text: '='},
  ],
  TRIGGER_DELIVERY_STATUS_OPTIONS: [
    {key: 'ON', value: 'ON', text: 'ON'},
    {key: 'OFF', value: 'OFF', text: 'OFF'}
  ],

  TRIGGER_OPERATOR_OPTION:[
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL',value: 'LESS_OR_EQUAL', text: '<='}
  ],

  NEW_TRIGGER_STEP: {
    id: 0,
    adObject: 'CAMPAIGN',
    timeRange: 'TODAY',
    triggerComparable: 'COST',
    triggerOperator: 'GREATER_OR_EQUAL',
    boundaryValue: '',
    joinCondition: 'AND'
  },
  MONEY_BOUNDARY_VALUE: [
    'COST', 'CPA1', 'CPA2','CPC','CPM'
  ],
  TRIGGER_COMPARABLE_AVERAGE_DELIVER_RANK: 'AVERAGE_DELIVER_RANK',
  ADOBJECT_ADGROUP: 'ADGROUP',
  ADOBJECT_AD: 'AD',
  TRIGGER_COMPARABLE_STATUS: 'STATUS',
  TRIGGER_COMPARABLE_DELIVERY_STATUS: 'DELIVERY_STATUS',
  TRIGGER_OPERATOR_EQUAL: 'EQUAL',
  TIME_RANGE_NONE: 'NONE',
  MAX_TRIGGER_NUMBER: 7,
  TRIGGER_NOT_STATUS_OPERATOR_OPTIONS: [
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL', value: 'LESS_OR_EQUAL', text: '<='}
  ],
  PERCENT_BOUNDARY_VALUE: ['CTR', 'CVR1','CVR2'],
}

export default triggerConstant
