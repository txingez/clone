import Ajax from './ajax'

class YahooStdRule extends Ajax {
  getReports(accountId) {
    return this.ajax().get('/api/yahoo/standard-rules/reports/' + accountId, this.headers)
  }

  getSettingStdRule(accountId, actionType) {
    return this.ajax().get('/api/yahoo/standard-rules/setting-rule/' + accountId + "/" + actionType, this.headers)
  }
}

const yahooStdRule = new YahooStdRule()
export default yahooStdRule
