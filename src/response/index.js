const xml2js = require('xml2js')

function parseXML (xml) {
  return new Promise((resolve, reject) => {
    const parser = new xml2js.Parser()
    parser.parseStringPromise(xml).then((result) => {
      const keys = ['soapenv:Envelope', 'soapenv:Header']
      const arrayKeys = ['soapenv:Body', 'response', 'body']
      const keysResult = getKeysResult(result, keys)
      const arrayKeysResult = getKeysResult(keysResult, arrayKeys, 0)
      let data = Buffer.from(decodeURIComponent(arrayKeysResult || ''), 'base64').toString('utf8')
      data = data ? JSON.parse(data) : ''
      resolve(data)
    }).catch((err) => {
      console.error(err)
      reject(err)
    })
  })
}

function getKeysResult (obj, keys, index = -1) {
  let result = obj
  keys.forEach((key) => {
    result = index === -1 ? result[key] : result[index][key]
  })
  return index === -1 ? result : result[index]
}

function handleDTDString (xmlData, isGetPreviewContent) {
  const startString = '<!DOCTYPE'
  const endString = '</html>'
  const startIndex = xmlData.indexOf(startString)
  const endIndex = xmlData.indexOf(endString)
  const textContent = xmlData.slice(startIndex, endIndex + endString.length)
  let resultXmlData
  if (isGetPreviewContent) {
    resultXmlData = ''
  } else {
    const startArray = xmlData.split(startString)
    const startContent = startArray[0]
    const handleContent = startArray[1]
    const endArray = handleContent.split(endString)
    const endContent = endArray[1]
    resultXmlData = startContent + endContent
  }
  return {
    resultXmlData,
    textContent
  }
}

export default {
  parseXML,
  handleDTDString
}