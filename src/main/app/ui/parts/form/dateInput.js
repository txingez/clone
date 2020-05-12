import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

const DateInput = ({ input: {onChange, value}, meta: { touched, error, invalid, warning } }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <DatePicker
      onChange={onChange}
      selected={value ? moment(value) : null}
      dateFormat="YYYY/MM/DD"
      placeholderText="YYYY/MM/DD形式で入力してください"
      locale="ja_JP"
      isClearable={true}
      showMonthDropdown
      showYearDropdown
      className="form-control"
    />
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default DateInput;
