import React from "react"
import operationRuleConstant from "../../../constants/operationRule";

class PerformanceCellFormat extends React.Component {

  render() {
    let zxc = JSON.parse(this.props.value)
    let triggerValues = zxc.map(performance => {
      let specialStatus = ""
      if (this.props.media === operationRuleConstant.MEDIA_LIST.FACEBOOK)
        specialStatus = performance.EFFECTIVE_STATUS
      else specialStatus = performance.DELIVERY_STATUS
      return [{
        evaluatedComponentType: performance.evaluatedComponentType,
        ID: performance.evaluatedComponentId,
        startDate: performance.dateStart,
        endDate: performance.dateEnd,
        cost: performance.COST,
        impression: performance.IMPRESSION,
        click: performance.CLICK,
        cv: performance.CV,
        install: performance.INSTALL,
        ctr: performance.CTR,
        cpa: performance.CPA,
        cost_per_install: performance.COST_PER_INSTALL,
        cpc: performance.CPC,
        cpm: performance.CPM,
        status: performance.STATUS,
        ANAA: performance.ANAA,
        deliveryStatus: specialStatus,
        cv1: performance.CV1,
        cvr1: performance.CVR1,
        cpa1: performance.CPA1,
        cv2: performance.CV2,
        cvr2: performance.CVR2,
        cpa2: performance.CPA2,
      }]
    })
    let titleStr = triggerValues.map((evalValue) => {
      return JSON.stringify(evalValue).replace("\"evaluatedComponentType\":", "").replace(/[\[\]']+/g, '')
    }).join("\n")

    return (
      <div title={titleStr}>
        {triggerValues.map((evalValue) => {
          return (
            <div>{JSON.stringify(evalValue).replace("\"evaluatedComponentType\":", "").replace(/[\[\]']+/g, '')}</div>
          )
        })}
      </div>)
  }
}

export default PerformanceCellFormat
