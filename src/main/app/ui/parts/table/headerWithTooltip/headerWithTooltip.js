import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import stdRule from "../../../../constants/standardRule";
import translation from "../../../../util/translation";

class HeaderWithTooltip extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getTextHeaderWithTooltip(columnName) {
    switch (columnName) {
      case stdRule.COLUMN_NAME.settingItems.referencePeriod:
        return {
          headerText: translation.t('stdRuleSettingTable.settingItemsHeaderText.reference_period'),
          tooltipText: translation.t("stdRuleSettingTable.settingItemsHeaderText.reference_period_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.referenceDay:
        return {
          headerText: translation.t('stdRuleSettingTable.settingItemsHeaderText.reference_day'),
          tooltipText: translation.t("stdRuleSettingTable.settingItemsHeaderText.reference_day_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.targetCPA:
        return {
          headerText: translation.t('stdRuleSettingTable.settingItemsHeaderText.target_cpa'),
          tooltipText: translation.t("stdRuleSettingTable.settingItemsHeaderText.target_cpa_tooltip_text")
        }
      case stdRule.COLUMN_NAME.settingItems.minimumAdNumber:
        return {
          headerText: translation.t('stdRuleSettingTable.settingItemsHeaderText.minimum_ad_number'),
          tooltipText: translation.t("stdRuleSettingTable.settingItemsHeaderText.minimum_ad_number_tooltip_text")
        }
    }
  }

  render() {
    const {columnName, isRequired} = this.props
    const header = this.getTextHeaderWithTooltip(columnName)

    return (
      <div className="header-tooltip">{header.headerText}
        {isRequired ? <span className="symbol-require">*</span> : null}
        <span className={`header-tooltip-text ${columnName}-tooltip-text`}>{header.tooltipText}</span>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithTooltip)
