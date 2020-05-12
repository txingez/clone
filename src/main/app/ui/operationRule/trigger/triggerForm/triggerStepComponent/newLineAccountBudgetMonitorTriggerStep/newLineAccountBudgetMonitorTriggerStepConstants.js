import translation from '../../../../../../util/translation'


const triggerConstant = {
  TIME_RANGE_OPTIONS: [
    {key: 'TODAY', value: 'TODAY', text: translation.t('trigger.time_range.today')}
  ],

  AD_OBJECT_OPTIONS: [
    {key: 'ACCOUNT', value: 'ACCOUNT', text: translation.t('trigger.ad_object.account')}
  ],

  AD_PERFORMANCE_OPTIONS: [
    {key: 'COST', value: 'COST', text: translation.t('trigger.comparable.cost')}
  ],

  TRIGGER_OPERATOR_OPTION:[
    {key: 'GREATER_OR_EQUAL', value: 'GREATER_OR_EQUAL', text: '>='}
  ]
}

export default triggerConstant
