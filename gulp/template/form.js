import StringUtil from '../StringUtil'
import _ from 'lodash'

const form = (name) => {
  return `import React from 'react'
import PropTypes from 'prop-types'
import ${name}Constant from '../../../constants/${name}'
import { connect, compose } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Element } from 'react-scroll'
import TextInput from '../../parts/form/textInput'
import TextArea from '../../parts/form/textArea'
import Select from '../../parts/form/select'
import Validation from '../../parts/form/validation'
import { scrollToFirstError } from '../../../util/form'
import {Link} from 'react-router'


let ${StringUtil.capitalizeFirstLetter(name)}Form = ({${name}, handleSubmit}) => {
  return (
    <form class="${_.kebabCase(name)}-form cams-form" onSubmit={handleSubmit} >
    </form>
  )
}

${StringUtil.capitalizeFirstLetter(name)}Form.propTypes = {
  ${name}: PropTypes.object.isRequired
}


${StringUtil.capitalizeFirstLetter(name)}Form = reduxForm({
  form: '${name}Form',
  enableReinitialize: true,
  onSubmitFail: (errors) => scrollToFirstError(errors),
})(${StringUtil.capitalizeFirstLetter(name)}Form)


function mapStateToProps (state, ownProps) {
  return {
    initialValues: ownProps.${name}
  }
}

${StringUtil.capitalizeFirstLetter(name)}Form = connect(mapStateToProps, null)(${StringUtil.capitalizeFirstLetter(name)}Form)

export default ${StringUtil.capitalizeFirstLetter(name)}Form

`
}
export default form
