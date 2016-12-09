import fetch from 'isomorphic-fetch'
import normalize from './utilities/normalize'

export default (strings, ...vars) => {
  let { options, url } = normalize(strings, vars)

  return new Promise((resolve, reject) => {
    fetch(url, options)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error))
  })
}
