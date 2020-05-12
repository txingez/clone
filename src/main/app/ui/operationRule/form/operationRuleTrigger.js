import React from 'react'
import {connect} from 'react-redux'
import NewLineSingleTriggerList from "./newLine/newLineSingleTriggerList"
import OperationRuleConstant from "./../../../constants/operationRule"
import P4YahooSingleTriggerList from "./p4Yahoo/p4YahooSingleTriggerList"
import P4FacebookSingleTriggerList from "./p4Facebook/p4FacebookSingleTriggerList"

class OperationRuleTrigger extends React.Component {
  constructor(props) {
    super(props)
  }

  getComponentByMedia() {
    const {media, action, error} = this.props
    switch (media) {
      case OperationRuleConstant.MEDIA_LIST.YAHOO: {
        return (<P4YahooSingleTriggerList action={action} error={error}/>)
      }
      case OperationRuleConstant.MEDIA_LIST.NEWLINE: {
        return (<NewLineSingleTriggerList action={action} error={error}/>)
      }
      case OperationRuleConstant.MEDIA_LIST.FACEBOOK: {
        return (<P4FacebookSingleTriggerList action={action} error={error}/>)
      }
    }
  }

  render() {
    return (<div className="trigger-list">{this.getComponentByMedia()}</div>)
  }
}

export default connect(null, null)(OperationRuleTrigger)
