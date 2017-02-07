import fetch from 'isomorphic-fetch'

export default (url, options = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, options)
    .then(response => {
      if (options.onResponse) options.onResponse(response)

      response.text()
      .then(text => {
        try {
          resolve(JSON.parse(text))
        } catch (e) {
          resolve({})
        }
      })
      .catch(function (error) {
        return reject(error)
      })
    })
  })
}
