import processBody from './body'

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
      // Return an array of the object key and replaced value from `vars`
      if (partial.url && key === 'url' && typeof vars[index] === 'function') {
        return [key, vars[index](partial.url)]
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

  return {
    url,
    options: {
      method: method || 'GET',
      body: processBody(body),
      ...options
    }
  }
}
