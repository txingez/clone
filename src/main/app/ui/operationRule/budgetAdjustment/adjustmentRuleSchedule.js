import translation from "../../../util/translation";
import Modal from 'react-bootstrap-modal'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import {formValueSelector} from "redux-form";
import HourIndexCell from "./hourIndexCell.js"
import * as adjustmentRuleScheduleAction from "./adjustmentRuleScheduleAction"
import * as adjustmentRuleScheduleUtil from './adjustmentRuleScheduleUtil'
import update from 'immutability-helper'


const ReactDataGrid = require('react-data-grid');
const React = require('react');
const { Row } = ReactDataGrid;

class AdjustmentRuleSchedule extends React.Component {
  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    // only allow copy text to be pasted in the top-left cell of the table
    if ((updated.MONDAY !== undefined || updated.MONDAY === "") && fromRow === 0) {
      let endOfRowPosition = []
      let rowCopy = []
      let copyText =updated.MONDAY.replace(/,/g,"").replace(/¥/g,"").replace(/￥/g,"").replace(/\t/g," \t").split(" \t")
      for (let position = 0; position < copyText.length;position++)
        if(copyText[position].endsWith(" ") && copyText[position] !== " " && navigator.platform.indexOf("Win") !== -1)
          copyText[position]= copyText[position].substring(0, copyText[position].length - 1)
      // find end of line as well as beginning of line, then push the position to array and divide it
      for (let position = 0; position < copyText.length; position++)
      {
        // case if having space in beginning
        if (copyText[position].startsWith(" ")) {
          endOfRowPosition.push(position)
          let beginningOfNextRow = copyText[position].substring(copyText[position].lastIndexOf(" ")+1)
          copyText.splice(position, 1, "", beginningOfNextRow)
          position++
        }
        // case if having space at the end
        else if (copyText[position].endsWith(" ")) {
          endOfRowPosition.push(position)
          let endOfRow = copyText[position].substring(0,copyText[position].indexOf(" "))
          copyText.splice(position, 1, endOfRow,"")
          position++
        }
        // case if having space between character
        else if (copyText[position].trim().indexOf(" ") > -1)
        {
          endOfRowPosition.push(position)
          let endOfRow = copyText[position].substring(0,copyText[position].indexOf(" "))
          let beginningOfNextRow = copyText[position].substring(copyText[position].lastIndexOf(" ")+1)
          copyText.splice(position,1,endOfRow,beginningOfNextRow)
          position++
        }
      }

      // if there is only 1 line - push end of line manually
      if (endOfRowPosition.length === 0) {
        endOfRowPosition.push(copyText.length-1)
      }

      // divide the text into lines(rows) and put them in array
      for (let position = 0, row= 0; position < copyText.length; position = position + endOfRowPosition[0] + 1, row++)
      {
        rowCopy[row] = copyText.slice(position,position+endOfRowPosition[0] + 1)
      }
      let rows = this.state.rows.slice()

      // limit copy row to 25 (for table fit)
      let numberOfRowCopied = rowCopy.length > 25 ? 25 : rowCopy.length

      //set the value of each rows in table according to the value copied
      for (let count = 0; count < numberOfRowCopied; count++)
      {
        let val = {
          'MONDAY': this.checkUndefinedValue(rowCopy[count][0],count,'MONDAY'),
          'TUESDAY': this.checkUndefinedValue(rowCopy[count][1],count,'TUESDAY'),
          'WEDNESDAY':this.checkUndefinedValue(rowCopy[count][2],count,'WEDNESDAY'),
          'THURSDAY': this.checkUndefinedValue(rowCopy[count][3],count,'THURSDAY'),
          'FRIDAY': this.checkUndefinedValue(rowCopy[count][4],count,'FRIDAY'),
          'SATURDAY': this.checkUndefinedValue(rowCopy[count][5],count,'SATURDAY'),
          'SUNDAY': this.checkUndefinedValue(rowCopy[count][6],count,'SUNDAY'),
          'HOLIDAY': this.checkUndefinedValue(rowCopy[count][7],count,'HOLIDAY')
        }
        let updatedRow = update (rows[count],{$merge:val})
        rows[count] = updatedRow
      }
      this.setState({ rows })

    }

