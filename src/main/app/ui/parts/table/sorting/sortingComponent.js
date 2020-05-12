import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {updateTableData} from "../../../operationRule/form/stdRuleAction"
import stdRule from "../../../../constants/standardRule";

class SortingComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.sortASC = this.sortASC.bind(this)
    this.sortDESC = this.sortDESC.bind(this)
  }

  sortFnc(columnName, conversionType, arr, orderBy = 'asc') {
    const tailColName = columnName === stdRule.COLUMN_NAME.reportCols.cpa && conversionType ? conversionType : ""
    const sortedArr = arr.sort((a, b) => {
      if (typeof (a[columnName]) === 'string' && typeof (b[columnName]) === 'string') {
        return a[columnName].localeCompare(b[columnName])
      } else {
        return a[columnName + tailColName] - b[columnName + tailColName]
      }
    })
    return orderBy === 'desc' ? sortedArr.reverse() : sortedArr
  }

  sortASC(columnName, conversionType) {
    const tableDataCopy = Object.assign([], this.props.tableData)
    const sortedTableData = this.sortFnc(columnName, conversionType, tableDataCopy)
    this.props.updateTableData(sortedTableData)
  }

  sortDESC(columnName, conversionType) {
    const tableDataCopy = Object.assign([], this.props.tableData)
    const sortedTableData = this.sortFnc(columnName, conversionType, tableDataCopy, 'desc')
    this.props.updateTableData(sortedTableData)
  }

  render() {
    const {columnName, conversionType} = this.props
    return (
      <div className="sort-buttons">
        <button type="button" className="btn-sort-top"
                onClick={this.sortASC.bind(this, columnName, conversionType)}>
          <span className="glyphicon glyphicon-triangle-top"></span>
        </button>
        <button type="button" className="btn-sort-bottom"
                onClick={this.sortDESC.bind(this, columnName, conversionType)}>
          <span className="glyphicon glyphicon-triangle-bottom"></span>
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tableData: state.stdRule.tableData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateTableData: updateTableData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SortingComponent)
