class NumberUtil {
  static isInteger (num) {
    return (isNaN(Number(num)) || Number(num) !== parseInt(num, 10))
  }
}

export default NumberUtil
