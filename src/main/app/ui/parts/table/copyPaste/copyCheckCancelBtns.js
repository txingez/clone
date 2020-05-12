import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import translation from "../../../../util/translation";
import {resetCopyPaste, updateArrToPaste, updateDataCopied, updateRowCopied} from "../../../operationRule/form/stdRuleAction";
import stdRuleConstant from "../../../operationRule/form/stdRuleConstant";
import operationRuleConstant from "../../../../constants/operationRule";

class CopyCheckCancelBtns extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.copyData = this.copyData.bind(this)
  }

  copyData(identifier, rowData, media, actionType) {
    const newRowCopied = {
      identifier: identifier,
      isCopied: true
    }
    const fieldsHaveValue = stdRuleConstant.ACTIONS[media][actionType].COPIED_KEYS.filter(key => (rowData[key]))
    const canCopied = ((fieldsHaveValue.length > 0) || (rowData.editedCell !== undefined))
    if (canCopied) {
      this.props.updateRowCopied(newRowCopied)
      let dataCopied = {}
      stdRuleConstant.ACTIONS[media][actionType].COPIED_KEYS.map(key => {
        dataCopied = Object.assign({}, dataCopied, {[key]: rowData[key]})
      })
      this.props.updateDataCopied(dataCopied)
    }
  }

  render() {
    const {identifier, rowData, mappingInfo} = this.props
    const media = this.props.selectedAccount ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    return (
      <div>
        {!this.props.rowCopied.isCopied ?
          <button type="button"
                  onClick={this.copyData.bind(this, rowData[mappingInfo.field], rowData, media, this.props.actionType.value)}
                  className="copy-tooltip">
            <span>{translation.t("stdRuleSettingTable.copy")}
            <span className="copy-tooltip-text">{translation.t("stdRuleSettingTable.copy_tooltip_text")}</span>
            </span>
          </button>
          : identifier === this.props.rowCopied.identifier
            ? (<button type="button" id="cancel-cp" onClick={e => this.props.resetCopyPaste()}>
              <span className="glyphicon glyphicon-remove-circle cancel-icon"/>
            </button>)
            : (<label className="checkbox-container checkbox-tooltip">
                  <input type="checkbox" onClick={e => this.props.updateArrToPaste(rowData[mappingInfo.field])}
                         checked={this.props.arrayRowToPaste.includes(rowData[mappingInfo.field])}/>
                  <span className="checkmark">
                <span className="checkbox-tooltip-text">{translation.t("stdRuleSettingTable.checkbox_tooltip_text")}</span>
              </span>
            </label>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    rowCopied: state.stdRule.rowCopied,
    actionType: state.stdRule.actionType,
    selectedAccount: state.account.selectedAccount,
    arrayRowToPaste: state.stdRule.arrayRowToPaste
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateRowCopied: updateRowCopied,
    updateDataCopied: updateDataCopied,
    resetCopyPaste: resetCopyPaste,
    updateArrToPaste: updateArrToPaste
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyCheckCancelBtns)
