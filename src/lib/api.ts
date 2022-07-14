const apiGet = (url: string, params = {}, config = {}) => {
  const urlInfo = url.split('?')
  let [path, param] = urlInfo

  const queryParams = Object.entries(params)
    .reduce((rv, item) => {
      rv += item.join('=') + '&'
      return rv
    }, '')
    .slice(0, -1)

  path += param ? `?${param}&${queryParams}` : `&${queryParams}`

  return fetch(path, config).then((r) => r.json())
}

const apiDelete = (url: string, config = {}) =>
  fetch(url, {
    method: 'DELETE',
    ...config
  }).then((r) => r.json())

const apiPost = (url: string, body: any, config = {}) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(body),
    ...config
  }).then((r) => r.json())

const apiPut = (url: string, config = {}) =>
  fetch(url, { method: 'PUT', ...config }).then((r) => r.json())

export { apiGet, apiDelete, apiPost, apiPut }
