import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap-modal'
import {bindActionCreators} from "redux";
import * as searchScopeAction from "./searchScopeAction";
import {formValueSelector} from "redux-form";
import translation from "../../../util/translation"

const ReactDataGrid = require('react-data-grid')

class PreviewSearchScope extends React.Component {
  constructor(props, context) {
    super(props, context)
    let columnVisible = this.checkVisibleColumn(this.props.searchScope)
    this.state = {
      rows: this.createRows(),
      error: ""
    }
    this.rowGetter = this.rowGetter.bind(this)
    this.checkVisibleColumn = this.checkVisibleColumn.bind(this)

    this._columns = [
      {
        key: 'index',
        name: '',
        width: 98,
        resizable: true,
        visible: true
      },
      {
        key: 'campaignName',
        name: translation.t('preview_column.campaign_name'),
        editable: false,
        resizable: true,
        visible: true
      },
      {
        key: 'adGroupName',
        name: translation.t('preview_column.ad_group_name'),
        editable: false,
        resizable: true,
        visible: columnVisible[0]
      },
      {
        key: 'adName',
        name: translation.t('preview_column.ad_name'),
        editable: false,
        resizable: true,
        visible: columnVisible[1]
      }
    ]
  }

  createRows = () => {
    return this.props.searchScopePath.validPath
  }

  rowGetter(i) {
    return this.state.rows[i]
  }

  checkVisibleColumn = (searchScope) => {
    let filterValueArray = searchScope.map(filterValue => filterValue.filterLevelVal)
    return [filterValueArray.includes("ADGROUP") || filterValueArray.includes("AD"), filterValueArray.includes("AD")]
  }

  render() {
    const isVisibleResult = this.props.searchScopePath.isVisibleResult
    const setVisibleSearchScopePath = this.props.setVisibleSearchScopePath
    const checkSearchScopeExist = this.state.rows.length === 0
    return (
      <div className="search-scope-modal">
        <Modal className="search-scope-form-modal " show={isVisibleResult}
               onHide={e => setVisibleSearchScopePath(false)}>
          <Modal.Header className={'modal-header-trigger'}>
            <Modal.Title id="ModalHeader">{translation.t('search_scope.label_search_scope')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {checkSearchScopeExist ?
              <label className="label-style"> {translation.t('search_scope.no_valid_search_scope')} </label> : null}
            <ReactDataGrid
              enableCellSelect={true}
              columns={this._columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              rowsCount={this.state.rows.length}
              minHeight={500}
              minColumnWidth={120}
            />
          </Modal.Body>
        </Modal>
      </div>

    )
  }
}

const selector = formValueSelector('operationRuleForm')

const mapStateToProps = (state, ownProps) => {
  return {
    searchScopePath: state.searchScopePath,
    searchScope: selector(state, 'searchScope')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVisibleSearchScopePath: searchScopeAction.setVisibleSearchScopePath
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PreviewSearchScope)

