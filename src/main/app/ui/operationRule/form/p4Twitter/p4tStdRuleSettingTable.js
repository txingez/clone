import React from "react";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import translation from "../../../../util/translation";
import TableComponent from "../../../parts/table/tableComponent";
import stdRule from "../../../../constants/standardRule";
import {changeReportPeriod, updateCellData, updateTableByReportPeriod, updateTableData} from "../stdRuleAction";
import {showErrorMsg} from "../../../notification/notificationAction";
import PasteBtnComponent from "../../../parts/table/copyPaste/pasteBtnComponent";
import CopyCheckCancelBtns from "../../../parts/table/copyPaste/copyCheckCancelBtns";
import ReportPeriodComponent from "../../../parts/table/reportPeriod/ReportPeriodComponent";
import stdRuleConstant from "../stdRuleConstant";
import SearchBox from "../../../parts/searchBox/searchBox";
import {getTableDataWithFilter} from "../stdRuleUtils"

class P4TStdRuleSettingTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.renderHeaderWithTooltip = this.renderHeaderWithTooltip.bind(this)
    this.generateColumns = this.generateColumns.bind(this)
    this.addCommas = this.addCommas.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.checkIsEdited = this.checkIsEdited.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.renderInput = this.renderInput.bind(this)
    this.state = {
      colGroups: [
        {
          renderSpan: this.renderReportColGroup,
          colSpan: 3
        },
        {
          header: translation.t('p4TStdRuleSettingTable.setting_col_title'),
          colSpan: 7
        }
      ]
    }
  }

  generateColumns(media, actionType) {
    let isShowMaxBidAndMinBid = actionType === stdRuleConstant.ACTIONS[media].STD_ADFMT_BID.NAME

    return [
      {
        header: translation.t('p4TStdRuleSettingTable.ad_group_name'),
        name: stdRule.COLUMN_NAME.reportCols.adGroupName,
        render: true,
        sorting: true
      },
      {
        header: translation.t('p4TStdRuleSettingTable.cost'),
        name: stdRule.COLUMN_NAME.reportCols.cost,
        render: true,
        sorting: true,
        showCurrency: true
      },
      {
        header: translation.t('p4TStdRuleSettingTable.cpa'),
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
          onChangeSelect: this.onChangeSelect,
          checkIsEdited: this.checkIsEdited
        }
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.targetCPA,
        render: true,
        require: true,
        renderData: this.renderInput,
        additionalFunctions: {
          addCommas: this.addCommas,
          onChangeInput: this.onChangeInput,
          checkIsEdited: this.checkIsEdited
        }
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.minimumAdNumber,
        render: !isShowMaxBidAndMinBid,
        require: true,
        renderData: this.renderInput,
        additionalFunctions: {
          onChangeInput: this.onChangeInput,
          checkIsEdited: this.checkIsEdited
        }
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.maxBid,
        render: isShowMaxBidAndMinBid,
        renderData: this.renderInput,
        additionalFunctions: {
          addCommas: this.addCommas,
          onChangeInput: this.onChangeInput,
          checkIsEdited: this.checkIsEdited,
          onBlur: this.onBlur
        }
      },
      {
        renderHeader: this.renderHeaderWithTooltip,
        name: stdRule.COLUMN_NAME.settingItems.minBid,
        render: isShowMaxBidAndMinBid,
        renderData: this.renderInput,
        additionalFunctions: {
          addCommas: this.addCommas,
          onChangeInput: this.onChangeInput,
          checkIsEdited: this.checkIsEdited,
          onBlur: this.onBlur
        }
      },
      {
        renderHeader: this.renderPasteButton,
        name: stdRule.COLUMN_NAME.modify,
        renderData: this.renderModifyCell,
        render: true
      }
    ]
  }

  checkIsEdited(rowData, columnName) {
    return rowData.editedCell && rowData.editedCell.includes(columnName)
  }

  renderReportColGroup(reportPeriod) {
    return (<ReportPeriodComponent reportPeriod={reportPeriod}
                                   reportColName={translation.t('p4TStdRuleSettingTable.report_col_title')}/>)
  }

  renderHeaderWithTooltip(columnName, isRequired) {
    const header = this.getTextHeaderWithTooltip(columnName)
    return (
      <div className="header-tooltip">{header.headerText}
        {isRequired ? <span className="symbol-require">*</span> : null}
        <span className={`header-tooltip-text ${columnName}-tooltip-text`}>{header.tooltipText}</span>
      </div>
    )
  }

  getTextHeaderWithTooltip(columnName) {
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.referencePeriod:
        return {
          headerText: translation.t('p4TStdRuleSettingTable.reference_period'),
          tooltipText: translation.t("p4TStdRuleSettingTable.reference_period_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.referenceDay:
        return {
          headerText: translation.t('p4TStdRuleSettingTable.reference_day'),
          tooltipText: translation.t("p4TStdRuleSettingTable.reference_day_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
        return {
          headerText: translation.t('p4TStdRuleSettingTable.target_cpa'),
          tooltipText: translation.t("p4TStdRuleSettingTable.target_cpa_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.minimumAdNumber:
        return {
          headerText: translation.t('p4TStdRuleSettingTable.minimum_ad_number'),
          tooltipText: translation.t("p4TStdRuleSettingTable.minimum_ad_number_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.maxBid:
        return {
          headerText: translation.t('p4TStdRuleSettingTable.max_bid'),
          tooltipText: translation.t("p4TStdRuleSettingTable.max_bid_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.minBid:
        return {
          headerText: translation.t('p4TStdRuleSettingTable.min_bid'),
          tooltipText: translation.t("p4TStdRuleSettingTable.min_bid_tooltip_text")
        }
    }
  }

  renderReferencePeriod(rowData) {
    let TIME_RANGE = 7
    const key = "reports_" + TIME_RANGE + "DAY"
    const reports = JSON.parse(localStorage.getItem("reports"))[key]
    let report
    reports !== undefined
      ? report = reports.find(report => report.adGroupId === rowData.adGroupId)
      : (<span>{translation.t('stdRuleSettingTable.notSetText')}</span>)
    if (rowData.referenceDay !== undefined && rowData.targetCPA !== undefined
      && rowData.referenceDay !== "" && rowData.targetCPA !== "" && report !== undefined) {
      const referenceDayNumVal = stdRule.REFERENCE_DAY.find(obj => rowData.referenceDay === obj.value).numberValue
      let value = referenceDayNumVal / (rowData.cost / TIME_RANGE / rowData.targetCPA / report.tweetIdAvg)
      value = value < 3 ? 3 : value > 30 ? 30 : value
      return (
        <span>{Math.round(value)}</span>
      )
    } else {
      return (<span>{translation.t('stdRuleSettingTable.notSetText')}</span>)
    }
  }

  renderReferenceDay(rowData, index, columnName, additionalFunctions) {
    const isEdited = additionalFunctions.checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (
      <select onChange={additionalFunctions.onChangeSelect.bind(this, rowData, columnName)}
              className={nameOfClass}>
        {stdRule.REFERENCE_DAY.map(option => {
          const referenceDay = rowData.referenceDay === undefined ? "" : rowData.referenceDay
          return (<option value={option.value} selected={option.value === referenceDay}>{option.text}</option>)
        })}
      </select>
    )
  }

  onChangeSelect(rowData, columnName, e) {
    const editedCell = rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
    this.props.updateCellData(rowData.adGroupId, {
      referenceDay: e.target.value,
      editedCell: editedCell
    }, this.props.selectedAccount.media, this.props.actionType)
  }

  onChangeInput(rowData, columnName, currencySymbol, e) {
    const keys = {targetCPA: "targetCPA", maxBid: "maxBid", minBid: "minBid", minimumAdNumber: "minimumAdNumber"}
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
      case stdRule.COLUMN_NAME.settingItems.maxBid:
      case stdRule.COLUMN_NAME.settingItems.minBid: {
        const targetValue = e.target.value
        const valueWithCommas = targetValue.includes(currencySymbol) ? targetValue.slice(2, targetValue.length) : targetValue
        const updateValue = valueWithCommas.replace(",", "")
        return Number.isInteger(parseInt(updateValue)) && updateValue.length <= 6 || updateValue == ""
          ? this.props.updateCellData(rowData.adGroupId, {
            [keys[columnName]]: updateValue === "" ? updateValue : parseInt(updateValue),
            editedCell: rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
          }, this.props.selectedAccount.media, this.props.actionType) : null
      }
      default: {
        const updateValue = e.target.value
        return Number.isInteger(parseInt(updateValue)) || updateValue == ""
          ? this.props.updateCellData(rowData.adGroupId, {
            [keys[columnName]]: updateValue === "" ? updateValue : parseInt(updateValue),
            editedCell: rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
          }, this.props.selectedAccount.media, this.props.actionType) : null
      }
    }
  }

  onBlur(rowData, columnName, currencySymbol, e) {
    const targetValue = e.target.value
    const valueWithCommas = targetValue.includes(currencySymbol) ? targetValue.slice(2, targetValue.length) : targetValue
    const inputValue = valueWithCommas.replace(",", "")
    const media = this.props.selectedAccount.media
    const actionType = this.props.actionType

    let updateValue
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.minBid: {
        updateValue = (rowData.maxBid === undefined || rowData.maxBid === "")
          ? inputValue
          : (parseInt(inputValue) <= rowData.maxBid) ? inputValue : ""
        this.props.updateCellData(rowData.adGroupId,
          {minBid: updateValue === "" ? "" : parseInt(updateValue)}, media, actionType)
        break
      }
      case stdRule.COLUMN_NAME.settingItems.maxBid: {
        updateValue = (rowData.minBid === undefined || rowData.minBid === "")
          ? inputValue
          : (parseInt(inputValue) >= rowData.minBid) ? inputValue : ""
        this.props.updateCellData(rowData.adGroupId,
          {maxBid: updateValue === "" ? "" : parseInt(updateValue)}, media, actionType)
        break
      }
    }

    if (parseInt(inputValue) > rowData.maxBid || parseInt(inputValue) < rowData.minBid) {
      this.props.showErrorMsg(translation.t('upperMinimumLimitWarning'))
    }
  }

  addCommas(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  renderInput(rowData, index, columnName, additionalFunctions, currencySymbol, media, actionType) {
    const numberAndLength = this.getNumberAndMaxLength(columnName)
    const number = rowData[numberAndLength.number]
    const maxLength = numberAndLength.maxLength
    const value = (number !== undefined)
      ? (number.toString().length > 0) ? number.toLocaleString() : ""
      : ""
    const isEdited = additionalFunctions.checkIsEdited(rowData, columnName)
    const symbol = columnName === stdRule.COLUMN_NAME.settingItems.minimumAdNumber ? "本" : currencySymbol
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (<span><input type="text"
                         className={nameOfClass}
                         value={columnName !== stdRule.COLUMN_NAME.settingItems.minimumAdNumber
                           ? value !== ""
                             ? currencySymbol + " " + additionalFunctions.addCommas(value)
                             : additionalFunctions.addCommas(value)
                           : value}
                         maxLength={maxLength}
                         placeholder={translation.t('stdRuleSettingTable.notSetText')}
                         onChange={additionalFunctions.onChangeInput.bind(this, rowData, columnName, currencySymbol)}
                         onBlur={(columnName === stdRule.COLUMN_NAME.settingItems.minBid || columnName === stdRule.COLUMN_NAME.settingItems.maxBid)
                           ? additionalFunctions.onBlur.bind(this, rowData, columnName, currencySymbol) : null}
    /> {columnName === stdRule.COLUMN_NAME.settingItems.minimumAdNumber ? value !== "" ? symbol : null : null}</span>)
  }

  getNumberAndMaxLength(columnName) {
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
        return {
          number: "targetCPA",
          maxLength: 9
        }
      case stdRule.COLUMN_NAME.settingItems.minimumAdNumber:
        return {
          number: "minimumAdNumber",
          maxLength: 1
        }
      case stdRule.COLUMN_NAME.settingItems.maxBid:
        return {
          number: "maxBid",
          maxLength: 9
        }
      case stdRule.COLUMN_NAME.settingItems.minBid:
        return {
          number: "minBid",
          maxLength: 9
        }
    }
  }

  renderPasteButton(columnName, isRequired, idsAfterFilter) {
    return <PasteBtnComponent idsAfterFilter={idsAfterFilter}/>
  }

  renderModifyCell(rowData) {
    const mappingInfo = stdRuleConstant.mappingColToComparable.TWITTER.mappingInfo
    return <CopyCheckCancelBtns identifier={rowData[mappingInfo.field]} rowData={rowData} mappingInfo={mappingInfo}/>
  }

  render() {
    const {currency} = this.props
    const actionType = this.props.actionType.value
    const media = this.props.selectedAccount.media

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
                          name={'p4t-std-rule'}
                          columns={this.generateColumns(media, actionType)}
                          colGroups={this.state.colGroups}
                          currency={currency}
                          reportPeriod={this.props.reportPeriod}
                          media={media}/>
        </div>)
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tableData: state.stdRule.tableData,
    actionType: state.stdRule.actionType,
    reportPeriod: state.stdRule.reportPeriod,
    selectedAccount: state.account.selectedAccount,
    searchText: state.stdRule.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCellData: updateCellData,
    showErrorMsg: showErrorMsg,
    updateTableByReportPeriod: updateTableByReportPeriod,
    updateTableData: updateTableData,
    changeReportPeriod: changeReportPeriod
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4TStdRuleSettingTable)
