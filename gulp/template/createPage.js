import StringUtil from '../StringUtil'
import _ from 'lodash'


const createPage = (name) => {
  return `import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ${name}Action from './${name}Action'
import ${StringUtil.capitalizeFirstLetter(name)}Form from './form/${name}Form'

class ${StringUtil.capitalizeFirstLetter(name)}CreatePage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      ${name}: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (values) {
  }

  render () {
    return (
      <div class="${_.kebabCase(name)}-create">
        <h2 class="sub-header">Create a new ${_.kebabCase(name)}</h2>
        <${StringUtil.capitalizeFirstLetter(name)}Form ${name}={this.state.${name}} onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

${StringUtil.capitalizeFirstLetter(name)}CreatePage.propTypes = {
  actions: PropTypes.object.isRequired,
  ${name}: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    ${name}: state.${name}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(${name}Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${StringUtil.capitalizeFirstLetter(name)}CreatePage)
`
}

export default createPage
