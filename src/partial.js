import fetch from 'isomorphic-fetch'
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

    return new Promise((resolve, reject) => {
      fetch(finalData.url || url, mergedOptions)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }
}
