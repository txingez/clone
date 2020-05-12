import _ from 'lodash'
const constant = (name) => {
  return `const ${name}Constant = {
  LOAD_${_.snakeCase(name).toUpperCase()}S_SUCCESS: 'LOAD_${_.snakeCase(name).toUpperCase()}S_SUCCESS',
  GET_${_.snakeCase(name).toUpperCase()}_DETAIL: 'GET_${_.snakeCase(name).toUpperCase()}_DETAIL',
  CREATE_${_.snakeCase(name).toUpperCase()}: 'CREATE_${_.snakeCase(name).toUpperCase()}',
  REMOVE_${_.snakeCase(name).toUpperCase()}: 'REMOVE_${_.snakeCase(name).toUpperCase()}',
  UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ALL: 'UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ALL',
  UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ONE: 'UPDATE_${_.snakeCase(name).toUpperCase()}_SELECT_ONE',  
}

export default ${name}Constant
`
}
export default constant
