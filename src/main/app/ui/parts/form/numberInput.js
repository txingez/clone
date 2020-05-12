import React from 'react'
import NumberFormat from 'react-number-format'

const NumberInput = ({ input: {onChange, value}, meta: { touched, error, invalid, warning } }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <NumberFormat
      onChange={onChange}
      value={value}
      className="form-control"
    />
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default NumberInput;
