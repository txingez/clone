import StringUtil from '../StringUtil'

const detailPage = (name) => {
  return `import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as ${name}Action from './${name}Action'
import ${StringUtil.capitalizeFirstLetter(name)}Detail from './detail/${name}Detail'

class ${StringUtil.capitalizeFirstLetter(name)}DetailPage extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      ${name}: {}
    }
  }

  render() {
    return (
      <div class="${name}-detail">
        <${StringUtil.capitalizeFirstLetter(name)}Detail ${name}={this.props.${name}} />
      </div>
    )
  }
}

${StringUtil.capitalizeFirstLetter(name)}DetailPage.propTypes = {
  actions: PropTypes.object.isRequired,
  ${name}: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    ${name}: state.${name}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(${name}Action, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(${StringUtil.capitalizeFirstLetter(name)}DetailPage)

`
}

export default detailPage
