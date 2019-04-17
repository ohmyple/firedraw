
const request = ({endpoint, body, method='POST', headers}) => {
  const newHeaders = new Headers()

  if(headers) {
    newHeaders.append('Content-Type', headers)
  }
  return (
    fetch(endpoint , {
    method: method,
    headers: newHeaders,
    body: body
  })
)}

module.exports = request
