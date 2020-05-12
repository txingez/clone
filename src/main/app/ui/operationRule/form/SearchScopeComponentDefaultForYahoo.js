import React from 'react'
import {Field} from 'redux-form'
import TextInput from '../../parts/form/textInput'
import Select from '../../parts/form/select'
import translation from '../../../util/translation'
import operationRuleConstant from '../../../constants/operationRule'
import Validation from '../../parts/form/validation'

class SearchScopeComponentDefaultForYahoo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <span>
      <div className="box-line"><label>{translation.t('search_scope.label')}</label>
        {this.props.media === operationRuleConstant.MEDIA_LIST.NEWLINE ?
          <span className="symbol-require">*</span> : null}
      </div>
        <div>
          <div className="box-line line-search-scope">
            <ul className="list-inline">
              <li className="search-scope">
                <Field
                  name="searchScope[0].selectedFilterLevel"
                  component={Select}
                  options={operationRuleConstant.DEFAULT_FILTER_LEVEL.filter((x => x.value !== 'CREATIVE_NAME'))}
                />
              </li>
              <li className="search-scope filter-value">
                <Field
                  component={TextInput}
                  type="text"
                  className="form-control"
                  name="searchScope[0].filterValue"
                  validate={[Validation.maxLength(100, "")]}/>
              </li>
              <li className="filter-type">
                <Field
                  name="searchScope[0].filterType"
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

export default SearchScopeComponentDefaultForYahoo

