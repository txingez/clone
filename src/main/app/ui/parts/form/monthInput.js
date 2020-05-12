import React from 'react'
import DateTime from 'react-datetime'

const MonthInput = ({ input: {onChange, value}, meta: { touched, error, invalid, warning } }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <DateTime
      locale="ja_JP"
      dateFormat="YYYY/MM"
      onChange={onChange}
      value={value}
      closeOnSelect={true}
      timeFormat={false}
      inputProps={{placeholder: "YYYY/MM形式で入力してください"}}
    />
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default MonthInput;
