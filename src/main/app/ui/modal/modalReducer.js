import modalConstant from '../../constants/modal'
import initialState from '../../../initialState'

export default function modalReducer (state = initialState.modal, action) {
  switch (action.type) {
    case modalConstant.SHOW_ERROR_POPUP: {
      let errors = []
      if (Object.prototype.toString.call(action.errors) !== '[object Array]') {
        errors = [action.errors]
      } else {
        errors = $.extend([], action.errors)
      }

      return {
        isShow: true,
        title: 'エラー',
        message: errors.length > 0 ? errors.map(error => {
          return error.message != "warn.error.unknown" ? '<p class="text-danger">' + error.message + '</p>' : ''
        }).join('') : '',
        type: 'error'
      }
    }

    case modalConstant.SHOW_INFO_POPUP:
      return {
        isShow: true,
        title: 'お知らせ',
        message: action.messages.map((message) => {
          return '<p class="text-success">' + message + '<p>'
        }).join(''),
        type: 'info'
      }

    case modalConstant.HIDE_POPUP:
      return {
        isShow: false,
        message: '',
        type: '',
        title: ''
      }

    case modalConstant.SHOW_CONFIRM:
      return {
        isShow: true,
        message: action.message,
        type: action.modalType,
        confirmedFunction: action.confirmedFunction,
        additionAction: action.additionAction,
        isShowCancelButton: action.isShowCancelButton
      }

    case 'ADD_CONFIRM_FUNCTION':
      return Object.assign({}, state, {confirmedFunction: action.confirmedFunction})

    case 'SHOW_WARNING_USER_NOT_SAVE':
      return Object.assign({}, state, {isShow: true, message: action.message, type: action.modalType})

    case 'SHOW_WARNING':
      return Object.assign({}, state, {isShow: false, isShowModalMessage: true, message: action.message, type: 'error'})

    case 'SHOW_WARNING_DUPLICATE_CPN_AND_DATE':
      return Object.assign({}, state, {isShow: false, isShowModalMessage: true, message: action.message, type: action.modalType})

    default:
      return state
  }
}
