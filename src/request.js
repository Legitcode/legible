import fetch from './utilities/fetch'
import normalize from './utilities/normalize'

export default (strings, ...vars) => {
  let { options, url } = normalize(strings, vars)
  if (!options.method) options.method = 'GET'
  return fetch(url, options)
}
