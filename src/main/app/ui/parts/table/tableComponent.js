import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from "react-tooltip";
import SortingComponent from "./sorting/sortingComponent";
import stdRule from "../../../constants/standardRule";
import {addCommas} from "../../operationRule/form/stdRuleUtils";
import CurrencyUtil from '../../../util/currency'
import stdRuleConstant from "../../operationRule/form/stdRuleConstant";
import RowComponent from "./rowComponent";


class TableComponent extends React.Component {
  render() {
    const {name, columns, data, colGroups, currency, reportPeriod, conversionType, media, actionType} = this.props
    const currencySymbol = CurrencyUtil.getSymbolByCode(currency)
    const mappingInfo = stdRuleConstant.mappingColToComparable[media].mappingInfo
    const idsAfterFilter = data.map(row => row[mappingInfo.field])
    return (
      <div>
        <table id="table" className={"table-component " + name}>
          <thead>
          {colGroups ?
            <tr className="col-groups">
              {colGroups.map((colGroup, index) => (
                <th colSpan={colGroup.colSpan} key={index}>
                  {colGroup.renderSpan ? colGroup.renderSpan(reportPeriod, colGroup.additionalFunctions) : colGroup.header}
                </th>
              ))}
            </tr> : null
          }
          <tr className="col-header">
            {
              columns.map((column, index) => (
                column.render ?
                  (<th scope="col" key={index} id={column.name} className={column.name}
                       data-place={column.tooltipPlace}
                       data-tip={column.tooltipText}>
                    {column.renderHeader
                      ? column.renderHeader(column.name, column.require, idsAfterFilter)
                      : column.sorting
                        ? (<div className="sorting-header">
                          <span>{column.header}</span>
                          <SortingComponent columnName={column.name} conversionType={conversionType}/>
                        </div>)
                        : (<span>{column.header}
                          {column.require ? <span className="symbol-require">*</span> : ""}
                          <ReactTooltip effect="solid"/>
                    </span>)}
                  </th>)
                  : null))
            }
          </tr>
          </thead>

          <tbody>
          {data.map((rowData) => {
            return (
              <RowComponent
                key={rowData[mappingInfo.field]}
                rowData={rowData}
                columns={columns}
                conversionType={conversionType}
                currencySymbol={currencySymbol}
                media={media}
                actionType={actionType}
              />
            )
          })}
          </tbody>
        </table>
      </div>
    )
  }
}

TableComponent.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  colGroups: PropTypes.array.isRequired
}

export default TableComponent
