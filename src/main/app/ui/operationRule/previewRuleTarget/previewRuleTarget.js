import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap-modal'
import {bindActionCreators} from "redux"
import * as previewRuleTargetAction from "../previewRuleTarget/previewRuleTargetAction"
import translation from "../../../util/translation"
import PerformanceCellFormat from "./performanceCellFormat"
import operationRuleConstant from "../../../constants/operationRule";

const ReactDataGrid = require('react-data-grid')

class PreviewRuleTarget extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      rows: this.createRows()
    }
    let showColumn = this.checkShowLevelByAction(this.props.action.actionType)
    this.rowHeight = this.rowHeight.bind(this)
    this.rowGetter = this.rowGetter.bind(this)
    this.checkShowLevelByAction = this.checkShowLevelByAction.bind(this)
    this._columns = [
      {
        key: 'index',
        name: '',
        width: 50,
        frozen: true,
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
        key: this.showAdGroupOrAdSetByMedia(this.props.media),
        name: translation.t('preview_column.ad_group_name'),
        editable: false,
        resizable: true,
        visible: showColumn
      },
      {
        key: 'adName',
        name: translation.t('preview_column.ad_name'),
        editable: false,
        resizable: true,
        visible: showColumn
      },
      {
        key: 'evaluatedValues',
        name: translation.t('preview_column.performance'),
        editable: false,
        resizable: true,
        width: 1000,
        formatter: this.chooseCellFormat(this.props.action.actionType, this.props.media),
        visible: true
      }
    ]
    this.chooseCellFormat = this.chooseCellFormat.bind(this)
  }

  chooseCellFormat = (actionType, media) => {
    return <PerformanceCellFormat actionType={actionType} media={media}/>
  }

  showAdGroupOrAdSetByMedia = (media) => {
    switch (media) {
      case operationRuleConstant.MEDIA_LIST.FACEBOOK:
        return 'adSetName'
      case operationRuleConstant.MEDIA_LIST.NEWLINE:
        return 'adGroupName'
    }
  }

  checkShowLevelByAction = (actionType) => {
    return (actionType === "AD_REMOVE")
  }
  createRows = () => {
    return this.props.previewRuleTarget.results
  }

  rowGetter(i) {
    return this.props.previewRuleTarget.results[i]
  }

  rowHeight(result) {
    let sizeOfEvaluatedValue = 1
    result.map(answer =>
      sizeOfEvaluatedValue = Math.max(sizeOfEvaluatedValue, JSON.parse(answer.evaluatedValues).length)
    )
    return (sizeOfEvaluatedValue + 1) * 20
  }

  render() {
    return (
      <div className="search-scope-modal">
        <Modal className="search-scope-form-modal " show={this.props.previewRuleTarget.isVisible}
               onHide={e => this.props.setVisiblePreviewRuleTarget(false)}>
          <Modal.Header className={'modal-header-trigger'}>
            <Modal.Title id="ModalHeader">{translation.t('preview_target.modal_title')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.previewRuleTarget.results.length === 0 ?
              <label className="label-style"> {translation.t('preview_target.no_target')} </label> : null}
            <ReactDataGrid
              enableCellSelect={true}
              columns={this._columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              rowsCount={this.props.previewRuleTarget.results.length}
              minHeight={600}
              minColumnWidth={120}
              rowHeight={this.rowHeight(this.props.previewRuleTarget.results)}
              headerRowHeight={32}
            />
          </Modal.Body>
        </Modal>
      </div>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    previewRuleTarget: state.previewRuleTarget
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVisiblePreviewRuleTarget: previewRuleTargetAction.setVisiblePreviewRuleTarget
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PreviewRuleTarget)

