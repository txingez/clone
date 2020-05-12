import Ajax from './ajax'
import Common from '../constants/common'

class PortFaceBook extends Ajax {

  targetActionPath (data) {
    data = this.buildForwardRequest(data, Common.API_TYPE.PREVIEW_TARGET_ACTION_PATH)
    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  getCampaigns(accountId) {
    let data = this.buildForwardRequest(
      {"accountId": accountId},
      Common.API_TYPE.GET_CAMPAIGNS,
      Common.FORWARD_METHOD.GET
    )

    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  getAdSets(accountId) {
    let data = this.buildForwardRequest(
      {"accountId": accountId},
      Common.API_TYPE.GET_ADSETS,
      Common.FORWARD_METHOD.GET
    )
    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  getCampaignCost(campaignId, startDate, previousClosedDate) {
    let payload = {
      "campaignId": campaignId,
      "startDate": startDate,
      "previousClosedDate": previousClosedDate
    }

    let data = this.buildForwardRequest(
      payload,
      Common.API_TYPE.GET_COST,
      Common.FORWARD_METHOD.GET
    )

    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  getTotalMinCost(campaignId){
    let data = this.buildForwardRequest(
      {"campaignId": campaignId},
      Common.API_TYPE.GET_TOTAL_MIN_COST,
      Common.FORWARD_METHOD.GET
    )

    return this.ajax().post('/api/forward-request', data, this.headers )
  }

  buildForwardRequest(data, apiType, method = Common.FORWARD_METHOD.POST) {
    return JSON.stringify({
      "media": Common.MEDIA.FACEBOOK,
      "apiType": apiType,
      "method": method,
      "data": JSON.stringify(data)
    })
  }
}

const portFaceBook = new PortFaceBook()
export default portFaceBook
