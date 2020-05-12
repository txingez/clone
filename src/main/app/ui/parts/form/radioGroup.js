import React from 'react';
import {RadioGroup, Radio} from 'react-radio-group'

const RadioButtonGroup = ({ input, options, meta: { touched, error, invalid, warning } }) => (
  <div className={`${touched && invalid ? 'has-error' : ''}`}>
    <RadioGroup {...input} selectedValue={input.value || ''} onChange={input.onChange} >
      {options.map((opt) => {
        return <label key={`${input.name}_${opt.value}`} class="radio-inline"><Radio value={opt.value} disabled={opt.disable}/> {opt.text}</label>
      })
      }
    </RadioGroup>
    <div className="help-block">
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default RadioButtonGroup;
