import translation from '../../../../../../util/translation'


const triggerConstant = {
  TIME_RANGE_OPTIONS_NONE: {key: 'NONE', value: 'NONE', text: translation.t('trigger.time_range.none')},

  TIME_RANGE_OPTIONS_YESTERDAY: {key: 'YESTERDAY', value: 'YESTERDAY', text: translation.t('trigger.time_range.yesterday')},

  AD_OBJECT_OPTIONS_ADGROUP: {key: 'ADGROUP', value: 'ADGROUP', text: translation.t('trigger.yahoo.ad_group')},

  AD_OBJECT_OPTIONS_AD: {key: 'AD', value: 'AD', text: translation.t('trigger.yahoo.ad')},

  AD_PERFORMANCE_OPTIONS_ANAA: {key: 'ANAA', value: 'ANAA', text: translation.t('trigger.yahoo.anaa')},

  AD_PERFORMANCE_OPTIONS_CTR: {key: 'CTR', value: 'CTR', text: translation.t('trigger.comparable.ctr')},

  TRIGGER_OPERATOR_OPTION_GREATER: {key: 'GREATER', value: 'GREATER', text: '>'}
}

export default triggerConstant
