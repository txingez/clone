import translation from '../../../../../../util/translation'


const triggerConstant = {
  TIME_RANGE_OPTIONS: [
      {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday')},
      {key: 'LAST2DAYS', value: 'LAST2DAYS', text: translation.t('trigger.time_range.last2days')},
      {key: 'LAST3DAYS', value: 'LAST3DAYS', text: translation.t('trigger.time_range.last3days')},
      {key: 'LAST7DAYS', value: 'LAST7DAYS', text: translation.t('trigger.time_range.last7days')},
      {key: 'LAST10DAYS', value: 'LAST10DAYS', text: translation.t('trigger.time_range.last10days')},
      {key: 'LAST15DAYS', value: 'LAST15DAYS', text: translation.t('trigger.time_range.last15days')},
      {key: 'LAST30DAYS', value: 'LAST30DAYS', text: translation.t('trigger.time_range.last30days')},
    ],
  AD_OBJECT_OPTIONS: [
      {key: 'AD', value: 'AD', text: translation.t('trigger.ad_object.ad')},
      {key: 'ADGROUP', value: 'ADGROUP', text: translation.t('trigger.ad_object.ad_group')},
      {key: 'CAMPAIGN', value: 'CAMPAIGN', text: translation.t('trigger.ad_object.campaign')},
      {key: 'ACCOUNT', value: 'ACCOUNT', text: translation.t('trigger.ad_object.account')}
    ],
  AD_PERFORMANCE_OPTIONS: [
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
  TRIGGER_COMPARABLE_YAHOO_AVERAGE_DELIVER_RANK: {key: 'AVERAGE_DELIVER_RANK', value: 'AVERAGE_DELIVER_RANK', text: translation.t('trigger.comparable.AVERAGE_DELIVER_RANK')},

  TRIGGER_OPERATOR_OPTION:[
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='},
    {key: 'LESS_OR_EQUAL',value: 'LESS_OR_EQUAL', text: '<='}
  ],

  NEW_TRIGGER_STEP: {
    id: 0,
    adObject: 'AD',
    timeRange: 'YESTERDAY',
    triggerComparable: 'COST',
    triggerOperator: 'GREATER_OR_EQUAL',
    boundaryValue: '',
    joinCondition: 'AND'
  },
  MONEY_BOUNDARY_VALUE: [
    'COST', 'CPA', 'CPC','CPM'
  ],
  PERCENT_BOUNDARY_VALUE: ['CTR', 'CVR'],
  TRIGGER_COMPARABLE_AVERAGE_DELIVER_RANK: 'AVERAGE_DELIVER_RANK',
  ADOBJECT_ADGROUP: 'ADGROUP',
  ADOBJECT_AD: 'AD',
  MAX_TRIGGER_NUMBER: 7,
}

export default triggerConstant
