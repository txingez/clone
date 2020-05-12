
import React from "react";

const CustomSelectOptionRenderer = ({ focusedOption, focusOption, key, labelKey, option, selectValue, style, valueArray }) => {
  const className = ['VirtualizedSelectOption']
  if (option === focusedOption) {
    className.push('VirtualizedSelectFocusedOption')
  }
  if (option.disabled) {
    className.push('VirtualizedSelectDisabledOption')
  }
  if (valueArray && valueArray.indexOf(option) >= 0) {
    className.push('VirtualizedSelectSelectedOption')
  }

  if(option.className) {
    className.push(option.className);
  }

  const events = option.disabled
    ? {}
    : {
      onClick: () => selectValue(option),
      onMouseEnter: () => focusOption(option)
    }

  return (
    <div
      className={className.join(' ')}
      key={key}
      style={{
        ...style,
        ...option.style,
      }}
      title={option.title}
      {...events}
    >
      {option[labelKey]}
    </div>
  )
}

export default CustomSelectOptionRenderer
