import commonConstant from '../constants/common'
import Authen from '../auth0/webAuth'

class ApiResult {

  errors(apiResponse) {
    if (apiResponse.response.data instanceof ArrayBuffer) {
      return this.getMessage(JSON.parse(decodeURIComponent(escape(String.fromCharCode.apply(null, new Uint8Array(apiResponse.response.data))))))
    } else {
      return this.getMessage((typeof apiResponse.response.data == 'string') ? JSON.parse(apiResponse.response.data) : apiResponse.response.data)
    }
  }

  getMessage(response) {
    return (typeof response.warning !== 'undefined') ? this.getWarningMessage(response.warning) : this.getErrorMessage(response)
  }

  getWarningMessage(response) {
    return response.map(warning => warning.message)
  }

  getErrorMessage(response) {
    if (response.error.code === commonConstant.UNAUTHORIZED_ERROR_CODE) {
      Authen.clearSessions()
      setTimeout(function() {
        window.location.href = commonConstant.HOME_PAGE_URL
      }.bind(this), 3000)
    } else if (response.error.code === commonConstant.FORBIDDEN_ERROR_CODE) {
      setTimeout(function() {
        window.location.href = commonConstant.HOME_PAGE_URL
      }.bind(this), 2500)
    } else if (response.error.code === commonConstant.UNKNOWN_ERROR_CODE) {
      window.location.href = commonConstant.SYSTEM_ERROR_URL
    } else if (response.error.code === commonConstant.PERMISSION_DENIED_CODE) {
      setTimeout(function() {
        window.location.href = commonConstant.HOME_PAGE_URL
      }.bind(this), 2000)
    } else if (response.error.code === commonConstant.NOT_FOUND_CODE) {
      response.error = response.error.message
    }

    return response.error.message ? [].concat(response.error.message) : [].concat(response.error)
  }

  success(apiResponse) {
    return (typeof apiResponse.data == 'string') ? JSON.parse(apiResponse.data).result : apiResponse.data.result
  }

  fileSuccess(apiResponse, fileName, fileType) {
    const blob = new Blob([apiResponse.data], {type: fileType})
    if(window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
      const url = window.URL || window.webkitURL || window.mozURL || window.msURL
      let link = document.createElement('a')
      link.href = url.createObjectURL(blob)
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
let apiResult = new ApiResult
export default apiResult

