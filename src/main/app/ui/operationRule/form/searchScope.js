import React from "react"
import {bindActionCreators} from "redux";
import OperationRuleConstant from "../../../constants/operationRule"
import SearchScopeForCampaignComponent from "./searchScopeForCampaignComponent"
import SearchScopeComponentDefaultForYahoo from "./SearchScopeComponentDefaultForYahoo"
import {connect} from "react-redux";
import SearchScopeComponent from "./searchScopeComponent"
import {FieldArray} from "redux-form";
import translation from "../../../util/translation";

class SearchScope extends React.Component {

  getComponentByMedia() {
    const {media, searchScopeVal, action, accountId, dispatch, showResultPath, searchScopeForCampaign} = this.props
    switch (media) {
      case OperationRuleConstant.MEDIA_LIST.YAHOO: {
        switch (action.actionType) {
          case OperationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
            return (<div className="box-line"><label>{translation.t('search_scope.label')}</label></div>)
          case OperationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET:
            return (<SearchScopeForCampaignComponent searchScopeVal={searchScopeVal} media={media}/>)
          default:
            return (<SearchScopeComponentDefaultForYahoo searchScopeVal={searchScopeVal} media={media}/>)
        }
      }

      case OperationRuleConstant.MEDIA_LIST.NEWLINE: {
        switch (action.actionType) {
          case OperationRuleConstant.ACTION_TYPE_ON_OFF: {

            return (
              <SearchScopeForCampaignComponent dispatch={dispatch} searchScopeVal={searchScopeForCampaign} media={media}
                                               action={action}
                                               accountId={accountId} showResultPath={showResultPath}/>
            )
          }
          case OperationRuleConstant.ACTION_TYPE_ACCOUNT_BUDGET_MONITOR:
            return (<div className="box-line"><label>{translation.t('search_scope.label')}</label></div>)

          default:
            return (<FieldArray media={media} name="searchScope" component={SearchScopeComponent} action={action}
                                searchScopeVal={searchScopeVal} accountId={accountId} showResultPath={showResultPath}/>)
        }
      }

      case OperationRuleConstant.MEDIA_LIST.FACEBOOK: {
        return (<FieldArray media={media} name="searchScope" component={SearchScopeComponent} action={action}
                            searchScopeVal={searchScopeVal} accountId={accountId} showResultPath={showResultPath}/>)
      }
    }
  }

  render() {
    return (<div>{this.getComponentByMedia()}</div>)
  }

}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

export default connect(null, null)(SearchScope)
