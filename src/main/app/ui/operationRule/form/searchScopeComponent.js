import React from 'react'
import {connect} from 'react-redux'
import {Field} from 'redux-form'
import TextInput from '../../parts/form/textInput'
import RadioButtonGroup from '../../parts/form/radioGroup'
import Select from '../../parts/form/select'
import {
  changeFilterLevel,
  createLine,
  createLineWithExclude,
  deleteLine,
  deleteLineWithExclude,
  handleChangeFilterLevel,
  handleChangeOptionType,
  judgeSearchScope,
  showValidPath
} from './searchScopeUtil'
import translation from '../../../util/translation'
import operationRuleConstant from '../../../constants/operationRule'
import Validation from '../../parts/form/validation'
import PreviewSearchScope from "./previewSearchScope"

class SearchScopeComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      eventType: {
        changeFilterLevel: "CHANGE_FILTER_LEVEL",
        deleteLine: "DELETE_LINE",
        changeOptionType: "CHANGE_OPTION_TYPE",
        createLine: "CREATE_LINE"
      }
    }
  }

  findMaxSearchScopeLine(media, action) {
    let maxSearchScopeByMedia = []
    if (action !== "") {
      switch (media) {
        case operationRuleConstant.MEDIA_LIST.FACEBOOK:
          maxSearchScopeByMedia = operationRuleConstant.MAX_LINE_IN_SEARCH_SCOPE_FOR_FACEBOOK
          break
        case operationRuleConstant.MEDIA_LIST.NEWLINE:
          maxSearchScopeByMedia = operationRuleConstant.MAX_LINE_IN_SEARCH_SCOPE_FOR_NEWLINE
          break
      }
    }
    let maxSearchScopeLineConfig = maxSearchScopeByMedia.find(target => target.key === action.actionType)
    maxSearchScopeLineConfig = (typeof maxSearchScopeLineConfig != "undefined") ? maxSearchScopeLineConfig : operationRuleConstant.MAX_LINE_IN_SEARCH_SCOPE_DEFAULT_CONFIG
    return maxSearchScopeLineConfig.value
  }

  switchFunction(eventKey, elementIndex, selectedValue) {
    switch (this.props.media) {
      case operationRuleConstant.MEDIA_LIST.FACEBOOK: {
        this.fbSearchScopeFunctionGroup(eventKey, elementIndex, selectedValue)
        break;
      }
      case operationRuleConstant.MEDIA_LIST.NEWLINE: {
        this.newLineSearchScopeFunctionGroup(eventKey, elementIndex, selectedValue)
        break;
      }

      default:
        this.anotherMediaSearchFunctionGroup(eventKey, elementIndex, selectedValue)
    }
  }

  fbSearchScopeFunctionGroup(eventKey, elementIndex, selectedValue) {
    switch (this.props.action.actionType) {
      case operationRuleConstant.ACTION_TYPE_AD_REMOVE: {
        this.searchScopeFunctionForExclude(eventKey, elementIndex, selectedValue)
        break
      }

      default:
        this.anotherMediaSearchFunctionGroup(eventKey, elementIndex, selectedValue)
    }
  }

  newLineSearchScopeFunctionGroup(eventKey, elementIndex, selectedValue) {
    switch (this.props.action.actionType) {
      case operationRuleConstant.ACTION_TYPE_CTR_AD_START: {
        this.searchScopeFunctionForExclude(eventKey, elementIndex, selectedValue)
        break
      }

      default:
        this.anotherMediaSearchFunctionGroup(eventKey, elementIndex, selectedValue)
    }
  }

  searchScopeFunctionForExclude(eventKey, elementIndex, selectedValue) {
    switch (eventKey) {
      case this.state.eventType.changeFilterLevel: {
        handleChangeFilterLevel(this.props.dispatch, this.props.searchScopeVal, selectedValue, elementIndex, this.props.media)
        break
      }

      case this.state.eventType.deleteLine: {
        deleteLineWithExclude(this.props.dispatch, this.props.searchScopeVal, elementIndex, this.props.media)
        break
      }

      case this.state.eventType.createLine: {
        createLineWithExclude(this.props.dispatch, this.props.searchScopeVal, this.props.media)
        break
      }

      case this.state.eventType.changeOptionType: {
        handleChangeOptionType(this.props.dispatch, this.props.searchScopeVal, selectedValue, elementIndex, this.props.media)
        break
      }
    }
  }

  anotherMediaSearchFunctionGroup(eventKey, elementIndex, selectedValue) {
    switch (eventKey) {
      case this.state.eventType.changeFilterLevel: {
        changeFilterLevel(this.props.dispatch, this.props.searchScopeVal, elementIndex, selectedValue, this.props.media)
        break
      }

      case this.state.eventType.deleteLine: {
        deleteLine(this.props.dispatch, this.props.searchScopeVal, elementIndex, this.props.media)
        break
      }

      case this.state.eventType.createLine: {
        createLine(this.props.dispatch, this.props.fields, this.props.searchScopeVal, this.props.media, this.props.action.actionType)
        break
      }
    }
  }

  isShowOptionTypeLabel(media, action, fields) {
    return (media !== undefined && action !== undefined && fields !== undefined
      && fields.length > 0 && this.isShowExcludeSearchScope(media, action)
    )
  }

  getHightlightClass(lineSearchScope) {
    if (lineSearchScope.isHighlight !== undefined && lineSearchScope.isHighlight === true) {
      if (lineSearchScope.optionType.selectedOption === "INCLUDE") {
        return "include-highlight"
      } else {
        return "exclude-highlight"
      }
    } else
      return ""
  }

  isShowExcludeSearchScope(media, action) {
    return (
      (media === operationRuleConstant.MEDIA_LIST.FACEBOOK && action.actionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE)
      || (media === operationRuleConstant.MEDIA_LIST.NEWLINE && action.actionType === operationRuleConstant.ACTION_TYPE_CTR_AD_START)
    )
  }

  render() {
    const {dispatch, fields, searchScopeVal, media, accountId, showResultPath, action} = this.props
    return (
      <span>
     <div className="row fix-right-side title-searchscope">
       <div className="col-md-3"><label>{translation.t('search_scope.label')}</label></div>
       <div className="col-md-4">
       {
         media === operationRuleConstant.MEDIA_LIST.NEWLINE ?
           (judgeSearchScope(searchScopeVal)
             ? <button type="button"
                       onClick={e => showValidPath(dispatch, searchScopeVal, accountId, media, action)}>{translation.t('search_scope.preview_search_scope')} </button>
             : <div>  {translation.t('search_scope.search_scope_is_account')}</div>)
           : (
             media === operationRuleConstant.MEDIA_LIST.FACEBOOK && action.actionType === operationRuleConstant.ACTION_TYPE_AD_REMOVE && fields !== undefined && fields.length == 0 ?
               <div>{translation.t('search_scope.search_scope_is_account')}</div> : null
           )
       }
       </div>
       <div className="col-md-2"></div>
       {this.isShowOptionTypeLabel(media, action, fields) ?
         <div className="col-md-3 label-size">適用 / 除外</div> : null
       }
    </div>
        <div>     {showResultPath ? <PreviewSearchScope/> : null}</div>
        <div className="row fix-right-side">
          {fields.map((filter, index) => (
            <div className="box-line line-search-scope" key={index}>
              <ul className="list-inline">
                <li className={"search-scope col-md-3 pad-left " + (this.getHightlightClass(searchScopeVal[index]))}>
                  <Field
                    onChange={e => this.switchFunction(this.state.eventType.changeFilterLevel, index, e.target.value)}
                    name={`${filter}.selectedFilterLevel`}
                    component={Select}
                    options={searchScopeVal[index].filterLevel}
                  />
                </li>
                <li className="search-scope filter-value col-md-4">
                  <Field component={TextInput} type="text" className="form-control"
                         name={`${filter}.filterValue`}
                         validate={[Validation.require(translation.t('search_scope.filter_value')), Validation.maxLength(100, "")]}/>
                </li>
                <li className="col-md-2">
                  <Field
                    name={`${filter}.filterType`}
                    component={Select}
                    options={operationRuleConstant.FILTER_TYPE_LIST["NEW LINE"]}
                  />
                </li>
                <li className="col-xl-2">
                  {this.isShowExcludeSearchScope(media, action) ?
                    <Field name={`${filter}.optionType.selectedOption`} component={RadioButtonGroup}
                           onFocus={e => this.switchFunction(this.state.eventType.changeOptionType, index, e.target.value)}
                           options={searchScopeVal[index].optionType.options}/> : null
                  }
                </li>
                <li>
                  <span className="glyphicon glyphicon-remove remove"
                        onClick={e => this.switchFunction(this.state.eventType.deleteLine, index, "")}></span>
                </li>
              </ul>
            </div>
          ))}
          <div className="box-line clearfix">
            <div className="pull-right">{fields.length < this.findMaxSearchScopeLine(media, action) ?
              <button type="button" className="btn btn-primary plus"
                      onClick={e => this.switchFunction(this.state.eventType.createLine, 0, "")}>+</button> : null}</div>
          </div>
        </div>
  </span>

    )
  }
}

export default connect(null, null)(SearchScopeComponent)

