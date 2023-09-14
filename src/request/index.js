function urlParamsToObj (url) {
  let data
  if (url.indexOf('?') === -1) {
    data = null
  } else {
    let paramsArray = url.split('?')
    let paramsPairString = paramsArray[1]
    let paramsPairArray = paramsPairString.split('&')
    let params = {}
    paramsPairArray.forEach((paramsPair) => {
      const [key, value] = paramsPair.split('=')
      params[key] = value
    })
    data = params
  }
  return data
}

function getXmlData (params, method) {
  const xmlData =
  `<?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
          <request>
              <method>${method}</method>
              <body>${params ? Buffer.from(JSON.stringify(params), 'utf8').toString('base64') : ''}</body>
          </request>
      </soap:Body>
  </soap:Envelope>`
  return xmlData
}

export default {
  urlParamsToObj,
  getXmlData
}