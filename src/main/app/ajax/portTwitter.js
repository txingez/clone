import Ajax from "./ajax";
import Common from "../constants/common";

class PortTwitter extends Ajax{
  getReports(mediaAccountId) {
    let data = this.buildForwardRequest(
      {"fundingsourcesId": mediaAccountId},
      Common.API_TYPE.GET_REPORTS,
      Common.FORWARD_METHOD.GET
    )

    return this.ajax().post('/api/forward-request', data, this.headers)
  }

  buildForwardRequest(data, apiType, method = Common.FORWARD_METHOD.POST) {
    return JSON.stringify({
      "media": Common.MEDIA.TWITTER,
      "apiType": apiType,
      "method": method,
      "data": JSON.stringify(data)
    })
  }
}

const portTwitter = new PortTwitter()
export default portTwitter
