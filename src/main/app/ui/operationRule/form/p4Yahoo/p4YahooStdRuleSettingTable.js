import React from "react";
import operationRuleConstant from '../../../../constants/operationRule'
import translation from '../../../../util/translation'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {resetEditedCell, updateEditedCell, updateReportPeriod, updateSettingRule, refreshSettingRule} from "./p4YahooStdRuleAction";
import stdRule from "../../../../constants/standardRule";
import ReactTooltip from "react-tooltip";
import {showErrorMsg} from '../../../notification/notificationAction'
import {isNumberType} from '../operationRuleUtil'
import {validateData} from './p4YahooStdRuleUtil'
import {updateDataCopied, updateRowCopied, updateArrToPaste, resetCopyPaste} from '../stdRuleAction'
import CurrencyUtil from "../../../../util/currency";
import SearchBox from "../../../parts/searchBox/searchBox";

class P4YahooStdRuleSettingTable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      sortBy: "",
      sortType: ""
    }
  }

  genReportHeader(action) {
    const col = operationRuleConstant.YAHOO_STD_RULE_SETTING_TABLE_COLUMNS.filter(value => {
      return operationRuleConstant.YAHOO_FIXED_COLUMNS.includes(value.key)
    })
    if(operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType)) {
        return (col.map(
          value => {
            switch (value.key) {
              case stdRule.COLUMN_NAME.AD_GROUP_NAME:
                return (<th className="adGroupNameCol">
                  <div className="title-wrapper">
                    <span>{value.name}</span>
                    {this.genSortBtn(value.key)}
                  </div>
                </th>)
              case stdRule.COLUMN_NAME.COST:
              case stdRule.COLUMN_NAME.CPA:
                return (<th className="fixedCol">
                  <div className="title-wrapper">
                    <span>{value.name}</span>
                    {this.genSortBtn(value.key)}
                  </div>
                </th>)
              case stdRule.COLUMN_NAME.REFERENCE_PERIOD:
                return <th width="5%">{value.name}</th>
              case stdRule.COLUMN_NAME.REFERENCE_DAY:
                return <th className="fixedCol" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.reference_day_tooltip_text')}>
                  {value.name}
                  <span className="symbol-require">*</span>
                  <ReactTooltip delayHide={100} effect="solid"/>
                </th>
              case stdRule.COLUMN_NAME.TARGET_CPA:
                return <th className="fixedCol" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.target_cpa_tooltip_text')}>
                  {value.name}
                  <span className="symbol-require">*</span>
                  <ReactTooltip delayHide={100} effect="solid"/>
                </th>
            }
          }
        ))
    } else {
      return (
        col.map(value => {
          switch (value.key) {
            case stdRule.COLUMN_NAME.AD_GROUP_NAME:
              return (<th class="adGroupNameCol">
                <div className="title-wrapper">
                  <span>{value.name}</span>
                  {this.genSortBtn(value.key)}
                </div>
              </th>)
            case stdRule.COLUMN_NAME.COST:
            case stdRule.COLUMN_NAME.CPA:
              return (<th className="fixedCol">
                <div className="title-wrapper">
                  <span>{value.name}</span>
                  {this.genSortBtn(value.key)}
                </div>
              </th>)
            case stdRule.COLUMN_NAME.REFERENCE_PERIOD:
              return <th className="fixedCol">{value.name}</th>
            case stdRule.COLUMN_NAME.REFERENCE_DAY:
              return <th className="fixedCol" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.reference_day_tooltip_text')}>
                {value.name}
                <span className="symbol-require">*</span>
                <ReactTooltip delayHide={100} effect="solid"/>
              </th>
            case stdRule.COLUMN_NAME.TARGET_CPA:
              return <th className="fixedCol" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.target_cpa_tooltip_text')}>
                {value.name}
                <span className="symbol-require">*</span>
                <ReactTooltip delayHide={100} effect="solid"/>
              </th>
          }
        })
      )
    }
  }

  genSortBtn(columnKey) {
    return (
      <div className="sort-buttons">
        <button type="button" className="btn-sort-top"
                onClick={e => this.setState({sortBy: columnKey, sortType: stdRule.SORT_TYPE.ASC})}>
          <span className="glyphicon glyphicon-triangle-top"></span>
        </button>
        <button type="button" className="btn-sort-bottom"
                onClick={e => this.setState({sortBy: columnKey, sortType: stdRule.SORT_TYPE.DESC})}>
          <span className="glyphicon glyphicon-triangle-bottom"></span>
        </button>
      </div>
    )
  }

  genSettingHeader(action) {
    if (operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType)) {
      const columns = operationRuleConstant.YAHOO_STD_RULE_SETTING_TABLE_COLUMNS.filter(value => {
        return operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT_COLUMNS.includes(value.key)
      })
      return (
        columns.map(value => {
          switch (value.key) {
            case stdRule.COLUMN_NAME.UPPER_LIMIT:
              return <th width ="10%" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.upper_limit_tooltip_text')}>
                {value.name}
                <ReactTooltip delayHide={100} effect="solid"/>
              </th>
            case stdRule.COLUMN_NAME.MINIMUM_LIMIT:
              return <th width ="10%" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.minimum_limit_tooltip_text')}>
                {value.name}
                <ReactTooltip delayHide={100} effect="solid"/>
              </th>
          }
        })
      )
    }
    const columns = operationRuleConstant.YAHOO_STD_RULE_SETTING_TABLE_COLUMNS.filter(value => {
      return operationRuleConstant.YAHOO_AD_ON_OFF_COLUMNS.includes(value.key)
    })
    return (
      columns.map(value => {
        return <th width ="15%" data-place="top" data-tip={translation.t('p4YahooStdRuleSettingTable.minimum_limit_cpc_tooltip_text')}>
          {value.name}
          <span className="symbol-require">*</span>
          <ReactTooltip delayHide={100} effect="solid"/>
        </th>
      })
    )
  }

  genSelect(adGroupId, data, isEdited, backgroundClass) {
    const componentId = adGroupId + ":REFERENCE_DAY"
    if (isEdited) {
      return (<select class= {"referenceDayEdited" + " " + backgroundClass} id={componentId} onChange={this.onChangeSelect.bind(this)}>
        {operationRuleConstant.YAHOO_REFERENCE_DAY.map(op => {
            return this.genOptionSelected(op, op.value === data)
          }
        )
        }
      </select>)
    }
    return (<select class= {"referenceDay"+ " " + backgroundClass} id={componentId} onChange={this.onChangeSelect.bind(this)}>
      {operationRuleConstant.YAHOO_REFERENCE_DAY.map(op => {
          return this.genOptionSelected(op, op.value === data)
        }
      )
      }
    </select>)
  }

  genTextBox = (colName, adGroupId, number, isEdited, backgroundClass, maxLen, currencySymbol) => {
    let value
    if (number !== undefined) {
      number.toString().length > 0 ? value = number.toLocaleString() : value = ""
    } else {
      value = ""
    }
    let isShowCurrency = !(colName === stdRule.COLUMN_NAME.MINIMUM_LIMIT_CPC || value === "")
    const componentId = adGroupId + ":" + colName
    return (<span><input class={isEdited ? "inputTextEdited " + backgroundClass : "inputText " + backgroundClass}
                         id={componentId}
                         type="text"
                         value={isShowCurrency ? currencySymbol + " " + value : value}
                         maxLength={maxLen}
                         placeholder={translation.t('stdRuleSettingTable.notSetText')}
                         onChange={this.onChangeTextBox.bind(this, currencySymbol)}
                         onBlur = {this.outFocusTextBox.bind(this, currencySymbol)}
    /></span>)

  }

  genOptionSelected(data, isSelected) {
    if (isSelected) {
      return (<option value={data.value} selected>{data.text}</option>)
    } else {
      return (<option value={data.value}>{data.text}</option>)
    }
  }

  getRowData(action, reports, reportPeriod, settingRules, editedCell) {
    const reportData = reports.find(report => {
      return report.reportPeriod === this.props.reportPeriod
    })
    const rowData = reportData !== undefined ? reportData.reportParameters.map(report => {
      const settingRowData = settingRules.find(rule => {
        return rule.adGroupId === report.adGroupId
      })
      const data = settingRowData === undefined ? {
        adGroupId: report.adGroupId,
        adGroupName: report.adGroupName,
        cost: typeof report.cost === "number" ? Math.round(report.cost) : "",
        cpa: typeof report.cpa === "number" ? Math.round(report.cpa) : "",
        referencePeriod: "未設定",
        referenceDay: "notSet",
        targetCPA: "",
        upperLimit: "",
        minimumLimit: "",
        minimumLimitCPC: ""
      } : {
        adGroupId: report.adGroupId,
        adGroupName: report.adGroupName,
        cost: typeof report.cost === "number" ? Math.round(report.cost) : "",
        cpa: typeof report.cpa === "number" ? Math.round(report.cpa) : "",
        referencePeriod: this.getReferencePeriod(report.adGroupId, settingRowData.referenceDay, settingRowData.targetCPA),
        referenceDay: settingRowData.referenceDay === undefined ? "notSet" : settingRowData.referenceDay,
        targetCPA: settingRowData.targetCPA,
        upperLimit: settingRowData.upperLimit,
        minimumLimit: settingRowData.minimumLimit,
        minimumLimitCPC: settingRowData.minimumLimit
      }
      return data
    }) : []

    const tableData = this.props.searchText !== ""
      ? rowData.filter(row => {return row.adGroupName.toLowerCase().includes(this.props.searchText.toLowerCase())})
      : rowData
    return this.sortRowData(tableData, editedCell, action)
  }

  sortRowData(tableData, editedCell, action) {
    switch (this.state.sortBy) {
      case stdRule.COLUMN_NAME.COST:
      case stdRule.COLUMN_NAME.CPA:
        return this.genRowData(
          tableData.sort((a, b) => {
            let sortValueA = this.getSortValueByColumn(this.state.sortBy, a)
            let sortValueB = this.getSortValueByColumn(this.state.sortBy, b)
            return (this.state.sortType === stdRule.SORT_TYPE.ASC) ?  sortValueA - sortValueB : sortValueB - sortValueA
          }),
          editedCell,
          action
        )
        break;
      case stdRule.COLUMN_NAME.AD_GROUP_NAME:
        if (this.state.sortType === stdRule.SORT_TYPE.ASC) {
          return this.genRowData(tableData.sort((a, b) => a.adGroupName.localeCompare(b.adGroupName, 'ja')), editedCell, action)
        } else {
          return this.genRowData(tableData.sort((a, b) => a.adGroupName.localeCompare(b.adGroupName, 'ja')).reverse(), editedCell, action)
        }
        break;
      default:
        return this.genRowData(tableData, editedCell, action)
    }
  }

  getSortValueByColumn(columnKey, row) {
    switch (this.state.sortBy) {
      case stdRule.COLUMN_NAME.COST:
        return row.cost
      case stdRule.COLUMN_NAME.CPA:
        return row.cpa
    }
  }

  genRowData(tableData, editedCell, action) {
    const defaultEditedCell = {
      row: -1,
      cols: []
    }
    const defaultMaxLen = 9
    const oneMaxLen = 1
    const currency = this.props.selectedAccount ? this.props.selectedAccount.currency : "JPY"
    const currencySymbol = CurrencyUtil.getSymbolByCode(currency)
    return (
      tableData.map((value, index) => {
        const rowEditedInfo = editedCell.find(obj => {
          return obj.rowIndex === value.adGroupId;
        })
        const rowInfo = rowEditedInfo === undefined ? defaultEditedCell : rowEditedInfo
        const isValidate = validateData(action, value)
        const backgroundClass = isValidate ? "noErrorClass" : "errorClass"
        if (operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType)){
          return (
            <tr className = {backgroundClass}>
              <td className="adGroupNameCol" align="left">{value.adGroupName}</td>
              <td className="fixedCol"
                  align="right">{value.cost.toString().length > 0 ? currencySymbol + " " + value.cost.toLocaleString() : ""}</td>
              <td className="fixedCol"
                  align="right">{value.cpa.toString().length > 0 ? currencySymbol + " " + value.cpa.toLocaleString() : ""}</td>
              <td align="right" width="5%">{value.referencePeriod}</td>
              <td width="10%" align="left">
                {this.genSelect(
                  value.adGroupId,
                  value.referenceDay,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.REFERENCE_DAY),
                  backgroundClass
                )}
              </td>
              <td className="fixedCol" align="right">
                {this.genTextBox(
                  stdRule.COLUMN_NAME.TARGET_CPA,
                  value.adGroupId,
                  value.targetCPA,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.TARGET_CPA),
                  backgroundClass,
                  defaultMaxLen,
                  currencySymbol
                )}
              </td>
              <td className="fixedCol" align="right">
                {this.genTextBox(
                  stdRule.COLUMN_NAME.UPPER_LIMIT,
                  value.adGroupId,
                  value.upperLimit,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.UPPER_LIMIT),
                  backgroundClass,
                  defaultMaxLen,
                  currencySymbol
                )}
              </td>
              <td align="right" width="10%">
                {this.genTextBox(
                  stdRule.COLUMN_NAME.MINIMUM_LIMIT,
                  value.adGroupId,
                  value.minimumLimit,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.MINIMUM_LIMIT),
                  backgroundClass,
                  defaultMaxLen,
                  currencySymbol
                )}
              </td>
              <td align="center" width="5%">
                {this.genModifyCell(
                  value.adGroupId
                )}
              </td>
            </tr>
          )
        } else {
          return (
            <tr className = {backgroundClass}>
              <td className="adGroupNameCol" align="left">{value.adGroupName}</td>
              <td className="fixedCol"
                  align="right">{value.cost.toString().length > 0 ? currencySymbol + " " + value.cost.toLocaleString() : ""}</td>
              <td className="fixedCol"
                  align="right">{value.cpa.toString().length > 0 ? currencySymbol + " " + value.cpa.toLocaleString() : ""}</td>
              <td className="fixedCol" align="right">{value.referencePeriod}</td>
              <td className="fixedCol" align="left">
                {this.genSelect(
                  value.adGroupId,
                  value.referenceDay,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.REFERENCE_DAY),
                  backgroundClass
                )}
              </td>
              <td className="fixedCol" align="right">
                {this.genTextBox(
                  stdRule.COLUMN_NAME.TARGET_CPA,
                  value.adGroupId,
                  value.targetCPA,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.TARGET_CPA),
                  backgroundClass,
                  defaultMaxLen,
                  currencySymbol
                )}
              </td>
              <td align="right" width="15%">
                {this.genTextBox(
                  stdRule.COLUMN_NAME.MINIMUM_LIMIT_CPC,
                  value.adGroupId,
                  value.minimumLimit,
                  rowInfo.cols.includes(stdRule.COLUMN_NUMBER.P4Y.MINIMUM_LIMIT_CPC),
                  backgroundClass,
                  oneMaxLen,
                  currencySymbol
                )}
              </td>
              <td align="center" width="5%">
                {this.genModifyCell(
                  value.adGroupId
                )}
              </td>
            </tr>
          )
        }

      })
    )
  }


  genModifyCell(adGroupId) {
    const rowCopied = this.props.rowCopied
    if (rowCopied.isCopied == false) {
      return <button type="button" onClick={e => this.copyData(adGroupId)} className="copy-tooltip">
        <span className="text-button">{translation.t("stdRuleSettingTable.copy")}
          <span className="copy-tooltip-text">{translation.t("stdRuleSettingTable.copy_tooltip_text")}</span>
        </span>
      </button>
    } else if (adGroupId === rowCopied.identifier) {
      return <button type="button" onClick={e => this.refreshCopyPaste()} id="cancel-cp">
        <span className="glyphicon glyphicon-remove-circle cancel-icon"></span>
      </button>
    } else {
      return (
        <label className="checkbox-container checkbox-tooltip">
          <input type="checkbox" onClick={e => this.getRowToEdit(adGroupId)}
                 checked={this.props.arrayRowToPaste.includes(adGroupId)}/>
          <span className="checkmark">
            <span className="checkbox-tooltip-text">{translation.t("stdRuleSettingTable.checkbox_tooltip_text")}</span>
          </span>
        </label>
      )}
  }

  copyData(adGroupId) {
    const ruleCopied = this.props.settingRules.find((setting) => {return setting.adGroupId === adGroupId})
    const newRowCopied = {
      identifier: adGroupId,
      isCopied: true
    }
    if (ruleCopied != undefined) {
      this.props.updateRowCopied(newRowCopied)
      this.props.updateDataCopied(ruleCopied)
    }
  }

  refreshCopyPaste() {
    this.props.resetCopyPaste()
  }

  getRowToEdit(adGroupId) {
    this.props.updateArrToPaste(adGroupId)
  }

  pasteToRow(action) {
    let updateSettingRules = JSON.parse(JSON.stringify([...this.props.settingRules]))
    let editedCell = []
    this.props.arrayRowToPaste.forEach(adGroupId => {
      let pasteRule = updateSettingRules.find((rule) => {
        return rule.adGroupId === adGroupId
      })
      if (operationRuleConstant.YAHOO_AD_BID_ADJUSTMENT.includes(action.actionType)) {
        if (pasteRule != undefined) {
          pasteRule.referenceDay = this.props.dataCopied.referenceDay
          pasteRule.targetCPA = this.props.dataCopied.targetCPA
          pasteRule.upperLimit = this.props.dataCopied.upperLimit
          pasteRule.minimumLimit = this.props.dataCopied.minimumLimit
        } else {
          updateSettingRules.push({
            adGroupId: adGroupId,
            referenceDay: this.props.dataCopied.referenceDay,
            targetCPA: this.props.dataCopied.targetCPA,
            upperLimit: this.props.dataCopied.upperLimit,
            minimumLimit: this.props.dataCopied.minimumLimit
          })
        }
        editedCell.push({
          rowIndex: parseInt(adGroupId, 10), cols: [
            stdRule.COLUMN_NUMBER.P4Y.TARGET_CPA,
            stdRule.COLUMN_NUMBER.P4Y.REFERENCE_DAY,
            stdRule.COLUMN_NUMBER.P4Y.UPPER_LIMIT,
            stdRule.COLUMN_NUMBER.P4Y.MINIMUM_LIMIT
          ]
        })
      } else {
        if (pasteRule != undefined) {
          pasteRule.referenceDay = this.props.dataCopied.referenceDay
          pasteRule.targetCPA = this.props.dataCopied.targetCPA
          pasteRule.minimumLimit = this.props.dataCopied.minimumLimit
        } else {
          updateSettingRules.push({
            adGroupId: adGroupId,
            referenceDay: this.props.dataCopied.referenceDay,
            targetCPA: this.props.dataCopied.targetCPA,
            minimumLimit: this.props.dataCopied.minimumLimit
          })
        }
        editedCell.push({
          rowIndex: parseInt(adGroupId, 10), cols: [
            stdRule.COLUMN_NUMBER.P4Y.TARGET_CPA,
            stdRule.COLUMN_NUMBER.P4Y.REFERENCE_DAY,
            stdRule.COLUMN_NUMBER.P4Y.MINIMUM_LIMIT_CPC
          ]
        })
      }
    })
    this.props.updateEditedCell(editedCell, this.props.editedCell)
    this.props.refreshSettingRule(updateSettingRules)
    this.refreshCopyPaste()
  }

  onChangeSelect(evt) {
    const cellInfo = this.getCellInfo(evt.target.id)
    this.props.updateEditedCell([cellInfo], this.props.editedCell)
    let targetCPA = document.getElementById(cellInfo.adGroupId + ":TARGET_CPA").value
    let referencePeriod = this.getReferencePeriod(cellInfo.adGroupId, evt.target.value, targetCPA)

    let updateData = [
      {field: cellInfo.field, value: evt.target.value},
      {field: "REFERENCE_PERIOD", value: referencePeriod}
    ]
    this.props.updateSettingRule(cellInfo.adGroupId, updateData, this.props.settingRules)
  }

  onChangeTextBox(currencySymbol, evt) {
    const targetValue = evt.target.value
    const sliceValue = targetValue.includes(currencySymbol) ? targetValue.slice(2, targetValue.length) : targetValue
    let updatedValue = sliceValue.replace(',', '')
    if (/^\+?(0|[0-9]\d*)$/.test(updatedValue) || updatedValue.length === 0) {
      if (updatedValue !== evt.target.defaultValue.replace(',', '')) {
        const cellInfo = this.getCellInfo(evt.target.id)
        this.props.updateEditedCell([cellInfo], this.props.editedCell)
        let updateData
        updatedValue.length !== 0 ? updateData = [{field: cellInfo.field, value: parseInt(updatedValue, 10)}] :
          updateData = [{field: cellInfo.field, value: ''}]
        if (cellInfo.field === "TARGET_CPA") {
          let referenceDay = document.getElementById(cellInfo.adGroupId + ":REFERENCE_DAY").value
          let referencePeriod = this.getReferencePeriod(cellInfo.adGroupId, referenceDay, updatedValue)
          updateData.push(
            {field: "REFERENCE_PERIOD", value: referencePeriod}
          )
        }
        this.props.updateSettingRule(cellInfo.adGroupId, updateData, this.props.settingRules)
      }
    } else {
      evt.target.value = evt.target.defaultValue;
      evt.preventDefault();
    }
  }

  validateUpperLimitAndMinimumLimit(adGroupId, value, isUpper) {
    let settingRule = this.props.settingRules.find(rule => {
      return rule.adGroupId === adGroupId
    })
    if(settingRule === undefined){
      return true
    } else {
      if(isUpper) {
        if(!isNumberType(settingRule.minimumLimit)) {
          return true
        }
        return (settingRule.minimumLimit <= value)
      } else {
        if(!isNumberType(settingRule.upperLimit)) {
          return true
        }
        return (settingRule.upperLimit >= value)
      }
    }
  }

  outFocusTextBox(currencySymbol, evt) {
    const targetValue = evt.target.value
    const sliceValue = targetValue.includes(currencySymbol) ? targetValue.slice(2, targetValue.length) : targetValue
    let updatedValue = sliceValue.replace(',', '')
    if (updatedValue.length > 0) {
      const cellInfo = this.getCellInfo(evt.target.id)
      let updateData = {field: cellInfo.field, value: parseInt(updatedValue, 10)}
      let cleanData = [{field: cellInfo.field, value: ''}]
      if(updateData.field === "UPPER_LIMIT"
        || updateData.field === "MINIMUM_LIMIT") {
        if(!this.validateUpperLimitAndMinimumLimit(
          parseInt(cellInfo.adGroupId, 10),
          updateData.value,
          updateData.field === "UPPER_LIMIT"
        )
        ) {
          this.props.updateSettingRule(cellInfo.adGroupId, cleanData, this.props.settingRules)
          this.props.showErrorMsg(translation.t('upperMinimumLimitWarning'))
        }
      }
    }
  }

  limitReferncePeriod(value) {
    if (value > 30) {
      return "30"
    } else if (value < 3) {
      return "3"
    } else
      return value.toString()
  }

  getReferencePeriod(adGroupId, referenceDay, targetCPA) {
    const adGroupIdNumber = parseInt(adGroupId, 10)
    const reportData = this.props.reports.find(report => {
      return report.periodReports === this.props.periodReports
    })
    const reportRow = reportData.reportParameters.find(row => {
      return row.adGroupId === adGroupIdNumber
    })
    if (reportRow.avg7daysAdId === undefined || reportRow.sum7daysCost === undefined
      || targetCPA === "" || targetCPA === undefined
    )
      return "未設定"
    let referencePeriodValue
    switch (referenceDay) {
      case "strong":
        referencePeriodValue = this.limitReferncePeriod(Math.round(10 * 7 * parseInt(targetCPA, 10) * reportRow.avg7daysAdId / reportRow.sum7daysCost))
        break;
      case "medium":
        referencePeriodValue = this.limitReferncePeriod(Math.round(6 * 7 * parseInt(targetCPA, 10) * reportRow.avg7daysAdId / reportRow.sum7daysCost))
        break;
      case "weak":
        referencePeriodValue = this.limitReferncePeriod(Math.round(3 * 7 * parseInt(targetCPA, 10) * reportRow.avg7daysAdId / reportRow.sum7daysCost))
        break;
      default:
        referencePeriodValue = "未設定"
    }
    return referencePeriodValue
  }

  getCellInfo(componentId) {
    const arrayComponents = componentId.split(":");
    var colIndex;
    switch (arrayComponents[1]) {
      case stdRule.COLUMN_NAME.TARGET_CPA:
        colIndex = stdRule.COLUMN_NUMBER.P4Y.TARGET_CPA;
        break;
      case stdRule.COLUMN_NAME.REFERENCE_DAY:
        colIndex = stdRule.COLUMN_NUMBER.P4Y.REFERENCE_DAY;
        break;
      case stdRule.COLUMN_NAME.UPPER_LIMIT:
        colIndex = stdRule.COLUMN_NUMBER.P4Y.UPPER_LIMIT;
        break;
      case stdRule.COLUMN_NAME.MINIMUM_LIMIT:
        colIndex = stdRule.COLUMN_NUMBER.P4Y.MINIMUM_LIMIT;
        break;
      case stdRule.COLUMN_NAME.MINIMUM_LIMIT_CPC:
        colIndex = stdRule.COLUMN_NUMBER.P4Y.MINIMUM_LIMIT_CPC;
        break;
      default:
        colIndex = 0;
    }
    const rowIndex = parseInt(arrayComponents[0], 10)
    return {
      adGroupId: parseInt(arrayComponents[0], 10),
      field: arrayComponents[1],
      rowIndex: rowIndex,
      cols: [colIndex]
    }
  }

  handleChangeReportPeriod(evt) {
    this.props.updateReportPeriod(evt.target.value)
  }

  genReportPeriodSelect() {
    return (
      <label className="sel-ref-period col-md-4">
        {translation.t('report_period.label')}
        <select className="" onChange={this.handleChangeReportPeriod.bind(this)}>
          {operationRuleConstant.REPORT_PERIOD_LIST.map((opt) => {
            if (opt.isDisabled == undefined || opt.isDisabled == false) {
              if (opt.value === this.props.reportPeriod) {
                return <option key={opt.value} value={opt.value} selected>{opt.text}</option>
              } else {
                return <option key={opt.value} value={opt.value}>{opt.text}</option>
              }
            }
          })
          }
        </select>
      </label>
    )
  }

  render() {
    const {action} = this.props
  return (
    this.props.reports.length < 1 ? <div className="error">{translation.t('no_report_was_found')}</div> : <div>
      <label  className="text-required">
        <span className="symbol-require">*</span>&ensp;
        <span>{translation.t('textRequired')}</span>
      </label>
      <div className="row">
        <div className="col-md-4 search-box">
          <SearchBox/>
        </div>
        <div className="col-md-8">
          <label  className="text-warning-info">
            <span>{translation.t('textErrorRowInfo')}</span>
          </label>
        </div>
      </div>
    <table className = "table-bounder">
      <thead border-bottom = "none">
      <tr>
        <th align = "center" className="row" width = "49.6%" >
          <span className="col-md-8 title-padding">{translation.t('p4YahooStdRuleSettingTable.report_col_title')}</span>
            {this.genReportPeriodSelect()}
        </th>
        <th align="center">{translation.t('p4YahooStdRuleSettingTable.setting_col_title')}</th>
      </tr>
      </thead>
      <tr>
        <td colSpan="2">
          <div className = "table-panel" id = "tablePanel">
            <table className="setting-table">
              <thead>
              <tr>
                {this.genReportHeader(action)}
                {this.genSettingHeader(action)}
                <th width="5%">
                  <button disabled={this.props.rowCopied.isCopied == false} type="button"
                  onClick={e => this.pasteToRow(action)} className="paste-tooltip">
                    <span className="text-button">{translation.t("stdRuleSettingTable.paste")}
                      <span className="paste-tooltip-text">{translation.t("stdRuleSettingTable.paste_tooltip_text")}</span>
                    </span>
                      </button>
                    </th>
                    <th className="padding-column"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.getRowData(action, this.props.reports, this.props.reportPeriod, this.props.settingRules, this.props.editedCell)}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    reports: state.p4YahooStdRule.reports,
    reportPeriod: state.p4YahooStdRule.reportPeriod,
    editedCell: state.p4YahooStdRule.editedCell,
    settingRules: state.p4YahooStdRule.settingRules,
    arrayRowToPaste: state.stdRule.arrayRowToPaste,
    rowCopied: state.stdRule.rowCopied,
    dataCopied: state.stdRule.dataCopied,
    selectedAccount: state.account.selectedAccount,
    searchText: state.stdRule.searchText
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    resetEditedCell: resetEditedCell,
    updateEditedCell: updateEditedCell,
    updateSettingRule: updateSettingRule,
    updateReportPeriod: updateReportPeriod,
    showErrorMsg: showErrorMsg,
    refreshSettingRule: refreshSettingRule,
    updateRowCopied: updateRowCopied,
    updateDataCopied: updateDataCopied,
    updateArrToPaste: updateArrToPaste,
    resetCopyPaste: resetCopyPaste
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(P4YahooStdRuleSettingTable)
