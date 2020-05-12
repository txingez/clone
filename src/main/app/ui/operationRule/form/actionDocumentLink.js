import React from "react"
import * as ruleScheduleAction from "../ruleSchedule/ruleScheduleAction";
import {bindActionCreators} from "redux";
import operationRuleConstant from "../../../constants/operationRule"
import {connect} from "react-redux";
import {getScheduleLinkLabel} from "../ruleSchedule/ruleScheduleUtil";
import translation from '../../../util/translation'
import * as adjustmentRuleAction from "../budgetAdjustment/adjustmentRuleScheduleAction";

class actionDocumentLink extends React.Component {

  getDocumentLink(media, action) {
    let documentLink
    let documentConfig = operationRuleConstant.ACTION_DOCUMENT_LINK.find(obj => {
      return (obj.MEDIA === media && obj.ACTION === action.actionType)
    })
    documentConfig != undefined ? documentLink = documentConfig.LINK : documentLink = undefined
    return documentLink
  }

  render() {
    const { media, action} = this.props
    if (this.getDocumentLink(media, action) != undefined)  {
      return (
        <a target="_blank" href={this.getDocumentLink(media, action)} className="document-URL">
          {translation.t('action.actionDocument')}
          <span className="glyphicon glyphicon-new-window"></span>
        </a>
      )
    } else {
      return null
    }
  }

}

export default actionDocumentLink
