import fs from 'fs'
import _ from 'lodash'

let responseDataPath = './src/dummyData/response_data'

let successBody = '{"success":true}'

let headers = {
  'Content-type': 'application/json;charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTION'
}
export default [
  {
    url: '/api/users',
    method: 'get',
    res: (req, res, callback) => {
      fs.readFile(responseDataPath + '/users.json', 'utf8', function (err, text) {
        callback(null, {
          status: 200,
          headers: headers,
          body: text
        });
      });
    }
  },
  {
    url : '/api/operation-rules/1',
    method: 'get',
    res: (req, res, callback) => {
      fs.readFile(responseDataPath + '/operationRule.json', 'utf8', function (err, text) {
        callback(null, {
          status: 200,
          headers: headers,
          body: text
        });
      });
    }
  },
  {
    url: 'api/accounts/1/operation-rules',
    method: 'post',
    res: (req, res, callback) => {
      fs.readFile(responseDataPath + '/operationRule.json', 'utf8', function (err, text) {
        callback(null, {
          status: 200,
          headers: headers,
          body: text
        });
      });
    }
  }
]
