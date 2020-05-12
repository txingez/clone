import Ajax from './ajax'
import Common from '../constants/common'

class PortNewLine extends Ajax {

  targetActionPath(data) {
    data = this.buildForwardRequest(data, Common.API_TYPE.PREVIEW_TARGET_ACTION_PATH_TEST)
    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  previewTarget(data) {
    data = this.buildForwardRequest(data, Common.API_TYPE.PREVIEW_TARGET_ACTION_PATH)
    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  showValidTargetPath(data){
    data = this.buildForwardRequest(data, Common.API_TYPE.PREVIEW_SEARCH_SCOPE)
    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  getReports(mediaAccountId) {
    let data = this.buildForwardRequest(
      {"accountId": mediaAccountId},
      Common.API_TYPE.GET_REPORTS,
      Common.FORWARD_METHOD.GET
    )
    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  buildForwardRequest(data, apiType, method = Common.FORWARD_METHOD.POST) {
    return JSON.stringify({
      "media": Common.MEDIA.NEWLINE,
      "apiType": apiType,
      "method": method,
      "data": JSON.stringify(data)
    })
  }
}

const portNewLine = new PortNewLine()
export default portNewLine
