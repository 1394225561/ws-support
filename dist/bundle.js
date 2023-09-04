import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _indexOfInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/index-of';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';

var CryptoJS = require('crypto-js'); // 引用AES源码js

var key = CryptoJS.enc.Utf8.parse('1111222233334444'); // 十六位十六进制数作为密钥
var iv = CryptoJS.enc.Utf8.parse('1234567876543210'); // 十六位十六进制数作为密钥偏移量

// 加密方法
function Encrypt$1(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encryptResult = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var encryptResultString = encryptResult.toString();
  return encryptResultString;
}

// 解密方法
function Decrypt$1(word) {
  var bytes = CryptoJS.AES.decrypt(word.toString(), key, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  var decryptResult = bytes.toString(CryptoJS.enc.Utf8);
  return decryptResult.toString();
}
var crypto = {
  Encrypt: Encrypt$1,
  Decrypt: Decrypt$1
};

function urlParamsToObj$1(url) {
  var data;
  if (_indexOfInstanceProperty(url).call(url, '?') === -1) {
    data = null;
  } else {
    var paramsArray = url.split('?');
    var paramsPairString = paramsArray[1];
    var paramsPairArray = paramsPairString.split('&');
    var params = {};
    _forEachInstanceProperty(paramsPairArray).call(paramsPairArray, function (paramsPair) {
      var _paramsPair$split = paramsPair.split('='),
        _paramsPair$split2 = _slicedToArray(_paramsPair$split, 2),
        key = _paramsPair$split2[0],
        value = _paramsPair$split2[1];
      params[key] = value;
    });
    data = params;
  }
  return data;
}
function getXmlData$1(params, method, cryptoRequest) {
  var _context;
  if (params && cryptoRequest) {
    params = {
      cryptoParams: crypto.Encrypt(_JSON$stringify(params))
    };
  }
  var xmlData = _concatInstanceProperty(_context = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:pm=\"http://provider.ws.wshttpproxy.nj.yunjiacloud.com/\">\n      <soapenv:Header/>\n      <soapenv:Body>\n        <pm:execute>\n            <request>\n              <method>".concat(method, "</method>\n              <body>")).call(_context, params ? btoa(_JSON$stringify(params)) : '', "</body>\n            </request>\n        </pm:execute>\n      </soapenv:Body>\n    </soapenv:Envelope>");
  return xmlData;
}
var request = {
  urlParamsToObj: urlParamsToObj$1,
  getXmlData: getXmlData$1
};

var xml2js = require('xml2js');
function parseXML$1(xml) {
  return new _Promise(function (resolve, reject) {
    var parser = new xml2js.Parser();
    parser.parseStringPromise(xml).then(function (result) {
      var keys = ['soapenv:Envelope', 'soapenv:Header'];
      var arrayKeys = ['soapenv:Body', 'response', 'body'];
      var keysResult = getKeysResult(result, keys);
      var arrayKeysResult = getKeysResult(keysResult, arrayKeys, 0);
      var data = Buffer.from(decodeURIComponent(arrayKeysResult || ''), 'base64').toString('utf8');
      data = data ? JSON.parse(data) : '';
      resolve(data);
    })["catch"](function (err) {
      console.error(err);
      reject(err);
    });
  });
}
function getKeysResult(obj, keys) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  var result = obj;
  _forEachInstanceProperty(keys).call(keys, function (key) {
    result = index === -1 ? result[key] : result[index][key];
  });
  return index === -1 ? result : result[index];
}
function handleDTDString$1(xmlData, isGetPreviewContent) {
  var startString = '<!DOCTYPE';
  var endString = '</html>';
  var startIndex = _indexOfInstanceProperty(xmlData).call(xmlData, startString);
  var endIndex = _indexOfInstanceProperty(xmlData).call(xmlData, endString);
  var textContent = _sliceInstanceProperty(xmlData).call(xmlData, startIndex, endIndex + endString.length);
  var resultXmlData;
  if (isGetPreviewContent) {
    resultXmlData = '';
  } else {
    var startArray = xmlData.split(startString);
    var startContent = startArray[0];
    var handleContent = startArray[1];
    var endArray = handleContent.split(endString);
    var endContent = endArray[1];
    resultXmlData = startContent + endContent;
  }
  return {
    resultXmlData: resultXmlData,
    textContent: textContent
  };
}
var response = {
  parseXML: parseXML$1,
  handleDTDString: handleDTDString$1
};

var urlParamsToObj = request.urlParamsToObj;
var getXmlData = request.getXmlData;
var parseXML = response.parseXML;
var handleDTDString = response.handleDTDString;
var Encrypt = crypto.Encrypt;
var Decrypt = crypto.Decrypt;
var main = {
  urlParamsToObj: urlParamsToObj,
  getXmlData: getXmlData,
  parseXML: parseXML,
  handleDTDString: handleDTDString,
  Encrypt: Encrypt,
  Decrypt: Decrypt
};

export { main as default };
