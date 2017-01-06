import fetch from './utilities/fetch'
import normalize from './utilities/normalize'

/*
  defines a partial request,
  returns a new function that merges any values
*/

export default (strings, ...vars) => {
  let partial = normalize(strings, vars)

  return (strings, ...vars) => {
    let { options, url } = normalize(strings, vars, partial)
    let mergedOptions = { ...partial.options, ...options }
    let finalUrl = url || partial.url

    return fetch(finalUrl, mergedOptions)
  }
}
