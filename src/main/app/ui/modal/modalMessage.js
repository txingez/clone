import React from 'react'
import Modal from 'react-bootstrap-modal'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as modalAction from './modalAction'

class ModalMessage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal () {
    this.props.actions.hidePopup()
  }

  render() {
    return (
      <div>
        <Modal show={this.props.modal && this.props.modal.isShowModalMessage ? this.props.modal.isShowModalMessage : false} onHide={this.closeModal} aria-labelledby="ModalHeader" dialogClassName="modal-message-width">
          <Modal.Header className={`modal-header-${this.props.modal.type}`} closeButton>
            <Modal.Title id="ModalHeader">{this.props.modal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="content" dangerouslySetInnerHTML={{__html: this.props.modal.message ? this.props.modal.message : ''}}></div>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Dismiss className="btn btn-default">閉じる</Modal.Dismiss>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(modalAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage)
