import translation from "./translation";
import currencies from "../constants/currency"

class CurrencyUtil {

  static getOffsetByCode(code) {
    let currencyInfo = currencies.find(c => c.code === code);
    return currencyInfo ? currencyInfo.offset : 1
  }

  static getSymbolByCode(code) {
    let currencyInfo = currencies.find(c => c.code === code);
    return currencyInfo ? currencyInfo.symbol : "¥"
  }

  static getCurrencyLetter(currencyStr) {
    let currencyLetter = translation.t('currency_letter.' + currencyStr);
    return currencyLetter ? currencyLetter : currencyStr
  }

  static replaceCurrencyLetter(targetStr, currencyStr) {
    return targetStr.split("_CURRENCY_LETTER_").join(this.getCurrencyLetter(currencyStr))
  }
}

export default CurrencyUtil
