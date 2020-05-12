import React from 'react';

const TextArea = ({ input, rows, meta: { touched, error, invalid, warning } }) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <textarea {...input} className="form-control" rows={rows}/>
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default TextArea;
