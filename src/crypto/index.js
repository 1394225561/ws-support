const CryptoJS = require('crypto-js') // 引用AES源码js

const key = CryptoJS.enc.Utf8.parse('1111222233334444') // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('1234567876543210') // 十六位十六进制数作为密钥偏移量

// 加密方法
function Encrypt (word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  let encryptResult = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let encryptResultString = encryptResult.toString()
  return encryptResultString
}

// 解密方法
function Decrypt (word) {
  let bytes = CryptoJS.AES.decrypt(word.toString(), key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let decryptResult = bytes.toString(CryptoJS.enc.Utf8)
  return decryptResult.toString()
}

export default {
  Encrypt,
  Decrypt
}