    if (adjustmentRuleScheduleUtil.isNumber(updated)) {
      let rows = this.state.rows.slice()
      for (let i = fromRow; i <= toRow; i++) {
        let rowToUpdate = rows[i]
        if(adjustmentRuleScheduleUtil.validateValue(i, updated)) {
          let colAndValue = adjustmentRuleScheduleUtil.getColAndValue(updated)
          updated[colAndValue.col] = adjustmentRuleScheduleUtil.removeZeroStr(colAndValue.value)
          let updatedRow = update(rowToUpdate, {$merge: updated})
          rows[i] = updatedRow
        }
      }
      this.setState({ rows })
    }
  }

  // if not copying full row: keep the value of cells in row that is not copied
  checkUndefinedValue(value,row,columnPosition)
  {
      if (value === undefined)
        return this.state.rows[row][columnPosition]
      else if (this.validateValue(row, value))
        return value
      else return ""
  }

  validateValue(rowNum,newText)
  {
    switch (rowNum) {
      case 0: return newText.length <= 9 && Number(newText) > 0
      case 1: return Number(newText)<= 1000 && Number(newText) > 0
      default: return (Number(newText)<= 1000 && Number(newText) > 0) || newText.length === 0
    }
  }
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'hour',
        name: '',
        formatter: HourIndexCell,
        width: 60
      },
      {
        key: 'MONDAY',
        name: translation.t('schedule.monday'),
        editable: true,
        width: 84
      },
      {
        key: 'TUESDAY',
        name: translation.t('schedule.tuesday'),
        editable: true,
        width: 84
      },
      {
        key: 'WEDNESDAY',
        name: translation.t('schedule.wednesday'),
        editable: true,
        width: 84
      },
      {
        key: 'THURSDAY',
        name: translation.t('schedule.thursday'),
        editable: true,
        width: 84
      },
      {
        key: 'FRIDAY',
        name: translation.t('schedule.friday'),
        editable: true,
        width: 84
      },
      {
        key: 'SATURDAY',
        name: translation.t('schedule.saturday'),
        editable: true,
        width: 84
      },
      {
        key: 'SUNDAY',
        name: translation.t('schedule.sunday'),
        editable: true,
        width: 84
      },
      {
        key: 'HOLIDAY',
        name: translation.t('schedule.holiday'),
        editable: true,
        width: 84
      }
    ]
    this.state = {
      rows: (this.props.adjustmentRuleSchedule.adjustmentSchedule.length === 0 ) ? this.createRows() :
        adjustmentRuleScheduleUtil.convertScheduleToTableRows(this.props.adjustmentRuleSchedule.adjustmentSchedule),
      error: ""
    }
    this.rowGetter = this.rowGetter.bind(this);
  }

  createRows () {
    let rows = [];
    rows.push({
      hour: "予算",
      MONDAY: "",
      TUESDAY: "",
      WEDNESDAY: "",
      THURSDAY: "",
      FRIDAY: "",
      SATURDAY: "",
      SUNDAY: "",
      HOLIDAY: ""
    })

    rows.push({
      hour: 0,
      MONDAY: "100",
      TUESDAY: "100",
      WEDNESDAY: "100",
      THURSDAY: "100",
      FRIDAY: "100",
      SATURDAY: "100",
      SUNDAY: "100",
      HOLIDAY: "100"
    })
    for (let i = 1; i < 24; i++) {
      rows.push({
        hour: i,
        MONDAY: "",
        TUESDAY: "",
        WEDNESDAY: "",
        THURSDAY: "",
        FRIDAY: "",
        SATURDAY: "",
        SUNDAY: "",
        HOLIDAY: ""
      });
    }
    return rows;
  }

  rowGetter (i) {
    return this.state.rows[i]
  }

  submitTable() {
    let errorCol = adjustmentRuleScheduleUtil.validateTable(this.state.rows)
    if(errorCol.length == 0){
      this.props.setVisibleSchedule(false)
      this.props.saveScheduleAdjustment(adjustmentRuleScheduleUtil.convertTableRowsToSchedule(this.state.rows))
    }
    else {
      this.setState({error: translation.t('budget_is_empty_at_below_cells') + " " + errorCol.join(", ")})
    }
  }

  render() {
    const { isVisibleSchedule, setVisibleSchedule,action } = this.props
    return (
      <div className="scheduler-modal">
        <Modal className="scheduler-form-modal" show={isVisibleSchedule} onHide={e => setVisibleSchedule(false)}>
          <Modal.Header className="modal-header-trigger">
            <Modal.Title id="ModalHeader">
              {translation.t('budget_adjustment_schedule.adjustment_ruler_schedule_header')}
              <span className="budget-adjustment-header-link">
          {translation.t('budget_adjustment_schedule.adjustment_header_link_text')}
                <a href="https://docs.google.com/spreadsheets/d/1y2H5VJSCcM0aTmXdmkZrOetZfX4Bsn6NYWXnKmZyir4/edit#gid=1900806728" target="_blank" className="header-target-link">{translation.t('budget_adjustment_schedule.header_taget_link')}</a>
        </span>

            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class = "error">{this.state.error}</div>
            <ReactDataGrid
              enableCellSelect={true}
              columns={this._columns}
              rowGetter={this.rowGetter}
              rowsCount={this.state.rows.length}
              minHeight={650}
              rowHeight={23}
              headerRowHeight={32}
              width={800}
              onGridRowsUpdated={this.handleGridRowsUpdated.bind(this)}
              rowRenderer={RowRenderer}/>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-primary" onClick={e => this.submitTable()}>{translation.t('save')}</button>
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
    isVisibleSchedule: state.adjustmentRuleSchedule.isVisibleSchedule,
    adjustmentRuleSchedule: state.adjustmentRuleSchedule,
    action: selector(state, 'action')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setVisibleSchedule: adjustmentRuleScheduleAction.setVisibleSchedule,
    saveScheduleAdjustment: adjustmentRuleScheduleAction.saveScheduleAdjustment
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdjustmentRuleSchedule)

class RowRenderer extends React.Component {
  setScrollLeft (scrollBy) {
    this.row.setScrollLeft(scrollBy);
  }

  getRowStyle() {
    return {
      color: this.getRowColor()
    };
  }

  getRowColor() {
    return this.props.idx == 0 ?  'green' : 'red'
  }
  getRowClass() {
    return this.props.idx != 0 ?  'adjustmentRatio-cell' : 'budget-cell'
  }

  render() {
    return (<div class={this.getRowClass()}><Row ref={ node => this.row = node } {...this.props}/></div>);
  }
}

