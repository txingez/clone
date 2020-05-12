import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

function handleDateChangeRaw(e) {
  e.preventDefault();
}


const DateInputUneditable = ({ input, meta: { touched, error, invalid, warning }, minDate, maxDate, defaultValue, clearable, disabled }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <DatePicker
      name = {input.name}
      onChange={input.onChange}
      disabled={disabled}
      onChangeRaw = {handleDateChangeRaw}
      selected = {input.value ? moment(input.value) : defaultValue}
      minDate = {minDate}
      maxDate = {maxDate}
      numberOfMonths={1}
      dateFormat="YYYY/MM/DD"
      className="form-control"
      isClearable={clearable}
    />
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>

)

export default DateInputUneditable;
