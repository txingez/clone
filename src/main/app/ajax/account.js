import Ajax from './ajax'

class AccountAjax extends Ajax {
  list (accountId) {
    return this.ajax().get('/api/accounts', this.headers)
  }
}

const accountAjax = new AccountAjax()
export default accountAjax
