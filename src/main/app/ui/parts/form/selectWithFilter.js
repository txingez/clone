import React from 'react'
import Select2 from 'react-select2-wrapper'

const SelectWithFilter = ({ input, data, templateResult, meta: { touched, error, invalid, warning }}) => (
  <div className={touched && invalid ? 'has-error' : ''}>
    <Select2 {...input}
      data={data}
      options={{templateResult: templateResult}}
    />
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default SelectWithFilter;
