import StringUtil from '../../../util/string'
import NumberUtil from '../../../util/number'

const require = field => value => value && value.toString().trim() ? undefined : `${field}は必須項目です。`
const actionLimitFacebook = field => value => value >= 0 && value !== ""? undefined : `${field}は必須項目です。`
const moneyRequire = field => value => (value === null || value === undefined || value === '') ? `${field}は必須項目です。` : undefined
const maxLength = (max, field) => value => {
  return (value && value.length > max) ? `${field}は${max}文字以内で入力してください。` : undefined
}
const format = (field, pattern) => value => value && !pattern.test(value) ? `入力した${field}の形式が正しくありません。` : undefined
const moneyMaxLength = (max) => value => value && StringUtil.removeNonNumberic(value).length > max ? `最大10桁まで入力してください。` : undefined
const number = value =>
  value && isNaN(Number(value)) ? '数値を入力してください' : undefined
const integerNumber = value =>
  value && NumberUtil.isInteger(value) ? '数値を入力してください' : undefined
const requireOnOff = value =>
  value === 'ON' || value === 'OFF' ? undefined: `は必須項目です。`
const greaterThanZero = value => value <= 0 ? "0より大きい値を入力してください" : undefined
const greaterOrEqualZero = value => value < 0 ? "0以上の値を入力してください" : undefined
const isOnlyDigitNumber = value => !value || /^\d+$/.test(value) ? undefined : '数値を入力してください'
const actionValueLimit = value => value === undefined || value <= 2000000000 ? undefined : '2000000000以下の値を入力してください'
const requireCustomMsg = msg => value => value && value.toString().trim() ? undefined : msg
const Validation = { require, moneyRequire, maxLength, format, moneyMaxLength, number, greaterThanZero, greaterOrEqualZero, integerNumber,
  requireOnOff, isOnlyDigitNumber, actionValueLimit, actionLimitFacebook, requireCustomMsg}
export default Validation
