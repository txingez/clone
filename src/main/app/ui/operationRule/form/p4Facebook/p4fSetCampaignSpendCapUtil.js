import DateUtil from "../../../../util/date"
import moment from "moment"

export function getClosedDateConfig(startDateStr) {
  let result = {
    minDate: moment(),
    maxDate: moment(),
    disabled: true,
    defaultValue: "",
    isRequired: false
  }
  if (startDateStr) {
    switch (DateUtil.compareWithCurrentDate(startDateStr, "YYYY/MM/DD")) {
      case "FROM_LAST_MONTH":
        const firstDay2MonthsStr = moment().subtract(2, 'M').startOf('M').format("YYYY/MM/DD")
        const minDate = firstDay2MonthsStr > startDateStr ? firstDay2MonthsStr : startDateStr
        result = {
          minDate: moment(minDate),
          maxDate: moment(),
          disabled: false,
          defaultValue: moment().subtract(1, 'M').endOf('M'),
          isRequired: true
        }
        break
      case "EARLY_CURRENT_MONTH":
        result = {
          minDate: moment(startDateStr),
          maxDate: moment(),
          disabled: false,
          defaultValue: "",
          isRequired: false
        }
        break
      case "LATE_CURRENT_MONTH":
        result = {
          minDate: moment(),
          maxDate: moment(),
          disabled: true,
          defaultValue: "",
          isRequired: false
        }
        break
      case "FROM_NEXT_MONTH":
        result = {
          minDate: moment(),
          maxDate: moment(),
          disabled: true,
          defaultValue: "",
          isRequired: false
        }
        break
    }
  }
  return result
}

export function convertToUSD(cost) {
  return cost/100
}


export function getSpendCapValue(costUntilClosedDate, currentMonthCost) {
  let result = ""
  if (currentMonthCost && costUntilClosedDate) {
    result = (parseFloat(costUntilClosedDate)*100 + parseInt(currentMonthCost)*100)/100
  } else if (currentMonthCost) {
    result = parseInt(currentMonthCost)
  } else if (costUntilClosedDate) {
    result = parseFloat(costUntilClosedDate)
  }
  return result
}
