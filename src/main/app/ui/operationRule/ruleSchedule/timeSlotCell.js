import React from "react"
import ruleScheduleConstant from '../../../constants/ruleSchedule'

class ScheduleCell extends React.Component {
  render() {
    return (
      <div className={this.props.value === ruleScheduleConstant.VALUE_ON  ? 'active-hour' : 'inactive-hour'}>
        {this.props.value}
      </div>)
  }
}

export default ScheduleCell
