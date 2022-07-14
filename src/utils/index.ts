import crypto from 'crypto-js'
export const getEnvKey = (prop: string): string => {
  const key = process.env[prop]
  if (!key) {
    throw new Error(`no env prop ${prop}`)
  }
  return key
}
export function encrypt(txt: string, key = getEnvKey('KEY_ENCRYPT')): string {
  return crypto.AES.encrypt(txt, key).toString()
}

export function decrypt(txt: string, key = getEnvKey('KEY_ENCRYPT')): string {
  return crypto.AES.decrypt(txt, key).toString(crypto.enc.Utf8)
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())
