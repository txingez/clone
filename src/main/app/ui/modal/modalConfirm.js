import React from 'react'
import Modal from 'react-bootstrap-modal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as modalAction from './modalAction'
import {selectAccountToCopyRule} from '../operationRule/account/accountAction'
import translation from '../../util/translation'
import modalConstant from '../../constants/modal'
import {CustomTokenizer} from '../../util/customTokenizer'
import createFilterOptions from "react-select-fast-filter-options"
import Select from "react-virtualized-select"

class ModalConfirm extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  isDisableConfirmButton = () => {
    return this.props.modal.additionAction === modalConstant.COPY_RULE_TO_OTHER_ACCOUNT && this.props.account.accountIdCopyRule === 0
  }

  confirmedFunction(){
    this.props.hidePopup()
    localStorage.removeItem('rule')
    this.props.modal.confirmedFunction()
  }

  render() {
    const options = this.props.account.accountList.filter(
      (account) => {return this.props.account.selectedAccount !== undefined &&
        this.props.account.selectedAccount.media === account.media
        && this.props.account.selectedAccount.id !== account.id  }
    ).map((account) => {
      return {label: account.mediaAccountId + " " + account.accountName, value: account.id}
    })
    const tokenizer = new CustomTokenizer()
    const filterOptions = createFilterOptions({
      options,
      tokenizer
    })

    return (
      <div>
        <Modal show={this.props.modal ? this.props.modal.isShow : false} onHide={this.props.hidePopup}
               aria-labelledby="ModalHeader">
          <Modal.Header className={`modal-header-${this.props.modal.type}`} closeButton>
            <Modal.Title id="ModalHeader">{this.props.modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content">
              {this.props.modal.message}
            </div>
            {this.props.modal.additionAction === modalConstant.COPY_RULE_TO_OTHER_ACCOUNT ?
              <div>
                <div>{translation.t("modal.choose_account_to_copy_rule")}<span className="symbol-require">*</span></div>
                <Select filterOptions={filterOptions({options})} options={options} clearable={false} optionHeight={65} value={this.props.account.accountIdCopyRule}
                placeholder={translation.t('account_filter.place_holder')} onChange={e => this.props.selectAccountToCopyRule(e.value)}/>
              </div>
              : null
            }
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-primary" disabled={this.isDisableConfirmButton()}
                    onClick={e => this.confirmedFunction()}>{translation.t('yes')}</button>
            { this.props.modal.isShowCancelButton? <Modal.Dismiss className="btn btn-default">{translation.t('no')}</Modal.Dismiss>:null}
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal,
    account: state.account
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hidePopup: modalAction.hidePopup,
    selectAccountToCopyRule: selectAccountToCopyRule
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm)
