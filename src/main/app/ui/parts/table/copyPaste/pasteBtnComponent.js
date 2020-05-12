import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import translation from "../../../../util/translation";
import {resetCopyPaste, pasteToRows, updateMultiArrToPaste} from "../../../operationRule/form/stdRuleAction";
import operationRuleConstant from "../../../../constants/operationRule";

class PasteBtnComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.pasteToRows = this.pasteToRows.bind(this)
  }

  pasteToRows(dataCopied, arrToPaste, media, actionType) {
      this.props.pasteToRows(dataCopied, arrToPaste, media, actionType)
      this.props.resetCopyPaste()
  }

  copyAll(idsTableAfterFilter) {
    const idsToCheckAll = idsTableAfterFilter.filter(id => this.props.rowCopied.identifier !== id)
    this.props.updateMultiArrToPaste(idsToCheckAll)
  }

  render() {
    const {idsAfterFilter} = this.props
    const media = this.props.selectedAccount ? this.props.selectedAccount.media : operationRuleConstant.MEDIA_LIST.NEWLINE
    const actionType = this.props.actionType !== ""
      ? this.props.actionType : operationRuleConstant.ACTION_TYPE[media][0]

    return (
      <div>
        <button type="button"
                disabled={!this.props.rowCopied.isCopied}
                onClick={this.pasteToRows.bind(this,
                  this.props.dataCopied, this.props.arrayRowToPaste, media, actionType)}
                className="paste-tooltip">
          <span>{translation.t('stdRuleSettingTable.paste')}
          <span className="paste-tooltip-text">{translation.t("stdRuleSettingTable.paste_tooltip_text")}</span>
          </span>
        </button>
        {this.props.rowCopied.isCopied ? <button type="button"
                                                 onClick={this.copyAll.bind(this, idsAfterFilter)}
                                                 className="copy-all-btn">{translation.t("stdRuleSettingTable.check_all_text")}</button> : null}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    dataCopied: state.stdRule.dataCopied,
    rowCopied: state.stdRule.rowCopied,
    arrayRowToPaste: state.stdRule.arrayRowToPaste,
    actionType: state.stdRule.actionType,
    selectedAccount: state.account.selectedAccount
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    resetCopyPaste: resetCopyPaste,
    pasteToRows: pasteToRows,
    updateMultiArrToPaste: updateMultiArrToPaste
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PasteBtnComponent)
