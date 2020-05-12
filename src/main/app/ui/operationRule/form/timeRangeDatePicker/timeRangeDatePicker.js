import React from "react"
import { Field } from 'redux-form'
import {connect} from "react-redux";
import moment from "moment";
import DateInputUneditable from '../../../parts/form/dateInputUneditable'

class TimeRangeDatePicker extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(date) {
    if (typeof this.props.onChange === "function") {
      this.props.onChange(date)
    }
  }

  onClear() {
    this.props.onClear()
  }

  render() {
    const { name, label, disabled, required, clearable, validate,
      minDate = moment().add(1,'d'), maxDate = moment().add(2, 'M').endOf('M'),  } = this.props
    return (
      <div className="">
        <div className="half-line">
          <label>
            {label}
            {required ? <span className="symbol-require">*</span> : null}&nbsp;
            {clearable ? <a className="date-picker-clear" onClick={this.onClear.bind(this)}>Clear</a> : null}
          </label>
          <div className="box-line datepicker-container">
            <Field
              name = {name}
              component={DateInputUneditable}
              onChange={this.handleChange.bind(this)}
              minDate = {minDate}
              maxDate = {maxDate}
              disabled={disabled}
              validate={validate}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default connect(null, null)(TimeRangeDatePicker)
