import fetch from './utilities/fetch'
import normalize from './utilities/normalize'

export default (strings, ...vars) => {
  let { options, url } = normalize(strings, vars)

  return fetch(url, options)
}
