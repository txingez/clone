import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import P4FSetCampaignSpendCapFields from './p4fSetCampaignSpendCapFields'
import P4FRemoveCampaignSpendCapFields from './p4fRemoveCampaignSpendCapFields'
import P4FSetCampaignDailyBudgetByDate from './p4fSetCampaignDailyBudgetByDateFields'
import {
  getCostToday,
  getTotalMinCost,
  updatePreviousCost,
  updateRuleNameWithCampaignId,
  updateSelectedCampaignId,
  updateTargetCampaign
} from "./p4fCampaignDataAction"
import operationRuleConstant from '../../../../constants/operationRule'
import P4FCampaignSelector from "./p4fCampaignSelector"
import {getClosedDateConfig} from "./p4fSetCampaignSpendCapUtil"

class P4FCampaignActionFields extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  getRuleName(value) {
    return (operationRuleConstant.ACTION_TYPE.FACEBOOK.find(actionConst => actionConst.key === this.props.action.actionType).text + '_' + value )
  }

  onChangeCampaign(e) {
    const {campaigns, action} = this.props
    if (action.actionType === "SET_CPN_SPEND_CAP") {
      const campaignId = e.value
      const targetCampaignId = typeof campaignId === "string" ? campaignId : campaignId.value
      const targetCampaign = campaigns.find((campaign) => {return campaign.campaignId === targetCampaignId})
      const campaignStartDate = targetCampaign ? targetCampaign.startDate : ""
      const closedDateConfig = getClosedDateConfig(campaignStartDate)
      this.props.updateTargetCampaign({
        campaignId: campaignId,
        startDate: campaignStartDate,
        costUntilClosedDate: 0,
        previousClosedDate: closedDateConfig.defaultValue,
        currentMonthCost: ""
      })
      this.updateCampaignCost(campaignId, closedDateConfig.defaultValue)
      this.updateCampaignCostToday(campaignId)
    } else {
      this.props.updateSelectedCampaignId(e.value)
    }
    this.props.updateRuleNameWithCampaignId(this.getRuleName(e.label.replace(' ' + e.value, '_' + e.value)))

  }

  updateCampaignCost(campaignId, closedDate) {
    if (campaignId && closedDate) {
      let targetCampaignId = typeof campaignId === "string" ? campaignId : campaignId.value
      let targetCampaign = this.props.campaigns.find((campaign) => {return campaign.campaignId === targetCampaignId})
      this.props.updatePreviousCost(
        campaignId,
        targetCampaign.startDate,
        closedDate
      )
    }
  }

  updateCampaignCostToday(campaignId) {
    if (campaignId) {
      let targetCampaignId = typeof campaignId === "string" ? campaignId : campaignId.value
      let targetCampaign = this.props.campaigns.find((campaign) => {return campaign.campaignId === targetCampaignId})
      this.props.getCostToday(
        campaignId,
        targetCampaign.startDate,
        this.props.selectedAccount.currency
      )
    }
  }

  getCampaignList() {
    const {campaigns, ruleList, action} = this.props
    let campaignIdsHaveRule = ruleList.rules.filter((rule, index) => {
      return (rule.actionType === action.actionType && index !== ruleList.selectedRuleIndex)
    }).map((rule) => {
      return rule.extension.targetCampaign.campaignId
    });

    //Don't limit cpn for SET_DAILY_BUDGET_BY_DATE action
    if(action.actionType === operationRuleConstant.ACTION_TYPE_INDICATE_CPN_DAILY_BUDGET_BY_DATE)
      campaignIdsHaveRule = []

    return campaigns.filter((campaign) => {
      return (!campaignIdsHaveRule.includes(campaign.campaignId) &&
        this.filterCampaign(campaign, action.actionType))
    }).map((campaign) => {
      return {
        value: campaign.campaignId,
        label: campaign.campaignName + " " + campaign.campaignId,
        className: campaign.isActive ? "active-cpn" : ""
      }
    })
  }

  filterCampaign(campaign, actionType) {
    if(actionType === "INDICATE_CPN_DAILY_BUDGET_BY_DATE")
      return (campaign.isDailyBudget)
    else
      return (campaign.buyingType === "AUCTION")
  }

  getComponent(){
    const { action, campaigns, costToday } = this.props
    switch (action.actionType) {
      case "SET_CPN_SPEND_CAP" : {
        return ( <P4FSetCampaignSpendCapFields action={action} campaigns={campaigns} /> )
      }
      case "REMOVE_CPN_SPEND_CAP": {
        return ( <P4FRemoveCampaignSpendCapFields action={action} campaigns={campaigns} /> )
      }
      case "INDICATE_CPN_DAILY_BUDGET_BY_DATE": {
        return ( <P4FSetCampaignDailyBudgetByDate action = {action} campaigns={campaigns} />)
      }
      default:
        return (<div></div>)
    }
  }

  render() {
    return(<span><div className="campaign-selector-container">
          <P4FCampaignSelector campaigns={this.getCampaignList()} onChange={this.onChangeCampaign.bind(this)} />
        </div>
        {this.getComponent()}
      </span>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    campaigns: state.p4fCampaignData.campaigns,
    costToday: state.p4fCampaignData.costToday,
    selectedAccount: state.account.selectedAccount,
    ruleList:  state.ruleList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateSelectedCampaignId: updateSelectedCampaignId,
    updateRuleNameWithCampaignId: updateRuleNameWithCampaignId,
    updateTargetCampaign: updateTargetCampaign,
    updatePreviousCost: updatePreviousCost,
    getCostToday: getCostToday,
    getTotalMinCost: getTotalMinCost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(P4FCampaignActionFields)
