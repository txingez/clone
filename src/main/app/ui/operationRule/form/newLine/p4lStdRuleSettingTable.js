import React from "react"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import translation from "../../../../util/translation"
import TableComponent from "../../../parts/table/tableComponent"
import stdRule from "../../../../constants/standardRule";
import PasteBtnComponent from "../../../parts/table/copyPaste/pasteBtnComponent";
import CopyCheckCancelBtns from "../../../parts/table/copyPaste/copyCheckCancelBtns";
import ReportPeriodComponent from "../../../parts/table/reportPeriod/ReportPeriodComponent";
import {updateCellData, updateTableData, updateSearchText} from "../stdRuleAction";
import {addCommas, checkIsEdited, getTableDataWithFilter} from "../stdRuleUtils";
import HeaderWithTooltip from "../../../parts/table/headerWithTooltip/headerWithTooltip";
import SearchBox from "../../../parts/searchBox/searchBox";
import stdRuleConstant from "../stdRuleConstant";

class P4LStdRuleSettingTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.renderHeaderWithTooltip = this.renderHeaderWithTooltip.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.renderMinimumAdNumber = this.renderMinimumAdNumber.bind(this)
    this.renColumns = this.renColumns.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)

    this.state = {
      colGroups: [
        {
          renderSpan: this.renderReportColGroup,
          colSpan: 3
        },
        {
          header: translation.t('stdRuleSettingTable.setting_col_title'),
          colSpan: 7
        }
      ]
    }
  }

  renColumns() {
    return [
      {
        header: translation.t('stdRuleSettingTable.reportColsHeaderText.ad_group_name'),
        name: stdRule.COLUMN_NAME.reportCols.adGroupName,
        render: true,
        sorting: true
      },
      {
        header: translation.t('stdRuleSettingTable.reportColsHeaderText.cost'),
        name: stdRule.COLUMN_NAME.reportCols.cost,
        render: true,
        sorting: true,
        showCurrency: true
      },
      {
        header: translation.t('stdRuleSettingTable.reportColsHeaderText.cpa'),
        name: stdRule.COLUMN_NAME.reportCols.cpa,
        render: true,
        sorting: true,
        showCurrency: true
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.referencePeriod,
        render: true,
        renderData: this.renderReferencePeriod
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.referenceDay,
        render: true,
        require: true,
        renderData: this.renderReferenceDay,
        additionalFunctions: {
          onChangeSelect: this.onChangeSelect
        }
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.targetCPA,
        render: true,
        require: true,
        renderData: this.renderInput,
        additionalFunctions: {
          onChangeInput: this.onChangeInput,
        }
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.minimumAdNumber,
        render: true,
        require: true,
        renderData: this.renderMinimumAdNumber
      },
      {
        renderHeader: this.renderPasteButton,
        name: stdRule.COLUMN_NAME.modify,
        renderData: this.renderModifyCell,
        render: true
      }
    ]
  }

  renderReportColGroup(reportPeriod) {
    return (<ReportPeriodComponent reportPeriod={reportPeriod}
                                   reportColName={translation.t('stdRuleSettingTable.report_col_title')}/>)
  }

  renderReferencePeriod(rowData) {
    let TIME_RANGE = 7
    const key = "reports_" + TIME_RANGE + "DAY"
    const reports = JSON.parse(localStorage.getItem("reports"))[key]
    let report = reports ? reports.find(report => report.adGroupId === rowData.adGroupId) : undefined

    if (report !== undefined && report.cost !== undefined && report.avgDays7AdId !== undefined) {
      if (rowData.referenceDay !== undefined && rowData.targetCPA !== undefined
        && rowData.referenceDay !== "" && rowData.targetCPA !== "") {
        const referenceDayNumVal = stdRule.REFERENCE_DAY.find(obj => rowData.referenceDay === obj.value).numberValue
        let value = referenceDayNumVal * TIME_RANGE * rowData.targetCPA * report.avgDays7AdId / report.cost
        value = value < 3 ? 3 : value > 30 ? 30 : value
        return (
          <span>{Math.round(value)}</span>
        )
      } else {
        return (<span>{translation.t('stdRuleSettingTable.notSetText')}</span>)
      }
    } else {
      return (<span>{translation.t('stdRuleSettingTable.canNotCalculate')}</span>)
    }
  }

  renderReferenceDay(rowData, columnName, additionalFunctions, currencySymbol, media, actionType) {
    const isEdited = checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (
      <select className={nameOfClass}
              onChange={additionalFunctions.onChangeSelect.bind(this, rowData, columnName, media, actionType)}>
        {stdRule.REFERENCE_DAY.map(option => {
          const referenceDay = rowData.referenceDay === undefined ? "" : rowData.referenceDay
          return (<option value={option.value} selected={option.value === referenceDay}>{option.text}</option>)
        })}
      </select>
    )
  }

  renderMinimumAdNumber(rowData) {
    const symbol = "本"
    return (<span>{rowData.minimumAdNumber + " " + symbol}</span>)
  }

  renderInput(rowData, columnName, additionalFunctions, currencySymbol, media, actionType) {
    const numberAndLength = this.getNumberAndMaxLength(columnName)
    const number = rowData[numberAndLength.number]
    const maxLength = numberAndLength.maxLength
    const value = (number !== undefined)
      ? (number.toString().length > 0) ? number.toLocaleString() : ""
      : ""
    const isEdited = checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (<span><input type="text"
                         className={nameOfClass}
                         value={value !== ""
                             ? currencySymbol + " " + addCommas(value)
                             : addCommas(value)}
                         maxLength={maxLength}
                         placeholder={translation.t('stdRuleSettingTable.notSetText')}
                         onChange={additionalFunctions.onChangeInput.bind(this, rowData, columnName, media, actionType, currencySymbol)}
    /></span>)
  }

  onChangeSelect(rowData, columnName, media, actionType, e) {
    const editedCell = rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
    this.props.updateCellData(rowData.adGroupId, {
      referenceDay: e.target.value,
      editedCell: editedCell
    }, media, actionType)
  }

  onChangeInput(rowData, columnName, media, actionType, currencySymbol, e) {
    const keys = {targetCPA: "targetCPA", minimumAdNumber: "minimumAdNumber"}
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.targetCPA: {
        const targetValue = e.target.value
        const valueWithCommas = targetValue.includes(currencySymbol) ? targetValue.slice(2, targetValue.length) : targetValue
        const updateValue = valueWithCommas.replace(",", "")
        return Number.isInteger(parseInt(updateValue)) && updateValue.length <= 6 || updateValue == ""
          ? this.props.updateCellData(rowData.adGroupId, {
            [keys[columnName]]: updateValue === "" ? updateValue : parseInt(updateValue),
            editedCell: rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
          }, media, actionType) : null
      }
      default: {
        const updateValue = e.target.value
        return Number.isInteger(parseInt(updateValue)) || updateValue == ""
          ? this.props.updateCellData(rowData.adGroupId, {
            [keys[columnName]]: updateValue === "" ? updateValue : parseInt(updateValue),
            editedCell: rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
          }, media, actionType) : null
      }
    }
  }

  getNumberAndMaxLength(columnName) {
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
        return {
          number: "targetCPA",
          maxLength: 9
        }
    }
  }

  renderHeaderWithTooltip(columnName, isRequired) {
    return <HeaderWithTooltip columnName={columnName} isRequired={isRequired}/>
  }

  renderPasteButton(columnName, isRequired, idsAfterFilter) {
    return <PasteBtnComponent idsAfterFilter={idsAfterFilter}/>
  }

  renderModifyCell(rowData, columnName, additionalFunctions, currencySymbol, media) {
    const mappingInfo = stdRuleConstant.mappingColToComparable[media].mappingInfo
    return <CopyCheckCancelBtns identifier={rowData[mappingInfo.field]} rowData={rowData} mappingInfo={mappingInfo}/>
  }

  render() {
    const {currency, conversionType, media, actionType} = this.props

    return (
      this.props.tableData.length < 1 ? <div className="error">{translation.t('no_structure_was_found')}</div> :
        (<div>
          <label className="text-required">
            <span className="symbol-require">*</span>&ensp;
            <span>{translation.t('textRequired')}</span>
          </label>
          <div className="row">
            <div className="col-md-4 search-box">
              <SearchBox/>
            </div>
            <div className="col-md-8">
              <label className="text-warning-info">
                <span>{translation.t('textErrorRowInfo')}</span>
              </label>
            </div>
          </div>
          <TableComponent data={getTableDataWithFilter(this.props.searchText, this.props.tableData)}
                        name={'p4l-std-rule'}
                        columns={this.renColumns()}
                        colGroups={this.state.colGroups}
                        media={media}
                        actionType={actionType}
                        currency={currency}
                        reportPeriod={this.props.reportPeriod}
                        conversionType={conversionType}/>
        </div>)
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tableData: state.stdRule.tableData,
    reportPeriod: state.stdRule.reportPeriod,
    searchText: state.stdRule.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCellData: updateCellData,
    updateTableData: updateTableData,
    updateSearchText: updateSearchText
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4LStdRuleSettingTable)
