import dateFormat from 'dateformat'
import moment from 'moment'

class DateUtil {

  static minusDays (date, days) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - days,
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  }

  static toUtcDate (localDate) {
    return new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      localDate.getHours(),
      localDate.getMinutes() + localDate.getTimezoneOffset(),
      localDate.getSeconds()
    )
  }

  static toLocalDate (utcDate) {
    return new Date(
      utcDate.getFullYear(),
      utcDate.getMonth(),
      utcDate.getDate(),
      utcDate.getHours(),
      utcDate.getMinutes() - utcDate.getTimezoneOffset(),
      utcDate.getSeconds()
    )
  }

  /**
   * Apply timezone offset(by hour) to date
   * @param date
   * @param timezoneOffset TODO currently we only use JST timezone, need to update when we apply ad account timezone
   * @returns {Date}
   * When we apply ad account timezone,
   * 1. grep code that uses this function
   * 2. apply ad account timezone offset to there as 2nd parameter
   * 3. remove default value of timezoneOffset parameter
   */
  static applyTimezoneOffset (date, timezoneOffset = 9) {
    return new Date(date.setHours(date.getHours() + timezoneOffset))
  }

  static toStartOfDay (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  }

  static toEndOfDay (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
  }

  static millisecondToDate (millisecond, format = 'yyyy/mm/dd') {
    return dateFormat(new Date(millisecond), format)
  }

  static convertDateToString (date, format) {
    return (date && date !== '') ? dateFormat(new Date(date), format) : null
  }

  static convertDateStringToMoment(strDate) {
    return strDate ?
      typeof strDate === 'string' ? moment(new Date(strDate).toISOString()) : strDate
      : null
  }

  static convertMonthStringToMoment(strMonth) {
    return strMonth ?
      typeof strMonth === 'string' ? moment(new Date(strMonth+"/01").toISOString()) : strMonth
      : null
  }

  static convertDateToJapanFormat(strDate) {
    return new Date(strDate).toLocaleDateString('ja-JP', {year: "numeric", month: "long", day: "numeric"})
  }

  static getDayOfWeekFromIsoNum(num) {
    let day = ""
    switch (num) {
      case 1:
        day = "MONDAY"
        break
      case 2:
        day = "TUESDAY"
        break
      case 3:
        day = "WEDNESDAY"
        break
      case 4:
        day = "THURSDAY"
        break
      case 5:
        day = "FRIDAY"
        break
      case 6:
        day = "SATURDAY"
        break
      case 7:
        day = "SUNDAY"
        break
    }
    return day
  }

  static convertDateByFormat(date, format) {
    return moment(date).format(format)
  }

  static compareWithCurrentDate(dateStr, format) {
    let lastDateOfCurrentMonth = moment().endOf('month').format(format)
    let lastDateOfTargetMonth = moment(dateStr).endOf('month').format(format)
    let result = "EARLY_CURRENT_MONTH"
    if (lastDateOfCurrentMonth < lastDateOfTargetMonth) {
      result = "FROM_NEXT_MONTH"
    } else if (lastDateOfCurrentMonth > lastDateOfTargetMonth) {
      result = "FROM_LAST_MONTH"
    } else if (moment().format(format) < dateStr) {
      result = "LATE_CURRENT_MONTH"
    }
    return result
  }

  static getEndDateLastMonth(format) {
    return moment().subtract(1, 'month').endOf('month').format(format)
  }

  static getFirstDateNextMonth(format) {
    return moment().add(1, 'month').startOf('month').format(format)
  }

  static getToday(format) {
    return moment().format(format)
  }

  static getValueFromDatePicker(value) {
    return (typeof value === "undefined"  || typeof value === "string") ?
      value : value.format("YYYY/MM/DD")
  }
}

export default DateUtil
