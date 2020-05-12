import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-bootstrap-modal'
import {bindActionCreators} from 'redux'
import * as ruleScheduleAction from './ruleScheduleAction'
import ruleScheduleConstant from '../../../constants/ruleSchedule'
import operationRuleConstant from '../../../constants/operationRule'
import update from 'immutability-helper'
import translation from '../../../util/translation'
import HourIndexCell from './hourIndexCell'
import TimeSlotCell from './timeSlotCell'
import * as ruleScheduleUtil from './ruleScheduleUtil'
import {formValueSelector} from "redux-form";
import ReactTooltip from 'react-tooltip'

const ReactDataGrid = require('react-data-grid')

class Scheduler extends React.Component {
  constructor(props, context) {
    super(props, context)
    this._columns = [
      {
        key: 'hour',
        name: '',
        formatter: HourIndexCell,
        width: 120
      },
      {
        key: 'MONDAY',
        name: translation.t('schedule.monday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      },
      {
        key: 'TUESDAY',
        name: translation.t('schedule.tuesday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      },
      {
        key: 'WEDNESDAY',
        name: translation.t('schedule.wednesday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      },
      {
        key: 'THURSDAY',
        name: translation.t('schedule.thursday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      },
      {
        key: 'FRIDAY',
        name: translation.t('schedule.friday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      },
      {
        key: 'SATURDAY',
        name: translation.t('schedule.saturday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      },
      {
        key: 'SUNDAY',
        name: translation.t('schedule.sunday'),
        editable: true,
        formatter: TimeSlotCell,
        width: 85
      }
    ]
    let schedule = this.props.action.actionType == operationRuleConstant.ACTION_TYPE_ON_OFF ? this.props.ruleSchedule.campaignOnOffSchedule : this.props.ruleSchedule.actionEnableSchedule
    this.state = {rows: ruleScheduleUtil.convertScheduleToTableRows(schedule)}
  }

  rowGetter(i) {
    return this.state.rows[i]
  }

  handleGridRowsUpdated({fromRow, toRow, updated}) {
    if (ruleScheduleUtil.isValidValue(updated)) {
      let rows = this.state.rows.slice()

      for (let i = fromRow; i <= toRow; i++) {
        let rowToUpdate = rows[i]
        let updatedRow = update(rowToUpdate, {$merge: updated})
        rows[i] = updatedRow
      }

      this.setState({rows})
    }
  }

  handleChangeAllRows(newValue = ruleScheduleConstant.HOUR_ROW_ON) {
    this.handleGridRowsUpdated({
        fromRow: 0,
        toRow: 23,
        updated: Object.assign({}, newValue)
      }
    )
  }

  getCellActions(self) {
    return (column, row) => {
      if (column.key !== 'hour') {
        return [
          {
            icon: 'glyphicon glyphicon-triangle-bottom green-icon',
            callback: () => {
              let currentRow = self.state.rows[row.hour]
              let updated = Object.assign({}, currentRow)
              updated[column.key] = (currentRow[column.key] === ruleScheduleConstant.VALUE_ON) ? ruleScheduleConstant.VALUE_OFF : ruleScheduleConstant.VALUE_ON
              self.handleGridRowsUpdated({fromRow: row.hour, toRow: row.hour, updated: updated})
            }
          }
        ]
      } else {
        return [
          {
            icon: 'glyphicon glyphicon-remove-circle inactive-hour inactive-all-btn',
            callback: () => {
              self.handleGridRowsUpdated({
                fromRow: row.hour,
                toRow: row.hour,
                updated: Object.assign({}, ruleScheduleConstant.HOUR_ROW_OFF)
              })
            }
          },
          {
            icon: 'glyphicon glyphicon-ok-circle active-hour',
            callback: () => {
              self.handleGridRowsUpdated({
                fromRow: row.hour,
                toRow: row.hour,
                updated: Object.assign({}, ruleScheduleConstant.HOUR_ROW_ON)
              })
            }
          }
        ]
      }
    }
  }

  submitTable() {
    this.props.setVisibleSchedule(false)
    this.props.saveSchedule(ruleScheduleUtil.convertTableRowsToSchedule(this.state.rows), this.props.action.actionType)
  }

  render() {
    const {isVisibleSchedule, setVisibleSchedule, action, selectedAccount} = this.props
    let timeZone = ""
    if (selectedAccount.media === operationRuleConstant.MEDIA_LIST.FACEBOOK) timeZone = " (" + selectedAccount.timeZone + " TIME)"
    let label = translation.t('schedule.label') + timeZone
    if (action.actionType === operationRuleConstant.ACTION_TYPE_ON_OFF) {
      label = translation.t('schedule.label_onoff')
    }
    return (
      <div className="scheduler-modal">
        <Modal className="scheduler-form-modal" show={isVisibleSchedule} onHide={e => setVisibleSchedule(false)}>
          <Modal.Header className={'modal-header-trigger'}>
            <Modal.Title id="ModalHeader" className={"rule-list-title"}>
              <button type="button" className="btn btn-default btn-xs active-hour" onClick={e => this.handleChangeAllRows(ruleScheduleConstant.HOUR_ROW_ON)}>
                ON all
              </button>&nbsp;
              <button type="button" className="btn btn-default btn-xs inactive-hour" onClick={e => this.handleChangeAllRows(ruleScheduleConstant.HOUR_ROW_OFF)}>
                OFF all
              </button>&nbsp;
              <span data-place="right" data-tip={label}>{label}</span>
              <ReactTooltip delayHide={100} effect="solid"/>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactDataGrid
              enableCellSelect={true}
              columns={this._columns}
              rowGetter={this.rowGetter.bind(this)}
              rowsCount={this.state.rows.length}
              minHeight={630}
              rowHeight={24}
              headerRowHeight={32}
              width={740}
              onGridRowsUpdated={this.handleGridRowsUpdated.bind(this)}
              getCellActions={this.getCellActions(this)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-primary" data-dismiss="modal"
                    onClick={e => this.submitTable()}>{translation.t('save')}</button>
            <Modal.Dismiss className="btn btn-default">{translation.t('cancel')}</Modal.Dismiss>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const selector = formValueSelector('operationRuleForm')

const mapStateToProps = (state, ownProps) => {
  return {
    isVisibleSchedule: state.ruleSchedule.isVisibleSchedule,
    ruleSchedule: state.ruleSchedule,
    action: selector(state, 'action')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVisibleSchedule: ruleScheduleAction.setVisibleSchedule,
    saveSchedule: ruleScheduleAction.saveSchedule
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler)
