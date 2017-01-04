import fetch from './utilities/fetch'
import normalize from './utilities/normalize'

/*
  defines a partial request,
  returns a new function that merges any values
*/

export default (strings, ...vars) => {
  let { options, url } = normalize(strings, vars)

  return (strings, ...vars) => {
    let finalData = normalize(strings, vars)
    let mergedOptions = { ...options, ...finalData.options }
    let finalUrl = finalData.url || url

    return fetch(finalUrl, mergedOptions)
  }
}
