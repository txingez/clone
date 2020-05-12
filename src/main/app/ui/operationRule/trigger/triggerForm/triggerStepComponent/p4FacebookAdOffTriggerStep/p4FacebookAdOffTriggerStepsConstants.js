import translation from '../../../../../../util/translation'


const triggerConstant = {
  TIME_RANGE_OPTIONS_7days: {key: 'NONE', value: 'NONE', text: ' 過去7日 (exclude today)'},

  TIME_RANGE_OPTIONS_YESTERDAY: {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday')},

  AD_OBJECT_OPTIONS_ADGROUP: {key: 'ADGROUP', value: 'ADGROUP', text: translation.t('trigger.yahoo.ad_group')},

  AD_OBJECT_OPTIONS_ADSET: {key: 'ADSET', value: 'ADSET', text: 'Adset'},

  AD_OBJECT_OPTIONS_AD: {key: 'AD', value: 'AD', text: 'Ad'},

  AD_PERFORMANCE_OPTIONS_CUSTOMCV: {key: 'ANAA', value: 'ANAA', text: 'CUSTOMCV'},

  AD_PERFORMANCE_OPTIONS_COST_SHARE: {key: 'ANAA', value: 'ANAA', text: 'Cost Share'},

  AD_PERFORMANCE_OPTIONS_CV_SHARE: {key: 'ANAA', value: 'ANAA', text: 'CV Share'},

  AD_PERFORMANCE_OPTIONS_CTR: {key: 'CTR', value: 'CTR', text: translation.t('trigger.comparable.ctr')},

  AD_PERFORMANCE_OPTIONS_CPA: {key: 'CPA', value: 'CPA', text: translation.t('trigger.comparable.cpa')},

  TRIGGER_OPERATOR_OPTION_GREATER: {key: 'GREATER', value: 'GREATER', text: '>'},
  AD_PERFORMANCE_SPECIAL: {key: 'Special', value: 'Special', text: '許容計算式の下限CPA'}
}

export default triggerConstant
