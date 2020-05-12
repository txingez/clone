import React from 'react';

const TextInput = ({ input, placeholder, maxLength, type, meta: { touched, error, invalid, warning } }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <input {...input} className="form-control"  placeholder={placeholder} type={type} maxLength={maxLength} autoComplete="off"/>
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default TextInput;
