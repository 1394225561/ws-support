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
    `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pm="http://provider.ws.wshttpproxy.nj.yunjiacloud.com/">
      <soapenv:Header/>
      <soapenv:Body>
        <pm:execute>
            <request>
              <method>${method}</method>
              <body>${params ? btoa(JSON.stringify(params)) : ''}</body>
            </request>
        </pm:execute>
      </soapenv:Body>
    </soapenv:Envelope>`
  return xmlData
}

export default {
  urlParamsToObj,
  getXmlData
}