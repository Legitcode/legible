export default (body) => {
  // Handle empty case
  if (!body) return null
  // Handle FormData
  if (typeof FormData !== 'undefined' && body instanceof FormData) return body
  try {
    // Handle already stringified JSON
    JSON.parse(body)
    return body
  } catch (err) {
    // Handle plain object
    return JSON.stringify(body)
  }
}
