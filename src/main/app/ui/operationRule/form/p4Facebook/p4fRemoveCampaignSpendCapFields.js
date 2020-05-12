import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TimeRangeDatePicker from "../../form/timeRangeDatePicker/timeRangeDatePicker"
import translation from '../../../../util/translation'
import moment from "moment"

class P4FRemoveCampaignSpendCapFields extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {action, onChangeCampaign, selected} = this.props
    return (
      <div>
        <div className="half-line remove-spend-cap-container">
          <TimeRangeDatePicker name={"schedule.executionDate"} required={true}
                               label={translation.t("schedule.remove_spend_cap_date_label")}
                               defaultValue={moment().add(1, 'M').startOf('M')}
          />
        </div>
        <div className="box-clean"></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ruleList: state.ruleList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4FRemoveCampaignSpendCapFields)
