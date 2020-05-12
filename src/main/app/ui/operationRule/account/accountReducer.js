import accountConstant from '../../../constants/account'
import initialState from '../../../../initialState'
import modalConstant from '../../../constants/modal'
import operationRuleConstant from "../../../constants/operationRule";

export default function accountReducer (account = initialState.account, action) {
  switch (action.type) {
    case accountConstant.SELECT_ACCOUNT:
      return Object.assign({}, account, {selectedAccountId: action.accountId, selectedAccount: account.accountList.find(acc => acc.id == action.accountId)})
    case accountConstant.LOAD_ACCOUNTS:
      return Object.assign({}, account, {accountList: action.response.accounts, companyCode: action.response.companyCode})
    case accountConstant.UPDATE_FILTER_MEDIAS:
      return Object.assign({}, account, {filterMedias: action.medias})
    case accountConstant.SELECT_ACCOUNT_TO_COPY_RULE:
      return Object.assign({}, account, {accountIdCopyRule: action.accountId})
    case modalConstant.SHOW_CONFIRM:
      return Object.assign({}, account, {accountIdCopyRule: initialState.account.accountIdCopyRule})
    case operationRuleConstant.SET_SPEND_CAP_FLAG:
      return Object.assign({}, account, {isSetSpendCapRule: action.flag})
    default:
      return account
  }
}
