const type = 'local'

const baseURLMap = {
  local: 'http://localhost:3000'
}

export function getBaseURL() {
  return baseURLMap[type]
}

export function getCombinedURL(url: string): string {
  if (url.slice(0, 1) !== '/') return url
  return getBaseURL() + url
}
