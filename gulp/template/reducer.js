import _ from 'lodash'
const reducer = (name) => {
  return `import ${name}Constant from '../../constants/${name}'
import initialState from '../../../initialState'

export default function ${name}Reducer (${name} = initialState.${name}, action) {
  switch (action.type) {
    case ${name}Constant.GET_${_.snakeCase(name).toUpperCase()}_DETAIL:
      return action.${name}

    default:
      return ${name}
  }
}
`
}

export default reducer
