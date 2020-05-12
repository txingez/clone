import StringUtil from '../StringUtil'
import _ from 'lodash'

const editPage = (name) => {
  return `import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router'
import * as ${name}Action from './${name}Action'
import ${StringUtil.capitalizeFirstLetter(name)}Form from './form/${name}Form'

class ${StringUtil.capitalizeFirstLetter(name)}EditPage extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      ${name}:{}
    }

    this.onHandleSubmit = this.onHandleSubmit.bind(this)
  }

  onHandleSubmit (values) {
  }

  render () {
    return (
      <div class="${_.kebabCase(name)}-edit">
        <h2 class="sub-header">Edit ${name}</h2>
        <${StringUtil.capitalizeFirstLetter(name)}Form ${name}={this.props.${name}} onSubmit={this.onHandleSubmit} />
      </div>
    )
  }
}

${StringUtil.capitalizeFirstLetter(name)}EditPage.propTypes = {
  ${name}: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  return {
    ${name}: state.${name}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(${name}Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${StringUtil.capitalizeFirstLetter(name)}EditPage)
`
}

export default editPage
