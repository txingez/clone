import React from 'react';

const TextInputNoHelpBlock = ({ input, placeholder, maxLength, type, meta: { touched, error, invalid, warning }, disabled }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <input {...input} className="form-control"  placeholder={placeholder} type={type} maxLength={maxLength} disabled={disabled} autoComplete="off"/>

  </div>
)

export default TextInputNoHelpBlock;
