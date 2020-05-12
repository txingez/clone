import React from 'react'

const CheckboxSlider = ({input, checked, onSwitch, className}) => (
  <label className={"switch " + className}>
    <input {...input} type="checkbox" checked={checked}
           onChange={onSwitch}/>
    <span className="slider round"></span>
  </label>
)

export default CheckboxSlider
