import React from 'react'
import { Field } from 'redux-form'
import TextInput from '../../parts/form/textInput'
import Select from '../../parts/form/select'
import translation from '../../../util/translation'
import operationRuleConstant from '../../../constants/operationRule'
import Validation from '../../parts/form/validation'
import {judgeSearchScope, showValidPath} from "./searchScopeUtil"
import PreviewSearchScope from "./previewSearchScope"

class SearchScopeForCampaignComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  isRequired =() => {
    return (this.props.media === operationRuleConstant.MEDIA_LIST.NEWLINE ||
      (this.props.action.actionType === operationRuleConstant.ACTION_TYPE_CAMPAIGN_BUDGET && this.props.media === operationRuleConstant.MEDIA_LIST.YAHOO))
  }

  getSearchScopeCondition = () => {
    let validate = [Validation.maxLength(100, "")]
    if (this.isRequired)
      validate.push(Validation.require(translation.t('search_scope.filter_value')))
    return validate
  }

  render() {
    const { dispatch, searchScopeVal, media,accountId , showResultPath, action } = this.props
    return (

      <span>
      <div className="box-line"><label>{translation.t('search_scope.label')}</label>
        {this.isRequired ? <span className="symbol-require">*</span>  : null }
        <div className="divider"/>
        {
          judgeSearchScope(searchScopeVal) && media === operationRuleConstant.MEDIA_LIST.NEWLINE
          ?     <button type="button" onClick={e => showValidPath(dispatch,searchScopeVal,accountId,media,action )} > {translation.t('search_scope.preview_search_scope')} </button>
          : null}
        <div>     { showResultPath ? <PreviewSearchScope /> : null}</div>
      </div>
        <div>
          <div className="box-line line-search-scope" >
            <ul className="list-inline">
              <li className="search-scope">
                <Field
                  name="searchScopeForCampaign[0].selectedFilterLevel"
                  component={Select}
                  options={[operationRuleConstant.DEFAULT_FILTER_LEVEL[0]]}
                  isDisabled={true}
                />
              </li>
              <li className="search-scope filter-value">
                <Field
                  component={TextInput}
                  type="text"
                  className="form-control"
                  name="searchScopeForCampaign[0].filterValue"
                  validate={this.getSearchScopeCondition()}/>
              </li>
              <li className="filter-type">
                <Field
                  name="searchScopeForCampaign[0].filterType"
                  component={Select}
                  options={operationRuleConstant.FILTER_TYPE_LIST[this.props.media]}
                />
              </li>
            </ul>
          </div>
        </div>
      </span>
    )
  }
}

export default SearchScopeForCampaignComponent

