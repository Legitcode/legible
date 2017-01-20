import processBody from './body'

/*
  Methods that can be callbacks, ex:
  headers: ${partialHeaders => }
*/
const callbackMethods = {
  headers: ({ value, partial }) => value(partial),
  url: ({ value, partial }) => value(partial.url)
}

/*
  Take in raw query string and
  return a fetch api compatible object
*/
const buildObjectFromTag = (strings, vars, partial) => {
  const namespace = 'legible-request-var-'
  return strings
    // First, add namespaced placeholders to elements in `strings`
    // for each element in `vars`
    .map((str, index) => str + (vars[index] ? `${namespace}${index}` : ''))
    // Join the elements into a single string
    .join('')
    // Split them back out by linebreak
    .split('\n')
    // Remove empty elements
    .filter(i => i)
    // Trim each element
    .map(s => s.trim())
    // Split each element at `:`
    .map(s => s.split(':').map(s => s.trim()))
    // Strings from above step with multiple `:` in them will get split
    // more than once, meaning `values` is an array of strings instead of
    // a single string. Let's fix that.
    .map(([key, ...values]) => [key, values.join(':')])
    // If `value` is a reference, replace it with respective element in `vars`
    .map(([key, value]) => {
      // Ignore non-namespaced value
      if (!value.startsWith(namespace)) return [key, value]
      // Get the index at the end of the namespaced string
      const index = parseInt(value.replace(namespace, ''), 10)

      // run through any callback methods
      if (callbackMethods[key] && typeof vars[index] === 'function') {
        return [key, callbackMethods[key]({
          value: vars[index],
          partial
        })]
      }

      return [key, vars[index]]
    })
    // Convert to object
    .reduce((obj, [key, value]) => {
      return {...obj, [key]: value}
    }, {})
}

export default (strings, vars, partial = {}) => {
  const { url, method, body, ...options } = buildObjectFromTag(strings, vars, partial)

  let data = {
    url,
    options: {
      method,
      ...options,
      body: processBody(body)
    }
  }
  if (!data.options.method) delete data.options.method
  if (!data.options.body) delete data.options.body

  return data
}
