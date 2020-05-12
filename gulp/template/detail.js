import StringUtil from '../StringUtil'

const detail = (name) => {
  return `import React from 'react'
import PropTypes from 'prop-types'
import ${name}Constant from '../../../constants/${name}'

const ${StringUtil.capitalizeFirstLetter(name)}Detail = ({${name}}) => {
  return (
    <div>
      <dl class="dl-horizontal">
        <div class="box-line">
          <dt>${name}</dt>
          <dd>
            ${name}
          </dd>
        </div>

        <hr/>
      </dl>
    </div>
  )
}

${StringUtil.capitalizeFirstLetter(name)}Detail.propTypes = {
  ${name}: PropTypes.object.isRequired
}

export default ${StringUtil.capitalizeFirstLetter(name)}Detail
`
}

export default detail
