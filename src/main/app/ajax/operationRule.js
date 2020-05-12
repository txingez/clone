import Ajax from './ajax'

class OperationRuleAjax extends Ajax {
  list (accountId) {
    return this.ajax().get('/api/accounts/' + accountId + '/operation-rules', this.headers)
  }

  detail (id) {
    return this.ajax().get('/api/operation-rules/' + id, this.headers)
  }

  getYahooStdRule (id) {
    return this.ajax().get('/api/yahoo/standard-rules/' + id)
  }

  create (data, id) {
    return this.ajax().post('/api/accounts/' + id + '/operation-rules', this.makeData(data), this.headers)
  }

  update (id, data) {
    return this.ajax().put('/api/operation-rules/' + id, this.makeData(data), this.headers)
  }

  updateYahooStdRule(data) {
    return this.ajax().post('/api/yahoo/standard-rules', JSON.stringify(data), this.headers)
  }

  updateStatus (id, status) {
    return this.ajax().put('/api/operation-rules/' + id + '/status', this.makeData({status: status}), this.headers)
  }

  delete(id) {
    return this.ajax().delete('/api/operation-rules/' + id, this.headers)
  }

  showJson(id){
    return this.ajax().get('api/operation-rules/' + id  + '/json', this.headers)
  }
}

const operationRuleAjax = new OperationRuleAjax()
export default operationRuleAjax
