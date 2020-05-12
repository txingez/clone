import StringUtil from '../StringUtil'
import _ from 'lodash'

const ajax = (name) => {
  return `import Ajax from './ajax'

class ${StringUtil.capitalizeFirstLetter(name)}Ajax extends Ajax {
  list () {
    return this.ajax().get('api/${_.kebabCase(name)}s')
  }

  detail (id) {
    return this.ajax().get('/api/${_.kebabCase(name)}s/' + id)
  }

  create (data) {
    return this.ajax().post('/api/${_.kebabCase(name)}s', data, {headers: {'Content-Type': 'application/json'}})
  }

  update (id, data) {
    return this.ajax().put('/api/${_.kebabCase(name)}s/' + id, data, {headers: {'Content-Type': 'application/json'}})
  }
  
  delete(id) {
    return this.ajax().delete('/api/${_.kebabCase(name)}s/' + id)
  }
}

const ${name}Ajax = new ${StringUtil.capitalizeFirstLetter(name)}Ajax()
export default ${name}Ajax
`
}
export default ajax
