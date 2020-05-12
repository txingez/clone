const DECIMAL = 10
class StringUtil {
  static capitalizeFirstLetter (str) {
    str = str.replace(/[-_]/g, ' ')
    return str.replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
    }).replace(/\s/g, '')
  }

  static omit (str, byteIndex) {
    for (let j = 0, byte = 0; j < str.length; j++) {
      str.charCodeAt(j) < 0x100 ? byte++ : byte += 2
      if (byte > byteIndex) {
        return str.substr(0, j) + '...'
      }
    }
    return str
  }
  static convertToInt (str) {
    return parseInt(str, DECIMAL)
  }

  static separateByFigure (num) {
    return (num !== '' && num !== undefined) ? parseInt(num, 10).toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }) : ''
  }
  static removeFigure (str) {
    return str ? parseInt(str.replace(/,/gi, ''), 10) : ''
  }

  static removeNonNumberic (str) {
    return str ? str.toString().replace(/\D/gi, '') : ''

  }

  static paddingByZeroAfterDecimal (num, place) {
    return num.toFixed(place).toLocaleString()
  }

  static isEmpty (str) {
    return !str || str.trim().length === 0
  }

  static isPartialMatched (target, keyword) {
    return target.indexOf(keyword) !== -1
  }

  static isNonEmpty (str) {
    return str != undefined && str != ''
  }
}

export default StringUtil
