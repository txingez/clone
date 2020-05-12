import commonConstant from '../constants/common'
class Message {
  constructor (component) {
    this.component = component
  }

  errors (errors, redirectUrl = '', title = 'エラー') {
    const self = this
    if (Object.prototype.toString.call(errors) !== '[object Array]') {
      errors = [errors]
    }

    self.showMessage({
      title: title,
      message: errors.map(error => {
        return error.message != "warn.error.unknown" ? '<p class="text-danger">' + error.message + '</p>' : ''
      }).join(''),
      modalClass: 'modal-header-error'
    })

    if (redirectUrl !== '' && errors[0].code === commonConstant.NOT_FOUND_CODE) {
      if (self.component.state.confirmBeforeLeave) {
        self.component.setState({confirmBeforeLeave: false})
      }

      setTimeout(function () {
        self.component.props.router.push(redirectUrl)
      }.bind(self), 1500)
    }
  }

  success (message, title = 'お知らせ') {
    this.showMessage({
      'title': title,
      'message': '<p class="text-success">' + message + '<p>',
      'modalClass': 'modal-header-success'
    })
  }

  warning (message, title = '警告') {
    this.showMessage({
      'title': title,
      'message': '<p class="text-warning">' + message + '<p>',
      'modalClass': 'modal-header-warning'
    })
  }

  confirm (
    onAgree,
    message,
    title = '警告！'
  ) {
    let state = this.component.state
    state.modal = {}
    state.modal.isConfirmMessageShow = true
    state.modal.title =title
    state.modal.message = message
    state.modal.modalClass = 'modal-header-error'
    state.modal.onAgree = onAgree
    this.component.setState({modal: state.modal})
  }

  showMessage (options) {
    let state = this.component.state
    state.modal = {}
    state.modal.isMessageShow = true
    state.modal.title = options.title
    state.modal.message = options.message
    state.modal.modalClass = options.modalClass
    this.component.setState({modal: state.modal})
  }
}

const message = {
  with (self) {
    return new Message(self)
  }
}

export default message
