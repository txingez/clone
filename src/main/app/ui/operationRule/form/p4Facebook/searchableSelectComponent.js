import React from 'react'
import createFilterOptions from "react-select-fast-filter-options"
import Select from "react-virtualized-select"
import {CustomTokenizer} from '../../../../util/customTokenizer'
import CustomSelectOptionRenderer from '../../../parts/form/customSelectOptionRenderer'

const SearchableSelectComponent = ({ input, defaultOption, options, isDisabled, meta: { touched, error, invalid, warning }, placeholder }) => {
  const tokenizer = new CustomTokenizer()
  const filterOptions = createFilterOptions({
    options,
    tokenizer
  })
  let inputValue = input.value
  if (inputValue.value === undefined && options.length > 0) {
    inputValue = options.find(option => {return option.value === inputValue})
  }
  return (
    <div className={touched && invalid ? 'has-error' : ''}>
      <Select value={inputValue ? inputValue.value : ""} filterOptions={filterOptions({options})} options={options} onChange={e => input.onChange(e)}
            optionRenderer={CustomSelectOptionRenderer} placeholder={placeholder} clearable={false} />
      <div className="help-block">
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )
}

export default SearchableSelectComponent
