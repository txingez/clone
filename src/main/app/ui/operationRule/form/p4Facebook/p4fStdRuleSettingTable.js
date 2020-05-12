import React from 'react'
import TableComponent from "../../../parts/table/tableComponent";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import translation from "../../../../util/translation";
import stdRule from "../../../../constants/standardRule";
import operationRuleConstant from "../../../../constants/operationRule";
import {updateCellData} from '../stdRuleAction'
import PasteBtnComponent from "../../../parts/table/copyPaste/pasteBtnComponent";
import CopyCheckCancelBtns from "../../../parts/table/copyPaste/copyCheckCancelBtns";
import stdRuleConstant from "../stdRuleConstant";

class P4FStdRuleSettingTable extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.renderHeaderWithTooltip = this.renderHeaderWithTooltip.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.onBlurInput = this.onBlurInput.bind(this)
    this.addCommas = this.addCommas.bind(this)
    this.onChangeSelect = this.onChangeSelect.bind(this)
    this.checkIsEdited = this.checkIsEdited.bind(this)
    this.state = {
      columns: [
        {
          header: translation.t('p4FStdRuleSettingTable.campaign_name'),
          name: stdRule.COLUMN_NAME.structureCols.campaignName,
          sorting: true,
          render: true
        },
        {
          header: translation.t('p4FStdRuleSettingTable.ad_set_id'),
          name: stdRule.COLUMN_NAME.structureCols.adSetId,
          sorting: true,
          render: true
        },
        {
          header: translation.t('p4FStdRuleSettingTable.ad_set_name'),
          name: stdRule.COLUMN_NAME.structureCols.adSetName,
          sorting: true,
          render: true
        },
        {
          renderHeader: this.renderHeaderWithTooltip,
          name: stdRule.COLUMN_NAME.settingItems.isConversion,
          renderData: this.renderDataAdOffIsConversion,
          render: true,
          require: true,
          additionalFunctions: {
            onChangeSelect: this.onChangeSelect,
            checkIsEdited: this.checkIsEdited
          }
        },
        {
          renderHeader: this.renderHeaderWithTooltip,
          name: stdRule.COLUMN_NAME.settingItems.referenceDay,
          render: true,
          renderData: this.renderDataAdOffReferenceDay,
          require: true,
          additionalFunctions: {
            onChangeInput: this.onChangeInput,
            onBlurInput: this.onBlurInput,
            checkIsEdited: this.checkIsEdited
          }
        },
        {
          renderHeader: this.renderHeaderWithTooltip,
          name: stdRule.COLUMN_NAME.settingItems.conversionType,
          render: true,
          renderData: this.renderDataAdOffConversionType,
          require: true,
          additionalFunctions: {
            onChangeSelect: this.onChangeSelect,
            checkIsEdited: this.checkIsEdited
          }
        },
        {
          renderHeader: this.renderHeaderWithTooltip,
          name: stdRule.COLUMN_NAME.settingItems.targetCPA,
          render: true,
          renderData: this.renderDataTargetCpa,
          require: true,
          additionalFunctions: {
            addCommas: this.addCommas,
            onChangeInput: this.onChangeInput,
            checkIsEdited: this.checkIsEdited
          }
        },
        {
          renderHeader: this.renderPasteButton,
          name: stdRule.COLUMN_NAME.modify,
          render: true,
          renderData: this.renderModifyCell
        }
      ],
      colGroups: [
        {
          header: translation.t('p4FStdRuleSettingTable.structure_col_title'),
          colSpan: 3
        },
        {
          header: translation.t('p4FStdRuleSettingTable.setting_col_title'),
          colSpan: 5
        }
      ]
    }
  }

  getTextHeaderWithTooltip(columnName) {
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.isConversion:
        return {
          headerText: translation.t('p4FStdRuleSettingTable.ad_off_is_conversion'),
          tooltipText: translation.t("p4FStdRuleSettingTable.ad_off_is_conversion_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.referenceDay:
        return {
          headerText: translation.t('p4FStdRuleSettingTable.ad_off_reference_day'),
          tooltipText: translation.t("p4FStdRuleSettingTable.ad_off_reference_day_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.conversionType:
        return {
          headerText: translation.t('p4FStdRuleSettingTable.ad_off_conversion_type'),
          tooltipText: translation.t("p4FStdRuleSettingTable.ad_off_conversion_type_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
        return {
          headerText: translation.t('p4FStdRuleSettingTable.ad_off_target_cpa'),
          tooltipText: translation.t("p4FStdRuleSettingTable.ad_off_target_cpa_tooltip_text")
        }
    }
  }

  renderHeaderWithTooltip(columnName) {
    const header = this.getTextHeaderWithTooltip(columnName)
    return (
      <div className="header-tooltip">{header.headerText}
        <span className="symbol-require">*</span>
        <span
          className={`header-tooltip-text ${columnName}-tooltip-text`}>{header.tooltipText}</span>
      </div>
    )
  }

  renderDataAdOffIsConversion(rowData, index, columnName, additionalFunctions) {
    const isEdited = additionalFunctions.checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (<select onChange={additionalFunctions.onChangeSelect.bind(this, rowData, columnName)}
                    className={nameOfClass}>
      {operationRuleConstant.AD_OFF_IS_CONVERSION.map(option => {
        const isConversion = rowData.isConversion === undefined ? "" : rowData.isConversion
        if (option.value === isConversion) {
          return (<option value={option.value} selected>{option.text}</option>)
        } else {
          return (<option value={option.value}>{option.text}</option>)
        }
      })}
    </select>)
  }

  onChangeSelect(rowData, columnName, e) {
    const editedCell = rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
    const keys = {isConversion: "isConversion", conversionType: "conversionType"}
    this.props.updateCellData(rowData.adSetId, {
      [keys[columnName]]: e.target.value,
      editedCell: editedCell
    }, this.props.selectedAccount.media, this.props.actionType)
  }

  renderDataAdOffReferenceDay(rowData, index, columnName, additionalFunctions, currencySymbol) {
    const value = rowData.referenceDay.toLocaleString()
    const isEdited = additionalFunctions.checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return <span><input type="text"
                        className={nameOfClass}
                        value={value}
                        onChange={additionalFunctions.onChangeInput.bind(this, rowData, columnName, currencySymbol)}
                        onBlur={additionalFunctions.onBlurInput.bind(this, rowData, columnName)}/></span>
  }

  onChangeInput(rowData, columnName, currencySymbol, e) {
    const targetValue = e.target.value
    const sliceNumber = targetValue.includes(currencySymbol) ? targetValue.slice(2, targetValue.length) : targetValue
    const updateValue = sliceNumber.replace(",", "")
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.referenceDay:
        return Number.isInteger(parseInt(updateValue)) && parseInt(updateValue) >= 1 && parseInt(updateValue) <= 30 || updateValue == ""
          ? this.props.updateCellData(rowData.adSetId, {
            referenceDay: updateValue === "" ? updateValue : parseInt(updateValue),
            editedCell: rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
          }, this.props.selectedAccount.media, this.props.actionType) : null
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
        return Number.isInteger(parseInt(updateValue)) && updateValue.length <= 6 || updateValue == ""
          ? this.props.updateCellData(rowData.adSetId, {
            targetCPA: updateValue === "" ? updateValue : parseInt(updateValue),
            editedCell: rowData.editedCell ? [...(new Set([...rowData.editedCell, columnName]))] : [columnName]
          }, this.props.selectedAccount.media, this.props.actionType) : null
    }
  }

  onBlurInput(rowData, columnName, e) {
    const targetValue = e.target.value
    const updateValue = targetValue === "" ? 7 : parseInt(targetValue)
    this.props.updateCellData(rowData.adSetId, {referenceDay: updateValue}, this.props.selectedAccount.media, this.props.actionType)
  }

  renderDataAdOffConversionType(rowData, index, columnName, additionalFunctions) {
    const isEdited = additionalFunctions.checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (<select onChange={additionalFunctions.onChangeSelect.bind(this, rowData, columnName)}
                    className={nameOfClass}>
      {operationRuleConstant.AD_OFF_CONVERSION_TYPE.map(option => {
        const conversionType = rowData.conversionType === undefined ? "" : rowData.conversionType
        if (option.value === conversionType) {
          return (<option value={option.value} selected>{option.text}</option>)
        } else {
          return (<option value={option.value}>{option.text}</option>)
        }
      })}
    </select>)
  }

  renderDataTargetCpa(rowData, index, columnName, additionalFunctions, currencySymbol) {
    const number = rowData.targetCPA
    const value = (number !== undefined)
      ? (number.toString().length > 0) ? number.toLocaleString() : ""
      : ""
    const maxLength = 9
    const isEdited = additionalFunctions.checkIsEdited(rowData, columnName)
    const nameOfClass = isEdited ? "edited-cell" : "original-cell"
    return (<span><input type="text"
                         className= {nameOfClass}
                         value={value !== "" ? currencySymbol + " " + additionalFunctions.addCommas(value) : additionalFunctions.addCommas(value)}
                         maxLength={maxLength}
                         placeholder={translation.t('stdRuleSettingTable.notSetText')}
                         onChange={additionalFunctions.onChangeInput.bind(this, rowData, columnName, currencySymbol)}
    /></span>)
  }

  checkIsEdited(rowData, columnName) {
    return rowData.editedCell && rowData.editedCell.includes(columnName)
  }

  addCommas(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  renderPasteButton(columnName, isRequired, idsAfterFilter) {
    return <PasteBtnComponent idsAfterFilter={idsAfterFilter}/>
  }

  renderModifyCell(rowData) {
    const mappingInfo = stdRuleConstant.mappingColToComparable.FACEBOOK.mappingInfo
    return <CopyCheckCancelBtns identifier={rowData[mappingInfo.field]} rowData={rowData} mappingInfo={mappingInfo}/>
  }

  render() {
    const {currency} = this.props
    return (
      this.props.tableData.length < 1 ? <div className="error">{translation.t('no_structure_was_found')}</div> :
        (<div>
          <label className="text-required">
            <span className="symbol-require">*</span>&ensp;
            <span>{translation.t('textRequired')}</span>
          </label>
          <label className="text-warning-info">
            <span>{translation.t('textErrorRowInfo')}</span>
          </label>
          <TableComponent data={this.props.tableData}
                          columns={this.state.columns}
                          name={'p4f-std-rule'}
                          colGroups={this.state.colGroups}
                          currency={currency}
                          media={this.props.selectedAccount.media}>
          </TableComponent>
        </div>))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    tableData: state.stdRule.tableData,
    actionType: state.stdRule.actionType,
    selectedAccount: state.account.selectedAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateCellData: updateCellData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4FStdRuleSettingTable)
