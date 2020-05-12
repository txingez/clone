import React from "react"

class HourIndexCell extends React.Component {
  render() {
    return (
      <div className="hour-cell">
        {this.props.value}
      </div>)
  }
}

export default HourIndexCell
