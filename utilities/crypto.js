import CryptoJS from 'crypto-js'
const stockText = 'stockfeel'

export const encodeEnv = (input) => {
  const keyHash = CryptoJS.SHA384(stockText)
  const key = CryptoJS.enc.Hex.parse(keyHash.toString().substring(0, 64))
  const iv = CryptoJS.enc.Hex.parse(keyHash.toString().substring(64, 96))
  const encrypted = CryptoJS.AES.encrypt(input, key, { iv })
  return encrypted.toString()
}

export const decodeEnv = (input) => {
  const keyHash = CryptoJS.SHA384(stockText)
  const key = CryptoJS.enc.Hex.parse(keyHash.toString().substring(0, 64))
  const iv = CryptoJS.enc.Hex.parse(keyHash.toString().substring(64, 96))
  const encrypted = CryptoJS.AES.decrypt(input, key, { iv })
  return encrypted.toString(CryptoJS.enc.Utf8)
}

export const wmAes = (input) => {
  const aes_key = decodeEnv(process.env.AES_KEY)
  const keyHash = CryptoJS.SHA384(aes_key)
  const key = CryptoJS.enc.Hex.parse(keyHash.toString().substring(0, 64))
  const iv = CryptoJS.enc.Hex.parse(keyHash.toString().substring(64, 96))
  const encrypted = CryptoJS.AES.encrypt(input, key, { iv })
  return encrypted.toString()
}

export const wmSign = (body) => {
  const sign_key = decodeEnv(process.env.SIGN_KEY)
  const payload = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(JSON.stringify(body)))
  const signature = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(payload, sign_key))
  const sign = payload + '.' + signature
  return sign
}
