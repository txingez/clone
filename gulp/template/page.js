import StringUtil from '../StringUtil'
import _ from 'lodash'

const page = (name) => {
  return `import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ${name}Action from './${name}Action'

class ${StringUtil.capitalizeFirstLetter(name)}Page extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }
  
  render() {
    return (
      <div class="${_.kebabCase(name)}-page"></div>
    )
  }
}

${StringUtil.capitalizeFirstLetter(name)}Page.propTypes = {
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    ${name}s: state.${name}s
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(${name}Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${StringUtil.capitalizeFirstLetter(name)}Page)
`
}

export default page
