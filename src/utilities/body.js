export default (body) => {
  // Handle emtpy case
  if (!body) return null
  // Handle FormData
  if (body instanceof FormData) return body
  try {
    // Handle pre-stringified JSON
    JSON.parse(body)
    return body
  } catch (err) {
    // Handle plain object
    return JSON.stringify(body)
  }
}
