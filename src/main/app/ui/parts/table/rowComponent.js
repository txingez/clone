import React from 'react'
import stdRule from "../../../constants/standardRule";
import {addCommas} from "../../operationRule/form/stdRuleUtils";

class RowComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {

    return this.props.columns.map(column => {
      return nextProps.rowData[column.name] !== this.props.rowData[column.name]
    })
  }

  render() {
    const {rowData, columns, conversionType, currencySymbol, media, actionType} = this.props
    console.log(`render TableRow :: ${rowData.adGroupId}`);
    let backgroundColorClass = rowData.isValidate ? "valid-background-color" : "invalid-background-color"
    return (
      <tr className={backgroundColorClass}>
        {columns.map((column, indexCol) => {
          const key = conversionType && column.name === stdRule.COLUMN_NAME.reportCols.cpa
            ? column.name + conversionType
            : column.name
          return (column.render
              ? (<td key={indexCol} className={column.name}>
                {column.renderData
                  ? <div
                    align="center">{column.renderData(rowData, column.name, column.additionalFunctions, currencySymbol, media, actionType)}</div>
                  : (rowData[key] === "" || rowData[key] === undefined)
                    ? null
                    : column.showCurrency
                      ? currencySymbol + " " + addCommas(rowData[key])
                      : rowData[key]}
              </td>)
              : null
          )}
        )}
      </tr>
    );
  }
}

export default RowComponent
