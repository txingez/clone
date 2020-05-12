import adjustmentRuleScheduleConstant from '../../../constants/adjustmentRuleSchedule'
import translation from "../../../util/translation";

export function convertTableRowsToSchedule(rows) {
  let adjuster = [];
  for(let day = 0; day < adjustmentRuleScheduleConstant.DAYS_OF_WEEK.length; day++){
    let schedule = []
    for(let i = 1; i < rows.length; i++){
      let ratio = rows[i][adjustmentRuleScheduleConstant.DAYS_OF_WEEK[day]]
      if(ratio !== "") {
        schedule.push({
          hour: i-1,
          ratio: parseInt(ratio)
        })
      }
    }
    adjuster.push({
      dayOfWeek: adjustmentRuleScheduleConstant.DAYS_OF_WEEK[day],
      budget: parseInt(rows[0][adjustmentRuleScheduleConstant.DAYS_OF_WEEK[day]]),
      schedule: schedule
    })
  }
  return adjuster
}

export function convertScheduleToTableRows(adjustmentSchedule) {
  let rows = []
  let ratioArray = scheduleToArray(adjustmentSchedule)

  rows.push({
    hour: "予算",
    MONDAY: ratioArray[0][0].toString(),
    TUESDAY: ratioArray[0][1].toString(),
    WEDNESDAY: ratioArray[0][2].toString(),
    THURSDAY: ratioArray[0][3].toString(),
    FRIDAY: ratioArray[0][4].toString(),
    SATURDAY: ratioArray[0][5].toString(),
    SUNDAY: ratioArray[0][6].toString(),
    HOLIDAY: ratioArray[0][7].toString()
  })
  for (let i = 1; i < 25; i++){
    rows.push({hour:i-1,
      MONDAY: ratioArray[i][0].toString(),
      TUESDAY: ratioArray[i][1].toString(),
      WEDNESDAY: ratioArray[i][2].toString(),
      THURSDAY: ratioArray[i][3].toString(),
      FRIDAY: ratioArray[i][4].toString(),
      SATURDAY: ratioArray[i][5].toString(),
      SUNDAY: ratioArray[i][6].toString(),
      HOLIDAY: ratioArray[i][7].toString()})
  }
  return rows
}

function scheduleToArray(adjuster){
  let arrayRatio = []
  for (let i = 0; i < 25; i++) {
    arrayRatio.push([0])
    for (let j = 0; j < 8; j++) {
      arrayRatio[i][j] = "";
    }
  }
  for(let day = 0; day < adjuster.length; day++){
    arrayRatio[0][day] = typeof adjuster[day].budget !== 'undefined' ? adjuster[day].budget : ""
    for(let i = 0; i < adjuster[day].schedule.length; i++){
      let indexHour = adjuster[day].schedule[i].hour
      arrayRatio[indexHour+1][day] = adjuster[day].schedule[i].ratio
    }
  }
  return arrayRatio
}

export function isNumber(newValue) {
  let newText = getValue(newValue)
  return newText === "" || isNormalInteger(newText)
}

function isNormalInteger(str) {
  return /^\+?(0|[0-9]\d*)$/.test(str);
}

export function removeZeroStr(text) {
  let newText = text.replace(/^0+/, '')
  if(newText.length === 0 && text.length !== 0)
    return "0"
  return newText
}

export function validateValue(rowNum, newValue) {
  let newText = getValue(newValue)
  switch (rowNum) {
    case 0: return newText.length <= 9 && Number(newText) > 0
    case 1: return Number(newText)<= 1000 && Number(newText) > 0
    default: return (Number(newText)<= 1000 && Number(newText) > 0) || newText.length === 0
  }
}

export function validateTable(rows) {
  let errorCol = []
  let col
  for(let i = 0; i < adjustmentRuleScheduleConstant.DAYS_OF_WEEK.length; i++){
    col = adjustmentRuleScheduleConstant.DAYS_OF_WEEK[i]
    if(Number(rows[0][col]) <= 0 || Number(rows[1][col]) <= 0) {
      let translationKey = 'schedule.' + adjustmentRuleScheduleConstant.DAYS_OF_WEEK[i].toLowerCase()
      errorCol.push(translation.t(translationKey))
    }
  }
  return errorCol
}

function getValue(newValue){
  let checkValues = [newValue.MONDAY, newValue.TUESDAY, newValue.WEDNESDAY, newValue.THURSDAY, newValue.FRIDAY, newValue.SATURDAY, newValue.SUNDAY, newValue.HOLIDAY]
  let value = checkValues.find(function (value) {
    return typeof value !== 'undefined'
  })
  return value
}

export function getColAndValue(newValue) {
  let checkValues = [newValue.MONDAY, newValue.TUESDAY, newValue.WEDNESDAY, newValue.THURSDAY, newValue.FRIDAY, newValue.SATURDAY, newValue.SUNDAY, newValue.HOLIDAY]
  let newText = checkValues.find(function (value) {
    return typeof value !== 'undefined'
  })
  let colNames = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'HOLIDAY']
  let colIndex = checkValues.indexOf(newText)
  return {col: colNames[colIndex], value: newText}
}

export function validateBudgetAdjusterData(adjuster) {
  for (let day = 0; day < adjustmentRuleScheduleConstant.DAYS_OF_WEEK.length; day++) {
    if (!this.validateBudgetCellData(adjuster[day].budget))
      return false
    for (let hour = 0; hour < adjuster[day].schedule.length; hour++) {
      let ratio = adjuster[day].schedule.ratio
      if (!this.validateRatioCellData(ratio))
        return false
    }
  }
  return true
}
export function validateBudgetCellData(bugdet) {
  return (bugdet.toString().length <= 9 && isNumber(bugdet.toString()))
}

export function validateRatioCellData(ratio) {
  return (ratio.toString().length <= 4 && isNumber(ratio.toString()))
}

export function validateAdjuster(adjuster) {
  return adjuster.findIndex(adjusterDay => {
    return typeof adjusterDay.budget == 'undefined'
  }) == -1
}
