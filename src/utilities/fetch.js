import fetch from 'isomorphic-fetch'

export default (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error))
  })
}
