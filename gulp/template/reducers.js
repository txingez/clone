import _ from 'lodash'
const reducers = (name) => {
  return `import ${name}Constant from '../../constants/${name}'
import initialState from '../../../initialState'

export default function ${name}sReducer (${name}s = initialState.${name}s, action) {
  switch (action.type) {
    case ${name}Constant.LOAD_${_.snakeCase(name).toUpperCase()}S_SUCCESS:
      return action.${name}s.map(${name} => Object.assign({isChecked: false}, ${name}))

    case ${name}Constant.REMOVE_${_.snakeCase(name).toUpperCase()}: {
      const index = ${name}s.findIndex(${name} => ${name}.id === action.${name}Id)
      return [
        ...${name}s.slice(0, index),
        ...${name}s.slice(index + 1)
      ]
    }

    case ${name}Constant.UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ALL:
      return ${name}s.map(${name} => Object.assign({}, ${name}, { isChecked: action.isChecked }))

    case ${name}Constant.UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ONE: {
      return ${name}s.map((${name}) => {
        if (${name}.id !== action.row.${name}Id) {
          return ${name}
        }

        return Object.assign({}, ${name}, { isChecked: action.row.isChecked })
      })
    }

    default:
      return ${name}s
  }
}
`
}

export default reducers
