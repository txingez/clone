import ruleScheduleConstant from '../../../constants/ruleSchedule'
import operationRuleConstant from '../../../constants/operationRule'
import translation from '../../../util/translation'

export function convertTableRowsToSchedule(rows) {
  let data = ruleScheduleConstant.DAYS_OF_WEEK.map(day => {
    return {
      onHours: [],
      dayOfWeek: day
    }
  })
  for (let hour = 0; hour < rows.length; hour++) {
    let currentRow = rows[hour]
    ruleScheduleConstant.DAYS_OF_WEEK.forEach((day, index) => {
      if (currentRow[day] === ruleScheduleConstant.VALUE_ON) {
        data[index]['onHours'].push(hour)
      }
    })
  }
  return data
}

export function convertScheduleToTableRows(schedule) {
  let data = []
  if (schedule.length === 0) {
    for (let hour = 0; hour < 24; hour++) {
      data.push(Object.assign({}, ruleScheduleConstant.HOUR_ROW_ON, {hour: hour}))
    }
  } else {
    for (let hour = 0; hour < 24; hour++) {
      data.push(Object.assign({}, ruleScheduleConstant.HOUR_ROW_OFF, {hour: hour}))
    }
    schedule.forEach((day, index) => {
      day.onHours.forEach(hour => {
        data[hour][day.dayOfWeek] = ruleScheduleConstant.VALUE_ON
      })
    })
  }
  return data
}

export function getDefaultSchedule() {
  return ruleScheduleConstant.DAYS_OF_WEEK.map(day => {
    return {
      onHours: Array(24).fill().map((x,i)=>i),
      dayOfWeek: day
    }
  })
}

export function isValidValue(newValue) {
  let checkValues = [newValue.MONDAY, newValue.TUESDAY, newValue.WEDNESDAY, newValue.THURSDAY, newValue.FRIDAY, newValue.SATURDAY, newValue.SUNDAY]
  let newText = checkValues.find(function (value) {
    return typeof value !== 'undefined'
  })
  return newText === ruleScheduleConstant.VALUE_ON || newText === ruleScheduleConstant.VALUE_OFF
}

export function getScheduleLinkLabel(schedule, action, media) {
  let label = translation.t('frequency.once_per_hour')
  if (typeof action !== 'undefined') {
    switch (action.actionType) {
      case operationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR: {
        label = media === operationRuleConstant.MEDIA_LIST.YAHOO ? translation.t('frequency.run_every_10_minutes') : translation.t('frequency.once_per_hour')
        break
      }
      case operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET: {
        label = translation.t('schedule.campaign_budget_adjust_schedule_label')
        break
      }
      case operationRuleConstant.ACTION_TYPE_ON_OFF:
        {
        label = translation.t('schedule.campaign_hourly_onoff')
        break
      }
      case operationRuleConstant.ACTION_TYPE_INCREASE_CAMPAIGN_DAILY_BUDGET_HOURLY:
      case operationRuleConstant.ACTION_TYPE_DECREASE_CAMPAIGN_DAILY_BUDGET_HOURLY:case operationRuleConstant.ACTION_TYPE_INDICATE_CAMPAIGN_DAILY_BUDGET_HOURLY:
        {
          label = translation.t('schedule.campaign_daily_budget_schedule')
          break
      }
      default: {
        label = getActionEnableScheduleLabel(schedule)
      }
    }
  }
  return label
}

const getActionEnableScheduleLabel = (schedule) => {
  return (typeof schedule !== 'undefined' && schedule.actionEnableSchedule.length !== 0 && schedule.actionEnableSchedule.findIndex(day => {
    return day.onHours.length < 24
  }) !== -1 ? translation.t('schedule.customized') : translation.t('frequency.once_per_hour'))
}
