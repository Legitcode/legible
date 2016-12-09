/* 
  Take in raw query string and 
  return a fetch api compatible object
*/

import findLine from './find-line'


const getVars = (lines, vars, variableMap) => {
  let body = lines.findIndex(line => line.match(/body/))
  let headers = lines.findIndex(line => line.match(/headers/))
  if(headers === -1) variableMap.body -= 1
  
  if(body !== -1 && headers !== -1 && body < headers) {
    variableMap.headers += 1
    variableMap.body -= 1
  }

  return {
    body: body || body === 0 ? JSON.stringify(vars[variableMap.body]) : null,
    headers: headers || headers === 0 ? vars[variableMap.headers] : null
  }
}

export default (strings, vars) => {
  let variableMap = {
    headers: 0,
    body: 1,
  }

  let lines = strings
    .join('')
    .split('\n')
    .filter(i => i)

  let url = findLine('url', lines)

  if(!url) {
    url = vars[0]
    variableMap = { headers: 1, body: 2 }
  }

  let { headers, body } = getVars(lines, vars, variableMap)

  return {
    url: findLine('url', lines) || vars[0],
    options: {
      method: findLine('method', lines) || 'GET',
      headers,
      body,
    }
  }
}