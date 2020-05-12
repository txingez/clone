import _ from 'lodash'
const DECIMAL = 10
class StringUtil {
  static capitalizeFirstLetter (str) {
    str = str.replace(/[-_]/g, ' ')
    return str.replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }).replace(/\s/g, '')
  }
}

export default StringUtil
