import React from 'react';
import ruleConstant from '../../../constants/operationRule'

const Select = ({ input, defaultOption, options, isDisabled, action, meta: { touched, error, invalid, warning } }) => (
    <div className={'input-group ' + (touched && invalid ? 'has-error' : '')}>
      <select
        {...input}
        className="form-control"
        disabled={ isDisabled == true ? "disabled" : ''}
        value={ isDisabled != undefined && isDisabled == true && action !== ruleConstant.ACTION_TYPE_CTR_AD_START? "" : input.value }
      >
        { defaultOption !== undefined ? <option value="">{defaultOption}</option> : null }
        {options.map((opt) => {
          if (opt.isDisabled == undefined || opt.isDisabled == false){
            return <option key={opt.value} value={opt.value}>{opt.text}</option>
          }
        })
        }
      </select>
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>

)

export default Select;
