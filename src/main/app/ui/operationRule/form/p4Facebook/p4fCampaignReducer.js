import p4fCampaignDataConstant from '../../../../constants/p4fCampaignData'
import initialState from '../../../../../initialState'
import {convertToUSD} from "./p4fSetCampaignSpendCapUtil"


export default function p4fCampaignDataReducer (p4fCampaignData = initialState.p4fCampaignData, action) {
  switch (action.type) {
    case p4fCampaignDataConstant.UPDATE_FB_CAMPAIGNS:
      return Object.assign({}, p4fCampaignData, {campaigns: action.data})
    case p4fCampaignDataConstant.UPDATE_COST_TODAY:
      return Object.assign({}, p4fCampaignData, {costToday: action.data,
          spendCapLowerLimit: Object.assign({},p4fCampaignData.spendCapLowerLimit,
            {JPY: action.currency=='JPY'? action.data + p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT['JPY']:p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT['JPY'],
                     USD: action.currency=='USD'? action.data + p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT['USD']:p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT['USD'],
              KRW: action.currency=='KRW'? action.data + p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT['KRW']:p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT['KRW']
            })})
    case p4fCampaignDataConstant.UPDATE_FB_TOTAL_MIN_COST:
      return Object.assign({}, p4fCampaignData, {
        adSet: Object.assign({}, p4fCampaignData.adSet, {
          number: action.data.numberOfAdset, totalMinCost:  action.data.totalMinCost
        })
      })
    case p4fCampaignDataConstant.RESET_COST_TODAY:
      return Object.assign({}, p4fCampaignData, {costToday: 0,
        spendCapLowerLimit: Object.assign({},p4fCampaignData.spendCapLowerLimit, p4fCampaignDataConstant.DEFAULT_SPENDCAP_LOWER_LIMIT)})
    case p4fCampaignDataConstant.RESET_FB_TOTAL_MIN_COST:
      return Object.assign({}, p4fCampaignData, {
        adSet: Object.assign({}, p4fCampaignData.adSet, { number: 0, totalMinCost: 0 })
      })
    default:
      return p4fCampaignData
  }
}
