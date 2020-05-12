import React from "react"

class BudgetCell extends React.Component {
  render() {
    return (
      <div className='budget-cell'>
    {this.props.value}
  </div>)
  }
}

export default BudgetCell
